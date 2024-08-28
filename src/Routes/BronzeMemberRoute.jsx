import { Navigate } from "react-router-dom";
import Loading from "../Components/Shared/Loading";
import useRole from "../Hooks/useRole";

const BronzeMemberRoute = ({ children }) => {
  const [role, isLoading] = useRole();
  if (isLoading) return <Loading />;
  if (role === "bronze") return children;
  return <Navigate to="/dashboard" />;
};

export default BronzeMemberRoute;
