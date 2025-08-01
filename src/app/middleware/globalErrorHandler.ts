import { Prisma } from "@prisma/client";
import { NextFunction, Response } from "express";
import { ZodError } from "zod";
import env from "../../config/clean-env";
import AppError from "../../errors/appError";
import {
  handleForeignKeyConstraintViolation,
  handlePrismaCastError,
  handlePrismaUniqueConstraintError,
  handlePrismaValidationError,
} from "../../errors/ORMSchemaError";
import handleZodError from "../../errors/zodError";
import { TErrorSource } from "../../interface/erros/error";

// TODO => Global error handler
const globalErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  __next: NextFunction,
) => {
  // Default sources
  let statuscode = 500;
  let message = "Something went wrong!";

  let errorSources: TErrorSource[] = [
    {
      path: "",
      message: "Something went wrong!",
    },
  ];

  // ? Handling ZOD related errors
  if (error instanceof ZodError) {
    const simplifyZodError = handleZodError(error);

    statuscode = simplifyZodError?.statusCode;
    message = simplifyZodError?.message;
    errorSources = simplifyZodError?.errorSources;
  }

  // ? Handling Prisma ORM related errors

  // ? handle prisma unique constraint error
  else if (error.code === "P2002") {
    const prismaError = handlePrismaUniqueConstraintError(error);

    statuscode = prismaError.statusCode;
    message = prismaError.message;
    errorSources = prismaError.errorSources;
  }
  // ? handle prisma validation error(schema error)
  else if (error instanceof Prisma.PrismaClientValidationError) {
    const simplifiedValidationError = handlePrismaValidationError(error);

    statuscode = simplifiedValidationError.statusCode;
    message = simplifiedValidationError.message;
    errorSources = simplifiedValidationError.errorSources;
  }

  // ? handle prisma cast error
  else if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2023"
  ) {
    const simplifyValidationError = handlePrismaCastError(error);

    statuscode = simplifyValidationError?.statusCode;
    message = simplifyValidationError?.message;
    errorSources = simplifyValidationError?.errorSources;
  }

  // ? handle prisma foreign key constraints error
  else if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2003"
  ) {
    const simplifyValidationError = handleForeignKeyConstraintViolation(error);

    statuscode = simplifyValidationError?.statusCode;
    message = simplifyValidationError?.message;
    errorSources = simplifyValidationError?.errorSources;
  }

  /* 🧪 PrismaClientInitializationError
  Prisma Client throws a PrismaClientInitializationError exception if something goes wrong when the query engine is started and the connection to the database is created. This happens either: */
  // 🖇️ ref: https://www.prisma.io/docs/orm/reference/error-reference#prismaclientinitializationerror
  else if (
    error instanceof Prisma.PrismaClientInitializationError
    // error.code === "P1001"
  ) {
    return {
      statusCode: 500,
      message: "Invalid database URL or connection string.",
      errorSources: [
        {
          path: "",
          message:
            "Can't reach database server at <database_host>:<database_port> Please make sure your database server is running at <database_host>:<database_port>",
        },
      ],
    };
  }

  // ? handle Global AppError thrown by the code
  else if (error instanceof AppError) {
    statuscode = error?.statusCode;
    message = error?.message;
    errorSources = [
      {
        path: "",
        message: error?.message,
      },
    ];
  } else if (error instanceof Error) {
    statuscode;
    message = error?.message;
    errorSources = [
      {
        path: "",
        message: error?.message,
      },
    ];
  }

  return res.status(statuscode).json({
    success: false,
    message,
    errorSources,
    //error,
    stack: env.isProd ? null : error?.stack, // is env === dev then it will print error
  });
};

export default globalErrorHandler;
