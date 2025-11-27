import { useState } from "react";
import Icon from "../global/components/Icon";
import Memo from "../components/Memo";
import CheckList from "../components/CheckList";

export default function ProjectPage() {
  const [activeMainTab, setActiveMainTab] = useState("checklist");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "전체" },
    { id: "requirements", label: "요구사항 정의" },
    { id: "design", label: "화면설계" },
    { id: "designPub", label: "디자인/퍼블리싱" },
    { id: "feedback", label: "피드백" },
    { id: "development", label: "개발" },
    { id: "inspection", label: "검수" },
    { id: "maintenance", label: "유지보수" },
    { id: "files", label: "업로드된 파일 목록" },
  ];

  const tabs = [
    { id: "pending", label: "승인 대기", badge: 5, icon: "clock" },
    { id: "checklist", label: "체크리스트", icon: "check-square" },
    { id: "history", label: "히스토리", icon: "history" },
    { id: "members", label: "회원관리", icon: "users" },
    { id: "alert", label: "알림", icon: "bell" },
  ];

  return (
    <>
      <div className="bg-white border-b border-slate-200 px-6 flex gap-2 justify-end">
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
      </div>

      <div className="flex-1 p-4 space-y-3 flex gap-6">
        {/* 프로젝트 단계 카드 */}
        <div className="flex-1 bg-white border border-slate-200 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">
            프로젝트 단계
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition ${
                  activeCategory === cat.id
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-slate-700 border-slate-200 hover:border-blue-500 hover:text-blue-600"
                }`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="px-4 py-2.5  border border-slate-200 rounded-lg">
            게시판
          </div>
        </div>
        <div className="flex flex-col h-full ">
          {/* 메모 */}
          <Memo />
          {/* 체크 리스트 */}
          <CheckList />
        </div>
      </div>
    </>
  );
}
