/**
 * 통계 카드 컴포넌트
 *
 * 승인 요청 페이지 상단에 표시되는 통계 카드입니다.
 * 예: 승인 대기 15건, 승인 완료 42건 등
 *
 * 사용 예시:
 * <StatCard
 *   icon={<ClockIcon />}
 *   iconClass="bg-[#fff3e6] text-[#ff9500]"
 *   value={15}
 *   label="승인 대기"
 * />
 */
const StatCard = ({
  icon,       // 표시할 아이콘 (예: <ClockIcon />)
  iconClass,  // 아이콘 배경 색상 클래스 (예: "bg-[#fff3e6] text-[#ff9500]")
  value,      // 통계 숫자 (예: 15)
  label,      // 카드 라벨 (예: "승인 대기")
}) => {
  return (
    <div className="bg-white rounded-[12px] py-4 px-5 border border-[#e5e7eb] flex items-center gap-[14px] transition-all duration-200 hover:border-[#007bff] hover:shadow-[0_2px_8px_rgba(0,123,255,0.1)]">
      {/* 아이콘 영역 */}
      <div
        className={`w-[44px] h-[44px] rounded-[10px] flex items-center justify-center shrink-0 ${iconClass}`}
      >
        {icon}
      </div>

      {/* 통계 정보 영역 */}
      <div>
        {/* 숫자 */}
        <h3 className="text-[24px] font-bold text-[#1a1a1a] mb-0.5">{value}</h3>
        {/* 라벨 */}
        <p className="text-[13px] text-[#999]">{label}</p>
      </div>
    </div>
  );
};

export default StatCard;