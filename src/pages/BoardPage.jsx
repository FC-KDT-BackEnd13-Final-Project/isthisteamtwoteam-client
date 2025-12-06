import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Mock 데이터 import - 게시글 데이터 가져오기
import { getBoardById } from "../utils/data/mockBoards";

// 아이콘 컴포넌트들
const HistoryIcon = () => (
  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current">
    <path d="M13.5,8H12V13L16.28,15.54L17,14.33L13.5,12.25V8M13,3A9,9 0 0,0 4,12H1L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3Z" />
  </svg>
);

const FileIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[#666]">
    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
  </svg>
);

// ============================================
// 초기 Mock 데이터 (댓글용)
// 실제로는 서버에서 가져와야 하지만, 지금은 Mock 데이터 사용
// ============================================

const initialComments = [
  {
    id: 1,
    author: "이민수",
    date: "2024.11.28 15:20",
    content:
      "전체적인 디자인 방향성 좋습니다! 다만 모바일 버전의 네비게이션 메뉴 위치를 조금 더 접근하기 쉽게 조정하면 좋을 것 같습니다.",
    isReply: false,
  },
  {
    id: 3,
    author: "김동균",
    date: "2024.11.28 15:45",
    content: "피드백 감사합니다! 모바일 네비게이션 위치 조정하겠습니다.",
    isReply: true,
    parentId: 1,
  },
  {
    id: 2,
    author: "박지영",
    date: "2024.11.28 16:45",
    content: "브랜드 컬러 적용 잘 되었네요. 승인합니다!",
    isReply: false,
  },
];

// CommentItem 컴포넌트
const CommentItem = ({
  comment,
  onReply,
  onEdit,
  onDelete,
  replyingTo,
  replyText,
  setReplyText,
  onSubmitReply,
  onCancelReply,
}) => {
  const isReplying = replyingTo === comment.id;

  return (
    <div
      className={`rounded-lg border border-[#e8e8e8] p-4 ${
        comment.isReply
          ? "ml-10 border-l-[3px] border-l-[#007bff] bg-white"
          : "bg-[#f8f9fa]"
      }`}
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[14px] font-semibold text-[#333]">
          {comment.author}
        </span>
        <span className="text-[12px] text-[#999]">{comment.date}</span>
      </div>
      <div className="text-[14px] leading-[1.5] text-[#666]">
        {comment.content}
      </div>
      <div className="mt-2 flex gap-2">
        {!comment.isReply && (
          <button
            onClick={() => onReply(comment.id)}
            className="cursor-pointer border-none bg-transparent px-2 py-1 text-[12px] text-[#007bff] transition-colors duration-200 hover:text-[#0056b3]"
          >
            답글
          </button>
        )}
        <button
          onClick={() => onEdit(comment.id)}
          className="cursor-pointer border-none bg-transparent px-2 py-1 text-[12px] text-[#999] transition-colors duration-200 hover:text-[#666]"
        >
          수정
        </button>
        <button
          onClick={() => onDelete(comment.id)}
          className="cursor-pointer border-none bg-transparent px-2 py-1 text-[12px] text-[#999] transition-colors duration-200 hover:text-[#666]"
        >
          삭제
        </button>
      </div>

      {isReplying && (
        <div className="mt-3 border-t border-[#e8e8e8] pt-3">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="답글을 입력하세요..."
            className="font-inherit min-h-[60px] w-full resize-y rounded-[6px] border border-[#e0e0e0] px-3 py-2.5 text-[13px] focus:border-[#007bff] focus:outline-none"
          />
          <div className="mt-2 flex justify-end gap-2">
            <button
              onClick={onCancelReply}
              className="cursor-pointer rounded border border-[#e0e0e0] bg-white px-3 py-1.5 text-[12px] font-medium text-[#666] transition-all duration-200 hover:bg-[#f5f5f5]"
            >
              취소
            </button>
            <button
              onClick={() => onSubmitReply(comment.id)}
              className="cursor-pointer rounded border-none bg-[#007bff] px-3 py-1.5 text-[12px] font-medium text-white transition-all duration-200 hover:bg-[#0056b3]"
            >
              답글 작성
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// FileItem 컴포넌트
const FileItem = ({ file, onDownload }) => (
  <div className="flex items-center justify-between rounded-[6px] border border-[#e8e8e8] bg-[#f8f9fa] px-3 py-2.5">
    <div className="flex flex-1 items-center gap-2">
      <FileIcon />
      <span className="text-[13px] text-[#333]">{file.name}</span>
      <span className="ml-2 text-[12px] text-[#999]">({file.size})</span>
    </div>
    <button
      onClick={() => onDownload(file.name)}
      className="cursor-pointer rounded border border-[#e0e0e0] bg-white px-3 py-1 text-[12px] text-[#666] transition-all duration-200 hover:bg-[#f5f5f5]"
    >
      다운로드
    </button>
  </div>
);

// BoardPage 메인 컴포넌트
export default function BoardPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { boardId } = location.state || {};

  // ============================================
  // State 관리
  // ============================================

  // 현재 게시글 데이터 (ID로 조회한 결과)
  const [boardData, setBoardData] = useState(null);

  // 댓글 관련 state
  const [comments, setComments] = useState(initialComments);
  const [commentInput, setCommentInput] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  // ============================================
  // 데이터 로딩 - boardId로 게시글 조회
  // ============================================

  useEffect(() => {
    // boardId가 있으면 해당 게시글 데이터를 조회
    if (boardId) {
      const board = getBoardById(boardId);

      if (board) {
        // 게시글 데이터가 있으면 state에 저장
        setBoardData(board);
      } else {
        // 게시글을 찾을 수 없는 경우
        console.error(`게시글 ID ${boardId}를 찾을 수 없습니다.`);
        alert("게시글을 찾을 수 없습니다.");
      }
    }
  }, [boardId]); // boardId가 변경될 때마다 실행

  // ============================================
  // 로딩 및 에러 처리
  // ============================================

  // 게시글 데이터가 아직 로드되지 않은 경우
  if (!boardData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white p-5">
        <div className="text-center">
          <p className="text-[16px] text-[#999]">게시글을 불러오는 중...</p>
        </div>
      </div>
    );
  }

  const formatDate = () => {
    const now = new Date();
    return `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(
      2,
      "0",
    )}.${String(now.getDate()).padStart(2, "0")} ${String(
      now.getHours(),
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  };

  const handleViewHistory = () => {
    alert("게시글 히스토리 페이지로 이동합니다.");
    navigate(`/project/board/history/${boardId}`);
  };

  const handleEditPost = () => {
    if (window.confirm("게시글을 수정하시겠습니까?")) {
      alert("게시글 수정 페이지로 이동합니다.");
    }
  };

  const handleDownloadFile = (filename) => {
    alert(`"${filename}" 파일을 다운로드합니다.`);
  };

  const handleAddComment = () => {
    if (!commentInput.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }
    const newComment = {
      id: Date.now(),
      author: "현재 사용자",
      date: formatDate(),
      content: commentInput,
      isReply: false,
    };
    setComments([...comments, newComment]);
    setCommentInput("");
    alert("댓글이 작성되었습니다.");
  };

  const handleReply = (commentId) => {
    setReplyingTo(commentId);
    setReplyText("");
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
    setReplyText("");
  };

  const handleSubmitReply = (parentId) => {
    if (!replyText.trim()) {
      alert("답글 내용을 입력해주세요.");
      return;
    }
    const newReply = {
      id: Date.now(),
      author: "현재 사용자",
      date: formatDate(),
      content: replyText,
      isReply: true,
      parentId,
    };

    // 부모 댓글 바로 다음에 답글 삽입
    const parentIndex = comments.findIndex((c) => c.id === parentId);
    const newComments = [...comments];
    newComments.splice(parentIndex + 1, 0, newReply);
    setComments(newComments);

    setReplyingTo(null);
    setReplyText("");
    alert("답글이 작성되었습니다.");
  };

  const handleEditComment = (id) => {
    const newContent = window.prompt("댓글을 수정하세요:");
    if (newContent) {
      alert("댓글이 수정되었습니다.");
    }
  };

  const handleDeleteComment = (id) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      alert("댓글이 삭제되었습니다.");
    }
  };

  const handleComplete = () => {
    if (
      window.confirm(
        "완료버튼을 누르면 게시글 삭제, 수정, 댓글 작성이 어렵습니다.\n그래도 하시겠습니까?",
      )
    ) {
      if (window.confirm("정말로 완료 처리하시겠습니까?")) {
        alert("게시글이 완료 처리되었습니다.");
      }
    }
  };

  // ============================================
  // 렌더링
  // ============================================

  return (
    <div className="min-h-screen bg-white p-5 font-[-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,'Helvetica_Neue',Arial,sans-serif]">
      <div className="mx-auto max-w-[900px] rounded-[12px] bg-white p-8">
        {/* 게시글 제목 - Mock 데이터에서 가져온 실제 제목 표시 */}
        <h1 className="mb-4 text-[28px] leading-[1.4] font-semibold text-[#1a1a1a]">
          [
          {boardData.category === "requirements"
            ? "요구사항 정의"
            : boardData.category === "design"
              ? "화면설계"
              : boardData.category === "designPub"
                ? "디자인/퍼블리싱"
                : boardData.category === "feedback"
                  ? "피드백"
                  : boardData.category === "development"
                    ? "개발"
                    : boardData.category === "inspection"
                      ? "검수"
                      : boardData.category === "maintenance"
                        ? "유지보수"
                        : "기타"}
          ] {boardData.title}
        </h1>

        {/* Header - 작성자, 작성일, 조회수 표시 */}
        <div className="mb-8 flex items-center justify-between border-b-2 border-[#f0f0f0] pb-6">
          <div className="flex-1">
            <div className="flex items-center gap-4 text-[13px] text-[#999]">
              <span>작성자: {boardData.author}</span>
              <span>작성일: {boardData.createdAt}</span>
              <span>조회수: {boardData.views}</span>
              <div
                onClick={handleViewHistory}
                className="flex cursor-pointer items-center gap-1 text-[#666] transition-colors duration-200 hover:text-[#007bff]"
                title="히스토리 보기"
              >
                <HistoryIcon />
                <span>히스토리</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleEditPost}
              className="cursor-pointer rounded-[6px] border border-[#e0e0e0] bg-white px-4 py-2 text-[13px] text-[#666] transition-all duration-200 hover:bg-[#f5f5f5]"
            >
              수정하기
            </button>
          </div>
        </div>

        {/* 진행단계 - 실제 데이터 표시 */}
        <div className="mb-6">
          <label className="mb-2 block text-[14px] font-semibold text-[#333]">
            진행단계
          </label>
          <span className="inline-block rounded-lg border border-[#c9e0ff] bg-[#f0f6ff] px-4 py-2 text-[14px] font-medium text-[#5a9aeb]">
            {boardData.category === "requirements"
              ? "요구사항 정의"
              : boardData.category === "design"
                ? "화면설계"
                : boardData.category === "designPub"
                  ? "디자인/퍼블리싱"
                  : boardData.category === "feedback"
                    ? "피드백"
                    : boardData.category === "development"
                      ? "개발"
                      : boardData.category === "inspection"
                        ? "검수"
                        : boardData.category === "maintenance"
                          ? "유지보수"
                          : "기타"}
          </span>
        </div>

        {/* 파일 첨부 - 실제 데이터에서 파일 목록 표시 */}
        {boardData.files && boardData.files.length > 0 && (
          <div className="mb-6">
            <label className="mb-2 block text-[14px] font-semibold text-[#333]">
              파일 첨부
            </label>
            <div className="flex flex-col gap-2">
              {boardData.files.map((file, index) => (
                <FileItem
                  key={index}
                  file={file}
                  onDownload={handleDownloadFile}
                />
              ))}
            </div>
          </div>
        )}

        {/* 링크 첨부 - 실제 데이터에서 링크 표시 */}
        {boardData.link && (
          <div className="mb-6">
            <label className="mb-2 block text-[14px] font-semibold text-[#333]">
              링크 첨부
            </label>
            <div className="w-full rounded-lg border border-[#e0e0e0] bg-[#fafafa] px-4 py-3 text-[14px] break-all">
              <a
                href={boardData.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5a9aeb] no-underline hover:underline"
              >
                {boardData.link}
              </a>
            </div>
          </div>
        )}

        {/* 글 - 실제 데이터에서 내용 표시 */}
        <div className="mb-6">
          <label className="mb-2 block text-[14px] font-semibold text-[#333]">
            글
          </label>
          <div className="min-h-[300px] w-full rounded-lg border border-[#e0e0e0] bg-white p-4 text-[14px] leading-[1.6] whitespace-pre-wrap text-[#333]">
            {boardData.content}
          </div>
        </div>

        {/* 승인 섹션 - 실제 데이터의 승인 상태 표시 */}
        <div className="my-8 p-5 text-center">
          {boardData.approvalStatus === "pending" && (
            <span className="inline-block rounded-[20px] bg-[#d4f4dd] px-5 py-2 text-[14px] font-medium text-[#2d7a4a]">
              승인 요청됨
            </span>
          )}
          {boardData.approvalStatus === "approved" && (
            <span className="inline-block rounded-[20px] bg-[#d4edda] px-5 py-2 text-[14px] font-medium text-[#28a745]">
              승인 완료
            </span>
          )}
          {boardData.approvalStatus === "rejected" && (
            <div>
              <span className="inline-block rounded-[20px] bg-[#ffe0e3] px-5 py-2 text-[14px] font-medium text-[#dc3545]">
                반려됨
              </span>
              {boardData.rejectReason && (
                <div className="mt-3 text-[13px] text-[#666]">
                  <strong>반려 사유:</strong> {boardData.rejectReason}
                </div>
              )}
            </div>
          )}
        </div>

        {/* 댓글 섹션 */}
        <div className="mt-8 border-t-2 border-[#f0f0f0] pt-8">
          <h3 className="mb-4 text-[16px] font-semibold text-[#333]">댓글</h3>

          {/* 댓글 입력 */}
          <div className="mb-4">
            <textarea
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="댓글을 입력하세요..."
              className="font-inherit min-h-[80px] w-full resize-y rounded-lg border border-[#e0e0e0] px-4 py-3 text-[14px] focus:border-[#007bff] focus:outline-none"
            />
            <div className="mt-2 flex justify-end">
              <button
                onClick={handleAddComment}
                className="cursor-pointer rounded-[6px] border-none bg-[#007bff] px-4 py-2 text-[13px] font-medium text-white transition-all duration-200 hover:bg-[#0056b3]"
              >
                댓글 작성
              </button>
            </div>
          </div>

          {/* 댓글 목록 */}
          <div className="flex flex-col gap-3">
            {comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onReply={handleReply}
                onEdit={handleEditComment}
                onDelete={handleDeleteComment}
                replyingTo={replyingTo}
                replyText={replyText}
                setReplyText={setReplyText}
                onSubmitReply={handleSubmitReply}
                onCancelReply={handleCancelReply}
              />
            ))}
          </div>
        </div>

        {/* 하단 액션 */}
        <div className="mt-8 flex justify-end border-t border-[#f0f0f0] pt-6">
          <button
            onClick={handleComplete}
            className="cursor-pointer rounded-lg border-none bg-[#dc3545] px-8 py-3 text-[14px] font-medium text-white transition-all duration-200 hover:bg-[#c82333]"
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
}
