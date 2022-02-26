import { getRepository } from "typeorm";
import { User, Cart, Product } from "../entities";
import ErrorHandler from "../errors/errorHandler";

interface CreateProductBody {
  name: string;
  brand: string;
  price: number;
  description: string;
  stock: number;
}

export const createProduct = async (
  idLogged: string,
  body: CreateProductBody
) => {
  const userRepository = getRepository(User);
  const productRepository = getRepository(Product);

  const userLogged = await userRepository.findOne(idLogged);

  if (!userLogged?.isAdm) {
    throw new ErrorHandler(401, "unauthorized");
  }

  let isAvailable = true;
  if (body.stock === 0) {
    isAvailable = false;
  }

  const product = productRepository.create({ ...body, isAvailable });

  const newProduct = await productRepository.save(product);

  return newProduct;
};

export const listProducts = async () => {
  const productRepository = getRepository(Product);

  const products = await productRepository.find();

  return products;
};

export const findProduct = async (productId: string) => {
  const productRepository = getRepository(Product);

  const product = await productRepository.findOne(productId);

  if (!product) {
    throw new ErrorHandler(404, "product not found");
  }

  return product;
};
