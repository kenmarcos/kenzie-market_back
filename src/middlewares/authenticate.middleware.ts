import { getRepository } from "typeorm";
import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../errors/errorHandler";
import jwt from "jsonwebtoken";
import User from "../entities/User";

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.headers.authorization) {
      throw new ErrorHandler(401, "Missing authorization headers");
    }

    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      async (err: any, decode: any) => {
        try {
          if (err) {
            throw new ErrorHandler(401, "Invalida token");
          } else {
            const userRepository = getRepository(User);
            const user = await userRepository.findOne(decode.id);
            if (!user) {
              throw new ErrorHandler(404, "User not found");
            }
            req.user = user;
            return next();
          }
        } catch (e) {
          next(e);
        }
      }
    );
  } catch (e) {
    next(e);
  }
};
