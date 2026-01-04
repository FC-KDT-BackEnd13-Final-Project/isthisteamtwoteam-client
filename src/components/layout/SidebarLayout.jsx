import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import CustomerSidebar from "./customer/CustomerSidebar";
import DeveloperSidebar from "./developer/DeveloperSidebar";
import { useAuth } from "../../context/AuthConext";
export default function SidebarLayout() {

  const { user, loading } = useAuth(); // 현재 로그인한 사용자 정보


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