import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../features/auth";

export const RoleProtectedRoute = ({ allowedRoles }) => {
  const { isAuthenticated, role } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  return <Outlet />;
};

export const AuthGuard = () => {
  const { isAuthenticated, role } = useAuthStore();

  if (isAuthenticated) {
    if (role) {
      if (role == "admin" || role == "employee")
        return <Navigate to="/dashboard" replace />;
      else return <Navigate to="/" replace />;
    } else return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
