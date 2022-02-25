import { Request, Response, NextFunction } from "express";
import { sendPassRecToken, changePass } from "../services/recPass.service";

export const send = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await sendPassRecToken(req.body.email);
    return res.json({
      message: "Email with code to change password was sent by email",
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
    await changePass(req.body);
    return res.json({ message: "Password changed" });
  } catch (e) {
    next(e);
  }
};
