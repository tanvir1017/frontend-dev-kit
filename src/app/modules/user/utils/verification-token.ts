import jwt from "jsonwebtoken";
import env from "../../../../config/cleanEnv";
export const generateEmailVerificationToken = (jwtPayload: string) => {
  return jwt.sign({ email: jwtPayload }, env.JWT_EMAIL_VERIFICATION_TOKEN, {
    // expiresIn: env.JWT_EMAIL_VERIFICATION_EXPIRES_IN,
    expiresIn: "1h",
  });
};
