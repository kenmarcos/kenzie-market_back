import bcrypt from "bcrypt";
import { getRepository } from "typeorm";
import User from "../entities/User";
import ErrorHandler from "../errors/errorHandler";
import jwt from "jsonwebtoken";

interface LoginBody {
  email: string;
  password: string;
}

export const createToken = async (body: LoginBody) => {
  const { email, password } = body;
  const userRepository = getRepository(User);

  const user = await userRepository
    .createQueryBuilder("user")
    .where("user.email = :email", { email: email })
    .addSelect("user.password")
    .getOne();

  if (!user) {
    throw new ErrorHandler(404, "User not found");
  } else if (!bcrypt.compareSync(password, user.password)) {
    throw new ErrorHandler(401, "Wrong password");
  }

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
    expiresIn: "24h",
  });

  return token;
};
