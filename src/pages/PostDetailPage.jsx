import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostDetail, completePost } from "../utils/api/post/postApi";
import CommentItem from "../components/post/CommentItem";
import LoadingState from "../components/common/LoadingState/LoadingState";

export default function PostDetailPage() {
  const { postId } = useParams();
  const navigate = useNavigate();

  // 상태 관리
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 데이터 가져오기
  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        setLoading(true);
        console.log('=== 게시글 조회 시작 ===');
        console.log('postId:', postId);
        
        const response = await getPostDetail(postId);
        console.log('API 응답:', response);
        
        if (response.success) {
          setPostData(response.response);
        }
      } catch (err) {
        console.error('게시글 조회 실패:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPostDetail();
    }
  }, [postId]);

  // 로딩 중
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <LoadingState message="게시글을 불러오는 중..." size="large" />
      </div>
    );
  }

  // 에러 발생
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-[16px] text-red-500">게시글을 불러올 수 없습니다.</p>
          <p className="mt-2 text-[14px] text-gray-500">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            돌아가기
          </button>
        </div>
      </div>
    );
  }

  // 데이터 없음
  if (!postData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-[16px] text-gray-500">게시글을 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-[1400px]">
        <div className="rounded-lg bg-white p-8 shadow-sm">
          
          {/* 제목 */}
          <h1 className="mb-4 text-[28px] font-semibold leading-tight text-gray-900">
            {postData.title}
          </h1>

          {/* 헤더 정보 */}
          <div className="mb-8 flex items-center justify-between border-b-2 border-gray-100 pb-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 text-[13px] text-gray-500">
                <span>작성자: {postData.authorName}</span>
                <span>작성일: {new Date(postData.createdAt).toLocaleDateString('ko-KR')}</span>
                <span>조회수: -</span>
                <button className="flex items-center gap-1 text-gray-600 transition-colors hover:text-blue-500">
                  <svg className="h-[18px] w-[18px] fill-current" viewBox="0 0 24 24">
                    <path d="M13.5,8H12V13L16.28,15.54L17,14.33L13.5,12.25V8M13,3A9,9 0 0,0 4,12H1L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3Z" />
                  </svg>
                  <span>히스토리</span>
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-[13px] text-gray-600 transition-colors hover:bg-gray-50"
                onClick={()=> {navigate(`/post/edit/${postId}`)}}
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
              {postData.stageName}
            </span>
          </div>
          {/* 파일 첨부 */}
          <div className="mb-6">
            <label className="mb-2 block text-[14px] font-semibold text-gray-900">
              파일 첨부
            </label>
            <div className="flex flex-col gap-2">
              {postData.files && postData.files.length > 0 ? (
                postData.files.map((file) => (
                  <div key={file.fileId} className="flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <svg className="h-5 w-5 fill-gray-600" viewBox="0 0 24 24">
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                      </svg>
                      <span className="text-[13px] text-gray-900">{file.fileOriginalFileName}</span>
                      <span className="text-[12px] text-gray-500">({(file.fileSize / 1024).toFixed(1)}KB)</span>
                    </div>
                    <a
                      href={file.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded border border-gray-300 bg-white px-3 py-1 text-[12px] text-gray-600 transition-colors hover:bg-gray-50"
                    >
                      다운로드
                    </a>
                  </div>
                ))
              ) : (
                <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
                  <p className="text-[13px] text-gray-400">첨부된 파일이 없습니다.</p>
                </div>
              )}
            </div>
          </div>

          {/* 링크 첨부 */}
          <div className="mb-6">
            <label className="mb-2 block text-[14px] font-semibold text-gray-900">
              링크 첨부
            </label>
            <div className="flex flex-col gap-2">
              {postData.links && postData.links.length > 0 ? (
                postData.links.map((link, index) => (
                  <div key={index} className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-3">
                      <a
                      href={link.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="break-all text-[14px] text-blue-600 hover:underline"
                    >
                      {link.linkUrl}
                    </a>
                  </div>
                ))
              ) : (
                <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
                  <p className="text-[13px] text-gray-400">첨부된 링크가 없습니다.</p>
                </div>
              )}
            </div>
          </div>

          {/* 글 내용 */}
          <div className="mb-6">
            <label className="mb-2 block text-[14px] font-semibold text-gray-900">
              글
            </label>
            <div className="min-h-[300px] whitespace-pre-wrap rounded-lg border border-gray-300 bg-white p-4 text-[14px] leading-relaxed text-gray-900">
              {postData.content}
            </div>
          </div>

          {/* 승인 상태 */}
          <div className="my-8 py-5 text-center">
            {postData.approveStatus === null && (
              <span className="inline-block rounded-full bg-amber-100 px-5 py-2 text-[14px] font-medium text-amber-600">
                승인 대기
              </span>
            )}
            {postData.approveStatus === 'APPROVED' && (
              <span className="inline-block rounded-full bg-green-100 px-5 py-2 text-[14px] font-medium text-green-600">
                승인 완료
              </span>
            )}
            {postData.approveStatus === 'REJECTED' && (
              <div>
                <span className="inline-block rounded-full bg-red-100 px-5 py-2 text-[14px] font-medium text-red-600">
                  반려됨
                </span>
                {postData.rejectionReason && (
                  <p className="mt-3 text-[13px] text-gray-600">
                    <strong>반려 사유:</strong> {postData.rejectionReason}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* 댓글 섹션은 4단계에서... */}
          {/* 댓글 섹션 */}
          <div className="mt-8 border-t-2 border-gray-100 pt-8">
            <h3 className="mb-4 text-[16px] font-semibold text-gray-900">댓글</h3>

            {/* 댓글 작성 */}
            <div className="mb-4">
              <textarea
                placeholder="댓글을 입력하세요..."
                className="min-h-[80px] w-full resize-vertical rounded-lg border border-gray-300 px-4 py-3 text-[14px] focus:border-blue-500 focus:outline-none"
              />
              <div className="mt-2 flex justify-end">
                <button className="rounded-md bg-blue-500 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-blue-600">
                  댓글 작성
                </button>
              </div>
            </div>

            {/* 댓글 목록 */}
            <div className="flex flex-col gap-3">
              {postData.comments && postData.comments.length > 0 ? (
                postData.comments.map((comment) => (
                  <CommentItem key={comment.commentId} comment={comment} />
                ))
              ) : (
                <p className="py-8 text-center text-[14px] text-gray-400">
                  아직 댓글이 없습니다.
                </p>
              )}
            </div>
          </div>

          {/* 하단 완료 버튼 */}
          <div className="mt-8 flex justify-end border-t border-gray-100 pt-6">
            <button className="rounded-lg bg-red-500 px-8 py-3 text-[14px] font-medium text-white transition-colors hover:bg-red-600">
              완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}