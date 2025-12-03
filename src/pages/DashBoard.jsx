import { useState } from "react";
import { useNavigate } from "react-router-dom";

// 데이터 가져오기
import { pendingApprovals, rejectedDocuments } from "../data/mockBoards";
import {
  progressProjects,
  maintenanceProjects,
  allProjectsData,
} from "../data/mockProjects";

// 컴포넌트 가져오기
import {
  ClockIcon,
  XCircleIcon,
  CheckSquareIcon,
  WrenchIcon,
} from "../components/dashboard/Icons";
import StatCard from "../components/dashboard/StatCard";
import DocumentItem from "../components/dashboard/DocumentItem";
import ProjectItem from "../components/dashboard/ProjectItem";
import ProjectCard from "../components/dashboard/ProjectCard";

/**
 * 대시보드 메인 페이지
 *
 * 이 페이지는 다음 정보를 보여줍니다:
 * 1. 통계 카드 4개 (승인 대기, 반려, 진행중, 유지보수)
 * 2. 선택한 카드에 따른 필터링된 목록
 * 3. 모든 프로젝트 리스트
 */
export default function Dashboard() {
  // ========================================
  // 1. 상태(State) 관리
  // ========================================

  // 현재 선택된 필터 (어떤 카드를 클릭했는지)
  const [activeFilter, setActiveFilter] = useState("pending");

  // 필터된 목록의 제목
  const [listTitle, setListTitle] = useState("진행중 리스트");

  // 페이지 이동을 위한 함수
  const navigate = useNavigate();

  // ========================================
  // 2. 이벤트 처리 함수들
  // ========================================

  /**
   * 통계 카드를 클릭했을 때
   * - 어떤 카드를 클릭했는지 저장
   * - 목록 제목 변경
   */
  const handleStatCardClick = (filterType, title) => {
    setActiveFilter(filterType);
    setListTitle(`${title} 리스트`);
  };

  /**
   * 프로젝트를 클릭했을 때
   * - 해당 프로젝트 상세 페이지로 이동
   */
  const handleViewProject = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  /**
   * 게시글을 클릭했을 때
   * - 해당 게시글 상세 페이지로 이동
   */
  const handleViewBoard = (boardId) => {
    navigate(`/project/board`, { state: { boardId } });
  };

  // ========================================
  // 3. 데이터 처리 함수
  // ========================================

  /**
   * 선택된 필터에 맞는 데이터 가져오기
   *
   * @returns {object} 필터링된 데이터
   *   - type: "board" (게시글) 또는 "project" (프로젝트)
   *   - data: 표시할 데이터 배열
   *   - statusClass: 상태 배지 색상
   *   - statusText: 상태 텍스트
   */
  const getFilteredData = () => {
    // 승인 대기 게시글
    if (activeFilter === "pending") {
      return {
        type: "board",
        data: pendingApprovals,
        statusClass: "bg-[#fff3e6] text-[#ff9500]",
        statusText: "승인대기",
      };
    }

    // 반려된 게시글
    if (activeFilter === "rejected") {
      return {
        type: "board",
        data: rejectedDocuments,
        statusClass: "bg-[#ffe6e6] text-[#ff3b30]",
        statusText: "반려",
      };
    }

    // 진행중인 프로젝트
    if (activeFilter === "progress") {
      return {
        type: "project",
        data: progressProjects,
        statusClass: "bg-[#e8f4ff] text-[#007bff]",
        statusText: "진행중",
      };
    }

    // 유지보수 프로젝트
    if (activeFilter === "maintenance") {
      return {
        type: "project",
        data: maintenanceProjects,
        statusClass: "bg-[#e6f7f1] text-[#00c48c]",
        statusText: "유지보수",
      };
    }

    // 기본값 (빈 데이터)
    return { data: [], statusClass: "", statusText: "", type: "" };
  };

  // 현재 필터에 맞는 데이터 가져오기
  const { type, data, statusClass, statusText } = getFilteredData();

  // ========================================
  // 4. 화면 그리기 (렌더링)
  // ========================================

  return (
    <div className="min-h-screen bg-[#f5f5f5] px-4 py-5 font-[-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,'Helvetica_Neue',Arial,sans-serif]">
      <div className="mx-auto max-w-[1400px]">
        {/* ========== 페이지 제목 ========== */}
        <div>
          <h1 className="mb-1.5 text-[22px] font-semibold text-[#1a1a1a]">
            대시보드
          </h1>
        </div>

        {/* ========== 통계 카드 4개 ========== */}
        <div className="mb-5 grid grid-cols-4 gap-4 max-[1200px]:grid-cols-2 max-[768px]:grid-cols-1">
          {/* 1. 승인 대기 */}
          <StatCard
            icon={<ClockIcon />}
            iconColorClass="bg-[#fff3e6] text-[#ff9500]"
            label="승인 대기"
            value="8"
            change="+2 오늘"
            changeType="up"
            isActive={activeFilter === "pending"}
            onClick={() => handleStatCardClick("pending", "승인 대기")}
          />

          {/* 2. 반려 */}
          <StatCard
            icon={<XCircleIcon />}
            iconColorClass="bg-[#ffe6e6] text-[#ff3b30]"
            label="반려"
            value="3"
            change="+1 오늘"
            changeType="up"
            isActive={activeFilter === "rejected"}
            onClick={() => handleStatCardClick("rejected", "반려")}
          />

          {/* 3. 진행중 */}
          <StatCard
            icon={<CheckSquareIcon />}
            iconColorClass="bg-[#e8f4ff] text-[#007bff]"
            label="진행중"
            value="18"
            change="+3 이번 주"
            changeType="up"
            isActive={activeFilter === "progress"}
            onClick={() => handleStatCardClick("progress", "진행중")}
          />

          {/* 4. 유지보수 단계 */}
          <StatCard
            icon={<WrenchIcon />}
            iconColorClass="bg-[#e6f7f1] text-[#00c48c]"
            label="유지보수 단계"
            value="15"
            change="-2 이번 달"
            changeType="down"
            isActive={activeFilter === "maintenance"}
            onClick={() => handleStatCardClick("maintenance", "유지보수 단계")}
          />
        </div>

        {/* ========== 필터링된 목록 (선택한 카드에 따라 변경) ========== */}
        <div className="mb-5 rounded-[12px] bg-white p-[18px] shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          {/* 목록 제목 */}
          <div className="mb-[14px] flex items-center justify-between border-b border-[#e0e0e0] pb-[14px]">
            <h2 className="text-[16px] font-semibold text-[#1a1a1a]">
              {listTitle}
            </h2>
          </div>

          {/* 목록 내용 */}
          <div className="grid max-h-[220px] grid-cols-3 gap-4 overflow-y-auto pr-2.5 max-[1200px]:grid-cols-1">
            {/* 데이터가 없을 때 */}
            {data.length === 0 && (
              <div className="col-span-3 py-10 text-center text-[#999]">
                <p>항목이 없습니다</p>
              </div>
            )}

            {/* 데이터가 있을 때 */}
            {data.length > 0 &&
              data.map((item) => {
                // 게시글 타입이면 DocumentItem 사용
                if (type === "board") {
                  return (
                    <DocumentItem
                      key={item.id}
                      id={item.id}
                      title={item.title}
                      project={item.project}
                      client={item.client}
                      date={item.date}
                      time={item.time}
                      reason={item.reason}
                      status={statusText}
                      statusClass={statusClass}
                      onView={handleViewBoard}
                    />
                  );
                }

                // 프로젝트 타입이면 ProjectItem 사용
                return (
                  <ProjectItem
                    key={item.id}
                    id={item.id}
                    logo={item.name.substring(0, 2)}
                    name={item.name}
                    subtitle={item.client}
                    status={item.status}
                    statusClass={statusClass}
                    onView={handleViewProject}
                  />
                );
              })}
          </div>
        </div>

        {/* ========== 모든 프로젝트 리스트 ========== */}
        <div className="rounded-[12px] bg-white p-[18px] shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          {/* 목록 제목 및 버튼들 */}
          <div className="mb-[14px] flex items-center justify-between border-b border-[#e0e0e0] pb-[14px]">
            <h2 className="text-[16px] font-semibold text-[#1a1a1a]">
              모든 프로젝트 리스트
            </h2>

            {/* 버튼들 */}
            <div className="flex gap-2.5">
              {/* 더보기 버튼 */}
              <button
                onClick={() => alert("전체 프로젝트 페이지로 이동합니다.")}
                className="cursor-pointer rounded-[6px] border border-[#d0d0d0] bg-white px-[15px] py-2 text-[13px] font-semibold text-[#555] transition-all duration-200 hover:bg-[#f0f0f0]"
              >
                더보기
              </button>

              {/* 프로젝트 생성 버튼 */}
              <button
                onClick={() =>
                  alert("새 프로젝트 생성 모달 또는 페이지로 이동합니다.")
                }
                className="cursor-pointer rounded-[6px] border border-[#007bff] bg-[#007bff] px-[15px] py-2 text-[13px] font-semibold text-white transition-all duration-200 hover:border-[#0056b3] hover:bg-[#0056b3]"
              >
                프로젝트 생성
              </button>
            </div>
          </div>

          {/* 프로젝트 카드들 */}
          <div className="grid max-h-[600px] grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-4 overflow-y-auto pr-2 max-[1200px]:grid-cols-[repeat(auto-fill,minmax(320px,1fr))] max-[768px]:grid-cols-1">
            {allProjectsData.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onView={handleViewProject}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
