import { getRepository } from "typeorm";
import { Cart, User } from "../entities";
import ErrorHandler from "../errors/errorHandler";

interface CreateUserBody {
  name: string;
  cpf: string;
  email: string;
  phone: string;
  isAdm: boolean;
  password: string;
}

export const createUser = async (body: CreateUserBody) => {
  try {
    const userRepository = getRepository(User);
    const user = userRepository.create({ ...body });
    await userRepository.save(user);
    const newUser = await userRepository.findOne(user.id);

    if (!newUser) {
      throw new ErrorHandler(404, "User not found");
    }

    const cartRepository = getRepository(Cart);
    const newCart = new Cart();
    newCart.user = newUser;
    await cartRepository.save(newCart);

    return newUser;
  } catch (e) {
    if ((e as any).code === "23505") {
      throw new ErrorHandler(409, (e as any).detail);
    }
  }
};

export const listUsers = async () => {
  const userRepository = getRepository(User);
  const users = await userRepository.find();
  return users;
};

export const retrieveUser = async (userId: string) => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({
    where: { id: userId },
    relations: ["cart"],
  });
  if (!user) {
    throw new ErrorHandler(404, "User not found");
  }
  return user;
};
