import * as yup from "yup";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: yup.AnyObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    try {
      await schema.validate(body, { abortEarly: false });
      return next();
    } catch (e: any) {
      return res.status(422).json({ message: e.errors });
    }
  };
