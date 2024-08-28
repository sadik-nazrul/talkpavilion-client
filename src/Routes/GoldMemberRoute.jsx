import React from "react";
import useRole from "../Hooks/useRole";
import Loading from "../Components/Shared/Loading";
import { Navigate } from "react-router-dom";

const GoldMemberRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  if (isLoading) return <Loading />;
  if (role === "gold") return children;
  return <Navigate to="/dashboard" />;
};

export default GoldMemberRoute;
