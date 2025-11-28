import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans">
      <SideBar />
      <main className="flex-1 ml-[260px] flex flex-col">
        <Outlet />
      </main>
    </div>
  );
}
