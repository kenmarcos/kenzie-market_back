import * as yup from "yup";

export const sendPassRecTokenSchema = yup.object().shape({
  email: yup.string().required("email is required"),
});

export const changePassSchema = yup.object().shape({
  email: yup.string().required("email is required"),
  newPassword: yup.string().required("password is required"),
  verificationCode: yup.string().required("token is required"),
});
