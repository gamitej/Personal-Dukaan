import { Navigate, Outlet, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  isLoggedIn: boolean;
}

const ProtectedRoute = ({ isLoggedIn }: ProtectedRouteProps) => {
  const { pathname: currentPath } = useLocation();

  return !isLoggedIn ? (
    <Navigate to="/login" state={currentPath} replace />
  ) : (
    <Outlet />
  );
};

export default ProtectedRoute;
