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
    if (role == "admin" || role == "employee") return <Navigate to="/dashboard" replace />;
      else if (role == "citizen") return <Navigate to="/my-account" replace />;
  }

  return <Outlet />;
};

export const AuthAdminGuard = () => {
  const { isAuthenticated, role } = useAuthStore();

  if (isAuthenticated) {
    if (role == "citizen") return <Navigate to="/my-account" replace />;
  }

  return <Outlet />;
};

export const AuthRoleGuard = () => {
  const { isAuthenticated } = useAuthStore();
  if (!isAuthenticated) <Navigate to="/" replace />;
  return <Outlet />;
};