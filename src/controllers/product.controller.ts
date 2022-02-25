import {
  createProduct,
  listProducts,
  retrieveProduct,
} from "./../services/product.service";
import { Request, Response, NextFunction } from "express";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const product = await createProduct(req.body);
  return res.status(201).json(product);
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await listProducts();
    return res.json(products);
  } catch (e) {
    next(e);
  }
};

export const retrieve = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = await retrieveProduct(req.params.id);
    return res.json(product);
  } catch (e) {
    next(e);
  }
};
