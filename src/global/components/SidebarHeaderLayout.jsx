import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";

export default function SidebarHeaderLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <SideBar />
      <main className="ml-[260px] flex flex-1 flex-col">
        <Header />
        <Outlet />
      </main>
    </div>
  );
}
