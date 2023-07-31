import { getRepository } from "typeorm";
import { Order, Cart, CartProduct, OrderProduct, User } from "../entities";
import ErrorHandler from "../errors/errorHandler";
import { transport, mailOptions } from "./email.service";

export const buyOrder = async (idLogged: string) => {
  const userRepository = getRepository(User);
  const cartRepository = getRepository(Cart);
  const cartProductRepository = getRepository(CartProduct);
  const orderRepository = getRepository(Order);
  const orderProductRepository = getRepository(OrderProduct);

  const user = await userRepository.findOne(idLogged);

  const cart = await cartRepository.findOne({
    where: { owner: idLogged },
    relations: ["owner"],
  });

  const cartsProducts = await cartProductRepository.find({
    where: { cart },
  });

  if (cartsProducts.length === 0) {
    throw new ErrorHandler(400, "cart is empty");
  }

  let total = 0;
  cartsProducts.map((cartProduct) => {
    total = total + cartProduct.productQuantity * cartProduct.product.price;
  });

  const order = orderRepository.create({
    total,
    cart,
    user: (cart as Cart).owner,
  });

  await orderRepository.save(order);

  for (const cartProduct of cartsProducts) {
    const orderProduct = orderProductRepository.create({
      productQuantity: cartProduct.productQuantity,
      product: cartProduct.product,
      order,
    });

    await orderProductRepository.save(orderProduct);
  }

  const options = mailOptions(
    "no-reply@kenziemarket.com",
    [(user as User).email],
    "Pedido Realizado!",
    "buy",
    {
      name: (user as User).name,
      cartsProducts: cartsProducts,
      total: total,
    }
  );

  transport.sendMail(options, (err, info) => {
    if (err) {
      throw new ErrorHandler(500, "error sending order confirmation email");
    }
  });

  await cartProductRepository.delete({ cart });

  const newOrder = await orderRepository.findOne(order.id, {
    join: {
      alias: "orders",
      leftJoinAndSelect: {
        ordersProducts: "orders.ordersProducts",
        products: "ordersProducts.product",
      },
    },
  });

  return newOrder;
};

export const listOrders = async (idLogged: string) => {
  const userRepository = getRepository(User);
  const orderRepository = getRepository(Order);

  const userLogged = await userRepository.findOne(idLogged);

  if (!userLogged?.isAdm) {
    throw new ErrorHandler(401, "unauthorized");
  }

  const orders = orderRepository.find({
    relations: ["user"],
    join: {
      alias: "orders",
      leftJoinAndSelect: {
        ordersProducts: "orders.ordersProducts",
        products: "ordersProducts.product",
      },
    },
  });

  return orders;
};

export const findOrder = async (idLogged: string, orderId: string) => {
  const userRepository = getRepository(User);
  const orderRepository = getRepository(Order);

  const userLogged = await userRepository.findOne(idLogged, {
    relations: ["orders"],
  });

  if (
    !userLogged?.isAdm &&
    (userLogged?.orders.some((order) => order.id !== orderId) ||
      userLogged?.orders.length === 0)
  ) {
    throw new ErrorHandler(401, "missing admin permission");
  }

  const order = await orderRepository.findOne(orderId, {
    join: {
      alias: "orders",
      leftJoinAndSelect: {
        ordersProducts: "orders.ordersProducts",
        products: "ordersProducts.product",
      },
    },
  });

  if (!order) {
    throw new ErrorHandler(404, "order not found");
  }
  return order;
};
