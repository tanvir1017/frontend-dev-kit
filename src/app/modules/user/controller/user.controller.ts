import httpStatus from "http-status-codes";
import asyncHandler from "../../../../lib/utils/asyncHandler";
import sendResponse from "../../../../lib/utils/sendResponse";
import { UserServices } from "../service/user.service";

// get single user
const getSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.getUserById(id);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "User is retrieved successfully",
    data: result,
  });
});

// get single user by mail
const getSingleUserByMail = asyncHandler(async (req, res) => {
  const { emailId } = req.params;
  const result = await UserServices.getUserFromDbByEmail(emailId);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "User is retrieved successfully",
    data: result,
  });
});

// ** User creation
const createUser = asyncHandler(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);

  sendResponse(res, {
    statuscode: httpStatus.CREATED,
    success: true,
    message:
      "User created successfully & we've sent you a verification email. Please check your inbox.",
    data: result,
  });
});

// ? update user
const updateUser = asyncHandler(async (req, res) => {
  const token = req.headers.authorization as string;
  const file = req.file as Express.Multer.File;

  const result = await UserServices.updateUserFromDB(token, file, req.body);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "User is update successfully",
    data: result,
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  await UserServices.deleteUserFromDb(id);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "User is deleted successfully",
    data: null,
  });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const result = await UserServices.getAllUsersFromDb(req.query);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: "users retrieve successfully", // returns a success message if the login is successful.
    data: result, // returns the validated user data or an error message if the login fails.
  });
});

const changeRole = asyncHandler(async (req, res) => {
  const result = await UserServices.changeRole(req.body);

  sendResponse(res, {
    statuscode: httpStatus.OK,
    success: true,
    message: `User role is changed to ${req.body.role} `,
    data: result,
  });
});

export const userControllers = {
  createUser,
  updateUser,
  getAllUsers,
  deleteUser,
  getSingleUser,
  getSingleUserByMail,
  changeRole,
};
