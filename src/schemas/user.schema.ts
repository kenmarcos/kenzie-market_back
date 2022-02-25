import * as yup from "yup";

export const createUserSchema = yup.object().shape({
  name: yup.string().required("name is required"),
  cpf: yup
    .string()
    .required("cpf is required")
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "cpf format: XXX.XXX.XXX-XX"),
  email: yup
    .string()
    .email("invalid email format")
    .required("email is required"),
  phone: yup
    .string()
    .required("phone is required")
    .matches(
      /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}-?[0-9]{4}$/,
      "phone format: (XX)XXXXX-XXXX or (XX)XXXX-XXXX"
    ),
  isAdm: yup.boolean(),
  password: yup.string().required("password is required"),
});
