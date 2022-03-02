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

  const user = await userRepository.findOne({
    where: { email },
    select: ["id", "password"],
  });

  if (!user) {
    throw new ErrorHandler(404, "user not found");
  } else if (!bcrypt.compareSync(password, user.password)) {
    throw new ErrorHandler(401, "wrong password");
  }

  const token = jwt.sign(
    { idLogged: user.id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "24h",
    }
  );

  return token;
};
