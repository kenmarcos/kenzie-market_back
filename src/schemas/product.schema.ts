import * as yup from "yup";

export const createProductSchema = yup.object().shape({
  name: yup.string().required("name is required"),
  brand: yup.string().required("brand is required"),
  price: yup.number().required("price is required"),
  description: yup.string().required("description is required"),
  stock: yup.number().required("stock is required"),
});
