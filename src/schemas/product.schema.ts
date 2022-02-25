import * as yup from "yup";

export const createProductSchema = yup.object().shape({
  name: yup.string().required(),
  brand: yup.string().required(),
  price: yup.number().required(),
  description: yup.string().required(),
});
