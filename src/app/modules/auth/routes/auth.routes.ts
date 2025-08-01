import { Router } from "express";
import { authGuard } from "../../../middleware/auth";
import sanitizeClientDataViaZod from "../../../middleware/sanitizeClientDataViaZod";
import { AuthController } from "../controller/auth.controller";
import { ValidateAuthUserViaZOD } from "../validation/auth.validation";

const router = Router();

// _> Login route
router
  .route("/login")
  .post(
    sanitizeClientDataViaZod(ValidateAuthUserViaZOD.validateLoginUser),
    AuthController.login,
  );

// _> Login route for admin
router
  .route("/login-admin")
  .post(
    sanitizeClientDataViaZod(ValidateAuthUserViaZOD.validateLoginUser),
    AuthController.adminLogin,
  );

// _> Getting refresh token
router.route("/refresh-token").post(AuthController.refreshToken);

// router
//   .route("/reset-password-req")
//   .post(
//     sanitizeClientDataViaZod(ValidateAuthUserViaZOD.resetPasswordReqSchema),
//     AuthController.forgetPassword,
//   );

// router
//   .route("/forget-password")
//   .post(
//     sanitizeClientDataViaZod(ValidateAuthUserViaZOD.resetPasswordReqSchema),
//     AuthController.forgetPasswordForApp,
//   );

router
  .route("/verify-otp-and-pwd-change")
  .post(
    sanitizeClientDataViaZod(ValidateAuthUserViaZOD.verifyOtpSchema),
    AuthController.verifyOtpCtl,
  );

// router
//   .route("/change-pwd-app")
//   .post(
//     sanitizeClientDataViaZod(ValidateAuthUserViaZOD.changePwd),
//     AuthController.changePwd,
//   );

router
  .route("/reset-password")
  .post(
    sanitizeClientDataViaZod(ValidateAuthUserViaZOD.resetPasswordSchema),
    AuthController.resetPassword,
  );

// router
//   .route("/password-change")
//   .post(
//     authGuard("USER", "ADMIN"),
//     sanitizeClientDataViaZod(ValidateAuthUserViaZOD.passwordChangeSchema),
//     AuthController.passwordChange,
//   );

router.route("/verify-email").post(AuthController.verifyEmail);

// router
//   .route("/resend-verification-email")
//   .post(
//     sanitizeClientDataViaZod(ValidateAuthUserViaZOD.resendVerificationEmail),
//     AuthController.resendVerifyEmail,
//   );

// _> Logout
router.route("/logout").post(AuthController.logout);

// _> Get logged in profile information
router
  .route("/me")
  .get(authGuard("SUPER_ADMIN", "USER", "ADMIN"), AuthController.getMe);

export const authRoutes = router;
