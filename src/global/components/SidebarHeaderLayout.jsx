import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";

export default function SidebarHeaderLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans">
      <SideBar />
      <main className="flex-1 ml-[260px] flex flex-col">
        <Header />
        <Outlet />
      </main>
    </div>
  );
}
