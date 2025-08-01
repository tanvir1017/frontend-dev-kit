export type TLoginUser = {
  email: string;
  password: string;
};
export type TPasswordChangeProperty = {
  oldPassword: string;
  newPassword: string;
};

export interface IOtpDecodedProps {
  email: string;
  otp: number;
  iat: number;
  exp: number;
}
