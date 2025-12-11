import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProjects } from "../utils/api/project/projectApi";

/**
 * ProjectsPage - 프로젝트 목록 페이지
 * HTML 디자인을 참고한 리스트 형태의 프로젝트 관리 페이지
 */
export default function ProjectsPage() {
  const navigate = useNavigate();

  // ============================================
  // State 관리
  // ============================================
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [pageInfo, setPageInfo] = useState(null);

  // ============================================
  // 데이터 로딩
  // ============================================
  useEffect(() => {
    loadProjects();
  }, [currentPage]);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await getProjects(currentPage, 10);
      
      // API 응답이 { success, response, message } 형태인 경우
      if (data.success && data.response) {
        setProjects(data.response);
      } else if (Array.isArray(data)) {
        // 배열로 직접 오는 경우
        setProjects(data);
      } else {
        setProjects([]);
      }
    } catch (error) {
      console.error("프로젝트 목록 조회 실패:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // 단계별 탭 정의 (HTML의 status를 stage로 변경)
  // ============================================
  const tabs = [
    { id: "all", label: "전체", stageId: null },
    { id: "stage1", label: "진행 전", stageId: 1 },
    { id: "stage2", label: "진행 중단", stageId: 2 },
    { id: "stage3", label: "요구사항 정의", stageId: 3 },
    { id: "stage4", label: "화면 설계", stageId: 4 },
    { id: "stage5", label: "디자인/퍼블리싱", stageId: 5 },
    { id: "stage6", label: "개발", stageId: 6 },
    { id: "stage7", label: "검수", stageId: 7 },
    { id: "stage8", label: "유지보수", stageId: 8 },
    { id: "stage9", label: "완료", stageId: 9 },
  ];

  // ============================================
  // 필터링 로직
  // ============================================
  const getFilteredProjects = () => {
    let filtered = projects;

    // 탭 필터링
    if (activeTab !== "all") {
      const tab = tabs.find((t) => t.id === activeTab);
      if (tab && tab.stageId) {
        filtered = filtered.filter((p) => p.stageId === tab.stageId);
      }
    }

    // 검색 필터링
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.projectName.toLowerCase().includes(query) ||
          p.stageName.toLowerCase().includes(query) ||
          `PRJ-${String(p.projectId).padStart(3, "0")}`
            .toLowerCase()
            .includes(query),
      );
    }

    return filtered;
  };

  const filteredProjects = getFilteredProjects();

  // ============================================
  // 탭별 카운트 계산
  // ============================================
  const getTabCount = (tabId) => {
    if (tabId === "all") return projects.length;
    const tab = tabs.find((t) => t.id === tabId);
    if (!tab || !tab.stageId) return 0;
    return projects.filter((p) => p.stageId === tab.stageId).length;
  };

  // ============================================
  // Stage별 뱃지 스타일 (9단계)
  // ============================================
  const getStageBadgeClass = (stageId) => {
    const stageStyles = {
      1: "bg-gray-100 text-gray-600", // 진행 전
      2: "bg-red-100 text-red-600", // 진행 중단
      3: "bg-blue-100 text-blue-600", // 요구사항 정의
      4: "bg-indigo-100 text-indigo-600", // 화면 설계
      5: "bg-purple-100 text-purple-600", // 디자인/퍼블리싱
      6: "bg-green-100 text-green-600", // 개발
      7: "bg-yellow-100 text-yellow-600", // 검수
      8: "bg-orange-100 text-orange-600", // 유지보수
      9: "bg-slate-200 text-slate-600", // 완료
    };
    return stageStyles[stageId] || "bg-gray-100 text-gray-600";
  };

  // ============================================
  // 이벤트 핸들러
  // ============================================
  const handleCreateProject = () => {
    navigate("/create-project");
  };

  const handleEditProject = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  const handleDeleteProject = (projectId, projectName) => {
    if (window.confirm(`"${projectName}" 프로젝트를 삭제하시겠습니까?`)) {
      // TODO: 실제 삭제 API 호출
      alert("프로젝트가 삭제되었습니다.");
    }
  };

  // ============================================
  // 렌더링
  // ============================================
  return (
    <div className="min-h-screen bg-gray-100 py-5">
      <div className="mx-auto max-w-[1600px] px-8">
        {/* 페이지 헤더 */}
        <div className="mb-4 pb-4">
          <h1 className="text-[28px] font-semibold leading-tight text-gray-900">
            프로젝트
          </h1>
        </div>

        {/* 흰색 카드 컨테이너 */}
        <div className="min-h-[800px] rounded-lg bg-white p-8 shadow-sm">
          {/* 탭 메뉴 */}
          <div className="mb-6 border-b-2 border-gray-100">
            <div className="flex gap-2 flex-wrap">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative mb-[-2px] whitespace-nowrap border-b-2 px-6 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-500"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                  <span className="ml-2 text-inherit">
                    ({getTabCount(tab.id)})
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* 컨트롤 영역 */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCreateProject}
                className="flex items-center gap-2 rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-600"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
                </svg>
                프로젝트 생성
              </button>
            </div>

            {/* 검색 박스 */}
            <div className="flex w-[300px] items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5">
              <svg className="h-[18px] w-[18px] fill-gray-400" viewBox="0 0 24 24">
                <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
              </svg>
              <input
                type="text"
                placeholder="프로젝트 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border-none text-sm text-gray-900 outline-none placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* 프로젝트 리스트 */}
          <div className="mb-6 overflow-hidden rounded-lg border border-gray-200">
            {loading ? (
              <div className="py-20 text-center text-gray-500">
                <p>프로젝트를 불러오는 중...</p>
              </div>
            ) : filteredProjects.length === 0 ? (
              <div className="py-20 text-center text-gray-500">
                <svg
                  className="mx-auto mb-4 h-16 w-16 fill-gray-300 opacity-30"
                  viewBox="0 0 24 24"
                >
                  <path d="M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V5H19V19Z" />
                </svg>
                <p className="mb-2 text-[15px]">프로젝트가 없습니다.</p>
                <p className="text-[13px] text-gray-400">
                  새로운 프로젝트를 생성해보세요.
                </p>
              </div>
            ) : (
              filteredProjects.map((project, index) => (
                <div
                  key={project.projectId}
                  className={`flex items-center px-5 py-4 transition-colors hover:bg-gray-50 ${
                    index !== filteredProjects.length - 1
                      ? "border-b border-gray-200"
                      : ""
                  }`}
                >
                  {/* 프로젝트 아이콘 */}
                  <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-base font-semibold text-blue-500">
                    {project.projectName.substring(0, 2)}
                  </div>

                  {/* 프로젝트 정보 그리드 */}
                  <div className="grid flex-1 grid-cols-[minmax(250px,3fr)_minmax(120px,1fr)_minmax(120px,1fr)_minmax(120px,1fr)_minmax(100px,120px)] items-center gap-8">
                    {/* 프로젝트 ID & 이름 */}
                    <div className="min-w-0">
                      <div className="mb-1 text-[13px] font-medium text-blue-500">
                        PRJ-{String(project.projectId).padStart(3, "0")}
                      </div>
                      <div className="overflow-hidden text-ellipsis whitespace-nowrap text-sm text-gray-900">
                        {project.projectName}
                      </div>
                    </div>

                    {/* 멤버 수 */}
                    <div className="text-[13px] text-gray-600">
                      멤버 {project.members?.length || 0}명
                    </div>

                    {/* 시작일 */}
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs text-gray-400">시작일</span>
                      <span className="text-[13px] text-gray-900">
                        {project.startDate || "-"}
                      </span>
                    </div>

                    {/* 종료일 */}
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs text-gray-400">종료일</span>
                      <span className="text-[13px] text-gray-900">
                        {project.endDate || "-"}
                      </span>
                    </div>

                    {/* 단계 뱃지 */}
                    <div className="flex justify-center">
                      <span
                        className={`inline-flex items-center justify-center whitespace-nowrap rounded-xl px-3 py-1.5 text-xs font-medium ${getStageBadgeClass(project.stageId)}`}
                      >
                        {project.stageName}
                      </span>
                    </div>
                  </div>

                  {/* 액션 버튼 */}
                  <div className="ml-4 flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleEditProject(project.projectId)}
                      className="flex items-center gap-1 rounded border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-blue-500 transition-colors hover:border-blue-500 hover:bg-blue-50"
                    >
                      <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                      </svg>
                      수정
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        handleDeleteProject(project.projectId, project.projectName)
                      }
                      className="flex items-center gap-1 rounded border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-red-500 transition-colors hover:border-red-500 hover:bg-red-50"
                    >
                      <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                      </svg>
                      삭제
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* 페이지네이션 */}
          {pageInfo && pageInfo.totalPages > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              {Array.from({ length: pageInfo.totalPages }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentPage(i)}
                  className={`h-9 w-9 rounded ${
                    currentPage === i
                      ? "bg-blue-500 text-white"
                      : "border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}