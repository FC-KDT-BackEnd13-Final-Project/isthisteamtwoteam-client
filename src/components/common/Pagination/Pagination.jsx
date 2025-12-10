import { Icons } from "../icons/GlobalIcon";

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

      {/* 페이지 번호 버튼들 (중앙) */}
      <div className="flex items-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-9 h-9 flex items-center justify-center rounded-md text-sm font-medium transition ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "border border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* 빈 공간 (균형 유지) */}
      <div className="w-[100px]"></div>
    </div>
  );
};

export default Pagination;