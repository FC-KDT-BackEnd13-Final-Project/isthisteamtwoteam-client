import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { uploadTempFile,deleteTempFiles } from "../utils/config/api/file/fileApi";
import { getPostDetail, updatePost } from "../utils/config/api/post/postApi";
// import { getPostDetail, uploadTempFile, updatePost } from "../utils/config/api/post/postApi";

export default function EditPostDetailPage() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // 상태 관리
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [projectId, setProjectId] = useState("")
  // 폼 데이터 상태
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [stage, setStage] = useState("");
  const [files, setFiles] = useState([]);
  const [links, setLinks] = useState([]);
  

  // 드롭다운 토글 상태
  const [isFileOpen, setIsFileOpen] = useState(false);
  const [isLinkOpen, setIsLinkOpen] = useState(false);

  // 링크 입력 상태
  const [linkInput, setLinkInput] = useState("");
  const [isAddingLink, setIsAddingLink] = useState(false);

  // 파일 업로드 관련 상태
  const [addFileIds, setAddFileIds] = useState([]);
  const [removeFileIds, setRemoveFileIds] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  
  const uploadedTempFileIdsRef = useRef([]);

  // 데이터 가져오기
  useEffect(() => {
    const fetchPostDetail = async () => {
      try {
        setLoading(true);
        const response = await getPostDetail(postId);
        console.log(response.response)
        
        if (response.success) {
          const data = response.response;
          console.log(data)
          setPostData(data);
          setTitle(data.title);
          setContent(data.content);
          setStage(data.stageName);
          setFiles(data.files || []);
          setLinks(data.links || []);
          setProjectId(data.projectId)
          setStartDate(data.startDate || "");  
          setEndDate(data.endDate || "");      
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

  // 페이지 이탈 시 임시 파일 정리
    useEffect(() => {
    return () => {
        // 컴포넌트 unmount 시 업로드된 임시 파일 삭제
        if (uploadedTempFileIdsRef.current.length > 0) {
        deleteTempFiles(projectId, uploadedTempFileIdsRef.current)
            .then(() => console.log('페이지 이탈 시 임시 파일 삭제 완료'))
            .catch(error => console.error('페이지 이탈 시 임시 파일 삭제 실패:', error));
        }
    };
    }, [projectId]);

    // 취소 버튼 핸들러 (업로드된 임시 파일 삭제)
    const handleCancel = async () => {
    // 업로드된 임시 파일이 있으면 삭제
    if (uploadedTempFileIdsRef.current.length > 0) {
        try {
        await deleteTempFiles(projectId, uploadedTempFileIdsRef.current);
        console.log('임시 파일 삭제 완료');
        } catch (error) {
        console.error('임시 파일 삭제 실패:', error);
        }
    }
    
    navigate(-1);
    };

  // 게시글 수정 핸들러
  const handleUpdatePost = async () => {
    try {
      if (!title.trim()) {
        alert('제목을 입력해주세요.');
        return;
      }
      
      if (!content.trim()) {
        alert('내용을 입력해주세요.');
        return;
      }
  
      if (!stage) {
        alert('진행단계를 선택해주세요.');
        return;
      }

      const requestData = {
        title: title.trim(),
        content: content.trim(),
        stage: stage,
        parentId: postData.parentId || 0,
        requestApproval: false,
        addFileIds: addFileIds,
        removeFileIds: removeFileIds,
        startDate: startDate,       
        endDate: endDate,            
        linkUrls: links.map(link => link.linkUrl)
      };
  
      console.log('수정 요청 데이터:', requestData);
      
      const response = await updatePost(projectId, postId, requestData);
      
  
      if (response.success) {
        // 수정 성공 시 임시 파일 추적 목록 초기화 (삭제하지 않음)
        uploadedTempFileIdsRef.current = [];
        alert('게시글이 수정되었습니다.');
        navigate(`/post/${postId}`);
      } else {
        alert(response.response.message);
      } 
    } catch (error) {
      console.error('게시글 수정 에러:', error);
      alert('게시글 수정에 실패했습니다.');
    }
  };

  // 파일 선택 핸들러
  // 파일 선택 핸들러
    const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    for (const file of selectedFiles) {
        try {
        const tempFile = {
            fileName: file.name,
            fileSize: file.size,
            isUploading: true,
            isNew: true
        };
        
        setFiles(prev => [...prev, tempFile]);
        
        const response = await uploadTempFile(file, projectId);
        
        if (response.success) {
            const uploadedFile = response.response[0];
            
            // 업로드된 임시 파일 ID를 ref에 추가 (나중에 삭제용)
            uploadedTempFileIdsRef.current.push(uploadedFile.fileId);
            
            setFiles(prev => 
            prev.map(f => 
                f.fileName === file.name && f.isUploading
                ? { 
                    fileId: uploadedFile.fileId,
                    fileName: uploadedFile.fileOriginalFileName,
                    fileSize: uploadedFile.fileSize,
                    fileUrl: uploadedFile.fileUrl,
                    isUploading: false,
                    isNew: true
                    }
                : f
            )
            );
            
            setAddFileIds(prev => [...prev, uploadedFile.fileId]);
        } else {
            throw new Error('파일 업로드 실패');
        }
        
        } catch (error) {
        console.error('파일 업로드 에러:', error);
        alert(`파일 업로드 실패: ${file.name}`);
        setFiles(prev => prev.filter(f => !(f.fileName === file.name && f.isUploading)));
        }
    }
    
    e.target.value = '';
    };

  // 파일 삭제
  const handleFileDelete = (index) => {
    const fileToDelete = files[index];

    setRemoveFileIds(prev => [...prev, fileToDelete.fileId]);

    if (fileToDelete.isNew) {
      setAddFileIds(prev => prev.filter(id => id !== fileToDelete.fileId));
    }

    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  // 링크 추가 버튼 클릭
  const handleLinkAddClick = () => {
    setIsAddingLink(true);
    setLinkInput("");
  };

  // 링크 추가 확인
  const handleLinkAdd = () => {
    if (linkInput.trim()) {
      setLinks(prev => [...prev, { linkUrl: linkInput.trim(), isNew: true }]);
      setLinkInput("");
      setIsAddingLink(false);
    }
  };

  // 링크 추가 취소
  const handleLinkCancel = () => {
    setLinkInput("");
    setIsAddingLink(false);
  };

  // 링크 삭제
  const handleLinkDelete = (index) => {
    setLinks(prev => prev.filter((_, i) => i !== index));
  };

  const handleFileAddClick = () => {
  fileInputRef.current?.click();
};

  // 로딩 중
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-[16px] text-gray-500">게시글을 불러오는 중...</p>
        </div>
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
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="mx-auto max-w-[1400px]">
            <h1 className="mb-4 text-[24px] font-bold text-gray-900">게시글 수정</h1>
        <div className="rounded-lg bg-white p-8 shadow-sm">
          
          {/* 제목 */}
          <div className="mb-6">
            <label className="mb-2 block text-[14px] font-semibold text-gray-900">
              제목
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-[16px] focus:border-blue-500 focus:outline-none"
              placeholder="제목을 입력하세요"
            />
          </div>

          {/* 헤더 정보 */}
          <div className="mb-8 border-b-2 border-gray-100 pb-6">
            <div className="flex items-center gap-4 text-[13px] text-gray-500">
              <span>작성자: {postData.authorName}</span>
              <span>작성일: {new Date(postData.createdAt).toLocaleDateString('ko-KR')}</span>
            </div>
          </div>

          {/* 진행단계 */}
          <div className="mb-6">
            <label className="mb-2 block text-[14px] font-semibold text-gray-900">
              진행단계
            </label>
            <select
              value={stage}
              onChange={(e) => setStage(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-[14px] focus:border-blue-500 focus:outline-none"
            >
              <option value="">진행단계를 선택하세요</option>
              <option value="진행전">진행전</option>
              <option value="진행 중단">진행 중단</option>
              <option value="요구사항 정의">요구사항 정의</option>
              <option value="화면 설계">화면 설계</option>
              <option value="디자인, 퍼블리싱">디자인, 퍼블리싱</option>
              <option value="개발">개발</option>
              <option value="검수">검수</option>
              <option value="유지보수">유지보수</option>
              <option value="완료">완료</option>
            </select>
          </div>

          <div className="mb-6 grid grid-cols-2 gap-4">
            <div>
              <label className="mb-2 block text-[14px] font-semibold text-gray-900">
                시작일
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-[14px] focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-2 block text-[14px] font-semibold text-gray-900">
                종료일
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-[14px] focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
          {/* 파일 첨부 - 드롭다운 */}
          <div className="mb-6">
            <button
              type="button"
              onClick={() => setIsFileOpen(!isFileOpen)}
              className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-left transition-colors hover:bg-gray-100"
            >
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 fill-gray-600" viewBox="0 0 24 24">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                </svg>
                <span className="text-[14px] font-semibold text-gray-900">
                  파일 첨부 {files.length > 0 && <span className="text-blue-600">({files.length})</span>}
                </span>
              </div>
              <svg
                className={`h-5 w-5 fill-gray-600 transition-transform ${isFileOpen ? 'rotate-180' : ''}`}
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </button>

            {isFileOpen && (
              <div className="mt-2 rounded-lg border border-gray-300 bg-white p-4">
                <div className="flex flex-col gap-2">
                  {/* 파일 목록 렌더링 */}
                  {files.length > 0 ? (
                    files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between gap-3 rounded-md border border-gray-200 bg-gray-50 px-3 py-2.5">
                        <div className="flex min-w-0 flex-1 items-center gap-2">
                          <svg className="h-5 w-5 flex-shrink-0 fill-gray-600" viewBox="0 0 24 24">
                            <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                          </svg>
                          <span className="truncate text-[13px] text-gray-900" title={file.fileName}>
                            {file.fileName} <span className="text-[12px] text-gray-500">({(file.fileSize / 1024).toFixed(1)}KB)</span>
                          </span>
                          {file.isUploading && (
                            <span className="flex-shrink-0 flex items-center gap-1 text-[11px] text-blue-600">
                              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              업로드 중...
                            </span>
                          )}
                          {file.isNew && !file.isUploading && (
                            <span className="flex-shrink-0 rounded bg-green-100 px-2 py-0.5 text-[11px] text-green-600">
                              NEW
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => handleFileDelete(index)}
                          disabled={file.isUploading}
                          className={`flex-shrink-0 rounded border px-3 py-1 text-[12px] transition-colors ${
                            file.isUploading 
                              ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed' 
                              : 'border-red-300 bg-white text-red-600 hover:bg-red-50'
                          }`}
                        >
                          삭제
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
                      <p className="text-[13px] text-gray-400">첨부된 파일이 없습니다.</p>
                    </div>
                  )}
                  
                  {/* 숨겨진 파일 input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  
                  <button 
                    onClick={handleFileAddClick}
                    className="mt-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-[13px] text-gray-600 transition-colors hover:bg-gray-50"
                  >
                    파일 추가
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 링크 첨부 - 드롭다운 */}
          <div className="mb-6">
            <button
              type="button"
              onClick={() => setIsLinkOpen(!isLinkOpen)}
              className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-left transition-colors hover:bg-gray-100"
            >
              <div className="flex items-center gap-2">
                <svg className="h-5 w-5 fill-gray-600" viewBox="0 0 24 24">
                  <path d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z" />
                </svg>
                <span className="text-[14px] font-semibold text-gray-900">
                  링크 첨부 {links.length > 0 && <span className="text-blue-600">({links.length})</span>}
                </span>
              </div>
              <svg
                className={`h-5 w-5 fill-gray-600 transition-transform ${isLinkOpen ? 'rotate-180' : ''}`}
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </button>

            {isLinkOpen && (
              <div className="mt-2 rounded-lg border border-gray-300 bg-white p-4">
                <div className="flex flex-col gap-2">
                  {links.length > 0 ? (
                    links.map((link, index) => (
                      <div key={index} className="flex items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
                        <div className="flex min-w-0 flex-1 items-center gap-2">
                          <span className="truncate break-all text-[14px] text-gray-700" title={link.linkUrl}>
                            {link.linkUrl}
                          </span>
                          {link.isNew && (
                            <span className="flex-shrink-0 rounded bg-green-100 px-2 py-0.5 text-[11px] text-green-600">
                              NEW
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => handleLinkDelete(index)}
                          className="flex-shrink-0 rounded border border-red-300 bg-white px-3 py-1 text-[12px] text-red-600 transition-colors hover:bg-red-50"
                        >
                          삭제
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-3">
                      <p className="text-[13px] text-gray-400">첨부된 링크가 없습니다.</p>
                    </div>
                  )}
                  
                  {/* 링크 추가 입력창 */}
                  {isAddingLink ? (
                    <div className="mt-2 flex flex-col gap-2">
                      <input
                        type="url"
                        value={linkInput}
                        onChange={(e) => setLinkInput(e.target.value)}
                        placeholder="링크 URL을 입력하세요 (https://...)"
                        className="w-full rounded-md border border-gray-300 px-4 py-2 text-[13px] focus:border-blue-500 focus:outline-none"
                        onKeyPress={(e) => e.key === 'Enter' && handleLinkAdd()}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleLinkAdd}
                          className="flex-1 rounded-md bg-blue-500 px-4 py-2 text-[13px] text-white transition-colors hover:bg-blue-600"
                        >
                          추가
                        </button>
                        <button
                          onClick={handleLinkCancel}
                          className="flex-1 rounded-md border border-gray-300 bg-white px-4 py-2 text-[13px] text-gray-600 transition-colors hover:bg-gray-50"
                        >
                          취소
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button 
                      onClick={handleLinkAddClick}
                      className="mt-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-[13px] text-gray-600 transition-colors hover:bg-gray-50"
                    >
                      링크 추가
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 글 내용 */}
          <div className="mb-6">
            <label className="mb-2 block text-[14px] font-semibold text-gray-900">
              글
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[300px] w-full resize-vertical rounded-lg border border-gray-300 p-4 text-[14px] leading-relaxed focus:border-blue-500 focus:outline-none"
              placeholder="내용을 입력하세요"
            />
          </div>

          {/* 하단 버튼 */}
          <div className="mt-8 flex justify-end gap-3 border-t border-gray-100 pt-6">
            <button
              onClick={() => handleCancel}
              className="rounded-lg border border-gray-300 bg-white px-8 py-3 text-[14px] font-medium text-gray-600 transition-colors hover:bg-gray-50"
            >
              취소
            </button>
            <button 
              onClick={handleUpdatePost}
              className="rounded-lg bg-blue-500 px-8 py-3 text-[14px] font-medium text-white transition-colors hover:bg-blue-600"
            >
              수정 완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
