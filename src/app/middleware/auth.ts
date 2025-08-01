import { UserRole } from "@prisma/client";
import httpStatus, { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import env from "../../config/clean-env";
import AppError from "../../errors/appError";
import asyncHandler from "../../lib/utils/asyncHandler";
import prisma from "../../lib/utils/prisma.utils";
import { verifyToken } from "../modules/auth/utils/auth.utils";

export const authGuard = (...requiredRole: UserRole[]) =>
  asyncHandler(async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        "Authorization header missing",
      );
    }

    const token = authorization.split(" ")[1];

    // TODO => if token is available or not
    if (!token) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        "Token is missing from header",
      );
    }

    // TODO => Verify token
    const decoded = verifyToken(token, env.JWT_ACCESS_TOKEN);

    // TODO => check if token is valid or not
    const { role, id, iat } = decoded;

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    // TODO => check if user exists in DB by id
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "user doesn't exist");
    }

    // verify role for authorization
    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You are not authorized by this role!",
      );
    }

    // TODO => setting the decode value into JwtPayload
    req.user = decoded as JwtPayload;

    next();
  });
