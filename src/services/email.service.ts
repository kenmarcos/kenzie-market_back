import nodemailer from "nodemailer";
import path from "path";
import hbs, {
  NodemailerExpressHandlebarsOptions,
} from "nodemailer-express-handlebars";
import dotenv from "dotenv";

dotenv.config();

// Configuração de nodemailer com mailtrap
// export const transport = nodemailer.createTransport({
//   host: "smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "process.env.MAILTRAP_USER",
//     pass: "process.env.MAILTRAP_PASSWORD",
//   },
// });

// Configuração de nodemailer com gmail
export const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const handlebarOption: NodemailerExpressHandlebarsOptions = {
  viewEngine: {
    partialsDir: path.resolve(__dirname, "..", "templates"),
    defaultLayout: undefined,
  },
  viewPath: path.resolve(__dirname, "..", "templates"),
};

transport.use("compile", hbs(handlebarOption));

export const mailOptions = (
  from: string,
  to: string[],
  subject: string,
  template: string,
  context: any
) => {
  return {
    from,
    to,
    subject,
    template,
    context,
  };
};
