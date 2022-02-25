// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import { getRepository } from "typeorm";
// import User from "../entities/User";
// import ErrorHandler from "../errors/errorHandler";
// import { transport, mailOptions } from "./email.service";

// interface ChangePassBody {
//   email: string;
//   token: string;
//   password: string;
// }

// export const sendPassRecToken = async (email: string) => {
//   const userRepository = getRepository(User);
//   const user = await userRepository.findOne({ email: email });

//   if (!user) {
//     throw new ErrorHandler(404, "E-mail not found");
//   }

//   const recPassToken = jwt.sign({ user }, process.env.JWT_SECRET as string, {
//     expiresIn: 300,
//   });

//   user.recPassToken = recPassToken;

//   const options = mailOptions(
//     "no-reply@kenziemarket.com",
//     [email],
//     "Solicitação de recuperação de senha",
//     "recPAssToken",
//     {
//       name: user.name,
//       recPassToken: recPassToken,
//     }
//   );

//   transport.sendMail(options, (err, info) => {
//     if (err) {
//       throw new ErrorHandler(500, "Error while sending the email");
//     } else {
//       console.log(info);
//     }
//   });

//   await userRepository.save(user);
// };

// export const changePass = async (body: ChangePassBody) => {
//   const { email, password, token } = body;

//   const userRepository = getRepository(User);
//   const user = await userRepository.findOne({ email: email });

//   if (!user) {
//     throw new ErrorHandler(404, "E-mail not found");
//   }

//   if (token !== user.recPassToken) {
//     throw new ErrorHandler(403, "Invalid token");
//   }

//   user.password = bcrypt.hashSync(password, 10);
//   user.recPassToken = "";
//   await userRepository.save(user);
// };
