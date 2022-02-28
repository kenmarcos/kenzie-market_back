import * as yup from "yup";

export const emailToUserSchema = yup.object().shape({
  to: yup.array().required(),
  subject: yup.string().required(),
  text: yup.string().required(),
});
