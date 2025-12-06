/**
 * 히스토리 아코디언 항목 컴포넌트
 * 개별 변경 이력을 아코디언 형태로 표시합니다.
 */
export default function PostHistoryItem({ history, isOpen, onToggle }) {
  return (
    <div
      className={`mb-4 rounded-[10px] border transition-all duration-200 ${
        isOpen
          ? "border-[#007bff] bg-[#f8fbff]"
          : "border-[#d0d0d0] bg-[#f8f8f8] hover:bg-[#f0f0f0]"
      }`}
    >
      {/* 헤더 */}
      <div
        onClick={onToggle}
        className="flex cursor-pointer items-center justify-between px-5 py-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-[14px] font-medium text-[#1a1a1a]">
            {history.datetime}
          </span>
          <span className="text-[14px] text-[#666]">{history.summary}</span>
        </div>

        {/* 펼침/접힘 아이콘 */}
        <svg
          className={`h-5 w-5 text-[#666] transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* 상세 내용 (펼쳐졌을 때만 보이는 부분) */}
      {isOpen && history.details && (
        <div className="border-t border-[#e0e0e0] px-5 py-5">
          {/* 제목 변경 */}
          {history.details.title && (
            <div className="mb-6">
              <div className="mb-2 text-[13px] font-semibold text-[#666]">
                제목
              </div>
              <div className="space-y-2">
                {history.details.title.removed && (
                  <div className="flex items-start gap-2 rounded bg-[#ffe6e6] px-3 py-2">
                    <span className="text-[#ff3b30]">-</span>
                    <span className="text-[13px] text-[#d32f2f]">
                      {history.details.title.removed}
                    </span>
                  </div>
                )}
                {history.details.title.added && (
                  <div className="flex items-start gap-2 rounded bg-[#e6f7f1] px-3 py-2">
                    <span className="text-[#00c48c]">+</span>
                    <span className="text-[13px] text-[#2e7d32]">
                      {history.details.title.added}
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-2 text-[12px] text-[#999]">
                작성자: {history.details.editor} 작성일:{" "}
                {history.details.editedAt}
              </div>
            </div>
          )}

          {/* 진행단계 */}
          {history.details.category && (
            <div className="mb-6">
              <div className="mb-2 text-[13px] font-semibold text-[#666]">
                진행단계
              </div>
              <div className="text-[13px] text-[#007bff]">
                {history.details.category}
              </div>
            </div>
          )}

          {/* 글 내용 변경 */}
          {history.details.content && (
            <div className="mb-6">
              <div className="mb-2 text-[13px] font-semibold text-[#666]">
                글 내용
              </div>
              <div className="space-y-2 rounded border border-[#e0e0e0] bg-white p-4">
                {history.details.content.removed && (
                  <div className="rounded bg-[#ffe6e6] px-3 py-2">
                    <div className="mb-1 text-[12px] font-semibold text-[#d32f2f]">
                      - 삭제된 내용:
                    </div>
                    <div className="text-[13px] whitespace-pre-line text-[#d32f2f]">
                      {history.details.content.removed}
                    </div>
                  </div>
                )}
                {history.details.content.added && (
                  <div className="rounded bg-[#e6f7f1] px-3 py-2">
                    <div className="mb-1 text-[12px] font-semibold text-[#2e7d32]">
                      + 추가된 내용:
                    </div>
                    <div className="text-[13px] whitespace-pre-line text-[#2e7d32]">
                      {history.details.content.added}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 첨부 파일 변경 */}
          {history.details.attachments && (
            <div className="mb-6">
              <div className="mb-2 text-[13px] font-semibold text-[#666]">
                첨부 파일
              </div>
              <div className="space-y-2">
                {history.details.attachments.removed?.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-[13px] text-[#d32f2f]"
                  >
                    <span>-</span>
                    <span>{file}</span>
                  </div>
                ))}
                {history.details.attachments.added?.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-[13px] text-[#2e7d32]"
                  >
                    <span>+</span>
                    <span>{file}</span>
                  </div>
                ))}
                {history.details.attachments.unchanged?.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-[13px] text-[#666]"
                  >
                    <span className="ml-3">{file}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 첨부 링크 변경 */}
          {history.details.links && (
            <div className="mb-6">
              <div className="mb-2 text-[13px] font-semibold text-[#666]">
                첨부 링크
              </div>
              <div className="space-y-2">
                {history.details.links.removed?.map((link, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-[13px] text-[#d32f2f]"
                  >
                    <span>-</span>
                    <span>{link}</span>
                  </div>
                ))}
                {history.details.links.added?.map((link, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-[13px] text-[#2e7d32]"
                  >
                    <span>+</span>
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {link}
                    </a>
                  </div>
                ))}
                {history.details.links.unchanged?.map((link, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-[13px] text-[#666]"
                  >
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-3 hover:underline"
                    >
                      {link}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 댓글 스냅샷 */}
          {history.details.comments && history.details.comments.length > 0 && (
            <div>
              <div className="mb-3 text-[13px] font-semibold text-[#666]">
                댓글 스냅샷
              </div>
              <div className="space-y-3">
                {history.details.comments.map((comment, index) => (
                  <div
                    key={index}
                    className={`rounded border p-3 ${
                      comment.isAdded
                        ? "border-[#00c48c] bg-[#e6f7f1]"
                        : "border-[#e0e0e0] bg-white"
                    }`}
                  >
                    <div className="mb-2 flex items-center gap-2 text-[12px]">
                      <span className="font-semibold text-[#1a1a1a]">
                        {comment.author}
                      </span>
                      <span className="text-[#999]">{comment.datetime}</span>
                    </div>
                    <div className="text-[13px] text-[#333]">
                      {comment.content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
