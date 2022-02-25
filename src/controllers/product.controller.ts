import {
  createProduct,
  listProducts,
  findProduct,
} from "./../services/product.service";
import { Request, Response, NextFunction } from "express";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idLogged, body } = req;

    const product = await createProduct(idLogged, body);

    return res.status(201).json(product);
  } catch (e) {
    next(e);
  }
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await listProducts();

    return res.json(products);
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
    const { id } = req.params;

    const product = await findProduct(id);

    return res.json(product);
  } catch (e) {
    next(e);
  }
};
