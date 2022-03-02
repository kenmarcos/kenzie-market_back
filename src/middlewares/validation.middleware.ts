import * as yup from "yup";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: yup.AnyObjectSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;

    try {
      req.body = await schema.validate(body, {
        abortEarly: false,
        stripUnknown: true,
      });
      return next();
    } catch (e: any) {
      return res.status(422).json({ error: e.errors });
    }
  };
