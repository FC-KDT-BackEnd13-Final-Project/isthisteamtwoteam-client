import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Icon from "../common/icons/Icon";

export default function Sidebar() {
  let navigate = useNavigate();
  let location = useLocation();

  const [activeMenu, setActiveMenu] = useState("대시보드");

  const menuItems = [
    {
      icon: "layout-dashboard",
      label: "대시보드",
      path: "/",
    },
    {
      icon: "folder-open",
      label: "프로젝트",
      path: "/projects",
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
    { icon: "settings", label: "비밀번호 변경", path: "/user-management" },
    { icon: "log-out", label: "로그아웃", path: "/login" },
  ];

  const handleClick = (path) => {
    navigate(path);
  };

  // URL 경로가 변경될 때마다 활성 메뉴 업데이트
  useEffect(() => {
    const currentPath = location.pathname;

    // 모든 메뉴 아이템을 확인하여 현재 경로와 일치하는 메뉴 찾기
    const allItems = [...menuItems, ...settingItems];
    const currentItem = allItems.find((item) => item.path === currentPath);

    if (currentItem) {
      setActiveMenu(currentItem.label);
    }
  }, [location.pathname]);

  return (
    <aside className="fixed inset-y-0 flex w-[260px] flex-col overflow-y-auto border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white">
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

      <nav className="flex flex-1 flex-col space-y-6 py-5">
        <div>
          <p className="mb-2 px-5 text-[11px] font-semibold tracking-[0.08em] text-slate-400 uppercase">
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
                className={`relative flex items-center gap-3 px-5 py-3 text-sm font-medium cursor-pointer ${
                  activeMenu === item.label
                    ? " bg-blue-50 text-blue-600"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {activeMenu === item.label && (
                  <span className="absolute top-0 left-0 h-full w-[3px] bg-blue-600" />
                )}
                <Icon name={item.icon} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-auto">
          <p className="mb-2 px-5 text-[11px] font-semibold tracking-[0.08em] text-slate-400 uppercase">
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
                className={`relative flex items-center gap-3 px-5 py-3 text-sm font-medium cursor-pointer ${
                  activeMenu === item.label
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {activeMenu === item.label && (
                  <span className="absolute top-0 left-0 h-full w-[3px] bg-blue-600" />
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