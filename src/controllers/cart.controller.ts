import {
  addProductToCart,
  listCarts,
  findCart,
  removeProductFromCart,
} from "./../services/cart.service";
import { Request, Response, NextFunction } from "express";

export const add = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idLogged, body } = req;

    const cart = await addProductToCart(idLogged, body);

    return res.json({ cart });
  } catch (e) {
    next(e);
  }
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idLogged } = req;

    const carts = await listCarts(idLogged);

    return res.json({ carts });
  } catch (e) {
    next(e);
  }
};

export const listOne = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idLogged } = req;
    const { id } = req.params;

    const cart = await findCart(idLogged, id);
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
    const { idLogged, body } = req;
    const { product_id } = req.params;

    await removeProductFromCart(idLogged, body, product_id);

    return res.sendStatus(204);
  } catch (e) {
    next(e);
  }
};
