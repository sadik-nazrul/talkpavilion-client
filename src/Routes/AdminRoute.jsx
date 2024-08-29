import React from "react";
import useRole from "../Hooks/useRole";
import Loading from "../Components/Shared/Loading";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  const admin = role === "admin";
  if (isLoading) return <Loading />;
  if (admin) return children;

  return <Navigate to="/dashboard" />;
};

export default AdminRoute;
