import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getRepository } from "typeorm";
import User from "../entities/User";
import ErrorHandler from "../errors/errorHandler";
import { transport, mailOptions } from "./email.service";

interface ChangePassBody {
  email: string;
  verificationCode: string;
  newPassword: string;
}

export const sendPassRecToken = async (body: { email: string }) => {
  const { email } = body;

  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ email });

  if (!user) {
    throw new ErrorHandler(404, "email not found");
  }

  const recPassToken = jwt.sign({ user }, process.env.JWT_SECRET as string, {
    expiresIn: "24h",
  });

  user.recPassToken = recPassToken;

  const options = mailOptions(
    "no-reply@kenziemarket.com",
    [email],
    "Solicitação de recuperação de senha",
    "recPAssToken",
    {
      name: user.name,
      recPassToken: recPassToken,
    }
  );

  transport.sendMail(options, (err, info) => {
    if (err) {
      throw new ErrorHandler(500, "error while sending the email");
    }
  });

  await userRepository.save(user);
};

export const changePass = async (body: ChangePassBody) => {
  const { email, newPassword, verificationCode } = body;

  const userRepository = getRepository(User);
  const user = await userRepository.findOne(
    { email: email },
    { select: ["id", "recPassToken"] }
  );

  if (!user) {
    throw new ErrorHandler(404, "email not found");
  }

  console.log(verificationCode !== user.recPassToken);

  if (verificationCode !== user.recPassToken) {
    throw new ErrorHandler(403, "invalid verification code");
  }

  user.password = bcrypt.hashSync(newPassword, 10);
  user.recPassToken = "";
  await userRepository.update(user.id, { ...user });
};
