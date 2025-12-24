import Icon from "../../common/icons/Icon";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getLoginUserInfo, logout } from "../../../utils/config/api/usersApi";

export default function CustomerSidebar() {
  let navigate = useNavigate();
  let location = useLocation();

  const [activeMenu, setActiveMenu] = useState("대시보드");
  const [loginUserInfo, setLoginUserInfo] = useState(null);


  const menuItems = [
    {
      icon: "layout-dashboard",
      label: "대시보드",
      path: "/customer/dashboard",
    },
    {
      icon: "folder-open",
      label: "프로젝트",
      path: "/customer/projects",
    },
    {
      icon: "clock",
      label: "승인 대기",
      path: "/customer/request-pending",
    }

  ];

  const settingItems = [
    { icon: "settings", label: "비밀번호 변경", path: "/customer/change-password" },
    { icon: "log-out", label: "로그아웃", path: "/login" },
  ];

  const handleClick = (path) => {
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login"); // 로그인 페이지 이동
    } catch (error) {
      console.error("로그아웃 실패:", error);
      alert("로그아웃에 실패했습니다.");
    }
  };

  const handleLoginUserInfo = async () => {
    const response = await getLoginUserInfo();
    console.log("로그인 유저 응답:", response);
    setLoginUserInfo(response);

  }

  // URL 경로가 변경될 때마다 활성 메뉴 업데이트
  useEffect(() => {
    const currentPath = location.pathname;
    handleLoginUserInfo();
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
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white overflow-hidden">
            {loginUserInfo?.profileImg ? (
              <img 
                src={loginUserInfo.profileImg} 
                alt="프로필" 
                className="h-full w-full object-cover"
              />
            ) : (
              <Icon name="user" />
            )}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900">
              {loginUserInfo ? loginUserInfo.name : ""}
            </h4>
            <p className="text-xs text-slate-500">
              {}
            </p>
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

                  if (item.label === "로그아웃") {
                    handleLogout();
                    return;
                  }
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