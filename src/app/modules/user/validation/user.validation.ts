import { Gender, UserRole } from "@prisma/client";
import { z } from "zod";

// TODO --> user validation schema via zod
const createUserValidationSchema = z.object({
  body: z.object({
    firstName: z.string().min(1).max(20).trim(),
    lastName: z.string().max(20).trim().optional(),
    email: z.string().email().trim(),
    password: z
      .string({
        invalid_type_error: "password must be string",
      })
      .min(6, { message: "Password shouldn't be less then 6 characters" })
      .max(18, { message: "Password shouldn't be more than 18 characters" }),
    gender: z
      .enum([...Object.values(Gender)] as [string, ...string[]])
      .optional(),
  }),
});

// TODO --> update user validation schema
const updateUserValidationSchema = z.object({
  body: z.object({
    firstName: z.string().min(1).max(20).trim().optional(),
    lastName: z.string().max(20).trim().optional(),
    gender: z
      .enum([...Object.values(Gender)] as [string, ...string[]])
      .optional(),
  }),
});

// TODO --> update user role validation schema
const updateRoleValidationSchema = z.object({
  body: z.object({
    email: z.string().email().trim(),
    role: z.enum([...Object.values(UserRole)] as [string, ...string[]]),
  }),
});

export const UserSchemaValidation = {
  createUserValidationSchema,
  updateUserValidationSchema,
  updateRoleValidationSchema,
};
