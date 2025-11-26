import { useMemo, useState } from "react";
import "./App.css";
import Icon from "./global/components/Icon";
import SideBar from "./global/components/SideBar";

function App() {
  const [activeMainTab, setActiveMainTab] = useState("checklist");
  const [activeCategory, setActiveCategory] = useState("all");
  const [memo, setMemo] = useState("");
  const [newChecklistItem, setNewChecklistItem] = useState("");
  const [checklistItems, setChecklistItems] = useState([
    { id: 1, text: "요구사항 정의 완료", completed: true },
    { id: 2, text: "화면 설계 초안 작성", completed: true },
    { id: 3, text: "디자인 시안 검토", completed: false },
    { id: 4, text: "개발 착수", completed: false },
    { id: 5, text: "1차 테스트", completed: false },
  ]);

  const categories = useMemo(
    () => [
      { id: "all", label: "전체" },
      { id: "requirements", label: "요구사항 정의" },
      { id: "design", label: "화면설계" },
      { id: "designPub", label: "디자인/퍼블리싱" },
      { id: "feedback", label: "피드백" },
      { id: "development", label: "개발" },
      { id: "inspection", label: "검수" },
      { id: "maintenance", label: "유지보수" },
      { id: "files", label: "업로드된 파일 목록" },
    ],
    []
  );

  const posts = [
    {
      id: 1,
      category: "requirements",
      title: "[re] 원하시는 요청에 대한 부가적인 자료입니다",
      content: "프로젝트 요구사항에 대한 상세 내용과 참고자료를 첨부합니다.",
      author: "kimdong3021",
      date: "2024-11-25",
      status: "completed",
    },
    {
      id: 2,
      category: "design",
      title: "화면 설계 초안 검토 요청",
      content: "메인 페이지와 서브 페이지의 화면 설계 초안을 첨부합니다.",
      author: "kimdong3021",
      date: "2024-11-24",
      status: "pending",
    },
    {
      id: 3,
      category: "feedback",
      title: "[참고] 부가자료 다시 보냅니다!!",
      content: "이전에 요청하신 자료를 수정하여 다시 보내드립니다.",
      author: "kimdong3021",
      date: "2024-11-23",
      status: "progress",
    },
  ];

  const files = [
    {
      id: 1,
      name: "project_A2.pdf",
      size: "2.4 MB",
      type: "pdf",
      uploadDate: "2024-11-25",
      category: "requirements",
    },
    {
      id: 2,
      name: "설계.pdf",
      size: "1.8 MB",
      type: "pdf",
      uploadDate: "2024-11-24",
      category: "design",
    },
    {
      id: 3,
      name: "디자인_최종.fig",
      size: "5.2 MB",
      type: "figma",
      uploadDate: "2024-11-23",
      category: "designPub",
    },
  ];

  const filteredPosts =
    activeCategory === "all"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  const filteredFiles =
    activeCategory === "all"
      ? files
      : activeCategory === "files"
      ? files
      : files.filter((file) => file.category === activeCategory);

  const toggleChecklistItem = (id) => {
    setChecklistItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const addChecklistItem = () => {
    const trimmed = newChecklistItem.trim();
    if (!trimmed) return;

    setChecklistItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        text: trimmed,
        completed: false,
      },
    ]);
    setNewChecklistItem("");
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex font-sans">
      <SideBar />

      <main className="flex-1 ml-[260px] flex flex-col">
        <header className="bg-white border-b border-slate-200 px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">
              개별 프로젝트 게시판
            </h1>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Dashboard</span>
              <span>/</span>
              <span>개별 프로젝트 게시판</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="w-10 h-10 border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-500"
              type="button"
            >
              <Icon name="search" size={18} />
            </button>
            <button
              className="w-10 h-10 border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-500"
              type="button"
            >
              <Icon name="bell" size={18} />
            </button>
            <div className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-xl text-sm font-medium cursor-pointer">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white">
                <Icon name="user" size={14} />
              </div>
              <span>Guy Hawkins</span>
            </div>
          </div>
        </header>

        <div className="bg-white border-b border-slate-200 px-6 flex gap-2">
          {[
            { id: "pending", label: "승인 대기", badge: 3, icon: "clock" },
            { id: "checklist", label: "체크리스트", icon: "check-square" },
            { id: "history", label: "히스토리", icon: "history" },
            { id: "members", label: "회원관리", icon: "users" },
            { id: "alert", label: "알림", icon: "bell" },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={`flex items-center gap-2 px-5 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeMainTab === tab.id
                  ? "text-blue-600 border-blue-600"
                  : "text-slate-500 border-transparent hover:text-slate-900"
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

        <div className="flex-1 p-6 space-y-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5">
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
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-slate-900">
                  {activeCategory === "files" ? "업로드된 파일" : "게시글 목록"}
                </h2>
                <span className="text-sm text-slate-500">
                  총{" "}
                  {activeCategory === "files"
                    ? filteredFiles.length
                    : filteredPosts.length}
                  건
                </span>
              </div>

              {activeCategory === "files" ? (
                filteredFiles.length > 0 ? (
                  <div className="space-y-3">
                    {filteredFiles.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl hover:border-blue-500 hover:bg-slate-50 transition cursor-pointer"
                      >
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center text-blue-600">
                          <Icon name="file-text" size={20} />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold text-slate-900">
                            {file.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {file.size} · {file.uploadDate}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            className="w-9 h-9 border border-slate-200 rounded-lg flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-500"
                            type="button"
                          >
                            <Icon name="download" size={14} />
                          </button>
                          <button
                            className="w-9 h-9 border border-slate-200 rounded-lg flex items-center justify-center text-slate-500 hover:text-blue-600 hover:border-blue-500"
                            type="button"
                          >
                            <Icon name="eye" size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-14 text-slate-400">
                    <Icon name="inbox" size={36} />
                    <p className="text-sm mt-3">업로드된 파일이 없습니다.</p>
                  </div>
                )
              ) : filteredPosts.length > 0 ? (
                <div className="space-y-3">
                  {filteredPosts.map((post) => (
                    <div
                      key={post.id}
                      className="p-4 border border-slate-200 rounded-xl hover:border-blue-500 hover:bg-slate-50 transition cursor-pointer"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="text-[15px] font-semibold text-slate-900 mb-1">
                            {post.title}
                          </div>
                          <span className="inline-block px-2.5 py-1 bg-blue-50 text-blue-600 rounded-md text-[11px] font-semibold">
                            {
                              categories.find((c) => c.id === post.category)
                                ?.label
                            }
                          </span>
                        </div>
                      </div>
                      <div className="text-sm text-slate-600 leading-relaxed mb-2">
                        {post.content}
                      </div>
                      <div className="flex gap-4 text-xs text-slate-400">
                        <div className="flex items-center gap-1">
                          <Icon name="user" size={12} />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Icon name="calendar" size={12} />
                          <span>{post.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-14 text-slate-400">
                  <Icon name="inbox" size={36} />
                  <p className="text-sm mt-3">게시글이 없습니다.</p>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl overflow-hidden">
                <div className="p-5">
                  <textarea
                    className="w-full bg-transparent resize-y min-h-[120px] text-sm text-slate-600 leading-relaxed outline-none"
                    value={memo}
                    onChange={(event) => setMemo(event.target.value)}
                    placeholder="메모를 작성하세요..."
                  />
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-slate-900 mb-4">
                  ✓ 체크리스트
                </h3>
                <div className="space-y-2">
                  {checklistItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 cursor-pointer"
                      onClick={() => toggleChecklistItem(item.id)}
                    >
                      <div
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition ${
                          item.completed
                            ? "bg-blue-600 border-blue-600 text-white"
                            : "border-slate-300"
                        }`}
                      >
                        {item.completed ? (
                          <Icon name="check-square" size={12} />
                        ) : null}
                      </div>
                      <span
                        className={`text-sm transition ${
                          item.completed
                            ? "text-slate-400 line-through"
                            : "text-slate-700"
                        }`}
                      >
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-3">
                  <input
                    type="text"
                    className="flex-1 px-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    placeholder="새 항목 추가..."
                    value={newChecklistItem}
                    onChange={(event) =>
                      setNewChecklistItem(event.target.value)
                    }
                    onKeyDown={(event) => {
                      if (event.key === "Enter") addChecklistItem();
                    }}
                  />
                  <button
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold flex items-center gap-1.5 hover:bg-blue-700"
                    type="button"
                    onClick={addChecklistItem}
                  >
                    <Icon name="plus" size={14} />
                    추가
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="text-base font-semibold text-slate-900 mb-5">
              새 게시글 작성
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  제목
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="게시글 제목을 입력하세요"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  내용
                </label>
                <textarea
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 text-sm min-h-[140px] resize-y focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="내용을 입력하세요"
                />
              </div>
            </div>
            <div className="flex justify-center mt-6">
              <button
                className="px-10 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold flex items-center gap-2 shadow hover:-translate-y-[1px] transition"
                type="button"
              >
                <Icon name="send" size={18} />글 작성
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
