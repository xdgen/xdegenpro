import React from "react";
import { Navigate, Outlet} from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Checking auth...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

