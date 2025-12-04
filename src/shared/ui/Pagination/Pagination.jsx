import { Icons } from "../Icon/GlobalIcon";

/**
 * 페이지네이션 컴포넌트
 *
 * 목록을 페이지 단위로 나누어 표시하고 페이지 이동 기능을 제공합니다.
 * 현재 표시 중인 항목 범위와 전체 항목 수를 보여줍니다.
 *
 * Props:
 * @param {number} currentPage - 현재 페이지 번호
 * @param {number} totalPages - 전체 페이지 수
 * @param {number} itemsPerPage - 페이지당 항목 수
 * @param {number} totalItems - 전체 항목 수
 * @param {Function} onPageChange - 페이지 변경 시 실행할 함수
 *
 * 사용 예시:
 * <Pagination
 *   currentPage={1}
 *   totalPages={5}
 *   itemsPerPage={10}
 *   totalItems={50}
 *   onPageChange={(page) => console.log('페이지 변경:', page)}
 * />
 */
const Pagination = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
}) => {
  return (
    <div className="flex justify-between items-center mt-6 pt-5 border-t border-gray-100">
      {/* 현재 표시 중인 항목 범위 */}
      <div className="text-sm text-gray-500">
        {(currentPage - 1) * itemsPerPage + 1} -{" "}
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} items
      </div>

      {/* 페이지 선택 및 이동 버튼 */}
      <div className="flex items-center gap-2">
        {/* 페이지 선택 드롭다운 */}
        <select
          value={currentPage}
          onChange={(e) => onPageChange(Number(e.target.value))}
          className="px-3 py-2 border border-gray-200 rounded-md text-sm outline-none cursor-pointer"
        >
          {Array.from({ length: totalPages }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              Page {i + 1}
            </option>
          ))}
        </select>

        {/* 이전 페이지 버튼 */}
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          {Icons.chevronLeft}
        </button>

        {/* 다음 페이지 버튼 */}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages || totalPages === 0}
          className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
        >
          {Icons.chevronRight}
        </button>
      </div>
    </div>
  );
};

export default Pagination;
