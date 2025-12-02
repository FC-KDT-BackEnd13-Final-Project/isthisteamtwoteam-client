/**
 * 프로젝트 항목 컴포넌트 (간단한 리스트 형태)
 *
 * 진행중/유지보수 프로젝트 목록에 표시되는 각 프로젝트 항목입니다.
 * 클릭하면 해당 프로젝트의 상세 페이지로 이동합니다.
 *
 * 사용 예시:
 * <ProjectItem
 *   id={1}
 *   logo="홈"
 *   name="홈페이지 리뉴얼"
 *   subtitle="테크기업"
 *   status="진행중"
 *   statusClass="bg-[#e8f4ff] text-[#007bff]"
 *   onView={(id) => console.log('프로젝트 보기', id)}
 * />
 */
const ProjectItem = ({
  id,              // 프로젝트 ID
  logo,            // 프로젝트 로고 (이니셜, 예: "홈")
  name,            // 프로젝트 이름
  subtitle,        // 부제목 (보통 고객사 이름)
  status,          // 프로젝트 상태 (예: "진행중", "유지보수")
  statusClass,     // 상태 배지 스타일
  onView,          // 클릭했을 때 실행할 함수
}) => {
  return (
    <div
      className="flex items-center gap-3 p-3 border border-[#b0b0b0] rounded-[10px] transition-all duration-200 cursor-pointer hover:bg-[#f8f9fa] hover:border-[#a0a0a0]"
      onClick={(e) => {
        e.stopPropagation(); // 다른 요소의 클릭 이벤트가 실행되지 않도록 방지
        onView(id); // 프로젝트 ID를 전달하여 상세 페이지로 이동
      }}
    >
      {/* 프로젝트 로고 (이니셜) */}
      <div className="w-[38px] h-[38px] rounded-lg bg-[#f0f0f0] flex items-center justify-center text-[14px] font-semibold text-[#666] shrink-0">
        {logo}
      </div>

      {/* 프로젝트 정보 */}
      <div className="flex-1 min-w-0">
        {/* 프로젝트 이름 */}
        <div className="text-[13px] font-semibold text-[#1a1a1a] mb-[3px] whitespace-nowrap overflow-hidden text-ellipsis">
          {name}
        </div>
        {/* 부제목 (고객사) */}
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

export default ProjectItem;
