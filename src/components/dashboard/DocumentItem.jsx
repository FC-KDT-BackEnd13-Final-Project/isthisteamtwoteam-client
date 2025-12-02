/**
 * 게시글(문서) 항목 컴포넌트
 *
 * 승인 대기, 반려 문서 목록에 표시되는 각 게시글 항목입니다.
 * 클릭하면 해당 게시글의 상세 페이지로 이동합니다.
 *
 * 사용 예시:
 * <DocumentItem
 *   id={1}
 *   title="프로젝트 진행 보고서"
 *   project="홈페이지 리뉴얼"
 *   client="테크기업"
 *   date="2024-03-15"
 *   time="14:30"
 *   reason="내용 보완 필요"
 *   status="반려"
 *   statusClass="bg-[#ffe6e6] text-[#ff3b30]"
 *   onView={(id) => console.log('게시글 보기', id)}
 * />
 */
const DocumentItem = ({
  id,              // 게시글 ID
  title,           // 게시글 제목
  project,         // 프로젝트 이름
  client,          // 고객사 이름
  date,            // 작성 날짜 (예: "2024-03-15")
  time,            // 작성 시간 (예: "14:30")
  reason,          // 반려 사유 (선택사항, 반려된 문서만 표시)
  status,          // 상태 텍스트 (예: "승인대기", "반려")
  statusClass,     // 상태 배지 스타일 (예: "bg-[#ffe6e6] text-[#ff3b30]")
  onView,          // 클릭했을 때 실행할 함수
}) => {
  return (
    <div
      className="flex flex-col gap-2 p-3 border border-[#b0b0b0] rounded-[10px] transition-all duration-200 hover:bg-[#f8f9fa] hover:border-[#a0a0a0] cursor-pointer"
      onClick={(e) => {
        e.stopPropagation(); // 다른 요소의 클릭 이벤트가 실행되지 않도록 방지
        onView(id); // 게시글 ID를 전달하여 상세 페이지로 이동
      }}
    >
      {/* 상단: 제목과 상태 배지 */}
      <div className="flex items-start justify-between gap-3">
        {/* 제목 및 프로젝트 정보 */}
        <div className="flex-1 min-w-0">
          {/* 게시글 제목 */}
          <div className="text-[13px] font-semibold text-[#1a1a1a] whitespace-nowrap overflow-hidden text-ellipsis">
            {title}
          </div>
          {/* 프로젝트 · 고객사 */}
          <div className="text-[11px] text-[#999] mt-[2px]">
            {project} · {client}
          </div>
        </div>

        {/* 상태 배지 (승인대기, 반려 등) */}
        <span
          className={`px-2.5 py-1 rounded-[5px] text-[11px] font-medium whitespace-nowrap ${statusClass}`}
        >
          {status}
        </span>
      </div>

      {/* 하단: 날짜/시간 및 반려 사유 */}
      <div className="flex items-center justify-between text-[11px] text-[#666]">
        {/* 날짜 · 시간 */}
        <span>
          {date} · {time}
        </span>
        {/* 반려 사유 (있는 경우만 표시) */}
        {reason && (
          <span className="text-[#ff3b30] font-medium whitespace-nowrap">
            사유: {reason}
          </span>
        )}
      </div>
    </div>
  );
};

export default DocumentItem;
