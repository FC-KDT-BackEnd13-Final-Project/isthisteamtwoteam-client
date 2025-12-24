import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import CustomerSidebar from "./customer/CustomerSidebar";
import DeveloperSidebar from "./developer/DeveloperSidebar";
import { useAuth } from "../../context/AuthConext";
export default function SidebarLayout() {

  const { user, loading } = useAuth(); // 현재 로그인한 사용자 정보

  // 로딩 중일 때 로딩 UI 표시
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-slate-600">로딩 중...</p>
        </div>
      </div>
    );
  }


  if (!user) {
    return null; 
  }

  console.log("현재 사용자 역할:", user.role);
  
  const renderSidebar = () => {
    switch (user.role) {
      case "ADMIN":
        return <Sidebar />;
      case "CUSTOMER":
        return <CustomerSidebar />;
      case "DEVELOPER":
        return <DeveloperSidebar />;
      default:
        return <Sidebar />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      {renderSidebar()}
      <main className="ml-[260px] flex flex-1 flex-col">
        <Outlet />
      </main>
    </div>
  );
}