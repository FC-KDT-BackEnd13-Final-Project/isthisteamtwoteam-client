import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

export default function SidebarLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <SideBar />
      <main className="ml-[260px] flex flex-1 flex-col">
        <Outlet />
      </main>
    </div>
  );
}
