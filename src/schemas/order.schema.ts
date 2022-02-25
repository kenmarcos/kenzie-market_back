import * as yup from "yup";

export const buySchema = yup.object().shape({
  cartId: yup.string().required(),
});
