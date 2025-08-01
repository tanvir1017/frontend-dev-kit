import httpStatus, { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import env from "../../../../config/clean-env";

import AppError from "../../../../errors/appError";
import {
  hashPwd,
  validateEncryptedPassword,
} from "../../../../lib/utils/encryption";
import { UserRepository } from "../../user/repository/user.repository";
import { IOtpDecodedProps, TLoginUser } from "../interface/auth.interface";
import { AuthRepository } from "../repository/auth.repository";
import {
  createAccessToken,
  createRefreshToken,
  verifyToken,
} from "../utils/auth.utils";

// ** For every user login
const loginUser = async (payload: TLoginUser) => {
  const user = await UserRepository.getUserByMail(payload.email);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "user doesn't exist");
  }

  // if (!user.isVerified) {
  //   throw new AppError(
  //     StatusCodes.UNAUTHORIZED,
  //     "Please verify your email before login",
  //   );
  // }

  if (!(await validateEncryptedPassword(payload.password, user.password))) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      "Password and user doesn't match",
    );
  }

  const jwtPayload = {
    id: user.id,
    role: user.role,
  };

  const accessToken = createAccessToken(jwtPayload);

  const refreshToken = createRefreshToken(jwtPayload);

  return {
    accessToken,
    refreshToken,
  };
};

// ** Only for admin login
const loginAdmin = async (payload: TLoginUser) => {
  const user = await UserRepository.getUserByMail(payload.email);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, "You are not an admin!");
  }

  if (!user.isVerified) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      "Please verify your email before login",
    );
  }

  if (!(await validateEncryptedPassword(payload.password, user.password))) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      "Password and user doesn't match",
    );
  }

  const jwtPayload = {
    id: user.id,
    role: user.role,
  };

  const accessToken = createAccessToken(jwtPayload);

  const refreshToken = createRefreshToken(jwtPayload);

  return {
    accessToken,
    refreshToken,
  };
};

// ** Generating accessToken via refresh-token
const refreshTokenGenerate = async (token: string) => {
  if (!token) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Refresh token is missing. Please login !",
    );
  }
  const { id } = verifyToken(token, env.JWT_REFRESH_TOKEN as string);

  const user = await UserRepository.getUserById(id);

  //** check if user exists in DB by id
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "user doesn't exist");
  }

  const jwtPayload = {
    id: user.id,
    role: user.role,
  };
  const accessToken = createAccessToken(jwtPayload);

  return {
    accessToken,
  };
};

// ** Forget password functionality
// const forgetPassword = async (email: string) => {
//   // ? optional checking(which actually handled by zod)
//   // if (!email) {
//   //   throw new AppError(StatusCodes.BAD_REQUEST, "Email is required.");
//   // }

//   const user = await UserRepository.getUserByMail(email);

//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, "user doesn't exist");
//   }

//   const token = generatePasswordResetToken(user.id);

//   const statusOfEmailBeingSent = await sendEmail({
//     to: user.email,
//     subject: "Reset your password",
//     html: resetPasswordEmailTemplate(user.lastName, token),
//   });

//   if (!statusOfEmailBeingSent) {
//     throw new AppError(
//       StatusCodes.INTERNAL_SERVER_ERROR,
//       "Error sending email",
//     );
//   }

//   return {
//     message: "Password reset email sent successfully",
//   };
// };

// const forgetPasswordApp = async (email: string) => {
//   const user = await UserRepository.getUserByMail(email);

//   if (!user) {
//     throw new AppError(httpStatus.NOT_FOUND, "user doesn't exist");
//   }

//   // const isOtpExist = await AuthRepository.getOtpByEmail(user.email);

//   // ** Generate a otp
//   const { otp, token } = generateOTP(user.email);

//   // ** Save the otp in DB

//   const result = await prisma.oTP.upsert({
//     where: {
//       email: user.email,
//     },
//     update: {
//       otp: otp,
//       otpToken: token,
//     },
//     create: {
//       email: user.email,
//       otp: otp,
//       otpToken: token,
//       userId: user.id,
//     },
//   });

//   if (!result) {
//     throw new AppError(
//       StatusCodes.INTERNAL_SERVER_ERROR,
//       "Error up-inserting otp",
//     );
//   }

//   const statusOfEmailBeingSent = await sendEmail({
//     to: user.email,
//     subject: "Your OTP for password reset",
//     html: resetPwdOtp(user.lastName, otp),
//   });

//   if (!statusOfEmailBeingSent) {
//     throw new AppError(
//       StatusCodes.INTERNAL_SERVER_ERROR,
//       "Error sending email",
//     );
//   }

//   return {
//     otp,
//     message: "OTP sent successfully",
//   };
// };

// ** Reset password
const resetPassword = async (token: string, newPassword: string) => {
  // ** optionally checking, However, it will actually handled by zod in the middleware
  if (!token || !newPassword) {
    throw new AppError(400, "Token and new password are required");
  }

  const { id } = verifyToken(token, env.JWT_PASSWORD_RESET_TOKEN as string);

  // ** check if user exists in DB by id
  const user = await UserRepository.getUserById(id);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "user doesn't exist");
  }

  // ** Encrypting user password before saving into db
  const hashedPassword = await hashPwd(newPassword);

  const result = await AuthRepository.updateUserPasswordById({
    id,
    password: hashedPassword,
  });

  return result;
};

// ** Change password
// const changePassword = async (
//   newPassword: string,
//   currentPassword: string,
//   { role, id, iat }: JwtPayload,
// ) => {
//   /* //**🔐 Step 01: Check for valid Authorization header and extract token
//         --> 🚀Which(decoded current user) we already have in the --> ? req.user obj */

//   if (!id) {
//     throw new AppError(
//       StatusCodes.NOT_FOUND,
//       "Logged user information is missing!",
//     );
//   }

//   // ** Step 02: Fetch the user from DB ~ Anything related to the db will be handled by the repository module
//   const existingUser = await UserRepository.getUserByIdFromDB(id);

//   if (!existingUser) {
//     throw new AppError(StatusCodes.NOT_FOUND, "User not found");
//   }

//   // 🕒 Step 3: Verify token wasn't issued before last password change
//   if (existingUser.lastPasswordChangedAt) {
//     const lastPasswordChangedAtUnix =
//       new Date(existingUser.lastPasswordChangedAt).getTime() / 1000;

//     if ((iat as number) < lastPasswordChangedAtUnix) {
//       throw new AppError(
//         StatusCodes.UNAUTHORIZED,
//         "Token was issued before last password change",
//       );
//     }
//   }

//   // 🔑 Step 4: Validate current password
//   const isCurrentPasswordValid = await validateEncryptedPassword(
//     currentPassword,
//     existingUser.password,
//   );

//   if (!isCurrentPasswordValid) {
//     throw new AppError(StatusCodes.UNAUTHORIZED, "Incorrect current password");
//   }

//   // 🛠️ Step 5: TODO - Add password validation (length, complexity, etc.)
//   // Optional for now, but good to include in final implementation ❌

//   // 🔐 Step 6: Hash and update the new password
//   const newHashedPassword = await hashedPasswordBeforeSaveToDb(newPassword);

//   const updatedUser = await prisma.user.update({
//     where: { id },
//     data: {
//       password: newHashedPassword,
//       lastPasswordChangedAt: new Date(), // Save current UTC time
//     },
//   });

//   // 🎟️ Step 7: Create new access and refresh tokens
//   const jwtPayload = {
//     id: updatedUser.id,
//     role: updatedUser.role,
//   };

//   const newAccessToken = createAccessToken(jwtPayload);
//   const newRefreshToken = createRefreshToken(jwtPayload); // If you use different secrets/types, use `createRefreshToken()`

//   // 📦 Step 8: Return new tokens to replace old ones
//   return {
//     newAccessToken,
//     newRefreshToken,
//   };
// };

// ** Change password fro app
// const changePasswordFroApp = async (email: string, newPassword: string) => {
//   // ** Step 01: Fetch the user from DB ~ Anything related to the db will be handled by the repository module
//   const existingUser = await UserRepository.getUserByMail(email);

//   if (!existingUser) {
//     throw new AppError(StatusCodes.NOT_FOUND, "User not found");
//   }

//   console.log(newPassword);
//   // ** Step 02: Validate current password
//   const newHashedPassword = await hashPwd(newPassword);

//   const updatedUser = await prisma.user.update({
//     where: { email },
//     data: {
//       password: newHashedPassword,
//       lastPasswordChangedAt: new Date(), // Save current UTC time
//     },
//   });

//   // 🎟️ Step 3: Create new access and refresh tokens
//   const jwtPayload = {
//     id: updatedUser.id,
//     role: updatedUser.role,
//   };

//   const newAccessToken = createAccessToken(jwtPayload);
//   return newAccessToken;
// };

// ** Verify Email
const verifyEmail = async (token: string) => {
  const decoded = verifyToken(token, env.JWT_EMAIL_VERIFICATION_TOKEN);

  if (!decoded.email) {
    throw new AppError(StatusCodes.UNAUTHORIZED, "Token is invalid or expired");
  }

  const user = await UserRepository.getUserByMail(decoded.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "user doesn't exist");
  }

  // Verifying the mail by updating isVerified property
  const result = await AuthRepository.verifyEmail(decoded.email);

  return result;
};

// ** Verify OTP
const verifyOTPAndPwdChange = async (
  email: string,
  otp: number,
  newPwd: string,
) => {
  const user = await UserRepository.getUserByMail(email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "user doesn't exist");
  }

  const isTokenExist = await AuthRepository.getOtpByEmail(email);

  if (!isTokenExist) {
    throw new AppError(StatusCodes.NOT_FOUND, "No token found for this!");
  }

  // ** Verify the otp from db with the otp provided
  if (isTokenExist.otp !== otp) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid OTP");
  }

  // ** Decode the token by getting it from db
  const decoded = verifyToken(
    isTokenExist.otpToken,
    env.JWT_OTP_TOKEN,
  ) as IOtpDecodedProps;

  if (decoded.email !== email) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Invalid email");
  }

  // ** Encrypting user password before saving into db
  const hashedPassword = await hashPwd(newPwd);
  const result = await AuthRepository.updateUserPasswordById({
    id: user.id,
    password: hashedPassword,
  });

  if (!result) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong",
    );
  }

  return result;
};

// ** Resend Verification mail
// const resendVerifyEmail = async (email: string) => {
//   const result = await UserRepository.getUserByMail(email);

//   if (!result) {
//     throw new AppError(
//       StatusCodes.NOT_FOUND,
//       "User is not registered to the db!",
//     );
//   }

//   if (result.isVerified) {
//     throw new AppError(
//       StatusCodes.NOT_FOUND,
//       "user is already verified. Try to sign in!",
//     );
//   }

//   const generateAVerificationToken = generateEmailVerificationToken(
//     result.email,
//   );

//   // ? send the verification mail to the registered user
//   const emailStatus = await sendEmail({
//     to: result.email,
//     subject: "Verify your email",
//     html: mailVerificationEmailTemplate(
//       result.lastName,
//       generateAVerificationToken,
//     ),
//   });

//   if (!emailStatus) {
//     throw new AppError(
//       StatusCodes.INTERNAL_SERVER_ERROR,
//       "There was an error sending the email but user is created. Try to send another email via resend email route",
//     );
//   }

//   return emailStatus;
// };

// ** Get logged in user information from token
const getMeFromTheDB = async ({ id }: JwtPayload) => {
  if (!id) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "No, id found in the logged in user property",
    );
  }

  const isUserExist = await AuthRepository.getUserByIdWitPass(id);

  if (!isUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, "No user found on this ID! 🔴");
  }

  return isUserExist;
};

export const AuthServices = {
  loginAdmin,
  loginUser,
  refreshTokenGenerate,
  resetPassword,
  verifyEmail,
  getMeFromTheDB,
  verifyOTP: verifyOTPAndPwdChange,
};
