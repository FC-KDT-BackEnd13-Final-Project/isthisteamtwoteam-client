import { useState } from "react";
import Icon from "../global/components/Icon";
import Memo from "../components/Memo";
import CheckList from "../components/CheckList";

export default function ProjectPage() {
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

  const posts = [
    {
      id: 1,
      category: "requirements",
      title: "제목1",
      author: "진용1",
      isCompleted: true,
      ip: "123.456.789",
    },
    {
      id: 2,
      category: "design",
      title: "제목2",
      author: "진용2",
      isCompleted: true,
      ip: "123.456.789",
    },
    {
      id: 3,
      category: "requirements",
      title: "제목3",
      author: "진용3",
      isCompleted: false,
      ip: "123.456.789",
    },
    {
      id: 4,
      category: "design",
      title: "제목4",
      author: "진용4",
      isCompleted: false,
      ip: "123.456.789",
    },
    {
      id: 5,
      category: "designPub",
      title: "제목5",
      author: "진용5",
      isCompleted: true,
      ip: "123.456.789",
    },
  ];

  const filteredPosts =
    activeCategory === "all"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  return (
    <>
      <div className="flex-1 p-4 space-y-3 flex gap-6">
        {/* 프로젝트 단계 카드 */}
        <div className="flex-1 bg-white border border-slate-200 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-semibold text-slate-900 mb-4">
            프로젝트 단계
          </h3>

          <div className="flex justify-center flex-wrap gap-2">
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

          {filteredPosts.map((post) => (
            <div className="flex px-4 py-3 gap-4 border border-slate-200 rounded-lg items-center hover:bg-slate-50 hover:border-blue-200 transition cursor-pointer">
              {/* 제목 */}
              <div className="flex-1 font-medium text-slate-900">
                {post.title}
              </div>

              {/* 작성자 */}
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-600">
                  {post.author}
                </span>
              </div>

              {/* IP - 태그 스타일 */}
              <div className="px-2 py-1 bg-slate-100 rounded text-xs text-slate-500">
                {post.ip}
              </div>

              {/* 완료 여부 - 뱃지 스타일 */}
              <div
                className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  post.isCompleted
                    ? "bg-green-100 text-green-600"
                    : "bg-amber-100 text-amber-600"
                }`}
              >
                {post.isCompleted ? "완료" : "대기"}
              </div>
            </div>
          ))}
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
