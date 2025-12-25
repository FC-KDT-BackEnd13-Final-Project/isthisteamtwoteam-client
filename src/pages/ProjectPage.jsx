import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteProject, getCustomerProjects, getProjects } from "../utils/config/api/project/projectApi";
import SearchBar from "../components/common/SearchBar/SearchBar";
import Pagination from "../components/common/Pagination/Pagination";
import LoadingState from "../components/common/LoadingState/LoadingState";
import EmptyState from "../components/common/EmptyState/EmptyState";
import ProjectListItem from "../components/project/ProjectListItem";
import { useAuth } from "../context/AuthConext";

export default function ProjectsPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 10;

  // ============================================
  // 데이터 로딩 - user가 로드된 후에만 실행
  // ============================================
  useEffect(() => {
    loadProjects();
  }, [user]); 

  const loadProjects = async () => {
    try {
      setLoading(true);
      
      let data;
      
      if (user?.role === 'ADMIN') {
        data = await getProjects();
      } else {
        data = await getCustomerProjects();
      }

      // API 응답 처리
      if (data?.success && data?.response) {
        setProjects(data.response);
      } else if (Array.isArray(data)) {
        setProjects(data);
      } else {
        setProjects([]);
      }
      
    } catch (error) {
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // 단계별 탭 정의
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

    if (activeTab !== "all") {
      const tab = tabs.find((t) => t.id === activeTab);
      if (tab && tab.stageId) {
        filtered = filtered.filter((p) => p.stageId === tab.stageId);
      }
    }

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
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery]);

  const getTabCount = (tabId) => {
    if (tabId === "all") return projects.length;
    const tab = tabs.find((t) => t.id === tabId);
    if (!tab || !tab.stageId) return 0;
    return projects.filter((p) => p.stageId === tab.stageId).length;
  };

  const getStageBadgeClass = (stageId) => {
    const stageStyles = {
      1: "bg-gray-100 text-gray-600",
      2: "bg-red-100 text-red-600",
      3: "bg-blue-100 text-blue-600",
      4: "bg-indigo-100 text-indigo-600",
      5: "bg-purple-100 text-purple-600",
      6: "bg-green-100 text-green-600",
      7: "bg-yellow-100 text-yellow-600",
      8: "bg-orange-100 text-orange-600",
      9: "bg-slate-200 text-slate-600",
    };
    return stageStyles[stageId] || "bg-gray-100 text-gray-600";
  };

  const handleCreateProject = () => {
    navigate("/create-project");
  };

  const handleEditProject = (projectId) => {
    navigate(`/edit-project/${projectId}`);
  };

  const handleDeleteProject = async (projectId, projectName) => {
    if (!window.confirm(`"${projectName}" 프로젝트를 삭제하시겠습니까?`)) {
      return;
    }

    try {
      await deleteProject(projectId);
      alert("프로젝트가 삭제되었습니다.");
      await loadProjects();

      const newTotalPages = Math.ceil((filteredProjects.length - 1) / itemsPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
    } catch (error) {
      console.error('프로젝트 삭제 실패:', error);
      alert(`프로젝트 삭제에 실패했습니다: ${error.message}`);
    }
  };

  // user가 아직 로드되지 않았으면 로딩 표시
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-slate-600">사용자 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-5">
      <div className="mx-auto max-w-[1400px] px-4">
        <div className="mb-4 pb-4">
          <h1 className="text-[28px] font-semibold leading-tight text-gray-900">
            프로젝트
          </h1>
        </div>

        <div className="flex min-h-[1100px] flex-col rounded-lg bg-white p-8 shadow-sm">
          <div className="mb-6 border-b-2 border-gray-100">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative mb-[-2px] whitespace-nowrap border-b-2 px-6 py-4 text-sm font-medium transition-colors ${
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

          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="프로젝트 검색..."
            rightContent={
              // ADMIN만 프로젝트 생성 버튼 표시
              user?.role === 'ADMIN' && (
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
              )
            }
          />

          <div className="mb-6 flex-grow overflow-hidden rounded-lg border border-gray-200">
            {loading ? (
              <LoadingState message="프로젝트를 불러오는 중..." />
            ) : currentProjects.length === 0 ? (
              <EmptyState
                icon={
                  <svg
                    className="mx-auto mb-4 h-16 w-16 fill-gray-300 opacity-30"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5A2,2 0 0,0 19,3M19,19H5V5H19V19Z" />
                  </svg>
                }
                message="프로젝트가 없습니다."
                subMessage="새로운 프로젝트를 생성해보세요."
              />
            ) : (
              currentProjects.map((project, index) => (
                <ProjectListItem
                  key={project.projectId}
                  project={project}
                  getStageBadgeClass={getStageBadgeClass}
                  onEdit={handleEditProject}
                  onDelete={handleDeleteProject}
                  isLast={index === currentProjects.length - 1}
                  userRole={user?.role} // userRole prop 추가
                />
              ))
            )}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              totalItems={filteredProjects.length}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}