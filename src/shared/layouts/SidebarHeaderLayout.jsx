import { Outlet } from "react-router-dom";
import Header from "../../widgets/header/ui/Header";
import Sidebar from "../../widgets/sidebar/ui/Sidebar";

export default function SidebarHeaderLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar />
      <main className="ml-[260px] flex flex-1 flex-col">
        <Header />
        <Outlet />
      </main>
    </div>
  );
}
