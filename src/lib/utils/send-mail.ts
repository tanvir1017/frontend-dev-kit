import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import env from "../../config/cleanEnv";

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

export const sendEmail = async ({ to, subject, html }: EmailPayload) => {
  // Recommended transport configuration
  const transporter = nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: env.SMTP_PORT, // Typically 465 for SSL or 587 for STARTTLS
    secure: env.SMTP_PORT === 465, // True for 465, false for other ports
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASS,
    },
    tls: {
      // Force modern TLS version
      minVersion: "TLSv1.2",
      // Remove this in production after testing
      rejectUnauthorized: !env.isDev, // Only for testing! Remove in production
    },
  });

  try {
    const emailStatus: SMTPTransport.SentMessageInfo =
      await transporter.sendMail({
        from: env.SMTP_USER,
        to,
        subject,
        html,
      });

    return emailStatus.accepted.length > 0;
  } catch (error) {
    console.error("Email sending failed:", error);
    return false;
  }
};
