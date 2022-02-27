import { getRepository } from "typeorm";
import { Cart, Product, User } from "../entities";
import ErrorHandler from "../errors/errorHandler";
import CartProduct from "../entities/CartProduct";

// interface IUser {
//   id: string;
//   name: string;
//   cpf: string;
//   email: string;
//   phone: string;
//   isAdm: boolean;
//   cart: { id: string };
// }

export const addProductToCart = async (
  idLogged: string,
  body: { productId: string }
) => {
  const { productId } = body;

  const cartRepository = getRepository(Cart);
  const productRepository = getRepository(Product);
  const cartProductRepository = getRepository(CartProduct);

  const cart = await cartRepository.findOne({ where: { owner: idLogged } });
  const productToAdd = await productRepository.findOne(productId);
  const cartsProducts = await cartProductRepository.find({
    where: { cart },
    relations: ["product"],
  });

  if (!productToAdd) {
    throw new ErrorHandler(404, "product not found");
  }

  if (!productToAdd.isAvailable) {
    throw new ErrorHandler(400, "product unavailable");
  }

  const productInCart = cartsProducts.some(
    (cartProduct) => cartProduct.product.id === productToAdd.id
  );

  if (!productInCart) {
    const cartProduct = cartProductRepository.create({
      productQuantity: 1,
      product: productToAdd,
      cart,
    });

    await cartProductRepository.save(cartProduct);
  } else {
    const cartProduct = await cartProductRepository.findOne({
      product: productToAdd,
    });
    if (cartProduct) {
      cartProductRepository.merge(cartProduct, {
        productQuantity: (cartProduct.productQuantity += 1),
      });
      await cartProductRepository.save(cartProduct);
    }
  }
  productRepository.merge(productToAdd, { stock: (productToAdd.stock -= 1) });
  const product = await productRepository.save(productToAdd);

  if (product.stock === 0) {
    await productRepository.update(product.id, { isAvailable: false });
  }

  const updatedCart = await cartRepository.findOne(cart?.id, {
    relations: ["cartsProducts"],
  });

  return updatedCart;
};

export const listCarts = async (idLogged: string) => {
  const userRepository = getRepository(User);
  const cartRepository = getRepository(Cart);

  const userLogged = await userRepository.findOne(idLogged);

  if (!userLogged?.isAdm) {
    throw new ErrorHandler(401, "unauthorized");
  }

  const carts = await cartRepository.find({
    join: {
      alias: "carts",
      leftJoinAndSelect: {
        cartsProducts: "carts.cartsProducts",
        products: "cartsProducts.product",
      },
    },
  });

  return carts;
};

export const findCart = async (idLogged: string, cartId: string) => {
  const userRepository = getRepository(User);
  const cartRepository = getRepository(Cart);

  const userLogged = await userRepository.findOne(idLogged, {
    relations: ["cart"],
  });

  if (!userLogged?.isAdm && userLogged?.cart.id !== cartId) {
    throw new ErrorHandler(401, "missing admin permission");
  }

  const cart = await cartRepository.findOne(cartId, {
    join: {
      alias: "carts",
      leftJoinAndSelect: {
        cartsProducts: "carts.cartsProducts",
        products: "cartsProducts.product",
      },
    },
  });

  if (!cart) {
    throw new ErrorHandler(404, "cart not found");
  }

  return cart;
};

export const removeProductFromCart = async (
  idLogged: string,
  body: { cartId: string },
  productId: string
) => {
  const { cartId } = body;

  const userRepository = getRepository(User);
  const cartRepository = getRepository(Cart);
  const productRepository = getRepository(Product);
  const cartProductRepository = getRepository(CartProduct);

  const userLogged = await userRepository.findOne(idLogged, {
    relations: ["cart"],
  });

  if (!userLogged?.isAdm && userLogged?.cart.id !== cartId) {
    throw new ErrorHandler(401, "missing admin permission");
  }

  const cart = await cartRepository.findOne(cartId);
  const productToRemove = await productRepository.findOne(productId);

  if (!productToRemove) {
    throw new ErrorHandler(404, "product not found");
  }

  const cartsProducts = await cartProductRepository.find({
    where: { cart },
  });

  const productInCart = cartsProducts.some(
    (cartProduct) => cartProduct.product.id === productToRemove.id
  );

  if (!productInCart) {
    throw new ErrorHandler(400, "product is not in cart");
  }

  cartsProducts.map(async (cartProduct) => {
    if (cartProduct.product.id === productToRemove.id) {
      if (cartProduct.productQuantity > 1) {
        await cartProductRepository.update(cartProduct.id, {
          productQuantity: cartProduct.productQuantity - 1,
        });
      } else {
        await cartProductRepository.delete(cartProduct.id);
      }
      await productRepository.update(cartProduct.product.id, {
        stock: cartProduct.product.stock + 1,
      });
    }
  });
};
