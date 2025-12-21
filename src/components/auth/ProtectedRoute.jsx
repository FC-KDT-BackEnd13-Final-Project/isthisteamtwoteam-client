import { useAuth } from "../../context/AuthConext";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

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

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    navigate("/login");

  }

  console.log("권한 :", user.role);

  return children;
}
