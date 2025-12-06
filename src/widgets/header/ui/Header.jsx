import { useState } from "react";
import Icon from "../../../shared/ui/Icon/Icon";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [activeMainTab, setActiveMainTab] = useState("checklist");
  const navigate = useNavigate();

  const tabs = [
    { id: "pending", label: "승인 대기", badge: 5, icon: "clock" },
    { id: "checklist", label: "체크리스트", icon: "check-square" },
    { id: "history", label: "히스토리", icon: "history" },
    { id: "members", label: "회원관리", icon: "users" },
    { id: "alert", label: "알림", icon: "bell" },
  ];
  return (
    <header className="flex justify-end gap-2 border-b border-slate-200 bg-white px-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={`flex items-center gap-2 border-b-2 px-5 py-3 text-sm font-medium transition-colors ${
            activeMainTab === tab.id
              ? "border-blue-600 bg-blue-50 text-blue-600"
              : "border-transparent text-slate-500 hover:bg-slate-50 hover:text-slate-900"
          }`}
          onClick={() => setActiveMainTab(tab.id)}
        >
          <Icon name={tab.icon} size={16} />
          {tab.label}
          {tab.badge ? (
            <span className="ml-1 inline-block rounded-full bg-rose-500 px-2 py-[2px] text-[10px] font-semibold text-white">
              {tab.badge}
            </span>
          ) : null}
        </button>
      ))}
    </header>
  );
}
