import { useState } from "react";
import Icon from "./Icon";

export default function Header() {
  const [activeMainTab, setActiveMainTab] = useState("checklist");

  const tabs = [
    { id: "pending", label: "승인 대기", badge: 5, icon: "clock" },
    { id: "checklist", label: "체크리스트", icon: "check-square" },
    { id: "history", label: "히스토리", icon: "history" },
    { id: "members", label: "회원관리", icon: "users" },
    { id: "alert", label: "알림", icon: "bell" },
  ];
  return (
    <header className="bg-white border-b border-slate-200 px-6 flex gap-2 justify-end">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          className={`flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeMainTab === tab.id
              ? "text-blue-600 border-blue-600 bg-blue-50"
              : "text-slate-500 border-transparent hover:text-slate-900 hover:bg-slate-50"
          }`}
          onClick={() => setActiveMainTab(tab.id)}
        >
          <Icon name={tab.icon} size={16} />
          {tab.label}
          {tab.badge ? (
            <span className="ml-1 inline-block px-2 py-[2px] text-[10px] font-semibold rounded-full bg-rose-500 text-white">
              {tab.badge}
            </span>
          ) : null}
        </button>
      ))}
    </header>
  );
}
