import { ChevronUpIcon, ChevronDownIcon } from "./Icons";

/**
 * 통계 카드 컴포넌트
 *
 * 대시보드 상단에 표시되는 통계 정보 카드입니다.
 * 예: 승인 대기 8건, 반려 3건 등
 *
 * 사용 예시:
 * <StatCard
 *   icon={<ClockIcon />}
 *   iconColorClass="bg-[#fff3e6] text-[#ff9500]"
 *   label="승인 대기"
 *   value="8"
 *   change="+2 오늘"
 *   changeType="up"
 *   isActive={true}
 *   onClick={() => handleClick()}
 * />
 */
const StatCard = ({
  icon,              // 표시할 아이콘 (예: <ClockIcon />)
  iconColorClass,    // 아이콘 배경 색상 (예: "bg-[#fff3e6] text-[#ff9500]")
  label,             // 카드 제목 (예: "승인 대기")
  value,             // 통계 숫자 (예: "8")
  change,            // 변화량 텍스트 (예: "+2 오늘")
  changeType,        // 변화 방향 ("up" 또는 "down")
  isActive,          // 현재 선택된 카드인지 여부
  onClick,           // 클릭했을 때 실행할 함수
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
        {/* 라벨 (예: "승인 대기") */}
        <div className="text-[12px] text-[#999] mb-1.5">{label}</div>

        {/* 숫자 값 (예: "8") */}
        <div className="text-[24px] font-bold text-[#1a1a1a] leading-none mb-2">
          {value}
        </div>

        {/* 변화량 배지 (예: "+2 오늘") */}
        <span
          className={`
          inline-flex items-center gap-1 text-[11px] font-medium px-1.5 py-[3px] rounded
          ${
            changeType === "up"
              ? "bg-[#e6f7f1] text-[#00c48c]"  // 증가할 때: 초록색
              : "bg-[#ffe6e6] text-[#ff3b30]"  // 감소할 때: 빨간색
          }
        `}
        >
          {/* 위/아래 화살표 아이콘 */}
          {changeType === "up" ? <ChevronUpIcon /> : <ChevronDownIcon />}
          {change}
        </span>
      </div>
    </div>
  );
};

export default StatCard;
