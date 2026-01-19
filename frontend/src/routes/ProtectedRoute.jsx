import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingScreen from "../pages/LoadingScreen";

const ProtectedRoute = ({ children }) => {
  const { user, authLoading } = useAuth();

  // Show loading while checking auth status
  if (authLoading) {
    return <LoadingScreen />;
  }

  // If not authenticated, redirect to login
  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
