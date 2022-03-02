import { createUser, listUsers, findUser } from "./../services/user.service";
import { Request, Response, NextFunction } from "express";

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;

    const user = await createUser(body);

    return res.status(201).json(user);
  } catch (e) {
    next(e);
  }
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idLogged } = req;

    const users = await listUsers(idLogged);

    return res.json(users);
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

    const user = await findUser(idLogged, id);

    return res.json(user);
  } catch (e) {
    next(e);
  }
};
