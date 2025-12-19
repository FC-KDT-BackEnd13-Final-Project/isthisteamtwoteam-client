import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostDetail } from "../utils/api/post/postApi";
import CommentItem from "../components/post/CommentItem";
import LoadingState from "../components/common/LoadingState/LoadingState";
import { deleteTempFile,uploadTempFile } from "../utils/api/file/fileApi";
import { createComment, getComments } from "../utils/api/post/commentApi";

export default function PostDetailPage() {
  const { postId, projectId } = useParams();
  const navigate = useNavigate();
 
  // 상태 관리
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [totalCommentCount, setTotalCommentCount] = useState(0);
  
  // 댓글 관련 상태
const [commentContent, setCommentContent] = useState("");
const [isSubmittingComment, setIsSubmittingComment] = useState(false);
const [commentFiles, setCommentFiles] = useState([]);
const [commentLinks, setCommentLinks] = useState([]);
const [commentLinkInput, setCommentLinkInput] = useState("");
const [isAddingCommentLink, setIsAddingCommentLink] = useState(false);
const commentFileInputRef = useRef(null);
const uploadedCommentTempFileIdsRef = useRef([]);

// 댓글 목록 가져오기
  const fetchComments = async () => {
    try {
      const response = await getComments(postId);
      console.log('댓글 목록:', response);
      
      if (response.success) {
        setComments(response.response.comments);
        setTotalCommentCount(response.response.totalCount);
      }
    } catch (error) {
      console.error('댓글 목록 조회 실패:', error);
    }
  };

  const handleGoToProject = () => {
    navigate(`/project/${projectId}`);
  };
  
// 데이터 가져오기
  // 데이터 가져오기
  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        setLoading(true);
        console.log('=== 게시글 조회 시작 ===');
        console.log('postId:', postId);
        
        const response = await getPostDetail(postId);
        console.log('API 응답:', response.response);
        
        if (response.success) {
          setPostData(response.response);
          // 게시글 조회 성공 시 댓글도 조회
          await fetchComments();
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

    useEffect(()=>{
    return () => {
      if(uploadedCommentTempFileIdsRef.current.length > 0 && postData?.projectId){
        deleteTempFile(postData.projectId, uploadedCommentTempFileIdsRef.current)
        .then(() => console.log('페이지 이탈 시 댓글 임시 파일 삭제 완료'))
        .catch(error => console.error('페이지 이탈 시 댓글 임시 파일 삭제 실패:', error));
      }
    }
  },[postData?.projectId])
  
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
  // 댓글 링크 추가 버튼 클릭
  const handleCommentLinkAddClick = () => {
    setIsAddingCommentLink(true);
    setCommentLinkInput("");
  };

  // 댓글 링크 추가 확인
  const handleCommentLinkAdd = () => {
    if (commentLinkInput.trim()) {
      setCommentLinks(prev => [...prev, { linkUrl: commentLinkInput.trim() }]);
      setCommentLinkInput("");
      setIsAddingCommentLink(false);
    }
  };

  // 댓글 링크 추가 취소
  const handleCommentLinkCancel = () => {
    setCommentLinkInput("");
    setIsAddingCommentLink(false);
  };

  // 댓글 링크 삭제
  const handleCommentLinkDelete = (index) => {
    setCommentLinks(prev => prev.filter((_, i) => i !== index));
  };

  // 댓글 파일 선택 핸들러
const handleCommentFileChange = async (e) => {
  const selectedFiles = Array.from(e.target.files);
  
  for (const file of selectedFiles) {
    try {
      const tempFile = {
        fileName: file.name,
        fileSize: file.size,
        isUploading: true
      };
      
      setCommentFiles(prev => [...prev, tempFile]);
      
      const response = await uploadTempFile(file, postData.projectId);
      
      if (response.success) {
        const uploadedFile = response.response[0];
        console.log("임시 저장된 파일의 id: " , uploadedFile.fileId);
        
        // 업로드된 임시 파일 ID를 ref에 추가 (나중에 삭제용)
        uploadedCommentTempFileIdsRef.current.push(uploadedFile.fileId);
        
        setCommentFiles(prev => 
          prev.map(f => 
            f.fileName === file.name && f.isUploading
              ? { 
                  fileId: uploadedFile.fileId,
                  fileName: uploadedFile.fileOriginalFileName,
                  fileSize: uploadedFile.fileSize,
                  fileUrl: uploadedFile.fileUrl,
                  isUploading: false
                }
              : f
          )
        );
      } else {
        throw new Error('파일 업로드 실패');
      }
      
    } catch (error) {
      console.error('파일 업로드 에러:', error);
      alert(`파일 업로드 실패: ${file.name}`);
      setCommentFiles(prev => prev.filter(f => !(f.fileName === file.name && f.isUploading)));
    }
  }
  
  e.target.value = '';
};

  // 댓글 파일 삭제
  const handleCommentFileDelete = (index) => {
    const fileToDelete = commentFiles[index];
    
    // 업로드된 임시 파일 ID 목록에서 제거
    uploadedCommentTempFileIdsRef.current = uploadedCommentTempFileIdsRef.current.filter(
      id => id !== fileToDelete.fileId
    );
    
    setCommentFiles(prev => prev.filter((_, i) => i !== index));
  };
  // 댓글 작성 핸들러
  // 댓글 작성 핸들러
  // 댓글 작성 핸들러
  const handleCreateComment = async () => {
    if (!commentContent.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    try {
      setIsSubmittingComment(true);
      
      const requestData = {
        content: commentContent.trim(),
        parentId: null,
        fileIds: commentFiles.map(file => file.fileId),
        linkUrls: commentLinks.map(link => link.linkUrl)
      };

      const response = await createComment(postId, requestData);

      if (response.success) {
        alert('댓글이 작성되었습니다.');
        setCommentContent("");
        setCommentFiles([]);
        setCommentLinks([]);
        
        // 댓글 작성 성공 시 임시 파일 추적 목록 초기화 (삭제하지 않음)
        uploadedCommentTempFileIdsRef.current = [];
        
        // 댓글 목록 다시 불러오기
        await fetchComments();
      } else {
        alert(response.response?.message || '댓글 작성에 실패했습니다.');
      }
    } catch (error) {
      console.error('댓글 작성 에러:', error);
      alert('댓글 작성에 실패했습니다.');
    } finally {
      setIsSubmittingComment(false);
    }
  };
  
    
  return (
    <div className="min-h-screen bg-gray-100 p-20">
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
            {/* ✅ 프로젝트로 이동 버튼 추가 */}
            <button 
              onClick={handleGoToProject}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-[13px] text-gray-600 transition-colors hover:bg-gray-50 flex items-center gap-2"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
              </svg>
              <span>프로젝트로 이동</span>
            </button>
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
          {/* 댓글 작성 */}
          <div className="mb-4">
            <textarea
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="댓글을 입력하세요..."
              className="min-h-[80px] w-full resize-vertical rounded-lg border border-gray-300 px-4 py-3 text-[14px] focus:border-blue-500 focus:outline-none"
              disabled={isSubmittingComment}
            />
            
            {/* 댓글 파일 첨부 */}
            {commentFiles.length > 0 && (
              <div className="mt-2 flex flex-col gap-2">
                {commentFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between gap-3 rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
                    <div className="flex min-w-0 flex-1 items-center gap-2">
                      <svg className="h-4 w-4 flex-shrink-0 fill-gray-600" viewBox="0 0 24 24">
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                      </svg>
                      <span className="truncate text-[12px] text-gray-900">
                        {file.fileName} {file.fileSize && <span className="text-gray-500">{file.fileSize} </span>}
                      </span>
                      {file.isUploading && (
                        <span className="flex-shrink-0 text-[11px] text-blue-600">업로드 중...</span>
                      )}
                    </div>
                    <button
                      onClick={() => handleCommentFileDelete(index)}
                      disabled={file.isUploading}
                      className="flex-shrink-0 rounded border border-red-300 bg-white px-2 py-1 text-[11px] text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      삭제
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* 댓글 링크 첨부 */}
            {commentLinks.length > 0 && (
              <div className="mt-2 flex flex-col gap-2">
                {commentLinks.map((link, index) => (
                  <div key={index} className="flex items-center justify-between gap-3 rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
                    <div className="flex min-w-0 flex-1 items-center gap-2">
                      <svg className="h-4 w-4 flex-shrink-0 fill-gray-600" viewBox="0 0 24 24">
                        <path d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z" />
                      </svg>
                      <span className="truncate text-[12px] text-blue-600">
                        {link.linkUrl}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCommentLinkDelete(index)}
                      className="flex-shrink-0 rounded border border-red-300 bg-white px-2 py-1 text-[11px] text-red-600 transition-colors hover:bg-red-50"
                    >
                      삭제
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* 링크 추가 입력창 */}
            {isAddingCommentLink && (
              <div className="mt-2 flex gap-2">
                <input
                  type="url"
                  value={commentLinkInput}
                  onChange={(e) => setCommentLinkInput(e.target.value)}
                  placeholder="링크 URL을 입력하세요 (https://...)"
                  className="flex-1 rounded-md border border-gray-300 px-3 py-1.5 text-[12px] focus:border-blue-500 focus:outline-none"
                  onKeyPress={(e) => e.key === 'Enter' && handleCommentLinkAdd()}
                />
                <button
                  onClick={handleCommentLinkAdd}
                  className="rounded-md bg-blue-500 px-3 py-1.5 text-[12px] text-white transition-colors hover:bg-blue-600"
                >
                  추가
                </button>
                <button
                  onClick={handleCommentLinkCancel}
                  className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-[12px] text-gray-600 transition-colors hover:bg-gray-50"
                >
                  취소
                </button>
              </div>
            )}
            
            <input
              ref={commentFileInputRef}
              type="file"
              multiple
              onChange={handleCommentFileChange}
              className="hidden"
            />
            
            <div className="mt-2 flex justify-between items-center">
              <div className="flex gap-2">
                <button
                  onClick={() => commentFileInputRef.current?.click()}
                  disabled={isSubmittingComment}
                  className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-[12px] text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  파일 추가
                </button>
                <button
                  onClick={handleCommentLinkAddClick}
                  disabled={isSubmittingComment || isAddingCommentLink}
                  className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-[12px] text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  링크 추가
                </button>
              </div>
              <button
                onClick={handleCreateComment}
                disabled={isSubmittingComment}
                className="rounded-md bg-blue-500 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isSubmittingComment ? '작성 중...' : '댓글 작성'}
              </button>
            </div>
          </div>

          {/* 댓글 목록 */}
          <div className="mt-8 border-t-2 border-gray-100 pt-8"></div>
          {/* 댓글 작성 */}
          {/* 댓글 목록 */}
          <div className="mt-8 border-t-2 border-gray-100 pt-8">
            <h3 className="mb-4 text-[16px] font-semibold text-gray-900">
              댓글 {totalCommentCount}
            </h3>
            
            <div className="flex flex-col gap-4">
              {comments && comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.commentId} className="rounded-lg border border-gray-200 bg-white p-4">
                    {/* 댓글 헤더 */}
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[14px] font-semibold text-gray-900">{comment.userName}</span>
                        <span className="text-[12px] text-gray-500">
                          {new Date(comment.createdAt).toLocaleString('ko-KR')}
                        </span>
                      </div>
                    </div>

                    {/* 댓글 내용 */}
                    <p className="mb-3 text-[14px] text-gray-900 whitespace-pre-wrap">{comment.content}</p>

                    {/* 댓글 파일 */}
                    {comment.files && comment.files.length > 0 && (
                      <div className="mb-3 flex flex-col gap-2">
                        {comment.files.map((file) => (
                          <div key={file.fileId} className="flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
                            <div className="flex items-center gap-2">
                              <svg className="h-4 w-4 fill-gray-600" viewBox="0 0 24 24">
                                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                              </svg>
                              <span className="text-[12px] text-gray-900">{file.fileOriginalFileName}</span>
                              <span className="text-[11px] text-gray-500">{file.fileSize}</span>
                            </div>
                            <a
                              href={file.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded border border-gray-300 bg-white px-2 py-1 text-[11px] text-gray-600 transition-colors hover:bg-gray-50"
                            >
                              다운로드
                            </a>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 댓글 링크 */}
                    {comment.links && comment.links.length > 0 && (
                      <div className="flex flex-col gap-2">
                        {comment.links.map((link, index) => (
                          <div key={index} className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
                            <a
                              href={link.linkUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="break-all text-[12px] text-blue-600 hover:underline"
                            >
                              {link.linkUrl}
                            </a>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
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