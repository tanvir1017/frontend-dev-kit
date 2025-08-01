import statusCode from "http-status-codes";
import asyncHandler from "../../../../lib/utils/asyncHandler";
import sendResponse from "../../../../lib/utils/sendResponse";
import { AuthServices } from "../service/auth.service";
import {
  resetAccessToken,
  resetRefreshToken,
  setAccessToken,
  setRefreshToken,
} from "../utils/auth.utils";

// ** Login user
const login = asyncHandler(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);

  const { refreshToken, accessToken } = result;

  setRefreshToken(res, refreshToken);
  setAccessToken(res, accessToken);

  sendResponse(res, {
    statuscode: statusCode.OK,
    success: true,
    message: "User logged in successfully", // returns a success message if the login is successful.
    data: { accessToken }, // returns the validated user data or an error message if the login fails.
  });
});

// ** Admin should login in different path
const adminLogin = asyncHandler(async (req, res) => {
  const result = await AuthServices.loginAdmin(req.body);

  const { refreshToken, accessToken } = result;

  setRefreshToken(res, refreshToken);
  setAccessToken(res, accessToken);

  sendResponse(res, {
    statuscode: statusCode.OK,
    success: true,
    message: "User logged in successfully", // returns a success message if the login is successful.
    data: { accessToken }, // returns the validated user data or an error message if the login fails.
  });
});

// ** Refresh token
const refreshToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;

  const { accessToken } = await AuthServices.refreshTokenGenerate(refreshToken);

  setAccessToken(res, accessToken);

  sendResponse(res, {
    statuscode: statusCode.CREATED,
    success: true,
    message: "Access token retrieve successfully",
    data: { accessToken },
  });
});

// ** Forget password
// const forgetPassword = asyncHandler(async (req, res) => {
//   const { email } = req.body;
//   const { message } = await AuthServices.forgetPassword(email);

//   sendResponse(res, {
//     statuscode: statusCode.OK,
//     success: true,
//     message, // returns a success message if the login is successful.
//     data: null,
//   });
// });

// const forgetPasswordForApp = asyncHandler(async (req, res) => {
//   const { email } = req.body;
//   const { message } = await AuthServices.forgetPasswordApp(email);

//   sendResponse(res, {
//     statuscode: statusCode.OK,
//     success: true,
//     message, // returns a success message if the login is successful.
//     data: null,
//   });
// });

// ** Reset Password
const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword } = req.body;

  await AuthServices.resetPassword(token, newPassword);

  sendResponse(res, {
    statuscode: statusCode.OK,
    success: true,
    message: "Password has been reset successfully",
    data: null,
  });
});

// ** Change Password
// const passwordChange = asyncHandler(async (req, res) => {
//   const loggedInUser = req.user; //? userId is available in req.user after JWT validation
//   const { newPassword, currentPassword } = req.body;

//   const { newAccessToken, newRefreshToken } = await AuthServices.changePassword(
//     newPassword,
//     currentPassword,
//     loggedInUser,
//   );

//   setRefreshToken(res, newRefreshToken);

//   sendResponse(res, {
//     statuscode: statusCode.OK,
//     success: true,
//     message: "Password updated successfully",
//     data: {
//       accessToken: newAccessToken,
//     },
//   });
// });

// ** Change Password for app
// const changePwd = asyncHandler(async (req, res) => {
//   const { newPwd: newPassword, email } = req.body as typeof req.body & {
//     newPassword: string;
//     email: string;
//   };

//   console.log(newPassword);

//   const result = await AuthServices.changePasswordFroApp(email, newPassword);

//   sendResponse(res, {
//     statuscode: statusCode.OK,
//     success: true,
//     message: "Password updated successfully",
//     data: result,
//   });
// });

// ** verify email
const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.query;
  const result = await AuthServices.verifyEmail(token as string);

  sendResponse(res, {
    statuscode: statusCode.OK,
    success: true,
    message: "Email verified successfully",
    data: result,
  });
});

// ** Verify otp
const verifyOtpCtl = asyncHandler(async (req, res) => {
  const { email, otp, newPwd } = req.body as typeof req.body & {
    email: string;
    otp: number;
    newPwd: string;
  };

  const result = await AuthServices.verifyOTP(email, otp, newPwd);

  sendResponse(res, {
    statuscode: statusCode.OK,
    success: true,
    message: "OTP verified successfully",
    data: result,
  });
});

// ** resend verify email
// const resendVerifyEmail = asyncHandler(async (req, res) => {
//   const { email } = req.body;
//   const result = await AuthServices.resendVerifyEmail(email);

//   sendResponse(res, {
//     statuscode: statusCode.OK,
//     success: true,
//     message:
//       "✅ Verification email sent! 📬 Please check your inbox or spam folder to complete the process.",
//     data: result,
//   });
// });

// ** Logout user
const logout = asyncHandler(async (req, res) => {
  await resetRefreshToken(req, res);
  await resetAccessToken(req, res);

  sendResponse(res, {
    statuscode: statusCode.OK,
    success: true,
    message: "User logged out successfully",
    data: null,
  });
});

// ** Get me user
const getMe = asyncHandler(async (req, res) => {
  const user = req.user;

  const result = await AuthServices.getMeFromTheDB(user);
  sendResponse(res, {
    statuscode: statusCode.OK,
    success: true,
    message: "I've found you!! 🎉🎉",
    data: result,
  });
});

export const AuthController = {
  login,
  adminLogin,
  logout,
  refreshToken,
  resetPassword,
  verifyEmail,
  // forgetPassword,
  // changePwd,
  // passwordChange,
  // forgetPasswordForApp,
  // resendVerifyEmail,
  getMe,
  verifyOtpCtl,
};
