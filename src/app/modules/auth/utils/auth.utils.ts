import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import env from "../../../../config/clean-env";
import AppError from "../../../../errors/appError";

// ** Generate the access token
export const createAccessToken = (jwtPayload: JwtPayload) => {
  return jwt.sign(jwtPayload, env.JWT_ACCESS_TOKEN as string, {
    expiresIn: env.JWT_ACCESS_EXPIRES_IN as any,
  });
};

// ** Generate the refresh token
export const createRefreshToken = (jwtPayload: JwtPayload) => {
  return jwt.sign(jwtPayload, env.JWT_REFRESH_TOKEN as string, {
    expiresIn: env.JWT_REFRESH_EXPIRES_IN as any,
  });
};

// ** Generate the password reset token
export const generatePasswordResetToken = (jwtPayload: string) => {
  return jwt.sign({ id: jwtPayload }, env.JWT_PASSWORD_RESET_TOKEN, {
    expiresIn: env.JWT_PASSWORD_RESET_EXPIRES_IN as any,
  });
};

// ** Generate the otp
export const generateOTP = (email: string) => {
  const otp = Math.ceil(Math.round(Math.random() * 10000));
  const token = jwt.sign({ email, otp }, env.JWT_OTP_TOKEN, {
    expiresIn: env.JWT_OTP_EXPIRES_IN as any,
  });
  return {
    token,
    otp,
  };
};

// ** Verifying the token
export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};

// ** setting access token
export const setAccessToken = async (res: Response, token: string) => {
  return res.cookie("accessToken", token, {
    httpOnly: true, // Only accessible through HTTP requests, not client-side JS
    secure: process.env.NODE_ENV === "production", // Secure cookies only in production (requires HTTPS)
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // Adjust SameSite based on environment
    maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    // domain: process.env.NODE_ENV === "production" ? "" : undefined, // Set domain only in production

    // For development across ports
    path: "/",
  });
};

// ** setting refresh token
export const setRefreshToken = async (res: Response, token: string) => {
  return res.cookie("refreshToken", token, {
    httpOnly: true, // Only accessible through HTTP requests, not client-side JS
    secure: process.env.NODE_ENV === "production", // Secure cookies only in production (requires HTTPS)
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // Adjust SameSite based on environment
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in milliseconds
    // domain:
    //   process.env.NODE_ENV === "production"
    //     ? ".chancecollective.com.au"
    //     : undefined, // Set domain only in production

    // For development across ports
    path: "/",
  });
};

// ** reset access token
export const resetAccessToken = async (req: Request, res: Response) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    throw new AppError(StatusCodes.NOT_FOUND, "There is nothing to logout");
  }

  return res.clearCookie("accessToken", {
    secure: process.env.NODE_ENV === "production", // Secure cookies only in production (requires HTTPS)
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // Adjust SameSite based on environment
    // domain:
    //   process.env.NODE_ENV === "production"
    //     ? ".chancecollective.com.au"
    //     : undefined, // Set domain only in production
    // For development across ports
    path: "/",
  });
};

// ** reset refresh token
export const resetRefreshToken = async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new AppError(StatusCodes.NOT_FOUND, "There is nothing to logout");
  }

  return res.clearCookie("refreshToken", {
    secure: process.env.NODE_ENV === "production", // Secure cookies only in production (requires HTTPS)
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // Adjust SameSite based on environment
    // domain:
    //   process.env.NODE_ENV === "production"
    //     ? ".chancecollective.com.au"
    //     : undefined, // Set domain only in production
    // For development across ports
    path: "/",
  });
};
