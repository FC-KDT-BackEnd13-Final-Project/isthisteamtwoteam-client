export default function CommentItem({ comment }) {
  return (
    <div>
      {/* 댓글 */}
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-[14px] font-semibold text-gray-900">
            {comment.userName}
          </span>
          <span className="text-[12px] text-gray-500">
            {comment.createdAt || '날짜 없음'}
          </span>
        </div>
        <div className="mb-2 text-[14px] leading-relaxed text-gray-700">
          {comment.content}
        </div>
        <div className="flex gap-2">
          <button className="text-[12px] text-blue-500 transition-colors hover:text-blue-600">
            답글
          </button>
          <button className="text-[12px] text-gray-500 transition-colors hover:text-gray-600">
            수정
          </button>
          <button className="text-[12px] text-gray-500 transition-colors hover:text-gray-600">
            삭제
          </button>
        </div>
      </div>

      {/* 답글 (재귀 렌더링) */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-10 mt-3 flex flex-col gap-3">
          {comment.replies.map((reply) => (
            <div key={reply.commentId} className="rounded-lg border border-gray-200 border-l-4 border-l-blue-500 bg-white p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[14px] font-semibold text-gray-900">
                  {reply.userName}
                </span>
                <span className="text-[12px] text-gray-500">
                  {reply.createdAt || '날짜 없음'}
                </span>
              </div>
              <div className="mb-2 text-[14px] leading-relaxed text-gray-700">
                {reply.content}
              </div>
              <div className="flex gap-2">
                <button className="text-[12px] text-gray-500 transition-colors hover:text-gray-600">
                  수정
                </button>
                <button className="text-[12px] text-gray-500 transition-colors hover:text-gray-600">
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}