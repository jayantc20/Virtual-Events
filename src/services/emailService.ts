import nodemailer, { Transporter } from "nodemailer";
import config from "config";

interface EmailConfig {
  host: string;
  port: number;
  user: string;
  pass: string;
}

const emailConfig: EmailConfig = config.get("email");

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
}

const transporter: Transporter = nodemailer.createTransport({
  host: emailConfig.host,
  port: emailConfig.port,
  auth: {
    user: emailConfig.user,
    pass: emailConfig.pass,
  },
  authMethod: "PLAIN",
  secure: false,
  tls: {
    ciphers: "SSLv3",
  },
});

export const sendEmail = async (options: EmailOptions): Promise<void> => {
  try {
    await transporter.sendMail({
      from: emailConfig.user,
      to: options.to,
      subject: options.subject,
      text: options.text,
    });
    console.log(`Email sent to ${options.to}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

export default sendEmail;
