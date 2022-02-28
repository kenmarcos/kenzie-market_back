import { buyOrder, listOrders, findOrder } from "./../services/order.service";
import { Request, Response, NextFunction } from "express";

export const buy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idLogged } = req;

    const order = await buyOrder(idLogged);

    res.json({ order });
  } catch (e) {
    next(e);
  }
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idLogged } = req;

    const orders = await listOrders(idLogged);

    return res.json({ orders });
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

    const order = await findOrder(idLogged, id);

    return res.json({ order });
  } catch (e) {
    next(e);
  }
};
