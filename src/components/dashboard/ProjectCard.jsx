/**
 * 프로젝트 카드 컴포넌트 (상세 정보 포함)
 *
 * "모든 프로젝트 리스트" 섹션에 표시되는 프로젝트 카드입니다.
 * 프로젝트의 상세 정보(고객사, 시작일, 업데이트일, 단계 등)를 보여줍니다.
 *
 * 사용 예시:
 * <ProjectCard
 *   project={{
 *     id: 1,
 *     name: "홈페이지 리뉴얼",
 *     number: "2024-001",
 *     client: "테크기업",
 *     startDate: "2024-01-15",
 *     updateDate: "2024-03-20",
 *     stage: "개발 단계"
 *   }}
 *   onView={(id) => console.log('프로젝트 보기', id)}
 * />
 */
const ProjectCard = ({
  project,   // 프로젝트 정보 객체
  onView     // 클릭했을 때 실행할 함수
}) => {
  return (
    <div
      onClick={() => onView(project.id)}
      className="group bg-white border border-[#e0e0e0] rounded-[12px] p-[18px] transition-all duration-200 cursor-pointer relative hover:border-[#007bff] hover:shadow-[0_2px_8px_rgba(0,123,255,0.1)]"
    >
      {/* 설정 버튼 (마우스를 올렸을 때만 보임) */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // 카드 클릭과 버튼 클릭을 분리
          onView(project.id);
        }}
        className="absolute top-[18px] right-[18px] px-3 py-1.5 bg-[#007bff] text-white border-none rounded-[6px] text-[12px] font-semibold cursor-pointer opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:bg-[#0056b3]"
      >
        설정
      </button>

      {/* 프로젝트 헤더 정보 */}
      <div className="flex items-start gap-[14px] mb-4 pb-[14px] border-b border-[#f0f0f0]">
        {/* 프로젝트 로고 (이름의 첫 2글자) */}
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

          {/* 프로젝트 번호 (있는 경우만 표시) */}
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
          {/* 시작일 */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#666]">
            <div className="w-1 h-1 bg-[#999] rounded-full"></div>
            시작:{" "}
            <strong className="text-[#333] font-semibold">
              {project.startDate}
            </strong>
          </div>
          {/* 최근 업데이트일 */}
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

export default ProjectCard;
