import React, { useState } from "react";

// 아이콘 컴포넌트들
const HistoryIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-current">
    <path d="M13.5,8H12V13L16.28,15.54L17,14.33L13.5,12.25V8M13,3A9,9 0 0,0 4,12H1L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3Z" />
  </svg>
);

const FileIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#666]">
    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
  </svg>
);

// 초기 데이터
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

const filesData = [
  { name: "메인페이지_디자인시안_v2.0.fig", size: "8.4MB" },
  { name: "디자인가이드.pdf", size: "2.1MB" },
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
      className={`p-4 rounded-lg border border-[#e8e8e8] ${
        comment.isReply
          ? "ml-10 bg-white border-l-[3px] border-l-[#007bff]"
          : "bg-[#f8f9fa]"
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-[14px] font-semibold text-[#333]">
          {comment.author}
        </span>
        <span className="text-[12px] text-[#999]">{comment.date}</span>
      </div>
      <div className="text-[14px] text-[#666] leading-[1.5]">
        {comment.content}
      </div>
      <div className="flex gap-2 mt-2">
        {!comment.isReply && (
          <button
            onClick={() => onReply(comment.id)}
            className="py-1 px-2 bg-transparent border-none text-[#007bff] cursor-pointer text-[12px] transition-colors duration-200 hover:text-[#0056b3]"
          >
            답글
          </button>
        )}
        <button
          onClick={() => onEdit(comment.id)}
          className="py-1 px-2 bg-transparent border-none text-[#999] cursor-pointer text-[12px] transition-colors duration-200 hover:text-[#666]"
        >
          수정
        </button>
        <button
          onClick={() => onDelete(comment.id)}
          className="py-1 px-2 bg-transparent border-none text-[#999] cursor-pointer text-[12px] transition-colors duration-200 hover:text-[#666]"
        >
          삭제
        </button>
      </div>

      {isReplying && (
        <div className="mt-3 pt-3 border-t border-[#e8e8e8]">
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="답글을 입력하세요..."
            className="w-full py-2.5 px-3 border border-[#e0e0e0] rounded-[6px] text-[13px] resize-y min-h-[60px] font-inherit focus:outline-none focus:border-[#007bff]"
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={onCancelReply}
              className="py-1.5 px-3 border border-[#e0e0e0] rounded bg-white text-[12px] font-medium cursor-pointer text-[#666] transition-all duration-200 hover:bg-[#f5f5f5]"
            >
              취소
            </button>
            <button
              onClick={() => onSubmitReply(comment.id)}
              className="py-1.5 px-3 border-none rounded bg-[#007bff] text-white text-[12px] font-medium cursor-pointer transition-all duration-200 hover:bg-[#0056b3]"
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
  <div className="flex items-center justify-between py-2.5 px-3 bg-[#f8f9fa] rounded-[6px] border border-[#e8e8e8]">
    <div className="flex items-center gap-2 flex-1">
      <FileIcon />
      <span className="text-[13px] text-[#333]">{file.name}</span>
      <span className="text-[12px] text-[#999] ml-2">({file.size})</span>
    </div>
    <button
      onClick={() => onDownload(file.name)}
      className="py-1 px-3 bg-white border border-[#e0e0e0] rounded text-[#666] cursor-pointer text-[12px] transition-all duration-200 hover:bg-[#f5f5f5]"
    >
      다운로드
    </button>
  </div>
);

// 메인 컴포넌트
export default function BoardPage() {
  const [comments, setComments] = useState(initialComments);
  const [commentInput, setCommentInput] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [approvalStatus, setApprovalStatus] = useState("pending"); // 'pending', 'approved', 'rejected'
  const [rejectReason, setRejectReason] = useState("");

  const formatDate = () => {
    const now = new Date();
    return `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}.${String(now.getDate()).padStart(2, "0")} ${String(
      now.getHours()
    ).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  };

  const handleViewHistory = () => {
    alert("게시글 히스토리 페이지로 이동합니다.");
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
        "완료버튼을 누르면 게시글 삭제, 수정, 댓글 작성이 어렵습니다.\n그래도 하시겠습니까?"
      )
    ) {
      if (window.confirm("정말로 완료 처리하시겠습니까?")) {
        alert("게시글이 완료 처리되었습니다.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-white p-5 font-[-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,'Helvetica_Neue',Arial,sans-serif]">
      <div className="max-w-[900px] mx-auto bg-white rounded-[12px] p-8">
        <h1 className="text-[28px] font-semibold text-[#1a1a1a] mb-4 leading-[1.4]">
          [디자인] 메인 페이지 시안 검토 요청
        </h1>

        {/* Header */}
        <div className="mb-8 pb-6 border-b-2 border-[#f0f0f0] flex justify-between items-center">
          <div className="flex-1">
            <div className="flex gap-4 text-[13px] text-[#999] items-center">
              <span>작성자: 김동균</span>
              <span>작성일: 2024.11.28 14:30</span>
              <span>조회수: 42</span>
              <div
                onClick={handleViewHistory}
                className="flex items-center gap-1 text-[#666] cursor-pointer transition-colors duration-200 hover:text-[#007bff]"
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
              className="py-2 px-4 border border-[#e0e0e0] bg-white rounded-[6px] text-[13px] text-[#666] cursor-pointer transition-all duration-200 hover:bg-[#f5f5f5]"
            >
              수정하기
            </button>
          </div>
        </div>

        {/* 진행단계 */}
        <div className="mb-6">
          <label className="block text-[14px] font-semibold text-[#333] mb-2">
            진행단계
          </label>
          <span className="inline-block py-2 px-4 bg-[#f0f6ff] border border-[#c9e0ff] rounded-lg text-[#5a9aeb] text-[14px] font-medium">
            디자인
          </span>
        </div>

        {/* 파일 첨부 */}
        <div className="mb-6">
          <label className="block text-[14px] font-semibold text-[#333] mb-2">
            파일 첨부
          </label>
          <div className="flex flex-col gap-2">
            {filesData.map((file, index) => (
              <FileItem
                key={index}
                file={file}
                onDownload={handleDownloadFile}
              />
            ))}
          </div>
        </div>

        {/* 링크 첨부 */}
        <div className="mb-6">
          <label className="block text-[14px] font-semibold text-[#333] mb-2">
            링크 첨부
          </label>
          <div className="w-full py-3 px-4 border border-[#e0e0e0] rounded-lg text-[14px] bg-[#fafafa] break-all">
            <a
              href="https://www.figma.com/design/example"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5a9aeb] no-underline hover:underline"
            >
              https://www.figma.com/design/example
            </a>
          </div>
        </div>

        {/* 글 */}
        <div className="mb-6">
          <label className="block text-[14px] font-semibold text-[#333] mb-2">
            글
          </label>
          <div className="w-full p-4 border border-[#e0e0e0] rounded-lg min-h-[300px] text-[14px] leading-[1.6] bg-white text-[#333] whitespace-pre-wrap">
            {`안녕하세요.

메인 페이지 디자인 시안 2차 버전을 첨부합니다.

1차 피드백을 반영하여 다음과 같이 수정했습니다:
- 메인 배너 영역 레이아웃 개선
- 모바일 반응형 대응 추가
- 브랜드 컬러 적용

검토 후 피드백 부탁드립니다.

감사합니다.`}
          </div>
        </div>

        {/* 승인 섹션 */}
        <div className="my-8 p-5 text-center">
          {approvalStatus === "pending" && (
            <span className="inline-block py-2 px-5 rounded-[20px] text-[14px] font-medium bg-[#d4f4dd] text-[#2d7a4a]">
              승인 요청됨
            </span>
          )}
          {approvalStatus === "approved" && (
            <span className="inline-block py-2 px-5 rounded-[20px] text-[14px] font-medium bg-[#d4edda] text-[#28a745]">
              승인 완료
            </span>
          )}
          {approvalStatus === "rejected" && (
            <div>
              <span className="inline-block py-2 px-5 rounded-[20px] text-[14px] font-medium bg-[#ffe0e3] text-[#dc3545]">
                반려됨
              </span>
              {rejectReason && (
                <div className="mt-3 text-[13px] text-[#666]">
                  <strong>반려 사유:</strong> {rejectReason}
                </div>
              )}
            </div>
          )}
        </div>

        {/* 댓글 섹션 */}
        <div className="mt-8 pt-8 border-t-2 border-[#f0f0f0]">
          <h3 className="text-[16px] font-semibold text-[#333] mb-4">댓글</h3>

          {/* 댓글 입력 */}
          <div className="mb-4">
            <textarea
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="댓글을 입력하세요..."
              className="w-full py-3 px-4 border border-[#e0e0e0] rounded-lg text-[14px] resize-y min-h-[80px] font-inherit focus:outline-none focus:border-[#007bff]"
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={handleAddComment}
                className="py-2 px-4 border-none rounded-[6px] text-[13px] font-medium cursor-pointer bg-[#007bff] text-white transition-all duration-200 hover:bg-[#0056b3]"
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
        <div className="flex justify-end mt-8 pt-6 border-t border-[#f0f0f0]">
          <button
            onClick={handleComplete}
            className="py-3 px-8 border-none rounded-lg text-[14px] font-medium cursor-pointer bg-[#dc3545] text-white transition-all duration-200 hover:bg-[#c82333]"
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
}
