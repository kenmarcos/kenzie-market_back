// import { getRepository } from "typeorm";
// import { transport, mailOptions } from "../services/email.service";
// import User from "../entities/User";
// import ErrorHandler from "../errors/errorHandler";

// interface SendEmailToUserBody {
//   to: string;
//   subject: string;
//   text: string;
// }

// export const sendEmailToUser = async (
//   from: string,
//   body: SendEmailToUserBody
// ) => {
//   const { to, subject, text } = body;

//   const userRepository = getRepository(User);
//   const user = await userRepository.findOne({ email: to });

//   if (!user) {
//     throw new ErrorHandler(400, "User not found");
//   }

//   const options = mailOptions(from, [to], subject, "emailToUser", {
//     name: user.name,
//     message: text,
//   });

//   transport.sendMail(options, (err, info) => {
//     if (err) {
//       throw new ErrorHandler(500, "Error while sending the email");
//     } else {
//       console.log(info);
//     }
//   });
// };
