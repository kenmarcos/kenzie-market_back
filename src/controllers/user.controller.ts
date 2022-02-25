import {
  createUser,
  listUsers,
  retrieveUser,
} from "./../services/user.service";
import { Request, Response, NextFunction } from "express";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await createUser(req.body);
    return res.status(201).json({ user });
  } catch (e) {
    next(e);
  }
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await listUsers();
    return res.json({ users });
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
    const user = await retrieveUser(req.params.id);
    return res.json({ user });
  } catch (e) {
    next(e);
  }
};
