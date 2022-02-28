import { Request, Response, NextFunction } from "express";
import { sendPassRecToken, changePass } from "../services/recPass.service";

export const send = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;

    await sendPassRecToken(body);

    return res.json({
      message:
        "email with verification code to change password was sent by email",
    });
  } catch (e) {
    next(e);
  }
};

export const change = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { body } = req;

    await changePass(body);

    return res.json({ message: "password changed successfully" });
  } catch (e) {
    next(e);
  }
};
