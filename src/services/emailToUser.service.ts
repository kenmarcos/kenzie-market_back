import { getRepository } from "typeorm";
import { transport, mailOptions } from "../services/email.service";
import User from "../entities/User";
import ErrorHandler from "../errors/errorHandler";

interface SendEmailToUserBody {
  to: string[];
  subject: string;
  text: string;
}

export const sendEmailToUser = async (
  idLogged: string,
  body: SendEmailToUserBody
) => {
  const { to, subject, text } = body;

  const userRepository = getRepository(User);
  const userLogged = await userRepository.findOne(idLogged);

  if (!userLogged?.isAdm) {
    throw new ErrorHandler(401, "unauthorized");
  }

  const options = mailOptions(userLogged.email, to, subject, "emailToUser", {
    message: text,
    name: userLogged.name,
  });

  await transport
    .sendMail(options)
    .then(() => {
      console.log("Email sent with success!");
    })
    .catch((err) => {
      throw new ErrorHandler(500, "error while sending the email");
    });
};
