import { useAuth } from "../../context/AuthConext";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>로딩 중...</div>;
  }

  // ✅ 로그인 안 된 경우 → /login 리다이렉트
  if (!user || !user.role) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // ✅ 권한이 없는 경우
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <div>접근 권한이 없습니다.</div>;
  }

  console.log("권한 :", user.role);

  return children;
}
