// import { createTransport } from "nodemailer";

import { setApiKey } from "@sendgrid/mail";
import dotenvConfig from "../config/dotenvConfig";

dotenvConfig();

console.log(process.env.SEND_GRID_API_KEY);

// export const mailer = async (options) => {
//   //   Transporter
//   const transporter = createTransport({
//     host: "smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: "8475dbc7d86be1",
//       pass: "d30f321ba3d753",
//     },
//   });

//   //Options
//   try {
//     const mailoptions = {
//       from: `Praveen <${"praveen@gmail.com"}>`, // sender address
//       to: options.reciever, // list of receivers
//       subject: options.subject, // Subject line
//       text: options.textBody, // plain text body
//       html: options.htmlBody, // html body
//     };
//     //   Transporter Object
//     await transporter.sendMail(mailoptions);
//   } catch (error) {
//     throw new Error("Email Failed To send");
//   }
// };
