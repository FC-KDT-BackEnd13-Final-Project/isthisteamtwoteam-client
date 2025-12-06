import { RestoreIcon, TrashIcon } from "../common/icons/RemoveProjectIcon";

/**
 * 삭제된 프로젝트 항목 컴포넌트
 *
 * 삭제된 개별 프로젝트 정보를 표시하고 복원/영구삭제 기능을 제공합니다.
 * 체크박스를 통해 선택할 수 있으며, 프로젝트 ID, 이름, 클라이언트, 날짜 정보를 보여줍니다.
 *
 * Props:
 * @param {Object} project - 프로젝트 정보 { id, name, client, createdDate, deletedDate, imageUrl }
 * @param {boolean} isSelected - 현재 선택된 상태인지 여부
 * @param {Function} onToggle - 체크박스 선택/해제 함수
 * @param {Function} onRestore - 복원 버튼 클릭 함수
 * @param {Function} onDelete - 영구삭제 버튼 클릭 함수
 *
 * 사용 예시:
 * <RemovedProjectItem
 *   project={{ id: 'PRJ-001', name: '프로젝트', client: '클라이언트', ... }}
 *   isSelected={false}
 *   onToggle={(id) => console.log('선택', id)}
 *   onRestore={(id) => console.log('복원', id)}
 *   onDelete={(id) => console.log('삭제', id)}
 * />
 */
const RemovedProjectItem = ({
  project,
  isSelected,
  onToggle,
  onRestore,
  onDelete,
}) => {
  // 프로젝트 로고 표시 (이미지가 있으면 이미지, 없으면 이름의 첫 2글자)
  const logo = project.imageUrl ? (
    <img
      src={project.imageUrl}
      alt={project.name}
      className="w-full h-full object-cover rounded-lg"
    />
  ) : (
    project.name.substring(0, 2)
  );

  return (
    <div className="flex items-center py-4 px-5 border-b border-[#e8e8e8] last:border-b-0 transition-all duration-200 hover:bg-[#fafafa]">
      {/* 선택 체크박스 */}
      <div className="mr-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggle(project.id)}
          className="w-[18px] h-[18px] cursor-pointer"
        />
      </div>

      {/* 프로젝트 로고 */}
      <div className="w-12 h-12 flex items-center justify-center bg-[#f0f6ff] rounded-lg mr-4 text-[16px] font-semibold text-[#5a9aeb]">
        {logo}
      </div>

      {/* 프로젝트 정보 영역 */}
      <div className="flex-1 min-w-0 grid grid-cols-[2fr_1.5fr_1fr_1fr] gap-6 items-center">
        {/* 프로젝트 ID 및 이름 */}
        <div className="min-w-0">
          <div className="text-[13px] font-medium text-[#5a9aeb] mb-1">
            {project.id}
          </div>
          <div className="text-[14px] text-[#333] overflow-hidden text-ellipsis whitespace-nowrap">
            {project.name}
          </div>
        </div>

        {/* 클라이언트명 */}
        <div className="text-[13px] text-[#666]">{project.client}</div>

        {/* 생성일 */}
        <div className="flex flex-col gap-0.5">
          <span className="text-[12px] text-[#999]">생성일</span>
          <span className="text-[13px] text-[#333]">{project.createdDate}</span>
        </div>

        {/* 삭제일 */}
        <div className="flex flex-col gap-0.5">
          <span className="text-[12px] text-[#999]">삭제일</span>
          <span className="text-[13px] text-[#333]">{project.deletedDate}</span>
        </div>
      </div>

      {/* 액션 버튼 영역 */}
      <div className="flex gap-2 ml-4">
        {/* 복원 버튼 */}
        <button
          onClick={() => onRestore(project.id)}
          className="py-1.5 px-3 border border-[#5a9aeb] bg-white rounded-[6px] text-[12px] text-[#5a9aeb] cursor-pointer transition-all duration-200 flex items-center gap-1 hover:bg-[#f0f6ff]"
        >
          <RestoreIcon />
          복원
        </button>

        {/* 영구삭제 버튼 */}
        <button
          onClick={() => onDelete(project.id)}
          className="py-1.5 px-3 border border-[#ff6b6b] bg-white rounded-[6px] text-[12px] text-[#ff6b6b] cursor-pointer transition-all duration-200 flex items-center gap-1 hover:bg-[#fff5f5]"
        >
          <TrashIcon />
          영구삭제
        </button>
      </div>
    </div>
  );
};

export default RemovedProjectItem;
