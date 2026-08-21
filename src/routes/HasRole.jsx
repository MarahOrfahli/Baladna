import { useAuthStore } from "../features/auth/";


const HasRole = ({ allowedRoles, children, fallback = null }) => {
  const { role, isAuthenticated } = useAuthStore()

  if (!isAuthenticated || !allowedRoles.includes(role)) return fallback; 
  return <>{children}</>;
};

export default HasRole;
