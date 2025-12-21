import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import DashboardStats from "../../components/dashboard/DashboardStats";
import FilteredList from "../../components/dashboard/FilteredList";
import ProjectList from "../../components/dashboard/ProjectList";
import { getDashboardAllProjects,getDashboardData } from "../../utils/config/api/dashboardApi";


export default function DeveloperDashboardPage() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState("pending");
  const [listTitle, setListTitle] = useState("진행중 리스트");
  const [allProjects,setAllProject] = useState([])
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDashboardData();
        const projectsData = await getDashboardAllProjects();
        setDashboardData(data);
        setLoading(false);
        setAllProject(projectsData);
      } catch (error) {
        console.error('데이터 로딩 실패:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">로딩 중...</div>;
  }

  if (!dashboardData) {
    return <div className="flex justify-center items-center min-h-screen">데이터를 불러올 수 없습니다.</div>;
  }

  // 필터 변경 핸들러
  const handleFilterChange = (filterType, title) => {
    setActiveFilter(filterType);
    setListTitle(`${title} 리스트`);
  };

  // 네비게이션 핸들런들
  const handleViewProject = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  const handleViewBoard = (postId) => {
    navigate(`/posts/${postId}`);
  };

  const handleCreateProject = () => {
    navigate('/create-project');
  };



  return (
    <div className="min-h-screen bg-gray-100 font-sans px-4 py-5 font-[-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,'Helvetica_Neue',Arial,sans-serif]">
      <div className="mx-auto max-w-[1350px]">
        {/* 페이지 제목 */}
        <div>
          <h1 className="mb-5 text-[22px] font-semibold text-[#1a1a1a]">
            대시보드
          </h1>
        </div>

        {/* 게시물과 프로젝트에 관한 상태 카드들 */}
        <DashboardStats
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
          stats={dashboardData.stats}
        />

        {/* 필터링된 목록 */}
        <FilteredList
          activeFilter={activeFilter}
          title={listTitle}
          pendingApprovals={dashboardData.pendingList}
          rejectedDocuments={dashboardData.rejectedList}
          progressProjects={dashboardData.inProgressList}
          maintenanceProjects={dashboardData.maintenanceList}
          onViewBoard={handleViewBoard}
          onViewProject={handleViewProject}
        />

        {/* 모든 프로젝트 리스트 */}
        
        <ProjectList
          projects={allProjects}
          onViewProject={handleViewProject}
          onCreateProject={handleCreateProject}
        />
      </div>
    </div>
  );
}
