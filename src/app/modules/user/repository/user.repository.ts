import { User, UserRole } from "@prisma/client";
import prisma from "../../../../lib/utils/prisma.utils";

// ** Get the user by mail address
const getUserByMail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

// ** Get the user by mail address and role
const getUserByMailAndRole = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
      role: "USER",
    },
    include: {
      _count: {
        select: {
          wishList: true,
        },
      },
    },
    omit: {
      password: true,
    },
  });
};

// ** Get the user by useId
const getUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      _count: {
        select: {
          wishList: true,
        },
      },
    },
    omit: {
      password: true,
    },
  });
};

const getUserByIdFromDB = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};

// ** Get the user total count
const getTotalUserCountFromDb = async () => {
  return await prisma.user.count();
};

// ** Get all users
const getAllUsersFromDbPagination = async (
  limit: number,
  skip: number,
  query: Record<string, any>,
) => {
  return await prisma.user.findMany({
    take: limit,
    skip,
    where: query,
    include: {
      _count: {
        select: {
          wishList: true,
        },
      },
    },
    omit: {
      password: true,
    },
  });
};

// ** Create a user
const createUser = async (payloadReplica: User) => {
  return await prisma.user.create({
    data: payloadReplica,
    omit: {
      password: true,
    },
  });
};

// ** Update the user info
const updateUser = async (id: string, payloadReplica: Partial<User>) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data: payloadReplica,
    omit: {
      password: true,
    },
  });
};

// ** Update the user role
const updateUserRole = async (email: string, role: UserRole) => {
  return await prisma.user.update({
    where: {
      email,
    },
    data: {
      role: role,
    },
    omit: {
      password: true,
    },
  });
};

// ** Delete the user by userId
const deleteUserById = async (id: string) => {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
};

/* // ** Get user profile information
const getUserProfileInformationById = async (userId: string) => {
  return await prisma.userProfile.findUnique({
    where: {
      userId,
    },
    include: {
      user: {
        omit: {
          password: true,
        },
      },
    },
  });
};

// ** Update user profile information
const createUserProfile = async (payload: UserProfile) => {
  return await prisma.userProfile.create({
    data: payload,
  });
};

// ** Update user profile information
const updateUserProfile = async (
  userId: string,
  payload: Omit<UserProfile, "userId">,
) => {
  return await prisma.userProfile.update({
    where: {
      userId,
    },
    data: payload,
    include: {
      user: {
        omit: {
          password: true,
        },
      },
    },
  });
};
 */
export const UserRepository = {
  createUser,
  updateUser,
  getUserByMail,
  getUserByMailAndRole,
  updateUserRole,
  getUserById,
  deleteUserById,
  getTotalUserCountFromDb,
  getAllUsersFromDbPagination,
  getUserByIdFromDB,
  /////////////////////// user profile ///////////////////////
  /* createUserProfile,
  updateUserProfile,
  getUserProfileInformationById, */
};
