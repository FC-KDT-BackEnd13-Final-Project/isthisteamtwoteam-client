/**
 * 프로젝트 카드 컴포넌트
 */
const ProjectListCard = ({ project, onView }) => {
  // 날짜 포맷팅 함수 (YYYY-MM-DD)
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return dateString.split('T')[0];
  };

  // 단계별 색상 매핑
  const getStageColor = (stageName) => {
    const colorMap = {
      '진행 전': 'bg-gray-100 text-gray-700 border-gray-300',
      '진행 중단': 'bg-red-100 text-red-700 border-red-300',
      '요구사항 정의': 'bg-blue-100 text-blue-700 border-blue-300',
      '화면 설계': 'bg-cyan-100 text-cyan-700 border-cyan-300',
      '디자인, 퍼블리싱': 'bg-purple-100 text-purple-700 border-purple-300',
      '개발': 'bg-green-100 text-green-700 border-green-300',
      '검수': 'bg-yellow-100 text-yellow-700 border-yellow-300',
      '유지보수': 'bg-orange-100 text-orange-700 border-orange-300',
      '완료': 'bg-emerald-100 text-emerald-700 border-emerald-300'
    };
    return colorMap[stageName] || 'bg-gray-100 text-gray-700 border-gray-300';
  };

  return (
    <div
      onClick={() => onView(project.projectId)}
      className="group relative cursor-pointer rounded-[12px] border border-[#e0e0e0] bg-white p-[18px] transition-all duration-200 hover:border-[#007bff] hover:shadow-[0_2px_8px_rgba(0,123,255,0.1)]"
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          onView(project.projectId);
        }}
        className="absolute top-[18px] right-[18px] cursor-pointer rounded-[6px] border-none bg-[#007bff] px-3 py-1.5 text-[12px] font-semibold text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100 hover:bg-[#0056b3]"
      >
        설정
      </button>

      <div className="mb-4 flex items-start gap-[14px] border-b border-[#f0f0f0] pb-[14px]">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] border-2 border-[#e8f4ff] bg-[#f8f9fa] text-[16px] font-bold text-[#007bff] overflow-hidden">
          {project.projectName?.substring(0, 2) || "프"}
        </div>

        <div className="min-w-0 flex-1">
          <span className="mb-1.5 inline-block rounded bg-[#e8f4ff] px-2 py-[3px] text-[11px] font-semibold text-[#007bff]">
            PRJ-{String(project.projectId).padStart(3, '0')}
          </span>

          <div className="mb-1 overflow-hidden text-[15px] font-semibold text-ellipsis whitespace-nowrap text-[#1a1a1a]">
            {project.projectName}
          </div>
        </div>
      </div>

      <div className="mb-[14px] grid gap-2.5">
        {/* 담당자 (members 배열에서 첫 번째) */}
        {project.members && project.members.length > 0 && (
          <div className="flex items-center gap-2 text-[13px]">
            <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#999]"></div>
            <span className="min-w-[50px] text-[12px] text-[#999]">담당자</span>
            <span className="flex-1 font-medium text-[#333]">
              {project.members.length}명
            </span>
          </div>
        )}
      </div>

      {/* 하단: 날짜 정보 + 단계 배지 */}
      <div className="flex items-center justify-between border-t border-[#f0f0f0] pt-[14px]">
        {/* 왼쪽: 시작일, 종료일 */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[13px]">
            <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#999]"></div>
            <span className="text-[12px] text-[#999]">시작:</span>
            <span className="font-medium text-[#333]">
              {formatDate(project.startDate)}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[13px]">
            <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#999]"></div>
            <span className="text-[12px] text-[#999]">종료:</span>
            <span className="font-medium text-[#333]">
              {formatDate(project.endDate)}
            </span>
          </div>
        </div>

        {/* 오른쪽: 단계 배지 */}
        <div className={`rounded-[6px] border-[1.5px] px-3 py-1.5 text-[12px] font-semibold ${getStageColor(project.stageName)}`}>
          {project.stageName}
        </div>
      </div>
    </div>
  );
};

export default ProjectListCard;