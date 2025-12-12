import { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import { getPostDetail, completePost } from "../utils/api/post/postApi";
import { useNavigate } from "react-router-dom";

/**
 * PostDetailPage - 게시글 상세 조회 페이지
 */
export default function PostDetailPage() {
  const { postId } = useParams();
  const navigate = useNavigate();

  // ============================================
  // State 관리
  // ============================================
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [replyInputs, setReplyInputs] = useState({});

  // ============================================
  // 데이터 로딩
  // ============================================
  useEffect(() => {
    loadPostDetail();
  }, [postId]);

  const loadPostDetail = async () => {
    try {
      setLoading(true);
      const data = await getPostDetail(postId);
      setPost(data);
    } catch (error) {
      console.error("게시글 조회 실패:", error);
      alert("게시글을 불러올 수 없습니다.");
    } finally {
      setLoading(false);
    }
  };

  // ============================================
  // 이벤트 핸들러
  // ============================================
  const handleEdit = () => {
    if (window.confirm("게시글을 수정하시겠습니까?")) {
      navigate(`/posts/${postId}/edit`);
    }
  };

  const handleComplete = async () => {
    if (window.confirm("완료버튼을 누르면 게시글 삭제, 수정, 댓글 작성이 어렵습니다.\n그래도 하시겠습니까?")) {
      if (window.confirm("정말로 완료 처리하시겠습니까?")) {
        try {
          await completePost(postId);
          alert("게시글이 완료 처리되었습니다.");
          navigate(-1);
        } catch (error) {
          console.error("완료 처리 실패:", error);
          alert("완료 처리에 실패했습니다.");
        }
      }
    }
  };

  const handleDownload = (fileUrl, fileName) => {
    alert(`"${fileName}" 파일을 다운로드합니다.`);
    // TODO: 실제 파일 다운로드 구현
  };

  const handleViewHistory = () => {
    alert("게시글 히스토리 페이지로 이동합니다.");
    // navigate(`/posts/${postId}/history`);
  };

  const toggleReplyInput = (commentId) => {
    setReplyInputs(prev => ({
      ...prev,
      [commentId]: !prev[commentId]
    }));
  };

  // ============================================
  // 승인 상태 뱃지
  // ============================================
  const getApprovalBadge = (status) => {
    const badges = {
      PENDING: { text: "승인 대기", color: "bg-amber-100 text-amber-600" },
      APPROVED: { text: "승인 완료", color: "bg-green-100 text-green-600" },
      REJECTED: { text: "승인 반려됨", color: "bg-red-100 text-red-600" }
    };
    return badges[status] || badges.PENDING;
  };

  // ============================================
  // 로딩 처리
  // ============================================
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-500">로딩 중...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-500">게시글을 찾을 수 없습니다.</p>
      </div>
    );
  }

  const approvalBadge = getApprovalBadge(post.approvalStatus);

  // ============================================
  // 렌더링
  // ============================================
  return (
    <div className="min-h-screen bg-white p-5">
      <div className="mx-auto max-w-[900px]">
        {/* 제목 */}
        <h1 className="mb-4 text-[28px] font-semibold leading-tight text-gray-900">
          {post.title}
        </h1>

        {/* 헤더 */}
        <div className="mb-8 flex items-center justify-between border-b-2 border-gray-100 pb-6">
          <div className="flex-1">
            <div className="flex items-center gap-4 text-[13px] text-gray-500">
              <span>작성자: {post.authorName || "작성자"}</span>
              <span>작성일: {post.createdAt}</span>
              <span>조회수: {post.viewCount || 0}</span>
              <button
                onClick={handleViewHistory}
                className="flex items-center gap-1 text-gray-600 transition-colors hover:text-blue-500"
              >
                <svg className="h-[18px] w-[18px] fill-current" viewBox="0 0 24 24">
                  <path d="M13.5,8H12V13L16.28,15.54L17,14.33L13.5,12.25V8M13,3A9,9 0 0,0 4,12H1L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3Z" />
                </svg>
                <span>히스토리</span>
              </button>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-[13px] text-gray-600 transition-colors hover:bg-gray-50"
            >
              수정하기
            </button>
          </div>
        </div>

        {/* 진행단계 */}
        <div className="mb-6">
          <label className="mb-2 block text-[14px] font-semibold text-gray-900">
            진행단계
          </label>
          <span className="inline-block rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-[14px] font-medium text-blue-600">
            {post.category || "디자인"}
          </span>
        </div>

        {/* 파일 첨부 */}
        {post.files && post.files.length > 0 && (
          <div className="mb-6">
            <label className="mb-2 block text-[14px] font-semibold text-gray-900">
              파일 첨부
            </label>
            <div className="flex flex-col gap-2">
              {post.files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 px-3 py-2.5"
                >
                  <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 fill-gray-600" viewBox="0 0 24 24">
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                    </svg>
                    <span className="text-[13px] text-gray-900">{file.name}</span>
                    <span className="text-[12px] text-gray-500">({file.size})</span>
                  </div>
                  <button
                    onClick={() => handleDownload(file.url, file.name)}
                    className="rounded border border-gray-300 bg-white px-3 py-1 text-[12px] text-gray-600 transition-colors hover:bg-gray-50"
                  >
                    다운로드
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 링크 첨부 */}
        {post.link && (
          <div className="mb-6">
            <label className="mb-2 block text-[14px] font-semibold text-gray-900">
              링크 첨부
            </label>
            <div className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-3">
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="break-all text-[14px] text-blue-600 hover:underline"
              >
                {post.link}
              </a>
            </div>
          </div>
        )}

        {/* 글 내용 */}
        <div className="mb-6">
          <label className="mb-2 block text-[14px] font-semibold text-gray-900">
            글
          </label>
          <div className="min-h-[300px] whitespace-pre-wrap rounded-lg border border-gray-300 bg-white p-4 text-[14px] leading-relaxed text-gray-900">
            {post.content}
          </div>
        </div>

        {/* 승인 상태 */}
        <div className="my-8 py-5 text-center">
          <span className={`inline-block rounded-full px-5 py-2 text-[14px] font-medium ${approvalBadge.color}`}>
            {approvalBadge.text}
          </span>
          {post.approvalStatus === "REJECTED" && post.rejectionReason && (
            <div className="mx-auto mt-4 max-w-[600px] rounded-lg bg-gray-50 p-3 text-left">
              <p className="text-[13px] text-gray-600">
                <strong className="text-gray-900">반려 사유:</strong> {post.rejectionReason}
              </p>
            </div>
          )}
        </div>

        {/* 댓글 섹션 */}
        <div className="mt-8 border-t-2 border-gray-100 pt-8">
          <h3 className="mb-4 text-[16px] font-semibold text-gray-900">댓글</h3>

          {/* 댓글 작성 */}
          <div className="mb-4">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="댓글을 입력하세요..."
              className="min-h-[80px] w-full resize-vertical rounded-lg border border-gray-300 px-4 py-3 text-[14px] focus:border-blue-500 focus:outline-none"
            />
            <div className="mt-2 flex justify-end">
              <button
                onClick={() => {
                  if (commentText.trim()) {
                    alert("댓글이 작성되었습니다.");
                    setCommentText("");
                  } else {
                    alert("댓글 내용을 입력해주세요.");
                  }
                }}
                className="rounded-md bg-blue-500 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-blue-600"
              >
                댓글 작성
              </button>
            </div>
          </div>

          {/* 댓글 목록 */}
          <div className="flex flex-col gap-3">
            {post.comments && post.comments.length > 0 ? (
              post.comments.map((comment) => (
                <div key={comment.id}>
                  {/* 일반 댓글 */}
                  <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[14px] font-semibold text-gray-900">
                        {comment.authorName}
                      </span>
                      <span className="text-[12px] text-gray-500">
                        {comment.createdAt}
                      </span>
                    </div>
                    <div className="mb-2 text-[14px] leading-relaxed text-gray-700">
                      {comment.content}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleReplyInput(comment.id)}
                        className="text-[12px] text-blue-500 transition-colors hover:text-blue-600"
                      >
                        답글
                      </button>
                      <button className="text-[12px] text-gray-500 transition-colors hover:text-gray-600">
                        수정
                      </button>
                      <button className="text-[12px] text-gray-500 transition-colors hover:text-gray-600">
                        삭제
                      </button>
                    </div>

                    {/* 답글 입력 */}
                    {replyInputs[comment.id] && (
                      <div className="mt-3 border-t border-gray-200 pt-3">
                        <textarea
                          placeholder="답글을 입력하세요..."
                          className="min-h-[60px] w-full resize-vertical rounded-md border border-gray-300 px-3 py-2 text-[13px] focus:border-blue-500 focus:outline-none"
                        />
                        <div className="mt-2 flex justify-end gap-2">
                          <button
                            onClick={() => toggleReplyInput(comment.id)}
                            className="rounded border border-gray-300 bg-white px-3 py-1.5 text-[12px] font-medium text-gray-600 transition-colors hover:bg-gray-50"
                          >
                            취소
                          </button>
                          <button
                            onClick={() => {
                              alert("답글이 작성되었습니다.");
                              toggleReplyInput(comment.id);
                            }}
                            className="rounded bg-blue-500 px-3 py-1.5 text-[12px] font-medium text-white transition-colors hover:bg-blue-600"
                          >
                            답글 작성
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 답글 (대댓글) */}
                  {comment.replies && comment.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className="ml-10 mt-3 rounded-lg border border-gray-200 border-l-4 border-l-blue-500 bg-white p-4"
                    >
                      <div className="mb-2 flex items-center justify-between">
                        <span className="text-[14px] font-semibold text-gray-900">
                          {reply.authorName}
                        </span>
                        <span className="text-[12px] text-gray-500">
                          {reply.createdAt}
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
              ))
            ) : (
              <div className="py-10 text-center text-[14px] text-gray-500">
                등록된 댓글이 없습니다.
              </div>
            )}
          </div>
        </div>

        {/* 하단 완료 버튼 */}
        <div className="mt-8 flex justify-end border-t border-gray-100 pt-6">
          <button
            onClick={handleComplete}
            className="rounded-lg bg-red-500 px-8 py-3 text-[14px] font-medium text-white transition-colors hover:bg-red-600"
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
}