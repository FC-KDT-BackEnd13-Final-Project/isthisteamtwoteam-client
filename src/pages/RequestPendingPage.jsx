import React from "react";

// 아이콘 컴포넌트들
const ClockIcon = () => (
  <svg
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="10" strokeWidth="2"></circle>
    <polyline points="12 6 12 12 16 14" strokeWidth="2"></polyline>
  </svg>
);

const CheckCircleIcon = () => (
  <svg
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      strokeWidth="2"
    ></path>
  </svg>
);

const XCircleIcon = () => (
  <svg
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="10" strokeWidth="2"></circle>
    <line x1="15" y1="9" x2="9" y2="15" strokeWidth="2"></line>
    <line x1="9" y1="9" x2="15" y2="15" strokeWidth="2"></line>
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    className="w-4 h-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 5l7 7-7 7"
    ></path>
  </svg>
);

// 데이터
const approvalData = {
  stats: {
    pending: 15,
    approved: 42,
    rejected: 6,
  },
  sections: [
    {
      title: "요구사항 정의",
      count: 3,
      items: [
        {
          id: "1",
          title: "전자상거래 플랫폼 기능 요구사항 정의서 v1.2",
          project: "전자상거래 플랫폼 구축",
          client: "㈜신세계",
          date: "2024/11/28 오전 10:30",
          status: "pending",
          completed: false,
        },
        {
          id: "2",
          title: "AI 챗봇 대화 시나리오 및 기능 명세서",
          project: "AI 챗봇 개발",
          client: "㈜LG",
          date: "2024/11/27 오후 3:15",
          status: "approved",
          completed: true,
        },
        {
          id: "3",
          title: "고객 관리 시스템 비기능 요구사항 정의",
          project: "고객관리 시스템 구축",
          client: "㈜쿠팡",
          date: "2024/11/27 오전 11:20",
          status: "rejected",
          completed: false,
        },
      ],
    },
    {
      title: "화면설계",
      count: 4,
      items: [
        {
          id: "4",
          title: "회원가입 및 로그인 프로세스 화면 설계서",
          project: "전자상거래 플랫폼 구축",
          client: "㈜신세계",
          date: "2024/11/26 오전 10:00",
          status: "pending",
          completed: false,
        },
        {
          id: "5",
          title: "관리자 페이지 메뉴 구조 및 화면 정의서",
          project: "고객관리 시스템 구축",
          client: "㈜쿠팡",
          date: "2024/11/25 오후 4:15",
          status: "approved",
          completed: true,
        },
        {
          id: "6",
          title: "데이터 시각화 대시보드 화면 설계",
          project: "데이터 분석 시스템",
          client: "㈜네이버",
          date: "2024/11/24 오전 9:30",
          status: "pending",
          completed: false,
        },
        {
          id: "7",
          title: "모바일 주문 화면 플로우 설계서",
          project: "모바일 앱 리뉴얼",
          client: "㈜카카오",
          date: "2024/11/23 오후 2:20",
          status: "approved",
          completed: true,
        },
      ],
    },
    {
      title: "디자인/퍼블리싱",
      count: 5,
      items: [
        {
          id: "8",
          title: "모바일 앱 UI/UX 디자인 시안 2차",
          project: "모바일 앱 리뉴얼",
          client: "㈜카카오",
          date: "2024/11/26 오전 9:00",
          status: "pending",
          completed: false,
        },
        {
          id: "9",
          title: "보안 시스템 관리자 대시보드 디자인 최종본",
          project: "보안 시스템 업그레이드",
          client: "㈜KT",
          date: "2024/11/25 오후 2:30",
          status: "approved",
          completed: true,
        },
        {
          id: "10",
          title: "브랜드 컬러 가이드라인 및 디자인 시스템",
          project: "데이터 분석 시스템",
          client: "㈜네이버",
          date: "2024/11/24 오후 5:20",
          status: "rejected",
          completed: false,
        },
        {
          id: "11",
          title: "반응형 웹 퍼블리싱 (PC/Mobile/Tablet)",
          project: "물류 관리 시스템",
          client: "㈜CJ대한통운",
          date: "2024/11/22 오후 3:20",
          status: "pending",
          completed: false,
        },
        {
          id: "12",
          title: "메인 페이지 HTML/CSS 마크업 산출물",
          project: "전자상거래 플랫폼 구축",
          client: "㈜신세계",
          date: "2024/11/21 오전 11:00",
          status: "approved",
          completed: true,
        },
      ],
    },
    {
      title: "개발",
      count: 3,
      items: [
        {
          id: "13",
          title: "결제 모듈 API 연동 개발 완료",
          project: "전자상거래 플랫폼 구축",
          client: "㈜신세계",
          date: "2024/11/20 오후 3:30",
          status: "pending",
          completed: false,
        },
        {
          id: "14",
          title: "사용자 권한 관리 기능 개발",
          project: "고객관리 시스템 구축",
          client: "㈜쿠팡",
          date: "2024/11/19 오전 10:15",
          status: "approved",
          completed: true,
        },
        {
          id: "15",
          title: "실시간 데이터 처리 배치 프로그램",
          project: "데이터 분석 시스템",
          client: "㈜네이버",
          date: "2024/11/18 오후 5:00",
          status: "pending",
          completed: false,
        },
      ],
    },
    {
      title: "검수",
      count: 2,
      items: [
        {
          id: "16",
          title: "통합 테스트 결과 보고서",
          project: "모바일 앱 리뉴얼",
          client: "㈜카카오",
          date: "2024/11/17 오전 11:00",
          status: "pending",
          completed: false,
        },
        {
          id: "17",
          title: "보안 취약점 점검 결과 및 조치사항",
          project: "보안 시스템 업그레이드",
          client: "㈜KT",
          date: "2024/11/16 오후 2:45",
          status: "approved",
          completed: true,
        },
      ],
    },
    {
      title: "유지보수",
      count: 1,
      items: [
        {
          id: "18",
          title: "월간 유지보수 활동 보고서 (2024년 10월)",
          project: "ERP 시스템 도입",
          client: "㈜현대자동차",
          date: "2024/11/15 오전 9:00",
          status: "approved",
          completed: true,
        },
      ],
    },
  ],
};

// StatCard 컴포넌트
const StatCard = ({ icon, iconClass, value, label }) => {
  return (
    <div className="bg-white rounded-[12px] py-4 px-5 border border-[#e5e7eb] flex items-center gap-[14px] transition-all duration-200 hover:border-[#007bff] hover:shadow-[0_2px_8px_rgba(0,123,255,0.1)]">
      <div
        className={`w-[44px] h-[44px] rounded-[10px] flex items-center justify-center shrink-0 ${iconClass}`}
      >
        {icon}
      </div>
      <div>
        <h3 className="text-[24px] font-bold text-[#1a1a1a] mb-0.5">{value}</h3>
        <p className="text-[13px] text-[#999]">{label}</p>
      </div>
    </div>
  );
};

// ApprovalItem 컴포넌트
const ApprovalItem = ({ item, onViewDetail }) => {
  const statusConfig = {
    pending: {
      text: "승인 대기",
      className: "bg-[#fff3e6] text-[#ff9500] border border-[#ffd699]",
    },
    approved: {
      text: "승인 완료",
      className: "bg-[#e6f7f1] text-[#16a34a] border border-[#a3e6c8]",
    },
    rejected: {
      text: "승인 거절",
      className: "bg-[#ffe6e6] text-[#dc2626] border border-[#ffb3b3]",
    },
  };

  const status = statusConfig[item.status];

  return (
    <div
      className={`
        grid grid-cols-[1fr_auto_auto] gap-4 items-center p-4 border border-[#e5e7eb] rounded-[10px] 
        transition-all duration-200 bg-white hover:border-[#007bff] hover:shadow-[0_2px_8px_rgba(0,123,255,0.08)]
        max-[768px]:grid-cols-1 max-[768px]:gap-3
        ${item.completed ? "bg-[#fafafa] opacity-70" : ""}
      `}
    >
      <div className="flex flex-col gap-1.5 min-w-0">
        <div
          className={`text-[14px] font-medium whitespace-nowrap overflow-hidden text-ellipsis ${
            item.completed ? "text-[#999]" : "text-[#1a1a1a]"
          }`}
        >
          {item.title}
        </div>
        <div
          className={`flex items-center gap-3 text-[12px] flex-wrap ${
            item.completed ? "text-[#bbb]" : "text-[#999]"
          }`}
        >
          <span>{item.project}</span>
          <span className="w-[3px] h-[3px] bg-[#d0d0d0] rounded-full"></span>
          <span>{item.client}</span>
          <span className="w-[3px] h-[3px] bg-[#d0d0d0] rounded-full"></span>
          <span>{item.date}</span>
        </div>
      </div>
      <span
        className={`py-1.5 px-3 rounded-[6px] text-[12px] font-semibold whitespace-nowrap ${status.className}`}
      >
        {status.text}
      </span>
      <button
        onClick={() => onViewDetail(item.id)}
        className="flex items-center gap-1.5 py-2 px-4 bg-white text-[#555] border border-[#e5e7eb] rounded-lg text-[13px] font-medium cursor-pointer transition-all duration-200 whitespace-nowrap hover:bg-[#007bff] hover:text-white hover:border-[#007bff] max-[768px]:w-full max-[768px]:justify-center"
      >
        게시글 이동
        <ChevronRightIcon />
      </button>
    </div>
  );
};

// Section 컴포넌트
const Section = ({ title, count, items, onViewDetail }) => {
  return (
    <div className="bg-white rounded-[12px] p-5 mb-6 border border-[#e5e7eb]">
      <div className="flex items-center justify-between mb-[18px] pb-4 border-b border-[#e5e7eb]">
        <h2 className="text-[17px] font-semibold text-[#1a1a1a]">{title}</h2>
        <span className="text-[13px] text-[#999] bg-[#f8f9fa] py-1 px-3 rounded-[12px]">
          {count}건
        </span>
      </div>
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <ApprovalItem key={item.id} item={item} onViewDetail={onViewDetail} />
        ))}
      </div>
    </div>
  );
};

// 메인 컴포넌트
export default function RequestPendingPage() {
  const handleViewDetail = (id) => {
    alert(`게시글 ${id} 상세 페이지로 이동합니다.`);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-5 px-4 font-[-apple-system,BlinkMacSystemFont,'Segoe_UI','Roboto','Oxygen','Ubuntu',sans-serif] text-[#0a0a0a] leading-normal">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-[22px] font-semibold text-[#1a1a1a] mb-1.5">
            승인 요청 알림
          </h1>
          <div className="flex items-center gap-2 text-[14px] text-[#999]">
            <span>알림</span>
            <span>▸</span>
            <span className="text-[#007bff] font-medium">승인 요청</span>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 mb-6">
          <StatCard
            icon={<ClockIcon />}
            iconClass="bg-[#fff3e6] text-[#ff9500]"
            value={approvalData.stats.pending}
            label="승인 대기"
          />
          <StatCard
            icon={<CheckCircleIcon />}
            iconClass="bg-[#e6f7f1] text-[#16a34a]"
            value={approvalData.stats.approved}
            label="승인 완료"
          />
          <StatCard
            icon={<XCircleIcon />}
            iconClass="bg-[#ffe6e6] text-[#dc2626]"
            value={approvalData.stats.rejected}
            label="반려"
          />
        </div>

        {/* Sections */}
        {approvalData.sections.map((section, index) => (
          <Section
            key={index}
            title={section.title}
            count={section.count}
            items={section.items}
            onViewDetail={handleViewDetail}
          />
        ))}
      </div>
    </div>
  );
}
