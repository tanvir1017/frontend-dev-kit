import { useAppSelector } from "@/redux/hooks";
import React from "react";
import { Navigate } from "react-router";

type TProtectedRoutesProps = {
  children: React.ReactNode;
};

const PublicRoutes = ({ children }: TProtectedRoutesProps) => {
  const isAuthenticated = useAppSelector((state) => state.auth.accessToken);
  if (isAuthenticated) {
    // Redirect to login page if user is not authenticated
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoutes;
