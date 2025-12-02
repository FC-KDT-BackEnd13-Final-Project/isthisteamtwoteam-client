import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mock 데이터 import - 별도 파일로 분리하여 관리
import {
  pendingApprovals,
  rejectedDocuments,
} from "../data/mockBoards";
import {
  progressProjects,
  maintenanceProjects,
  allProjectsData,
} from "../data/mockProjects";

// ============================================
// 아이콘 컴포넌트 섹션
// ============================================

const ClockIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

const XCircleIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="15" y1="9" x2="9" y2="15"></line>
    <line x1="9" y1="9" x2="15" y2="15"></line>
  </svg>
);

const CheckSquareIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="9 11 12 14 22 4"></polyline>
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
  </svg>
);

const WrenchIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
  </svg>
);

const ChevronUpIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
  >
    <polyline points="18 15 12 9 6 15"></polyline>
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

// ============================================
// 컴포넌트 정의 섹션
// ============================================

/**
 * StatCard 컴포넌트
 * 대시보드 상단에 통계 정보를 카드 형태로 표시합니다.
 *
 * @param {object} icon - 표시할 아이콘 컴포넌트
 * @param {string} iconColorClass - 아이콘 배경 색상 클래스
 * @param {string} label - 카드 라벨 (예: "승인 대기")
 * @param {string} value - 통계 수치
 * @param {string} change - 변화량 텍스트
 * @param {string} changeType - 변화 타입 ("up" 또는 "down")
 * @param {boolean} isActive - 현재 선택된 카드인지 여부
 * @param {function} onClick - 카드 클릭 핸들러
 */
const StatCard = ({
  icon,
  iconColorClass,
  label,
  value,
  change,
  changeType,
  isActive,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        bg-white rounded-[12px] p-4 shadow-[0_1px_3px_rgba(0,0,0,0.08)]
        transition-all duration-200 cursor-pointer border
        ${
          isActive
            ? "border-[#007bff] shadow-[0_4px_12px_rgba(0,0,0,0.12)] -translate-y-0.5 cursor-default"
            : "border-transparent hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
        }
      `}
    >
      {/* 아이콘 영역 */}
      <div className="flex justify-between items-start mb-3">
        <div
          className={`w-9 h-9 rounded-[10px] flex items-center justify-center ${iconColorClass}`}
        >
          {icon}
        </div>
      </div>

      {/* 통계 정보 영역 */}
      <div>
        <div className="text-[12px] text-[#999] mb-1.5">{label}</div>
        <div className="text-[24px] font-bold text-[#1a1a1a] leading-none mb-2">
          {value}
        </div>
        <span
          className={`
          inline-flex items-center gap-1 text-[11px] font-medium px-1.5 py-[3px] rounded
          ${
            changeType === "up"
              ? "bg-[#e6f7f1] text-[#00c48c]"
              : "bg-[#ffe6e6] text-[#ff3b30]"
          }
        `}
        >
          {changeType === "up" ? <ChevronUpIcon /> : <ChevronDownIcon />}
          {change}
        </span>
      </div>
    </div>
  );
};

/**
 * DocumentItem 컴포넌트
 * 게시글(문서) 항목을 표시합니다.
 * 승인 대기 및 반려 문서 목록에서 사용됩니다.
 *
 * @param {number} id - 게시글 ID
 * @param {string} title - 게시글 제목
 * @param {string} project - 프로젝트 이름
 * @param {string} client - 고객사 이름
 * @param {string} date - 작성 날짜
 * @param {string} time - 작성 시간
 * @param {string} reason - 반려 사유 (선택사항)
 * @param {string} status - 상태 텍스트
 * @param {string} statusClass - 상태 배지 스타일 클래스
 * @param {function} onView - 상세보기 클릭 핸들러
 */
const DocumentItem = ({
  id,
  title,
  project,
  client,
  date,
  time,
  reason,
  status,
  statusClass,
  onView,
}) => {
  return (
    <div
      className="flex flex-col gap-2 p-3 border border-[#b0b0b0] rounded-[10px] transition-all duration-200 hover:bg-[#f8f9fa] hover:border-[#a0a0a0] cursor-pointer"
      onClick={(e) => {
        e.stopPropagation(); // 이벤트 버블링 방지
        onView(id); // 게시글 ID를 전달하여 상세 페이지로 이동
      }}
    >
      <div className="flex items-start justify-between gap-3">
        {/* 제목 및 프로젝트 정보 */}
        <div className="flex-1 min-w-0">
          <div className="text-[13px] font-semibold text-[#1a1a1a] whitespace-nowrap overflow-hidden text-ellipsis">
            {title}
          </div>
          <div className="text-[11px] text-[#999] mt-[2px]">
            {project} · {client}
          </div>
        </div>

        {/* 상태 배지 */}
        <span
          className={`px-2.5 py-1 rounded-[5px] text-[11px] font-medium whitespace-nowrap ${statusClass}`}
        >
          {status}
        </span>
      </div>

      {/* 날짜 및 반려 사유 */}
      <div className="flex items-center justify-between text-[11px] text-[#666]">
        <span>
          {date} · {time}
        </span>
        {reason && (
          <span className="text-[#ff3b30] font-medium whitespace-nowrap">
            사유: {reason}
          </span>
        )}
      </div>
    </div>
  );
};

/**
 * ProjectItem 컴포넌트
 * 프로젝트 항목을 간단한 리스트 형태로 표시합니다.
 * 진행중/유지보수 프로젝트 목록에서 사용됩니다.
 *
 * @param {number} id - 프로젝트 ID
 * @param {string} logo - 프로젝트 로고 (이니셜)
 * @param {string} name - 프로젝트 이름
 * @param {string} subtitle - 부제목 (일반적으로 고객사)
 * @param {string} status - 프로젝트 상태
 * @param {string} statusClass - 상태 배지 스타일 클래스
 * @param {function} onView - 상세보기 클릭 핸들러
 */
const ProjectItem = ({
  id,
  logo,
  name,
  subtitle,
  status,
  statusClass,
  onView,
}) => {
  return (
    <div
      className="flex items-center gap-3 p-3 border border-[#b0b0b0] rounded-[10px] transition-all duration-200 cursor-pointer hover:bg-[#f8f9fa] hover:border-[#a0a0a0]"
      onClick={(e) => {
        e.stopPropagation(); // 이벤트 버블링 방지
        onView(id); // 프로젝트 ID를 전달하여 상세 페이지로 이동
      }}
    >
      {/* 프로젝트 로고 (이니셜) */}
      <div className="w-[38px] h-[38px] rounded-lg bg-[#f0f0f0] flex items-center justify-center text-[14px] font-semibold text-[#666] shrink-0">
        {logo}
      </div>

      {/* 프로젝트 정보 */}
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-semibold text-[#1a1a1a] mb-[3px] whitespace-nowrap overflow-hidden text-ellipsis">
          {name}
        </div>
        <div className="text-[11px] text-[#999]">{subtitle}</div>
      </div>

      {/* 상태 배지 */}
      <span
        className={`px-2.5 py-1 rounded-[5px] text-[11px] font-medium whitespace-nowrap ${statusClass}`}
      >
        {status}
      </span>
    </div>
  );
};

/**
 * ProjectCard 컴포넌트
 * 프로젝트를 카드 형태로 상세하게 표시합니다.
 * "모든 프로젝트 리스트" 섹션에서 사용됩니다.
 *
 * @param {object} project - 프로젝트 데이터 객체
 * @param {function} onView - 상세보기 클릭 핸들러
 */
const ProjectCard = ({ project, onView }) => {
  return (
    <div
      onClick={() => onView(project.id)}
      className="group bg-white border border-[#e0e0e0] rounded-[12px] p-[18px] transition-all duration-200 cursor-pointer relative hover:border-[#007bff] hover:shadow-[0_2px_8px_rgba(0,123,255,0.1)]"
    >
      {/* 설정 버튼 (호버 시 표시) */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // 카드 클릭 이벤트와 분리
          onView(project.id);
        }}
        className="absolute top-[18px] right-[18px] px-3 py-1.5 bg-[#007bff] text-white border-none rounded-[6px] text-[12px] font-semibold cursor-pointer opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:bg-[#0056b3]"
      >
        설정
      </button>

      {/* 프로젝트 헤더 정보 */}
      <div className="flex items-start gap-[14px] mb-4 pb-[14px] border-b border-[#f0f0f0]">
        {/* 프로젝트 로고 (이니셜) */}
        <div className="w-12 h-12 rounded-[10px] bg-[#f8f9fa] flex items-center justify-center text-[16px] font-bold text-[#007bff] shrink-0 border-2 border-[#e8f4ff]">
          {project.name.substring(0, 2)}
        </div>

        <div className="flex-1 min-w-0">
          {/* 프로젝트 ID 배지 */}
          <span className="inline-block text-[11px] text-[#007bff] bg-[#e8f4ff] px-2 py-[3px] rounded font-semibold mb-1.5">
            PRJ-00{project.id}
          </span>

          {/* 프로젝트 이름 */}
          <div className="text-[15px] font-semibold text-[#1a1a1a] mb-1 whitespace-nowrap overflow-hidden text-ellipsis">
            {project.name}
          </div>

          {/* 프로젝트 번호 (있는 경우) */}
          {project.number && (
            <div className="text-[11px] text-[#999]">No. {project.number}</div>
          )}
        </div>
      </div>

      {/* 고객사 정보 */}
      <div className="grid gap-2.5 mb-[14px]">
        <div className="flex items-center gap-2 text-[13px]">
          <div className="w-1.5 h-1.5 bg-[#999] rounded-full shrink-0"></div>
          <span className="text-[#999] min-w-[50px] text-[12px]">고객사</span>
          <span className="text-[#333] font-medium flex-1">
            {project.client}
          </span>
        </div>
      </div>

      {/* 프로젝트 일정 및 단계 정보 */}
      <div className="flex justify-between items-center pt-[14px] border-t border-[#f0f0f0]">
        {/* 날짜 정보 */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-[11px] text-[#666]">
            <div className="w-1 h-1 bg-[#999] rounded-full"></div>
            시작:{" "}
            <strong className="text-[#333] font-semibold">
              {project.startDate}
            </strong>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#666]">
            <div className="w-1 h-1 bg-[#999] rounded-full"></div>
            업데이트:{" "}
            <strong className="text-[#333] font-semibold">
              {project.updateDate}
            </strong>
          </div>
        </div>

        {/* 진행 단계 배지 */}
        <div className="px-3 py-1.5 rounded-[6px] text-[12px] font-semibold bg-white text-[#007bff] border-[1.5px] border-[#007bff]">
          {project.stage}
        </div>
      </div>
    </div>
  );
};

// ============================================
// 메인 Dashboard 컴포넌트
// ============================================

/**
 * Dashboard 메인 컴포넌트
 * 프로젝트 및 게시글 통계, 목록을 표시합니다.
 */
export default function Dashboard() {
  // ============================================
  // State 관리
  // ============================================

  // 현재 선택된 필터 타입 (pending, rejected, progress, maintenance)
  const [activeFilter, setActiveFilter] = useState("pending");

  // 필터된 리스트의 제목
  const [listTitle, setListTitle] = useState("진행중 리스트");

  // React Router의 navigate 함수 (페이지 이동용)
  const navigate = useNavigate();

  // ============================================
  // 이벤트 핸들러 함수들
  // ============================================

  /**
   * StatCard 클릭 핸들러
   * 필터 타입을 변경하고 리스트 제목을 업데이트합니다.
   *
   * @param {string} filterType - 필터 타입 (pending, rejected, progress, maintenance)
   * @param {string} title - 표시할 리스트 제목
   */
  const handleStatCardClick = (filterType, title) => {
    setActiveFilter(filterType);
    setListTitle(`${title} 리스트`);
  };

  /**
   * 프로젝트 상세보기 핸들러
   * 프로젝트 ID를 받아 해당 프로젝트의 상세 페이지로 이동합니다.
   *
   * @param {number} projectId - 프로젝트 ID
   */
  const handleViewProject = (projectId) => {
    // /project/:projectId 경로로 이동
    navigate(`/project/${projectId}`);
  };

  /**
   * 게시글 상세보기 핸들러
   * 게시글 ID를 받아 해당 게시글의 상세 페이지로 이동합니다.
   *
   * @param {number} boardId - 게시글 ID
   */
  const handleViewBoard = (boardId) => {
    // /project/board 경로로 이동하면서 state로 boardId 전달
    // 또는 쿼리 파라미터로 전달: /project/board?id=${boardId}
    navigate(`/project/board`, { state: { boardId } });
  };

  /**
   * 현재 선택된 필터에 따라 표시할 데이터를 반환합니다.
   *
   * @returns {object} 필터링된 데이터와 스타일 정보
   *   - type: 데이터 타입 ("board" 또는 "project")
   *   - data: 표시할 데이터 배열
   *   - statusClass: 상태 배지의 Tailwind CSS 클래스
   *   - statusText: 상태 텍스트
   */
  const getFilteredData = () => {
    switch (activeFilter) {
      case "pending":
        // 승인 대기 중인 게시글 목록
        return {
          type: "board",
          data: pendingApprovals,
          statusClass: "bg-[#fff3e6] text-[#ff9500]",
          statusText: "승인대기",
        };
      case "rejected":
        // 반려된 게시글 목록
        return {
          type: "board",
          data: rejectedDocuments,
          statusClass: "bg-[#ffe6e6] text-[#ff3b30]",
          statusText: "반려",
        };
      case "progress":
        // 진행 중인 프로젝트 목록
        return {
          type: "project",
          data: progressProjects,
          statusClass: "bg-[#e8f4ff] text-[#007bff]",
          statusText: "진행중",
        };
      case "maintenance":
        // 유지보수 단계의 프로젝트 목록
        return {
          type: "project",
          data: maintenanceProjects,
          statusClass: "bg-[#e6f7f1] text-[#00c48c]",
          statusText: "유지보수",
        };
      default:
        return { data: [], statusClass: "", statusText: "", type: "" };
    }
  };

  // 현재 필터에 맞는 데이터 가져오기
  const { type, data, statusClass, statusText } = getFilteredData();

  // ============================================
  // 렌더링
  // ============================================

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-5 px-4 font-[-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,'Helvetica_Neue',Arial,sans-serif]">
      <div className="max-w-[1400px] mx-auto">
        {/* ========== 헤더 ========== */}
        <div>
          <h1 className="text-[22px] font-semibold text-[#1a1a1a] mb-1.5">
            대시보드
          </h1>
        </div>

        {/* ========== 통계 카드 그리드 ========== */}
        <div className="grid grid-cols-4 gap-4 mb-5 max-[1200px]:grid-cols-2 max-[768px]:grid-cols-1">
          {/* 승인 대기 카드 */}
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

          {/* 반려 카드 */}
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

          {/* 진행중 카드 */}
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

          {/* 유지보수 단계 카드 */}
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

        {/* ========== 필터된 리스트 카드 (승인 대기, 반려, 진행중, 유지보수) ========== */}
        <div className="bg-white rounded-[12px] p-[18px] shadow-[0_1px_3px_rgba(0,0,0,0.08)] mb-5">
          {/* 리스트 헤더 */}
          <div className="flex justify-between items-center pb-[14px] border-b border-[#e0e0e0] mb-[14px]">
            <h2 className="text-[16px] font-semibold text-[#1a1a1a]">
              {listTitle}
            </h2>
          </div>

          {/* 리스트 그리드 */}
          <div className="grid grid-cols-3 gap-4 max-h-[220px] overflow-y-auto pr-2.5 max-[1200px]:grid-cols-1">
            {data.length === 0 ? (
              // 데이터가 없을 때
              <div className="col-span-3 text-center py-10 text-[#999]">
                <p>항목이 없습니다</p>
              </div>
            ) : (
              // 데이터가 있을 때 - 타입에 따라 다른 컴포넌트 렌더링
              data.map((item) =>
                type === "board" ? (
                  // 게시글 타입일 때 DocumentItem 렌더링
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
                ) : (
                  // 프로젝트 타입일 때 ProjectItem 렌더링
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
                )
              )
            )}
          </div>
        </div>

        {/* ========== 모든 프로젝트 리스트 ========== */}
        <div className="bg-white rounded-[12px] p-[18px] shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          {/* 리스트 헤더 */}
          <div className="flex justify-between items-center pb-[14px] border-b border-[#e0e0e0] mb-[14px]">
            <h2 className="text-[16px] font-semibold text-[#1a1a1a]">
              모든 프로젝트 리스트
            </h2>

            {/* 액션 버튼들 */}
            <div className="flex gap-2.5">
              <button
                onClick={() => alert("전체 프로젝트 페이지로 이동합니다.")}
                className="px-[15px] py-2 rounded-[6px] text-[13px] font-semibold cursor-pointer transition-all duration-200 bg-white text-[#555] border border-[#d0d0d0] hover:bg-[#f0f0f0]"
              >
                더보기
              </button>
              <button
                onClick={() =>
                  alert("새 프로젝트 생성 모달 또는 페이지로 이동합니다.")
                }
                className="px-[15px] py-2 rounded-[6px] text-[13px] font-semibold cursor-pointer transition-all duration-200 bg-[#007bff] text-white border border-[#007bff] hover:bg-[#0056b3] hover:border-[#0056b3]"
              >
                프로젝트 생성
              </button>
            </div>
          </div>

          {/* 프로젝트 카드 그리드 */}
          <div className="grid grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-4 max-h-[600px] overflow-y-auto pr-2 max-[1200px]:grid-cols-[repeat(auto-fill,minmax(320px,1fr))] max-[768px]:grid-cols-1">
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
