import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import ErrorHandler from "../errors/errorHandler";

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return next(new ErrorHandler(401, "Missing authorization headers"));
  }

  const token = req.headers.authorization.split(" ")[1];

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    async (err: any, decode: any) => {
      if (err) {
        return next(new ErrorHandler(401, "Invalid token"));
      }
      const idLogged = decode.idLogged;

      req.idLogged = idLogged;

      next();
    }
  );
};
