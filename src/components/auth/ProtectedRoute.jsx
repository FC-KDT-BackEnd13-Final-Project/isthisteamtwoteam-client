import { useAuth } from "../../context/AuthConext";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (!user || !user.role) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // navigate() 대신 Navigate 컴포넌트 반환
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  console.log("권한 :", user.role);

  return children;
}