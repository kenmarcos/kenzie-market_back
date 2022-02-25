// import { getRepository } from "typeorm";
// import { Order, Cart } from "../entities";
// import ErrorHandler from "../errors/errorHandler";
// import { transport, mailOptions } from "./email.service";

// interface IUser {
//   id: string;
//   name: string;
//   cpf: string;
//   email: string;
//   phone: string;
//   isAdm: boolean;
//   cart: { id: string };
// }

// export const buyOrder = async (cartId: string, user: IUser) => {
//   const { name, email } = user;

//   const cartRepository = getRepository(Cart);
//   const orderRepository = getRepository(Order);

//   const cart = await cartRepository.findOne(cartId);
//   if (!cart) {
//     throw new ErrorHandler(404, "Cart not found");
//   }

//   const total = cart.products.reduce((acc, product) => {
//     return acc + product.price;
//   }, 0);

//   const order = new Order();
//   order.cart = cart;
//   order.value = total;
//   await orderRepository.save(order);

//   const { cart: cartOrder, ...orderWithoutCart } = order;

//   const orderCopy = { ...order.cart, ...orderWithoutCart };

//   const options = mailOptions(
//     "no-reply@kenziemarket.com",
//     [email],
//     "Pedido Realizado!",
//     "buy",
//     {
//       name: user.name,
//       products: cart.products,
//       total: total,
//     }
//   );

//   transport.sendMail(options, (err, info) => {
//     if (err) {
//       throw new ErrorHandler(500, "Error while sending the email");
//     } else {
//       console.log(info);
//     }
//   });

//   cart.products = [];
//   await cartRepository.save(cart);

//   return orderCopy;
// };

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
