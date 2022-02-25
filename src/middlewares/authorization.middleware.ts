import { getRepository } from "typeorm";
import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../errors/errorHandler";
import { Cart, Order } from "../entities";

export const authorizateAdm = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, isAdm } = req.user;

    const cartRepository = getRepository(Cart);
    const cart = await cartRepository.findOne({
      where: { user: req.user },
      relations: ["user"],
    });
    const orderRepository = getRepository(Order);
    const orders = await orderRepository.find({
      where: { cart: cart },
    });

    if (!isAdm) {
      if (!req.params.id && !req.params.product_id) {
        if (req.body.cartId) {
          return next();
        }
        throw new ErrorHandler(401, "Unauthorized");
      } else if (
        req.params.id &&
        req.params.id !== id &&
        req.params.id !== (cart as Cart).id &&
        orders.every((order) => order.id !== req.params.id)
      ) {
        throw new ErrorHandler(401, "Missing admin permission");
      } else if (
        req.params.product_id &&
        req.body.cartId &&
        req.body.cartId !== cart?.id
      ) {
        throw new ErrorHandler(401, "Missing admin permission");
      }
      return next();
    }
    return next();
  } catch (e) {
    next(e);
  }
};
