import * as yup from "yup";

export const addProductToCartSchema = yup.object().shape({
  productId: yup.string().required("productId is required"),
});

export const removeProductFromCartSchema = yup.object().shape({
  cartId: yup.string().required("cartId is required"),
});
