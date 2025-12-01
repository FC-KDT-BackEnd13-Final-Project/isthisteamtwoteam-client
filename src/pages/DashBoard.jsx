import React, { useState } from "react";

// 아이콘 컴포넌트들
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

// 데이터
const pendingApprovals = [
  {
    id: "DOC-001",
    title: "요구사항 정의서 최종본",
    project: "전자상거래 플랫폼",
    client: "㈜신세계",
    date: "2024-11-28",
    time: "오전 10:30",
  },
  {
    id: "DOC-002",
    title: "화면설계 시안 2차",
    project: "AI 챗봇 개발",
    client: "㈜LG",
    date: "2024-11-27",
    time: "오후 3:15",
  },
  {
    id: "DOC-003",
    title: "개발 중간 보고서",
    project: "고객관리 시스템",
    client: "㈜쿠팡",
    date: "2024-11-27",
    time: "오전 11:20",
  },
  {
    id: "DOC-004",
    title: "데이터베이스 설계서",
    project: "클라우드 마이그레이션",
    client: "㈜삼성전자",
    date: "2024-11-26",
    time: "오후 4:50",
  },
  {
    id: "DOC-005",
    title: "UI/UX 최종 시안",
    project: "모바일 앱 리뉴얼",
    client: "㈜카카오",
    date: "2024-11-26",
    time: "오전 9:00",
  },
  {
    id: "DOC-006",
    title: "보안 점검 체크리스트",
    project: "보안 시스템 업그레이드",
    client: "㈜KT",
    date: "2024-11-25",
    time: "오후 2:30",
  },
  {
    id: "DOC-007",
    title: "테스트 결과 보고서",
    project: "ERP 시스템 도입",
    client: "㈜현대자동차",
    date: "2024-11-25",
    time: "오전 10:00",
  },
  {
    id: "DOC-008",
    title: "API 연동 명세서",
    project: "데이터 분석 시스템",
    client: "㈜네이버",
    date: "2024-11-24",
    time: "오후 5:20",
  },
];

const rejectedDocuments = [
  {
    id: "DOC-015",
    title: "디자인 시안 1차",
    project: "모바일 앱 리뉴얼",
    client: "㈜카카오",
    date: "2024-11-20",
    time: "오후 2:00",
    reason: "색상 변경 요청",
  },
  {
    id: "DOC-016",
    title: "API 명세서",
    project: "데이터 분석 시스템",
    client: "㈜네이버",
    date: "2024-11-19",
    time: "오전 11:30",
    reason: "기능 추가 필요",
  },
  {
    id: "DOC-017",
    title: "화면 설계서 초안",
    project: "전자상거래 플랫폼",
    client: "㈜신세계",
    date: "2024-11-18",
    time: "오후 4:15",
    reason: "레이아웃 수정 필요",
  },
];

const progressProjects = [
  { name: "전자상거래 플랫폼 구축", client: "㈜신세계", status: "개발" },
  { name: "AI 챗봇 개발", client: "㈜LG", status: "검수" },
  { name: "고객관리 시스템 구축", client: "㈜쿠팡", status: "화면 설계" },
  { name: "데이터 분석 시스템", client: "㈜네이버", status: "개발" },
  { name: "물류 관리 시스템", client: "㈜CJ대한통운", status: "요구사항 정의" },
  { name: "스마트팩토리 솔루션", client: "㈜LG화학", status: "개발" },
  { name: "VR 교육 콘텐츠", client: "㈜NHN", status: "디자인" },
  { name: "자산관리 시스템", client: "㈜KB국민은행", status: "개발" },
  { name: "클라우드 연동 서비스", client: "㈜SKT", status: "개발" },
  { name: "신규 ERP 모듈 개발", client: "㈜아모레", status: "화면 설계" },
  { name: "추가 프로젝트 1", client: "㈜A고객", status: "개발" },
  { name: "추가 프로젝트 2", client: "㈜B고객", status: "화면 설계" },
];

const maintenanceProjects = [
  { name: "모바일 앱 리뉴얼", client: "㈜카카오", status: "유지보수" },
  { name: "클라우드 마이그레이션", client: "㈜삼성전자", status: "유지보수" },
  { name: "ERP 시스템 도입", client: "㈜현대자동차", status: "유지보수" },
  { name: "보안 시스템 업그레이드", client: "㈜KT", status: "유지보수" },
  { name: "인사관리 시스템", client: "㈜포스코", status: "유지보수" },
  { name: "백오피스 시스템", client: "㈜롯데", status: "유지보수" },
];

const allProjectsData = [
  {
    number: 1,
    id: "PRJ-001",
    name: "전자상거래 플랫폼 구축",
    client: "㈜신세계",
    startDate: "2024/01/15",
    updateDate: "2024/11/20",
    stage: "개발",
  },
  {
    number: 2,
    id: "PRJ-002",
    name: "모바일 앱 리뉴얼",
    client: "㈜카카오",
    startDate: "2024/02/01",
    updateDate: "2024/11/18",
    stage: "유지보수",
  },
  {
    number: 3,
    id: "PRJ-003",
    name: "AI 챗봇 개발",
    client: "㈜LG",
    startDate: "2024/03/10",
    updateDate: "2024/11/22",
    stage: "검수",
  },
  {
    number: 4,
    id: "PRJ-004",
    name: "클라우드 마이그레이션",
    client: "㈜삼성전자",
    startDate: "2024/01/05",
    updateDate: "2024/11/15",
    stage: "유지보수",
  },
  {
    number: 5,
    id: "PRJ-005",
    name: "고객관리 시스템 구축",
    client: "㈜쿠팡",
    startDate: "2024/04/01",
    updateDate: "2024/11/25",
    stage: "화면 설계",
  },
  {
    number: 6,
    id: "PRJ-006",
    name: "데이터 분석 시스템",
    client: "㈜네이버",
    startDate: "2024/05/10",
    updateDate: "2024/11/20",
    stage: "개발",
  },
  {
    number: 7,
    id: "PRJ-007",
    name: "ERP 시스템 도입",
    client: "㈜현대자동차",
    startDate: "2024/02/20",
    updateDate: "2024/11/10",
    stage: "유지보수",
  },
  {
    number: 8,
    id: "PRJ-008",
    name: "보안 시스템 업그레이드",
    client: "㈜KT",
    startDate: "2024/06/15",
    updateDate: "2024/11/08",
    stage: "요구사항 정의",
  },
];

// StatCard 컴포넌트
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
      <div className="flex justify-between items-start mb-3">
        <div
          className={`w-9 h-9 rounded-[10px] flex items-center justify-center ${iconColorClass}`}
        >
          {icon}
        </div>
      </div>
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

// ProjectItem 컴포넌트
const ProjectItem = ({ logo, name, subtitle, status, statusClass }) => {
  return (
    <div className="flex items-center gap-3 p-3 border border-[#b0b0b0] rounded-[10px] transition-all duration-200 cursor-pointer hover:bg-[#f8f9fa] hover:border-[#a0a0a0]">
      <div className="w-[38px] h-[38px] rounded-lg bg-[#f0f0f0] flex items-center justify-center text-[14px] font-semibold text-[#666] shrink-0">
        {logo}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-semibold text-[#1a1a1a] mb-[3px] whitespace-nowrap overflow-hidden text-ellipsis">
          {name}
        </div>
        <div className="text-[11px] text-[#999]">{subtitle}</div>
      </div>
      <span
        className={`px-2.5 py-1 rounded-[5px] text-[11px] font-medium whitespace-nowrap ${statusClass}`}
      >
        {status}
      </span>
    </div>
  );
};

// ProjectCard 컴포넌트
const ProjectCard = ({ project, onView }) => {
  return (
    <div
      onClick={() => onView(project.id)}
      className="group bg-white border border-[#e0e0e0] rounded-[12px] p-[18px] transition-all duration-200 cursor-pointer relative hover:border-[#007bff] hover:shadow-[0_2px_8px_rgba(0,123,255,0.1)]"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onView(project.id);
        }}
        className="absolute top-[18px] right-[18px] px-3 py-1.5 bg-[#007bff] text-white border-none rounded-[6px] text-[12px] font-semibold cursor-pointer opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:bg-[#0056b3]"
      >
        설정
      </button>

      <div className="flex items-start gap-[14px] mb-4 pb-[14px] border-b border-[#f0f0f0]">
        <div className="w-12 h-12 rounded-[10px] bg-[#f8f9fa] flex items-center justify-center text-[16px] font-bold text-[#007bff] shrink-0 border-2 border-[#e8f4ff]">
          {project.name.substring(0, 2)}
        </div>
        <div className="flex-1 min-w-0">
          <span className="inline-block text-[11px] text-[#007bff] bg-[#e8f4ff] px-2 py-[3px] rounded font-semibold mb-1.5">
            {project.id}
          </span>
          <div className="text-[15px] font-semibold text-[#1a1a1a] mb-1 whitespace-nowrap overflow-hidden text-ellipsis">
            {project.name}
          </div>
          <div className="text-[11px] text-[#999]">No. {project.number}</div>
        </div>
      </div>

      <div className="grid gap-2.5 mb-[14px]">
        <div className="flex items-center gap-2 text-[13px]">
          <div className="w-1.5 h-1.5 bg-[#999] rounded-full shrink-0"></div>
          <span className="text-[#999] min-w-[50px] text-[12px]">고객사</span>
          <span className="text-[#333] font-medium flex-1">
            {project.client}
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-[14px] border-t border-[#f0f0f0]">
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
        <div className="px-3 py-1.5 rounded-[6px] text-[12px] font-semibold bg-white text-[#007bff] border-[1.5px] border-[#007bff]">
          {project.stage}
        </div>
      </div>
    </div>
  );
};

// 메인 Dashboard 컴포넌트
export default function Dashboard() {
  const [activeFilter, setActiveFilter] = useState("progress");
  const [listTitle, setListTitle] = useState("진행중 리스트");

  const handleStatCardClick = (filterType, title) => {
    setActiveFilter(filterType);
    setListTitle(`${title} 리스트`);
  };

  const handleViewProject = (projectId) => {
    alert(`프로젝트 ${projectId} 상세 페이지로 이동합니다.`);
  };

  const getFilteredData = () => {
    switch (activeFilter) {
      case "pending":
        return {
          data: pendingApprovals,
          statusClass: "bg-[#fff3e6] text-[#ff9500]",
          statusText: "승인대기",
          isDocument: true,
        };
      case "rejected":
        return {
          data: rejectedDocuments,
          statusClass: "bg-[#ffe6e6] text-[#ff3b30]",
          statusText: "반려",
          isDocument: true,
        };
      case "progress":
        return {
          data: progressProjects,
          statusClass: "bg-[#e8f4ff] text-[#007bff]",
          statusText: "진행중",
          isDocument: false,
        };
      case "maintenance":
        return {
          data: maintenanceProjects,
          statusClass: "bg-[#e6f7f1] text-[#00c48c]",
          statusText: "유지보수",
          isDocument: false,
        };
      default:
        return { data: [], statusClass: "", statusText: "", isDocument: false };
    }
  };

  const { data, statusClass, statusText, isDocument } = getFilteredData();

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-5 px-4 font-[-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,'Helvetica_Neue',Arial,sans-serif]">
      <div className="max-w-[1400px] mx-auto">
        {/* 헤더 */}
        <div>
          <h1 className="text-[22px] font-semibold text-[#1a1a1a] mb-1.5">
            대시보드
          </h1>
          <div className="flex items-center gap-2 text-[14px] text-[#999] mb-5">
            <span className="text-[#007bff] font-medium">Dashboard</span>
            <span>▸</span>
            <span>Overview</span>
          </div>
        </div>

        {/* 통계 카드 그리드 */}
        <div className="grid grid-cols-4 gap-4 mb-5 max-[1200px]:grid-cols-2 max-[768px]:grid-cols-1">
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

        {/* 필터된 리스트 카드 */}
        <div className="bg-white rounded-[12px] p-[18px] shadow-[0_1px_3px_rgba(0,0,0,0.08)] mb-5">
          <div className="flex justify-between items-center pb-[14px] border-b border-[#e0e0e0] mb-[14px]">
            <h2 className="text-[16px] font-semibold text-[#1a1a1a]">
              {listTitle}
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-4 max-h-[220px] overflow-y-auto pr-2.5 max-[1200px]:grid-cols-1">
            {data.length === 0 ? (
              <div className="col-span-3 text-center py-10 text-[#999]">
                <p>항목이 없습니다</p>
              </div>
            ) : (
              data.map((item, index) => (
                <ProjectItem
                  key={index}
                  logo={
                    isDocument
                      ? item.project.substring(0, 2)
                      : item.name.substring(0, 2)
                  }
                  name={isDocument ? item.title : item.name}
                  subtitle={
                    isDocument
                      ? `${item.project} · ${item.client}`
                      : item.client
                  }
                  status={isDocument ? statusText : item.status}
                  statusClass={statusClass}
                />
              ))
            )}
          </div>
        </div>

        {/* 모든 프로젝트 리스트 */}
        <div className="bg-white rounded-[12px] p-[18px] shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
          <div className="flex justify-between items-center pb-[14px] border-b border-[#e0e0e0] mb-[14px]">
            <h2 className="text-[16px] font-semibold text-[#1a1a1a]">
              모든 프로젝트 리스트
            </h2>
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
