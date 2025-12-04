import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Icon from "../../../shared/ui/Icon/Icon";
import Memo from "../../../widgets/memo/ui/Memo";
import ChecklistWidget from "../../../widgets/checklist-widget/ui/ChecklistWidget";

// Mock 데이터 import - 프로젝트 데이터 가져오기
import { getProjectById } from "../../../data/mockProjects";
import { allBoards } from "../../../data/mockBoards";

/**
 * ProjectPage 메인 컴포넌트
 * 프로젝트 상세 정보와 해당 프로젝트의 게시글 목록을 표시합니다.
 * URL 파라미터에서 projectId를 가져와 해당 프로젝트의 데이터를 조회합니다.
 */
export default function ProjectPage() {
  // ============================================
  // React Router hooks - URL에서 projectId 가져오기
  // ============================================

  // URL 파라미터에서 projectId를 추출 (예: /project/1 -> projectId = 1)
  const { projectId } = useParams();

  // ============================================
  // State 관리
  // ============================================

  // 현재 프로젝트 데이터 (ID로 조회한 결과)
  const [projectData, setProjectData] = useState(null);

  // 현재 프로젝트의 게시글 목록
  const [projectBoards, setProjectBoards] = useState([]);

  // 현재 선택된 카테고리 (게시글 필터링용)
  const [activeCategory, setActiveCategory] = useState("all");

  // ============================================
  // 데이터 로딩 - projectId로 프로젝트 및 게시글 조회
  // ============================================

  useEffect(() => {
    // projectId가 있으면 해당 프로젝트 데이터를 조회
    if (projectId) {
      const project = getProjectById(projectId);

      if (project) {
        // 프로젝트 데이터가 있으면 state에 저장
        setProjectData(project);

        // 해당 프로젝트의 게시글만 필터링
        // allBoards에서 projectId가 일치하는 게시글만 가져옴
        const boards = allBoards.filter(
          (board) => board.projectId === parseInt(projectId, 10),
        );
        setProjectBoards(boards);
      } else {
        // 프로젝트를 찾을 수 없는 경우
        console.error(`프로젝트 ID ${projectId}를 찾을 수 없습니다.`);
      }
    }
  }, [projectId]); // projectId가 변경될 때마다 실행

  // ============================================
  // 카테고리 정의
  // ============================================

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

  // ============================================
  // 게시글 필터링 - 선택된 카테고리에 따라 필터링
  // ============================================

  const filteredPosts =
    activeCategory === "all"
      ? projectBoards // 전체 카테고리면 모든 게시글 표시
      : projectBoards.filter((post) => post.category === activeCategory); // 선택된 카테고리의 게시글만 표시

  // ============================================
  // 로딩 처리
  // ============================================

  // 프로젝트 데이터가 아직 로드되지 않은 경우
  if (!projectData) {
    return (
      <div className="flex flex-1 items-center justify-center p-4">
        <div className="text-center">
          <p className="text-[16px] text-[#999]">프로젝트를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  // ============================================
  // 렌더링
  // ============================================

  return (
    <>
      <div className="flex flex-1 gap-6 space-y-3 p-4">
        {/* 프로젝트 단계 카드 */}
        <div className="flex-1 space-y-4 rounded-xl border border-slate-200 bg-white p-5">
          {/* 프로젝트 정보 헤더 */}
          <div className="mb-4 border-b border-slate-200 pb-4">
            <h3 className="mb-2 text-lg font-bold text-slate-900">
              {projectData.name}
            </h3>
            <div className="flex gap-4 text-sm text-slate-600">
              <span>고객사: {projectData.client}</span>
              <span>단계: {projectData.stage}</span>
              {projectData.progress && (
                <span>진행률: {projectData.progress}%</span>
              )}
            </div>
          </div>

          <h3 className="mb-4 text-sm font-semibold text-slate-900">
            프로젝트 게시글 ({filteredPosts.length})
          </h3>

          {/* 카테고리 필터 버튼 */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
                  activeCategory === cat.id
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:border-blue-500 hover:text-blue-600"
                }`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* 게시글 목록 - 실제 데이터 표시 */}
          {filteredPosts.length === 0 ? (
            <div className="py-10 text-center text-slate-500">
              <p>해당 카테고리의 게시글이 없습니다.</p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <div
                key={post.id}
                className="flex cursor-pointer items-center gap-4 rounded-lg border border-slate-200 px-4 py-3 transition hover:border-blue-200 hover:bg-slate-50"
              >
                {/* 제목 */}
                <div className="flex-1 font-medium text-slate-900">
                  {post.title}
                </div>

                {/* 작성자 */}
                <div className="flex items-center gap-2">
                  <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-600">
                    {post.author}
                  </span>
                </div>

                {/* 날짜 */}
                <div className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-500">
                  {post.date}
                </div>

                {/* 승인 상태 - 뱃지 스타일 */}
                <div
                  className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                    post.approvalStatus === "approved"
                      ? "bg-green-100 text-green-600"
                      : post.approvalStatus === "rejected"
                        ? "bg-red-100 text-red-600"
                        : "bg-amber-100 text-amber-600"
                  }`}
                >
                  {post.approvalStatus === "approved"
                    ? "승인완료"
                    : post.approvalStatus === "rejected"
                      ? "반려"
                      : "승인대기"}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex h-full flex-col">
          {/* 메모 */}
          <Memo />
          {/* 체크 리스트 */}
          <ChecklistWidget
            initialItems={[
              { id: 1, title: "내용1", files: [] },
              { id: 2, title: "내용2", files: [] },
              { id: 3, title: "내용3", files: [] },
            ]}
          />
        </div>
      </div>
    </>
  );
}
