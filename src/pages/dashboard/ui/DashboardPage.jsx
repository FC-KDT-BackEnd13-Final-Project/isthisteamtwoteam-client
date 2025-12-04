import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardStats from "../../../widgets/dashboard-stats/DashboardStats";
import { pendingApprovals, rejectedDocuments } from "../../../data/mockBoards";
import {
  allProjectsData,
  maintenanceProjects,
  progressProjects,
} from "../../../data/mockProjects";
import FilteredList from "../../../widgets/filtered-list/ui/FilteredList";
import ProjectList from "../../../widgets/project-list/ui/ProjectList";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("pending");
  const [listTitle, setListTitle] = useState("진행중 리스트");

  // 필터 변경 핸들러
  const handleFilterChange = (filterType, title) => {
    setActiveFilter(filterType);
    setListTitle(`${title} 리스트`);
  };

  // 네비게이션 핸들런들
  const handleViewProject = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  const handleViewBoard = (boardId) => {
    navigate(`/project/board`, { state: { boardId } });
  };

  const handleCreateProject = () => {
    alert("새 프로젝트 생성 모달 또는 페이지로 이동합니다.");
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] px-4 py-5 font-[-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,'Helvetica_Neue',Arial,sans-serif]">
      <div className="mx-auto max-w-[1400px]">
        {/* 페이지 제목 */}
        <div>
          <h1 className="mb-1.5 text-[22px] font-semibold text-[#1a1a1a]">
            대시보드
          </h1>
        </div>
      </div>

      {/* 게시물과 프로젝트에 관한 상태 카드들 */}
      <DashboardStats
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />

      {/* 필터링된 목록 */}
      <FilteredList
        activeFilter={activeFilter}
        title={listTitle}
        pendingApprovals={pendingApprovals}
        rejectedDocuments={rejectedDocuments}
        progressProjects={progressProjects}
        maintenanceProjects={maintenanceProjects}
        onViewBoard={handleViewBoard}
        onViewProject={handleViewProject}
      />

      {/* 모든 프로젝트 리스트 */}
      <ProjectList
        projects={allProjectsData}
        onViewProject={handleViewProject}
        onCreateProject={handleCreateProject}
      />
    </div>
  );
}
