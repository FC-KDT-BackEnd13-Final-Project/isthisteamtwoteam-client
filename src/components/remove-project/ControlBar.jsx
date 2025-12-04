import { RestoreIcon, TrashIcon, SearchIcon } from "./Icons";

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
    <div className="flex justify-between items-center mb-5 p-4 bg-[#f8f9fa] rounded-lg">
      {/* 왼쪽: 전체 선택 및 일괄 작업 버튼 */}
      <div className="flex gap-3 items-center">
        {/* 전체 선택 체크박스 */}
        <label className="flex items-center gap-2 text-[14px] text-[#666]">
          <input
            type="checkbox"
            checked={isAllSelected}
            onChange={(e) => onSelectAll(e.target.checked)}
            className="w-[18px] h-[18px] cursor-pointer"
          />
          <span>전체 선택</span>
        </label>

        {/* 선택 복원 버튼 */}
        <button
          onClick={onRestoreSelected}
          disabled={!hasSelection}
          className={`py-1.5 px-3 border-none rounded-[6px] text-[12px] font-medium cursor-pointer transition-all duration-200 flex items-center gap-1 ${
            hasSelection
              ? "bg-[#5a9aeb] text-white hover:bg-[#4a8ada]"
              : "bg-[#e0e0e0] text-[#999] cursor-not-allowed"
          }`}
        >
          <RestoreIcon />
          선택 복원
        </button>

        {/* 선택 영구삭제 버튼 */}
        <button
          onClick={onDeleteSelected}
          disabled={!hasSelection}
          className={`py-1.5 px-3 border-none rounded-[6px] text-[12px] font-medium cursor-pointer transition-all duration-200 flex items-center gap-1 ${
            hasSelection
              ? "bg-[#ff6b6b] text-white hover:bg-[#ff5252]"
              : "bg-[#e0e0e0] text-[#999] cursor-not-allowed"
          }`}
        >
          <TrashIcon />
          선택 영구삭제
        </button>
      </div>

      {/* 오른쪽: 검색 입력창 */}
      <div className="flex items-center gap-2 py-2 px-3 bg-white border border-[#e0e0e0] rounded-[6px] w-[300px]">
        <SearchIcon />
        <input
          type="text"
          placeholder="프로젝트 검색..."
          value={searchQuery}
          onChange={onSearchChange}
          className="flex-1 border-none outline-none text-[14px]"
        />
      </div>
    </div>
  );
};

export default ControlBar;
