import React, { useContext } from "react";
import { AuthContext } from "../state/AuthContext";
import { Navigate, Outlet } from "react-router";

const ProtectedRoutes = () => {
  const { user, isLoading } = useContext(AuthContext);
  if (isLoading) {
    return <h1>Loading data, please wait....</h1>;
  }
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;
