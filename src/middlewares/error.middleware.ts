import { Request, Response, NextFunction } from "express";
import ErrorHandler from "../errors/errorHandler";

export const handleError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ErrorHandler) {
    return res.status(err.statusCode).json({ error: err.message });
  }
};
