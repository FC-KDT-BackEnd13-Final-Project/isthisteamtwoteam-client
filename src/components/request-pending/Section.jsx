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
        {items.map((item) => (
          <ApprovalItem key={item.id} item={item} onViewDetail={onViewDetail} />
        ))}
      </div>
    </div>
  );
};

export default Section;
