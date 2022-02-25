import {
  addProductToCart,
  listCarts,
  retrieveCart,
  removeProductFromCart,
} from "./../services/cart.service";
import { Request, Response, NextFunction } from "express";

export const add = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cart = await addProductToCart(req.body.productId, req.user);
    return res.json({ cart });
  } catch (e) {
    next(e);
  }
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
  const carts = await listCarts();
  return res.json({ carts });
};

export const retrieve = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cart = await retrieveCart(req.params.id);
    return res.json({ cart });
  } catch (e) {
    next(e);
  }
};

export const remove = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await removeProductFromCart(req.params.product_id, req.body.cartId);
    return res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};
