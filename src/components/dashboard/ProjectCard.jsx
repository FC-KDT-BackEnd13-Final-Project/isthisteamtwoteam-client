/**
 * 프로젝트 카드 컴포넌트 (상세 정보 포함)
 *
 * "모든 프로젝트 리스트" 섹션에 표시되는 프로젝트 카드입니다.
 * 프로젝트의 상세 정보(고객사, 시작일, 종료일, 단계 등)를 보여줍니다.
 */
const ProjectCard = ({
  project,
  onView,
}) => {
  // 날짜 포맷팅 함수 (YYYY-MM-DD)
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return dateString.split('T')[0]; // ISO 형식에서 날짜 부분만 추출
  };

  return (
    <div
      onClick={() => onView(project.project_id)}
      className="group relative cursor-pointer rounded-[12px] border border-[#e0e0e0] bg-white p-[18px] transition-all duration-200 hover:border-[#007bff] hover:shadow-[0_2px_8px_rgba(0,123,255,0.1)]"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onView(project.project_id);
        }}
        className="absolute top-[18px] right-[18px] cursor-pointer rounded-[6px] border-none bg-[#007bff] px-3 py-1.5 text-[12px] font-semibold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:bg-[#0056b3]"
      >
        설정
      </button>

      <div className="mb-4 flex items-start gap-[14px] border-b border-[#f0f0f0] pb-[14px]">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] border-2 border-[#e8f4ff] bg-[#f8f9fa] text-[16px] font-bold text-[#007bff] overflow-hidden">
          {project.project_image_url ? (
            <img 
              // src={project.project_image_url} 
              src={project.project_image_url} 
              alt={project.project_name}
              className="h-full w-full object-cover"
            />
          ) : (
            project.project_name?.substring(0, 2) || "프"
          )}
        </div>

        <div className="min-w-0 flex-1">
          <span className="mb-1.5 inline-block rounded bg-[#e8f4ff] px-2 py-[3px] text-[11px] font-semibold text-[#007bff]">
            PRJ-{String(project.project_id).padStart(3, '0')}
          </span>

          <div className="mb-1 overflow-hidden text-[15px] font-semibold text-ellipsis whitespace-nowrap text-[#1a1a1a]">
            {project.project_name}
          </div>
        </div>
      </div>

      <div className="mb-[14px] grid gap-2.5">
        {/* 고객사 */}
        <div className="flex items-center gap-2 text-[13px]">
          <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#999]"></div>
          <span className="min-w-[50px] text-[12px] text-[#999]">고객사</span>
          <span className="flex-1 font-medium text-[#333]">
            {project.company_name}
          </span>
        </div>
      </div>

      {/* 하단: 날짜 정보 + 단계 배지 */}
      <div className="flex items-center justify-between border-t border-[#f0f0f0] pt-[14px]">
        {/* 왼쪽: 시작일, 업데이트일 */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[13px]">
            <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#999]"></div>
            <span className="text-[12px] text-[#999]">시작:</span>
            <span className="font-medium text-[#333]">
              {formatDate(project.start_date)}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[13px]">
            <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#999]"></div>
            <span className="text-[12px] text-[#999]">업데이트:</span>
            <span className="font-medium text-[#333]">
              {formatDate(project.end_date)}
            </span>
          </div>
        </div>

        {/* 오른쪽: 단계 배지 */}
        <div className="rounded-[6px] border-[1.5px] border-[#007bff] bg-white px-3 py-1.5 text-[12px] font-semibold text-[#007bff]">
          {project.stage}
        </div>
      </div>
    </div>
  );
};


export default ProjectCard;