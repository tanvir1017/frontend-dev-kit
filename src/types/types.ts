type TName = {
  firstName: string;
  lastName: string;
  _id: string;
};

export type TUser = {
  _id: string;
  name: TName;
  email: string;
  role: "trainer" | "admin" | "trainee"; // Assuming other roles exist
  profileImg: string;
  gender: "male" | "female" | "other";
  isDeleted: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
};

export type TResponseUsers = {
  success: string;
  message: string;
  data: TUser[];
};

export type ApiResponse = {
  success: boolean;
  message: string;
  data: TUser;
};
