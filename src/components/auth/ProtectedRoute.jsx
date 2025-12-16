import { useAuth } from "../../context/AuthConext";
import { Navigate } from 'react-router-dom';


export default function ProtectedRoute({children, allowedRoles}){
    const {user, loading} = useAuth();

    if (loading) {
        return <div>로딩 중...</div>;
    }



    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <div>접근 권한이 없습니다.</div>;
  }

  console.log("권한 :" , user.role)

  return children;
}

