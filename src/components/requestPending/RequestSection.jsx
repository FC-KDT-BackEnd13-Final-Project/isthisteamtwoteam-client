import { useState } from "react";
import ApprovalItem from "./ApprovalItem";

/**
 * 섹션 컴포넌트
 *
 * 승인 요청을 카테고리별로 그룹화하여 표시합니다.
 * 예: 요구사항 정의, 화면설계, 디자인/퍼블리싱 등
 *
 * 사용 예시:
 * <Section
 *   title="요구사항 정의"
 *   count={3}
 *   items={[...]}
 *   onViewDetail={(id) => alert('게시글 보기')}
 * />
 */
const Section = ({
  title,         // 섹션 제목 (예: "요구사항 정의")
  count,         // 항목 개수 (예: 3)
  items,         // 승인 요청 항목들의 배열
  onViewDetail,  // 상세보기 버튼 클릭 시 실행할 함수
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 현재 페이지의 아이템들 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  // 전체 페이지 수 계산 (최소 1페이지)
  const totalPages = Math.max(1, Math.ceil(items.length / itemsPerPage));

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 페이지 번호 배열 생성
  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className="bg-white rounded-[12px] p-5 mb-6 border border-[#e5e7eb]">
      {/* 섹션 헤더 */}
      <div className="flex items-center justify-between mb-[18px] pb-4 border-b border-[#e5e7eb]">
        {/* 제목 */}
        <h2 className="text-[17px] font-semibold text-[#1a1a1a]">{title}</h2>

        {/* 항목 개수 배지 */}
        <span className="text-[13px] text-[#999] bg-[#f8f9fa] py-1 px-3 rounded-[12px]">
          {count}건
        </span>
      </div>

      {/* 승인 요청 항목 목록 */}
      <div className="flex flex-col gap-3">
        {count === 0 && (
          <div className="col-span-3 py-10 text-center text-[#999]">
            <p>{title} 요청이 존재하지 않습니다.</p>
          </div>
        )}
        {currentItems.map((item) => (
          <ApprovalItem key={item.postId} item={item} onViewDetail={onViewDetail} />
        ))}
      </div>

      {/* 페이지네이션 - 아이템이 10개 초과일 때만 표시 */}
      {items.length > itemsPerPage && (
        <div className="flex items-center justify-center gap-2 mt-6 pt-4 border-t border-[#e5e7eb]">
          {/* 이전 페이지 버튼 */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors ${
              currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            이전
          </button>

          {/* 페이지 번호 버튼들 */}
          {getPageNumbers().map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors ${
                currentPage === pageNumber
                  ? 'bg-blue-500 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {pageNumber}
            </button>
          ))}

          {/* 다음 페이지 버튼 */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
};

export default Section;