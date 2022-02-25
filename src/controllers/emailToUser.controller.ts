import { Request, Response, NextFunction } from "express";
import { sendEmailToUser } from "../services/emailToUser.service";
export const send = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await sendEmailToUser(req.user.email, req.body);
    return res.json({ message: "Email successfully sent" });
  } catch (e) {
    next(e);
  }
};
