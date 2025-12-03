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
  id, // 프로젝트 ID
  logo, // 프로젝트 로고 (이니셜, 예: "홈")
  name, // 프로젝트 이름
  subtitle, // 부제목 (보통 고객사 이름)
  status, // 프로젝트 상태 (예: "진행중", "유지보수")
  statusClass, // 상태 배지 스타일
  onView, // 클릭했을 때 실행할 함수
}) => {
  return (
    <div
      className="flex cursor-pointer items-center gap-3 rounded-[10px] border border-[#b0b0b0] p-3 transition-all duration-200 hover:border-[#a0a0a0] hover:bg-[#f8f9fa]"
      onClick={(e) => {
        e.stopPropagation(); // 다른 요소의 클릭 이벤트가 실행되지 않도록 방지
        onView(id); // 프로젝트 ID를 전달하여 상세 페이지로 이동
      }}
    >
      {/* 프로젝트 로고 (이니셜) */}
      <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-lg bg-[#f0f0f0] text-[14px] font-semibold text-[#666]">
        {logo}
      </div>

      {/* 프로젝트 정보 */}
      <div className="min-w-0 flex-1">
        {/* 프로젝트 이름 */}
        <div className="mb-[3px] overflow-hidden text-[13px] font-semibold text-ellipsis whitespace-nowrap text-[#1a1a1a]">
          {name}
        </div>
        {/* 부제목 (고객사) */}
        <div className="text-[11px] text-[#999]">{subtitle}</div>
      </div>

      {/* 상태 배지 */}
      <span
        className={`rounded-[5px] px-2.5 py-1 text-[11px] font-medium whitespace-nowrap ${statusClass}`}
      >
        {status}
      </span>
    </div>
  );
};

export default ProjectItem;
