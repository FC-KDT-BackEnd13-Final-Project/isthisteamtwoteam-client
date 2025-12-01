import { useState } from "react";
import Icon from "./Icon";
import { useNavigate } from "react-router-dom";

export default function SideBar() {
  let navigate = useNavigate();

  const [activeMenu, setActiveMenu] = useState("대시보드");

  const menuItems = [
    {
      icon: "layout-dashboard",
      label: "대시보드",
      path: "/",
    },
    {
      icon: "bell",
      label: "알림",
      path: "/notification",
    },
    {
      icon: "clock",
      label: "승인 대기",
      path: "/request-pending",
    },
    {
      icon: "check-square",
      label: "체크리스트",
      path: "/checklist",
    },
    {
      icon: "users",
      label: "회원 관리",
      path: "/user-management",
    },
    {
      icon: "folder-open",
      label: "삭제한 프로젝트 관리",
      path: "/remove-projects",
    },
  ];

  const settingItems = [
    { icon: "settings", label: "비밀번호 변경", path: "/change-password" },
    { icon: "log-out", label: "로그아웃", path: "/login" },
  ];

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <aside className="w-[260px] bg-white border-r border-slate-200 fixed inset-y-0 overflow-y-auto flex flex-col">
      <div className="px-5 py-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
            <Icon name="user" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900">
              kimdong3021
            </h4>
            <p className="text-xs text-slate-500">관리자</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 py-5 space-y-6 flex flex-col">
        <div>
          <p className="px-5 mb-2 text-[11px] font-semibold text-slate-400 tracking-[0.08em] uppercase">
            GENERAL
          </p>
          <div className="space-y-1">
            {menuItems.map((item) => (
              <div
                key={item.label}
                onClick={() => {
                  setActiveMenu(item.label);
                  handleClick(item.path);
                }}
                className={`flex items-center gap-3 px-5 py-3 font-medium text-sm relative
                  ${
                    activeMenu === item.label
                      ? " bg-blue-50 text-blue-600"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                  }`}
              >
                {activeMenu === item.label && (
                  <span className="absolute left-0 top-0 h-full w-[3px] bg-blue-600" />
                )}
                <Icon name={item.icon} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto">
          <p className="px-5 mb-2 text-[11px] font-semibold text-slate-400 tracking-[0.08em] uppercase">
            SETTINGS
          </p>
          <div className="space-y-1">
            {settingItems.map((item) => (
              <div
                key={item.label}
                onClick={() => {
                  setActiveMenu(item.label);
                  handleClick(item.path);
                }}
                className={`flex items-center gap-3 px-5 py-3 font-medium text-sm relative
                  ${
                    activeMenu === item.label
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                  }`}
              >
                {activeMenu === item.label && (
                  <span className="absolute left-0 top-0 h-full w-[3px] bg-blue-600" />
                )}
                <Icon name={item.icon} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}
