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

  const ordersProducts = await orderProductRepository.find({
    where: { order },
    relations: ["product"],
  });

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
      throw new ErrorHandler(500, "Error while sending the email");
    }
  });

  const newOrder = orderRepository.findOne({
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

// export const listOrders = async () => {
//   const orderRepository = getRepository(Order);
//   const orders = orderRepository.find();
//   return orders;
// };

// export const retrieveOrder = async (orderId: string) => {
//   const orderRepository = getRepository(Order);
//   const order = await orderRepository.findOne(orderId);
//   if (!order) {
//     throw new ErrorHandler(404, "Buy not found");
//   }
//   return order;
// };
