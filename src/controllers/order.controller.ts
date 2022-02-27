import {
  buyOrder,
  // listOrders,
  // retrieveOrder,
} from "./../services/order.service";
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

// export const list = async (req: Request, res: Response, next: NextFunction) => {
//   const orders = await listOrders();
//   return res.json({ orders });
// };

// export const retrieve = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const order = await retrieveOrder(req.params.id);
//     return res.json({ order });
//   } catch (e) {
//     next(e);
//   }
// };
