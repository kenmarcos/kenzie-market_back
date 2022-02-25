import * as yup from "yup";

export const sendPassRecTokenSchema = yup.object().shape({
  email: yup.string().required(),
});

export const changePassSchema = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().required(),
  token: yup.string().required(),
});
