import { Request, Response, NextFunction } from "express";
import { sendEmailToUser } from "../services/emailToUser.service";
export const send = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idLogged, body } = req;

    await sendEmailToUser(idLogged, body);

    return res.json({ message: "email successfully sent" });
  } catch (e) {
    next(e);
  }
};
