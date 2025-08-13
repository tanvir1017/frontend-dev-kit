import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export type ApiError = FetchBaseQueryError & {
  data: {
    success: boolean;
    message: string;
    errorSources?: { path: string; message: string }[];
    stack?: string;
  };
};
