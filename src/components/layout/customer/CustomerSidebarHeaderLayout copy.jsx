import { Outlet } from "react-router-dom";
import CustomerSidebar from "./CustomerSidebar";
import CustomerHeader from "./CustomerHeader";

export default function CustomerSidebarHeaderLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <CustomerSidebar/>
      <main className="ml-[260px] flex flex-1 flex-col">
        <CustomerHeader />
        <Outlet />
      </main>
    </div>
  );
}
