import { ChevronRightIcon } from "./Icons";

// 승인 상태별 스타일 설정
const STATUS_CONFIG = {
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

/**
 * 승인 요청 항목 컴포넌트
 *
 * 각각의 승인 요청 항목을 표시합니다.
 * 상태에 따라 다른 스타일이 적용됩니다.
 *
 * 사용 예시:
 * <ApprovalItem
 *   item={{
 *     id: "1",
 *     title: "전자상거래 플랫폼 기능 요구사항 정의서 v1.2",
 *     project: "전자상거래 플랫폼 구축",
 *     client: "㈜신세계",
 *     date: "2024/11/28 오전 10:30",
 *     status: "pending",
 *     completed: false
 *   }}
 *   onViewDetail={(id) => alert('게시글 보기')}
 * />
 */
const ApprovalItem = ({
  item, // 승인 요청 항목 데이터
  onViewDetail, // 상세보기 버튼 클릭 시 실행할 함수
}) => {
  // 상태에 맞는 설정 가져오기
  const status = STATUS_CONFIG[item.status];

  return (
    <div
      className={`grid grid-cols-[1fr_auto_auto] items-center gap-4 rounded-[10px] border border-[#e5e7eb] bg-white p-4 transition-all duration-200 hover:border-[#007bff] hover:shadow-[0_2px_8px_rgba(0,123,255,0.08)] max-[768px]:grid-cols-1 max-[768px]:gap-3 ${item.completed ? "bg-[#fafafa] opacity-70" : ""} `}
    >
      {/* 왼쪽: 제목 및 프로젝트 정보 */}
      <div className="flex min-w-0 flex-col gap-1.5">
        {/* 제목 - 완료된 항목은 회색으로 표시 */}
        <div
          className={`overflow-hidden text-[14px] font-medium text-ellipsis whitespace-nowrap ${
            item.completed ? "text-[#999]" : "text-[#1a1a1a]"
          }`}
        >
          {item.title}
        </div>

        {/* 프로젝트명, 고객사, 날짜 정보 */}
        <div
          className={`flex flex-wrap items-center gap-3 text-[12px] ${
            item.completed ? "text-[#bbb]" : "text-[#999]"
          }`}
        >
          <span>{item.project}</span>
          <span className="h-[3px] w-[3px] rounded-full bg-[#d0d0d0]"></span>
          <span>{item.client}</span>
          <span className="h-[3px] w-[3px] rounded-full bg-[#d0d0d0]"></span>
          <span>{item.date}</span>
        </div>
      </div>

      {/* 중앙: 상태 배지 (승인 대기, 승인 완료, 승인 거절) */}
      <span
        className={`rounded-[6px] px-3 py-1.5 text-[12px] font-semibold whitespace-nowrap ${status.className}`}
      >
        {status.text}
      </span>

      {/* 오른쪽: 게시글 이동 버튼 */}
      <button
        onClick={() => onViewDetail(item.id)}
        className="flex cursor-pointer items-center gap-1.5 rounded-lg border border-[#e5e7eb] bg-white px-4 py-2 text-[13px] font-medium whitespace-nowrap text-[#555] transition-all duration-200 hover:border-[#007bff] hover:bg-[#007bff] hover:text-white max-[768px]:w-full max-[768px]:justify-center"
      >
        게시글 이동
        <ChevronRightIcon />
      </button>
    </div>
  );
};

export default ApprovalItem;
