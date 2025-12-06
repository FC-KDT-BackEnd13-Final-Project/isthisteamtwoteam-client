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
  project, // 프로젝트 정보 객체
  onView, // 클릭했을 때 실행할 함수
}) => {
  return (
    <div
      onClick={() => onView(project.id)}
      className="group relative cursor-pointer rounded-[12px] border border-[#e0e0e0] bg-white p-[18px] transition-all duration-200 hover:border-[#007bff] hover:shadow-[0_2px_8px_rgba(0,123,255,0.1)]"
    >
      {/* 설정 버튼 (마우스를 올렸을 때만 보임) */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // 카드 클릭과 버튼 클릭을 분리
          onView(project.id);
        }}
        className="absolute top-[18px] right-[18px] cursor-pointer rounded-[6px] border-none bg-[#007bff] px-3 py-1.5 text-[12px] font-semibold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:bg-[#0056b3]"
      >
        설정
      </button>

      {/* 프로젝트 헤더 정보 */}
      <div className="mb-4 flex items-start gap-[14px] border-b border-[#f0f0f0] pb-[14px]">
        {/* 프로젝트 로고 (이름의 첫 2글자) */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] border-2 border-[#e8f4ff] bg-[#f8f9fa] text-[16px] font-bold text-[#007bff]">
          {project.name.substring(0, 2)}
        </div>

        <div className="min-w-0 flex-1">
          {/* 프로젝트 ID 배지 */}
          <span className="mb-1.5 inline-block rounded bg-[#e8f4ff] px-2 py-[3px] text-[11px] font-semibold text-[#007bff]">
            PRJ-00{project.id}
          </span>

          {/* 프로젝트 이름 */}
          <div className="mb-1 overflow-hidden text-[15px] font-semibold text-ellipsis whitespace-nowrap text-[#1a1a1a]">
            {project.name}
          </div>

          {/* 프로젝트 번호 (있는 경우만 표시) */}
          {project.number && (
            <div className="text-[11px] text-[#999]">No. {project.number}</div>
          )}
        </div>
      </div>

      {/* 고객사 정보 */}
      <div className="mb-[14px] grid gap-2.5">
        <div className="flex items-center gap-2 text-[13px]">
          <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#999]"></div>
          <span className="min-w-[50px] text-[12px] text-[#999]">고객사</span>
          <span className="flex-1 font-medium text-[#333]">
            {project.client}
          </span>
        </div>
      </div>

      {/* 프로젝트 일정 및 단계 정보 */}
      <div className="flex items-center justify-between border-t border-[#f0f0f0] pt-[14px]">
        {/* 날짜 정보 */}
        <div className="flex flex-col gap-1">
          {/* 시작일 */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#666]">
            <div className="h-1 w-1 rounded-full bg-[#999]"></div>
            시작:{" "}
            <strong className="font-semibold text-[#333]">
              {project.startDate}
            </strong>
          </div>
          {/* 최근 업데이트일 */}
          <div className="flex items-center gap-1.5 text-[11px] text-[#666]">
            <div className="h-1 w-1 rounded-full bg-[#999]"></div>
            업데이트:{" "}
            <strong className="font-semibold text-[#333]">
              {project.updateDate}
            </strong>
          </div>
        </div>

        {/* 진행 단계 배지 */}
        <div className="rounded-[6px] border-[1.5px] border-[#007bff] bg-white px-3 py-1.5 text-[12px] font-semibold text-[#007bff]">
          {project.stage}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
