import { useAppSelector } from "@/redux/hooks";
import { useDebugValue } from "react";

const useAuth = () => {
  const authenticatedUser = useAppSelector((state) => state.auth.accessToken);
  useDebugValue(authenticatedUser, (authenticatedUser) =>
    authenticatedUser ? "logged in" : "logged out"
  );
  return authenticatedUser;
};

export default useAuth;
