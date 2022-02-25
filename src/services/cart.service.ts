import { getRepository } from "typeorm";
import { Cart, Product } from "../entities";
import ErrorHandler from "../errors/errorHandler";

interface IUser {
  id: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  isAdm: boolean;
  cart: { id: string };
}

export const addProductToCart = async (productId: string, user: IUser) => {
  const cartRepository = getRepository(Cart);
  const productRepository = getRepository(Product);

  const cart = await cartRepository.findOne({ user: user });
  const product = await productRepository.findOne(productId);

  if (!product) {
    throw new ErrorHandler(404, "Product not found");
  }

  if (cart?.products.some((product) => product.id === productId)) {
    throw new ErrorHandler(409, "This product is already in the cart");
  }

  cart?.products.push(product);
  await cartRepository.save(cart as Cart);

  return cart;
};

export const listCarts = async () => {
  const cartRepository = getRepository(Cart);
  const carts = cartRepository.find();
  return carts;
};

export const retrieveCart = async (cartId: string) => {
  const cartRepository = getRepository(Cart);
  const cart = await cartRepository.findOne(cartId);
  if (!cart) {
    throw new ErrorHandler(404, "Cart not found");
  }
  return cart;
};

export const removeProductFromCart = async (
  productId: string,
  cartId: string
) => {
  const cartRepository = getRepository(Cart);
  const productRepository = getRepository(Product);

  const cart = await cartRepository.findOne(cartId);
  const product = await productRepository.findOne(productId);

  if (!product) {
    throw new ErrorHandler(404, "Product not found");
  }

  cart?.products.splice(
    cart.products.findIndex((product) => product.id === productId)
  );

  await cartRepository.save(cart as Cart);
};
