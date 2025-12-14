import { Outlet } from "react-router-dom";
import DeveloperSidebar from "./DeveloperSidebar";
import DevleoperHeader from "./DeveloperHeader";

export default function DeveloperSidebarHeaderLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <DeveloperSidebar/>
      <main className="ml-[260px] flex flex-1 flex-col">
        <DevleoperHeader />
        <Outlet />
      </main>
    </div>
  );
}
