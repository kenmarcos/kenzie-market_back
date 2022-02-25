import nodemailer from "nodemailer";
import path from "path";
import hbs, {
  NodemailerExpressHandlebarsOptions,
} from "nodemailer-express-handlebars";

export const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "0c885d9016545e",
    pass: "2b117da1fea5ba",
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
