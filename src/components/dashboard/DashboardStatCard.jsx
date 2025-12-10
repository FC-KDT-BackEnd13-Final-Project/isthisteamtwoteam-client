import {
  ChevronDownIcon,
  ChevronUpIcon,
} from "../common/icons/DashboardIcon";

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
  icon, // 표시할 아이콘 (예: <ClockIcon />)
  iconColorClass, // 아이콘 배경 색상 (예: "bg-[#fff3e6] text-[#ff9500]")
  label, // 카드 제목 (예: "승인 대기")
  value, // 통계 숫자 (예: "8")
  isActive, // 현재 선택된 카드인지 여부
  onClick, // 클릭했을 때 실행할 함수
}) => {
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer rounded-[12px] border bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,0.08)] transition-all duration-200 ${
        isActive
          ? "-translate-y-0.5 cursor-default border-[#007bff] shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
          : "border-transparent hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.12)]"
      } `}
    >
      {/* 아이콘 영역 */}
      <div className="mb-3 flex items-start justify-between">
        <div
          className={`flex h-9 w-9 items-center justify-center rounded-[10px] ${iconColorClass}`}
        >
          {icon}
        </div>
      </div>

      {/* 통계 정보 영역 */}
      <div>
        {/* 라벨 (예: "승인 대기") */}
        <div className="mb-1.5 text-[12px] text-[#999]">{label}</div>

        {/* 숫자 값 (예: "8") */}
        <div className="mb-2 text-[24px] leading-none font-bold text-[#1a1a1a]">
          {value}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
