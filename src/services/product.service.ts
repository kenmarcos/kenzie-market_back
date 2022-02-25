// import { getRepository } from "typeorm";
// import { Cart, Product } from "../entities";
// import ErrorHandler from "../errors/errorHandler";

// interface CreateProductBody {
//   name: string;
//   cpf: string;
//   email: string;
//   phone: string;
//   isAdm: boolean;
//   password: string;
// }

// export const createProduct = async (body: CreateProductBody) => {
//   const productRepository = getRepository(Product);
//   const product = productRepository.create({ ...body });
//   await productRepository.save(product);
//   const newproduct = await productRepository.findOne(product.id);
//   return newproduct;
// };

// export const listProducts = async () => {
//   const productRepository = getRepository(Product);
//   const products = await productRepository.find();
//   console.log(products);
//   return products;
// };

// export const retrieveProduct = async (productId: string) => {
//   const productRepository = getRepository(Product);
//   const product = await productRepository.findOne(productId);
//   if (!product) {
//     throw new ErrorHandler(404, "Product not found");
//   }
//   return product;
// };
