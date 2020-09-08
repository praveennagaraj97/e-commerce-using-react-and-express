import { createTransport } from "nodemailer";
import dotenvConfig from "../config/dotenvConfig";

dotenvConfig();

export class Mailer {
  constructor(reciever) {
    this.from = `${process.env.SENDER_NAME} <${process.env.SENDER_EMAIL}>`;
    this.to = reciever.to;
    this.subject = reciever.subject;
    this.html = reciever.html;
  }

  createTransporter() {
    // return createTransport({
    //   host: "smtp.mailtrap.io",
    //   port: 2525,
    //   auth: {
    //     user: "8475dbc7d86be1",
    //     pass: "d30f321ba3d753",
    //   },
    // });
    return createTransport({
      service: "SendGrid",
      auth: {
        user: process.env.SEND_GRID_USER,
        pass: process.env.SEND_GRID_PASSWORD,
      },
    });
  }

  async sendEmail() {
    return this.createTransporter().sendMail({
      from: this.from, // sender address
      to: this.to, // list of receivers
      subject: this.subject, // Subject line
      html: this.html, // html body
    });
  }
}
