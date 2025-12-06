import {
  RestoreIcon,
  SearchIcon,
  TrashIcon,
} from "../common/icons/RemoveProjectIcon";
/**
 * 컨트롤 바 컴포넌트
 *
 * 삭제된 프로젝트 목록 상단에 위치하며 다음 기능을 제공합니다:
 * - 전체 선택 체크박스
 * - 선택한 프로젝트 일괄 복원 버튼
 * - 선택한 프로젝트 일괄 영구삭제 버튼
 * - 프로젝트 검색 입력창
 *
 * Props:
 * @param {boolean} isAllSelected - 전체 선택 상태
 * @param {boolean} hasSelection - 선택된 항목이 있는지 여부
 * @param {string} searchQuery - 검색어
 * @param {Function} onSelectAll - 전체 선택/해제 함수
 * @param {Function} onRestoreSelected - 선택 항목 복원 함수
 * @param {Function} onDeleteSelected - 선택 항목 영구삭제 함수
 * @param {Function} onSearchChange - 검색어 변경 함수
 *
 * 사용 예시:
 * <ControlBar
 *   isAllSelected={false}
 *   hasSelection={true}
 *   searchQuery=""
 *   onSelectAll={(checked) => console.log('전체 선택', checked)}
 *   onRestoreSelected={() => console.log('선택 복원')}
 *   onDeleteSelected={() => console.log('선택 삭제')}
 *   onSearchChange={(e) => console.log('검색', e.target.value)}
 * />
 */
const ControlBar = ({
  isAllSelected,
  hasSelection,
  searchQuery,
  onSelectAll,
  onRestoreSelected,
  onDeleteSelected,
  onSearchChange,
}) => {
  return (
    <div className="mb-5 flex items-center justify-between rounded-lg bg-[#f8f9fa] p-4">
      {/* 왼쪽: 전체 선택 및 일괄 작업 버튼 */}
      <div className="flex items-center gap-3">
        {/* 전체 선택 체크박스 */}
        <label className="flex items-center gap-2 text-[14px] text-[#666]">
          <input
            type="checkbox"
            checked={isAllSelected}
            onChange={(e) => onSelectAll(e.target.checked)}
            className="h-[18px] w-[18px] cursor-pointer"
          />
          <span>전체 선택</span>
        </label>

        {/* 선택 복원 버튼 */}
        <button
          onClick={onRestoreSelected}
          disabled={!hasSelection}
          className={`flex cursor-pointer items-center gap-1 rounded-[6px] border-none px-3 py-1.5 text-[12px] font-medium transition-all duration-200 ${
            hasSelection
              ? "bg-[#5a9aeb] text-white hover:bg-[#4a8ada]"
              : "cursor-not-allowed bg-[#e0e0e0] text-[#999]"
          }`}
        >
          <RestoreIcon />
          선택 복원
        </button>

        {/* 선택 영구삭제 버튼 */}
        <button
          onClick={onDeleteSelected}
          disabled={!hasSelection}
          className={`flex cursor-pointer items-center gap-1 rounded-[6px] border-none px-3 py-1.5 text-[12px] font-medium transition-all duration-200 ${
            hasSelection
              ? "bg-[#ff6b6b] text-white hover:bg-[#ff5252]"
              : "cursor-not-allowed bg-[#e0e0e0] text-[#999]"
          }`}
        >
          <TrashIcon />
          선택 영구삭제
        </button>
      </div>

      {/* 오른쪽: 검색 입력창 */}
      <div className="flex w-[300px] items-center gap-2 rounded-[6px] border border-[#e0e0e0] bg-white px-3 py-2">
        <SearchIcon />
        <input
          type="text"
          placeholder="프로젝트 검색..."
          value={searchQuery}
          onChange={onSearchChange}
          className="flex-1 border-none text-[14px] outline-none"
        />
      </div>
    </div>
  );
};

export default ControlBar;
