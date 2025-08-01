import { User } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import env from "../../../../config/clean-env";
import AppError from "../../../../errors/appError";
import { I_PaginationResponse } from "../../../../interface/common.interface";
import constructUrlAndImageUploaderUtil from "../../../../lib/utils/constructCloudinaryUrlAndUploadImage";
import { deleteSingleFile } from "../../../../lib/utils/deleteFile";
import { hashPwd } from "../../../../lib/utils/encryption";
import prisma from "../../../../lib/utils/prisma.utils";
import { verifyToken } from "../../auth/utils/auth.utils";
import { UserRepository } from "../repository/user.repository";

// ** Get all user from db ~ Only admin can see
const getAllUsersFromDb = async (
  query?: Record<string, any>,
): Promise<I_PaginationResponse<Omit<User, "password">[]>> => {
  const page = Number(query?.page) || 1;
  const limit = Number(query?.limit) || 10;
  const skip = Number(page - 1) * limit || 0;

  // Get the total count of orders (not limited by pagination)
  const totalCount = await UserRepository.getTotalUserCountFromDb();

  // Calculate totalPages for pagination
  const totalPages = Math.ceil(totalCount / limit);

  // getting only the verified users
  const result = await UserRepository.getAllUsersFromDbPagination(
    limit,
    skip,
    query!,
  );

  // pagination return data schema
  const paginationSchema = {
    meta: {
      totalCount,
      totalPages,
      page,
      limit,
    },
    result,
  };
  return paginationSchema;
};

// ** Get user by the emailId
const getUserFromDbByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
    omit: {
      password: true,
    },
  });
};

// ** Creating a user
const createUserIntoDB = async (payload: User) => {
  const payloadReplica = { ...payload };
  const { password: payloadPass, ...rest } = payloadReplica;

  // ** Hash password before saving it into db
  const hashedPass = await hashPwd(payloadPass);
  payloadReplica.password = hashedPass;

  const result = await UserRepository.createUser(payloadReplica);

  if (!result) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "There was an error creating the user",
    );
  }

  // ** -> generating the token for the e-mail verification
  /*   const generateAVerificationToken = generateEmailVerificationToken(
    payloadReplica.email,
  );
 */
  // ** send the verification mail to the registered user
  /* const emailStatus = await sendEmail({
    to: payloadReplica.email,
    subject: "Verify your email",
    html: mailVerificationEmailTemplate(
      payloadReplica.firstName,
      generateAVerificationToken,
    ),
  });

  if (!emailStatus) {
    console.log(
      "🐞 There is something happens during mail transport",
      emailStatus,
    );
  } */

  return result;
};

// ** Update user information like ~ Image upload
const updateUserFromDB = async (
  token: string,
  file: Express.Multer.File,
  payload: Partial<User>,
) => {
  // ? if token is not provided
  if (!token) {
    throw new AppError(StatusCodes.NOT_FOUND, "token not found");
  }
  const splittingToken = token.split(" ")[1];

  const { id } = verifyToken(splittingToken, env.JWT_ACCESS_TOKEN);

  // ? if req.user hasn't any id
  if (!id) {
    throw new AppError(StatusCodes.NOT_FOUND, "id not found");
  }

  // ? if req body includes nothing
  if (!Object.keys(payload).length && !Object.keys(file).length) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Request body is empty");
  }

  // ? if user want to change the email
  if (payload.email) {
    throw new AppError(StatusCodes.BAD_REQUEST, "You can't change the email");
  }
  const payloadReplica = { ...payload };

  if (file) {
    const userInfo = await UserRepository.getUserById(id);

    if (userInfo?.userImage) {
      await deleteSingleFile(userInfo.userImage);
    }

    // making a photo url
    const upload = await constructUrlAndImageUploaderUtil(file, "users");

    payloadReplica.userImage = upload;
  }

  const result = await UserRepository.updateUser(id, payloadReplica);

  return result;
};

// ** Delete user from db
const deleteUserFromDb = async (id: string) => {
  if (!id) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Id must be provided");
  }

  // TODO --> check if id exist on db or not
  const isIdExist = await UserRepository.getUserById(id);

  if (!isIdExist) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Unidentified user. User not exist",
    );
  }

  // TODO --> delete the user
  return await UserRepository.deleteUserById(id);
};

// ** change user role ~ only admin will be able to do this
// const changeRole = async (payload: Pick<User, "email" | "role">) => {
//   if (!payload.email) {
//     throw new AppError(StatusCodes.NOT_FOUND, "Id must be provided");
//   }

//   // TODO --> Finding user by email and their corresponding role ~ Admin | User
//   const result = await UserRepository.getUserByMailAndRole(payload.email);

//   if (!result) {
//     throw new AppError(
//       StatusCodes.NOT_FOUND,
//       "User not found or already an admin",
//     );
//   }

//   const updateUserRole = await UserRepository.updateUserRole(
//     payload.email,
//     payload.role,
//   );

//   if (!updateUserRole) {
//     throw new AppError(
//       StatusCodes.INTERNAL_SERVER_ERROR,
//       "Something went wrong during update process",
//     );
//   }

//   return updateUserRole;
// };

export const getUserById = async (id: string) => {
  if (!id) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Id must be provided");
  }
  // TODO --> check if id exist on db or not
  const isIdExist = await UserRepository.getUserByIdFromDB(id);
  if (!isIdExist) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Unidentified user. User not exist",
    );
  }

  return isIdExist;
};

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDb,
  updateUserFromDB,
  deleteUserFromDb,
  getUserById,
  getUserFromDbByEmail,
  //changeRole,
  // update user profile from db
  // createUserProfileFromDb,
  // updateUserProfileFromDb,
  // getUserProfileInfo,
};
