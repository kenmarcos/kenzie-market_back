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
    const cartRepository = getRepository(Cart);

    const user = userRepository.create({ ...body });

    await userRepository.save(user);

    const newUser = await userRepository.findOne(user.id);

    if (!newUser) {
      throw new ErrorHandler(404, "User not found");
    }

    const cart = cartRepository.create({ owner: newUser });

    await cartRepository.save(cart);

    return newUser;
  } catch (e) {
    throw new ErrorHandler(400, (e as any).detail);
  }
};

export const listUsers = async (idLogged: string) => {
  const userRepository = getRepository(User);

  const userLogged = await userRepository.findOne(idLogged);

  if (!userLogged?.isAdm) {
    throw new ErrorHandler(401, "unauthorized");
  }

  const users = await userRepository.find();

  return users;
};

export const findUser = async (idLogged: string, userId: string) => {
  const userRepository = getRepository(User);

  const userLogged = await userRepository.findOne(idLogged);

  if (!userLogged?.isAdm && idLogged !== userId) {
    throw new ErrorHandler(401, "missing admin permission");
  }

  const user = await userRepository.findOne(userId);

  return user;
};
