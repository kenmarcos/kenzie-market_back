import { createToken } from "./../services/login.service";
import { Request, Response, NextFunction } from "express";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;

    const token = await createToken(body);

    return res.json({ token });
  } catch (e) {
    next(e);
  }
};
