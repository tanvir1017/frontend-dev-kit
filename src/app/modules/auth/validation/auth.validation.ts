import z from "zod";

const validateLoginUser = z.object({
  body: z.object({
    email: z.string({ required_error: "email must be provided" }),
    password: z.string({ required_error: "password must be provided" }),
  }),
});

const resetPasswordReqSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "email must be provided" }).email({
      message: "email must be a valid email address",
    }),
  }),
});

// ** verify otp
const verifyOtpSchema = z.object({
  body: z.object({
    email: z.string({ required_error: "email must be provided" }).email({
      message: "email must be a valid email address",
    }),
    otp: z
      .number({
        required_error: "OTP must be provided",
        invalid_type_error: "OTP must be a number",
      })
      .int()
      .gte(1000, { message: "OTP must be a 4-digit number" })
      .lte(9999, { message: "OTP must be a 4-digit number" }),
    newPwd: z.string({
      required_error: "New password must be provided",
    }),
  }),
});

const resetPasswordSchema = z.object({
  body: z.object({
    newPassword: z.string({ required_error: "New password must be provided" }),
    token: z.string({ required_error: "token must be provided" }),
  }),
});

const passwordChangeSchema = z.object({
  body: z.object({
    newPassword: z.string({ required_error: "New password must be provided" }),
    currentPassword: z.string({
      required_error: "Current password must be provided",
    }),
  }),
});

const changePwd = z.object({
  body: z.object({
    newPwd: z.string({ required_error: "New pwd must be provided" }),
    email: z
      .string({
        required_error: "Email must be provided for change password",
      })
      .email(),
  }),
});

const resendVerificationEmail = z.object({
  body: z.object({
    email: z
      .string({
        required_error:
          "Email must be provided for resend the verification email",
      })
      .email(),
  }),
});

export const ValidateAuthUserViaZOD = {
  validateLoginUser,
  resetPasswordReqSchema,
  resetPasswordSchema,
  passwordChangeSchema,
  resendVerificationEmail,
  verifyOtpSchema,
  changePwd,
};
