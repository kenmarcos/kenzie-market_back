import * as yup from "yup";

export const createUserSchema = yup.object().shape({
  name: yup.string().required(),
  cpf: yup
    .string()
    .required()
    .matches(
      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
      "Required cpf format: XXX.XXX.XXX-XX"
    ),
  email: yup.string().email("Invalid email").required(),
  phone: yup
    .string()
    .required()
    .matches(
      /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}-?[0-9]{4}$/,
      "Required phone format: (XX)XXXXX-XXXX or (XX)XXXX-XXXX"
    ),
  isAdm: yup.boolean().required(),
  password: yup.string().required(),
});
