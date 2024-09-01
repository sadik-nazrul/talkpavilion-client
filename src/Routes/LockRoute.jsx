import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Loading from "../Components/Shared/Loading";

const LockRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <Loading />;
  if (user) {
    const from = location.state?.from?.pathname || "/dashboard"; // Check for the 'from' path
    return <Navigate to={from} replace />; // Redirect to the 'from' path if it exists
  }

  return children;
};

export default LockRoute;
