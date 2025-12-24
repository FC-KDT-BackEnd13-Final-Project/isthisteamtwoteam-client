import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostDetail } from "../utils/config/api/post/postApi";
import { useAuth } from "../context/AuthConext";
import CommentItem from "../components/post/CommentItem";
import LoadingState from "../components/common/LoadingState/LoadingState";
import { deleteTempFile,uploadTempFile } from "../utils/config/api/file/fileApi";
import { createComment, getComments, updateComment,deleteComment } from "../utils/config/api/post/commentApi";
import { approvePost, rejectPost } from "../utils/config/api/post/approvalApi";
import api from "../utils/config/api/axios";

export default function PostDetailPage() {
  const { postId, projectId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const userRole = user?.role;
  const currentUserId = user?.id

  // 상태 관리
  const [postData, setPostData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [totalCommentCount, setTotalCommentCount] = useState(0);
  
  // 승인/거절 관련 상태
  const [showRejectionInput, setShowRejectionInput] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectionFiles, setRejectionFiles] = useState([]);
  const [rejectionLinks, setRejectionLinks] = useState([]);
  const [rejectionLinkInput, setRejectionLinkInput] = useState("");
  const [isAddingRejectionLink, setIsAddingRejectionLink] = useState(false);
  const rejectionFileInputRef = useRef(null);
  const uploadedRejectionTempFileIdsRef = useRef([]);
  
  // 댓글 관련 상태
  const [commentContent, setCommentContent] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [commentFiles, setCommentFiles] = useState([]);
  const [commentLinks, setCommentLinks] = useState([]);
  const [commentLinkInput, setCommentLinkInput] = useState("");
  const [isAddingCommentLink, setIsAddingCommentLink] = useState(false);
  const commentFileInputRef = useRef(null);
  const uploadedCommentTempFileIdsRef = useRef([]);

  // 댓글 수정 관련 상태
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentContent, setEditCommentContent] = useState("");
  const [editCommentFiles, setEditCommentFiles] = useState([]);
  const [editCommentLinks, setEditCommentLinks] = useState([]);
  const [editCommentLinkInput, setEditCommentLinkInput] = useState("");
  const [isAddingEditCommentLink, setIsAddingEditCommentLink] = useState(false);
  const editCommentFileInputRef = useRef(null);
  const uploadedEditCommentTempFileIdsRef = useRef([]);
  const [isUpdatingComment, setIsUpdatingComment] = useState(false);

  // 답글 관련 상태 추가
  const [replyingToCommentId, setReplyingToCommentId] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  const [replyFiles, setReplyFiles] = useState([]);
  const [replyLinks, setReplyLinks] = useState([]);
  const [replyLinkInput, setReplyLinkInput] = useState("");
  const [isAddingReplyLink, setIsAddingReplyLink] = useState(false);
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const replyFileInputRef = useRef(null);
  const uploadedReplyTempFileIdsRef = useRef([]);

  // 댓글 계층 구조 빌드 함수
  // const buildCommentHierarchy = (comments) => {
  //   if (!comments || comments.length === 0) return [];

  //   const parentComments = comments.filter(comment => !comment.parentId);
  //   const childComments = comments.filter(comment => comment.parentId);

  //   const hierarchy = parentComments.map(parent => ({
  //     ...parent,
  //     replies: childComments.filter(child => child.parentId === parent.commentId)
  //   }));

  //   return hierarchy;
  // };
  // API 응답에서 이미 계층 구조가 포함되어 있으므로 
// 최상위 댓글(parentId가 null인 댓글)만 필터링
const getTopLevelComments = (comments) => {
  if (!comments || comments.length === 0) return [];
  return comments.filter(comment => comment.parentId === null);
};

  // 답글 작성 시작
  const handleReplyStart = (commentId) => {
    setReplyingToCommentId(commentId);
    setReplyContent("");
    setReplyFiles([]);
    setReplyLinks([]);
    setReplyLinkInput("");
    setIsAddingReplyLink(false);
    uploadedReplyTempFileIdsRef.current = [];
  };

  // 답글 작성 취소
  const handleReplyCancel = () => {
    // 임시 파일 삭제
    if (uploadedReplyTempFileIdsRef.current.length > 0 && postData?.projectId) {
      deleteTempFile(postData.projectId, uploadedReplyTempFileIdsRef.current);
    }

    setReplyingToCommentId(null);
    setReplyContent("");
    setReplyFiles([]);
    setReplyLinks([]);
    setReplyLinkInput("");
    setIsAddingReplyLink(false);
    uploadedReplyTempFileIdsRef.current = [];
  };

  // 답글 파일 선택
  const handleReplyFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    
    for (const file of selectedFiles) {
      try {
        const tempFile = {
          fileName: file.name,
          fileSize: `${(file.size / 1024 / 1024).toFixed(1)}MB`,
          isUploading: true
        };
        
        setReplyFiles(prev => [...prev, tempFile]);
        
        const response = await uploadTempFile(file, postData.projectId);
        
        if (response.success) {
          const uploadedFile = response.response[0];
          
          uploadedReplyTempFileIdsRef.current.push(uploadedFile.fileId);
          
          setReplyFiles(prev => 
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
        setReplyFiles(prev => prev.filter(f => !(f.fileName === file.name && f.isUploading)));
      }
    }
    
    e.target.value = '';
  };

  // 답글 파일 삭제
  const handleReplyFileDelete = (index) => {
    const fileToDelete = replyFiles[index];
    
    uploadedReplyTempFileIdsRef.current = uploadedReplyTempFileIdsRef.current.filter(
      id => id !== fileToDelete.fileId
    );
    
    setReplyFiles(prev => prev.filter((_, i) => i !== index));
  };

  // 답글 링크 추가
  const handleReplyLinkAddClick = () => {
    setIsAddingReplyLink(true);
    setReplyLinkInput("");
  };

  const handleReplyLinkAdd = () => {
    if (replyLinkInput.trim()) {
      setReplyLinks(prev => [...prev, { linkUrl: replyLinkInput.trim() }]);
      setReplyLinkInput("");
      setIsAddingReplyLink(false);
    }
  };

  const handleReplyLinkCancel = () => {
    setReplyLinkInput("");
    setIsAddingReplyLink(false);
  };

  const handleReplyLinkDelete = (index) => {
    setReplyLinks(prev => prev.filter((_, i) => i !== index));
  };

  // 답글 제출
  const handleSubmitReply = async () => {
    if (!replyContent.trim()) {
      alert('답글 내용을 입력해주세요.');
      return;
    }

    try {
      setIsSubmittingReply(true);
      
      const request = {
        content: replyContent.trim(),
        parentId: replyingToCommentId,
        fileIds: replyFiles.map(file => file.fileId),
        linkUrls: replyLinks.map(link => link.linkUrl)
      };

      const response = await createComment(postId, request);

      if (response.success) {
        alert('답글이 작성되었습니다.');
        setReplyingToCommentId(null);
        setReplyContent("");
        setReplyFiles([]);
        setReplyLinks([]);
        uploadedReplyTempFileIdsRef.current = [];
        
        await fetchComments();
      } else {
        alert(response.response?.message || '답글 작성에 실패했습니다.');
      }
    } catch (error) {
      console.error('답글 작성 에러:', error);
      alert('답글 작성에 실패했습니다.');
    } finally {
      setIsSubmittingReply(false);
    }
  };

// 댓글 수정 시작
const handleEditCommentStart = (comment) => {
  setEditingCommentId(comment.commentId);
  setEditCommentContent(comment.content);
  
  const formattedFiles = (comment.files || []).map(file => ({
    fileId: file.fileId,
    fileName: file.fileOriginalFileName,
    fileSize: file.fileSize,
    fileUrl: file.fileUrl,
    isUploading: false
  }));
  
  setEditCommentFiles(formattedFiles);
  setEditCommentLinks(comment.links || []);
  uploadedEditCommentTempFileIdsRef.current = (comment.files || []).map(f => f.fileId);
};

const handleDeleteComment = async (commentId) => {
  if (!window.confirm('댓글을 삭제하시겠습니까?')) {
    return;
  }

  try {
    console.log('댓글 삭제 시작:', commentId);
    
    const response = await deleteComment(commentId);
    
    console.log('댓글 삭제 응답:', response);

    if (response.success) {
      alert('댓글이 삭제되었습니다.');
      await fetchComments();
    } else {
      alert(response.message || '댓글 삭제에 실패했습니다.');
    }
  } catch (error) {
    console.error('댓글 삭제 에러:', error);
    alert('댓글 삭제에 실패했습니다.');
  }
};

// 댓글 수정 취소
const handleEditCommentCancel = () => {
  const originalFileIds = comments
    .find(c => c.commentId === editingCommentId)
    ?.files?.map(f => f.fileId) || [];
  
  const newTempFileIds = uploadedEditCommentTempFileIdsRef.current.filter(
    id => !originalFileIds.includes(id)
  );
  
  if (newTempFileIds.length > 0 && postData?.projectId) {
    deleteTempFile(postData.projectId, newTempFileIds);
  }
  
  setEditingCommentId(null);
  setEditCommentContent("");
  setEditCommentFiles([]);
  setEditCommentLinks([]);
  setEditCommentLinkInput("");
  setIsAddingEditCommentLink(false);
  uploadedEditCommentTempFileIdsRef.current = [];
};

// 댓글 수정 파일 선택
const handleEditCommentFileChange = async (e) => {
  const selectedFiles = Array.from(e.target.files);
  
  for (const file of selectedFiles) {
    try {
      const tempFile = {
        fileName: file.name,
        fileSize: `${(file.size / 1024 / 1024).toFixed(1)}MB`,
        isUploading: true
      };
      
      setEditCommentFiles(prev => [...prev, tempFile]);
      
      const response = await uploadTempFile(file, postData.projectId);
      
      if (response.success) {
        const uploadedFile = response.response[0];
        console.log("임시 저장된 파일의 id: ", uploadedFile.fileId);
        
        uploadedEditCommentTempFileIdsRef.current.push(uploadedFile.fileId);
        
        setEditCommentFiles(prev => 
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
      setEditCommentFiles(prev => prev.filter(f => !(f.fileName === file.name && f.isUploading)));
    }
  }
  
  e.target.value = '';
};

// 댓글 수정 파일 삭제
const handleEditCommentFileDelete = (index) => {
  const fileToDelete = editCommentFiles[index];
  
  uploadedEditCommentTempFileIdsRef.current = uploadedEditCommentTempFileIdsRef.current.filter(
    id => id !== fileToDelete.fileId
  );
  
  setEditCommentFiles(prev => prev.filter((_, i) => i !== index));
};

// 댓글 수정 링크 추가
const handleEditCommentLinkAddClick = () => {
  setIsAddingEditCommentLink(true);
  setEditCommentLinkInput("");
};

const handleEditCommentLinkAdd = () => {
  if (editCommentLinkInput.trim()) {
    setEditCommentLinks(prev => [...prev, { linkUrl: editCommentLinkInput.trim() }]);
    setEditCommentLinkInput("");
    setIsAddingEditCommentLink(false);
  }
};

const handleEditCommentLinkCancel = () => {
  setEditCommentLinkInput("");
  setIsAddingEditCommentLink(false);
};

const handleEditCommentLinkDelete = (index) => {
  setEditCommentLinks(prev => prev.filter((_, i) => i !== index));
};

// 댓글 수정 제출
const handleUpdateComment = async () => {
  if (!editCommentContent.trim()) {
    alert('댓글 내용을 입력해주세요.');
    return;
  }

  try {
    setIsUpdatingComment(true);
    
    const originalComment = comments.find(c => c.commentId === editingCommentId);
    const originalFileIds = (originalComment?.files || []).map(f => f.fileId);
    const currentFileIds = editCommentFiles.map(f => f.fileId);
    
    const addFileIds = currentFileIds.filter(id => !originalFileIds.includes(id));
    const removeFileIds = originalFileIds.filter(id => !currentFileIds.includes(id));
    
    const request = {
      content: editCommentContent.trim(),
      addFileIds: addFileIds,
      removeFileIds: removeFileIds,
      linkUrls: editCommentLinks.map(link => link.linkUrl)
    };

    const response = await updateComment(editingCommentId, request);

    if (response.success) {
      alert('댓글이 수정되었습니다.');
      setEditingCommentId(null);
      setEditCommentContent("");
      setEditCommentFiles([]);
      setEditCommentLinks([]);
      uploadedEditCommentTempFileIdsRef.current = [];
      
      await fetchComments();
    }
  } catch (error) {
    console.error('댓글 수정 에러:', error);
    alert('댓글 수정에 실패했습니다.');
  } finally {
    setIsUpdatingComment(false);
  }
};

// 댓글 목록 가져오기
// 댓글 목록 새로고침 (댓글 작성/수정/삭제 후 호출)
const refreshComments = async () => {
  try {
    const response = await getPostDetail(postId);
    if (response.success && response.response.comments) {
      setComments(response.response.comments);
      const totalCount = response.response.comments.reduce((total, comment) => {
        return total + 1 + (comment.replies?.length || 0);
      }, 0);
      setTotalCommentCount(totalCount);
    }
  } catch (error) {
    console.error('댓글 목록 새로고침 실패:', error);
  }
};
  const handleGoToProject = () => {
    navigate(`/project/${projectId}`);
  };
  
  // 거절 버튼 클릭
  const handleRejectClick = () => {
    setShowRejectionInput(true);
  };
  
  // 거절 취소
  const handleRejectCancel = () => {
    if (uploadedRejectionTempFileIdsRef.current.length > 0 && postData?.projectId) {
      deleteTempFile(postData.projectId, uploadedRejectionTempFileIdsRef.current);
    }
    
    setShowRejectionInput(false);
    setRejectionReason("");
    setRejectionFiles([]);
    setRejectionLinks([]);
    setRejectionLinkInput("");
    setIsAddingRejectionLink(false);
    uploadedRejectionTempFileIdsRef.current = [];
  };

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
        const postResponse = response.response;
        setPostData(postResponse);
        console.log('게시글 데이터:', postResponse);
        
        // postData에 comments가 포함되어 있으면 직접 사용
        if (postResponse.comments) {
          setComments(postResponse.comments);
          // totalCount는 최상위 댓글 수 + 모든 답글 수
          const totalCount = postResponse.comments.reduce((total, comment) => {
            return total + 1 + (comment.replies?.length || 0);
          }, 0);
          setTotalCommentCount(totalCount);
        }
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

useEffect(() => {
  return () => {
    // 댓글 임시 파일 삭제
    if (uploadedCommentTempFileIdsRef.current.length > 0 && postData?.projectId) {
      deleteTempFile(postData.projectId, uploadedCommentTempFileIdsRef.current)
        .then(() => console.log('페이지 이탈 시 댓글 임시 파일 삭제 완료'))
        .catch(error => console.error('페이지 이탈 시 댓글 임시 파일 삭제 실패:', error));
    }
    
    // 반려 임시 파일 삭제
    if (uploadedRejectionTempFileIdsRef.current.length > 0 && postData?.projectId) {
      deleteTempFile(postData.projectId, uploadedRejectionTempFileIdsRef.current)
        .then(() => console.log('페이지 이탈 시 반려 임시 파일 삭제 완료'))
        .catch(error => console.error('페이지 이탈 시 반려 임시 파일 삭제 실패:', error));
    }

    // 답글 임시 파일 삭제
    if (uploadedReplyTempFileIdsRef.current.length > 0 && postData?.projectId) {
      deleteTempFile(postData.projectId, uploadedReplyTempFileIdsRef.current)
        .then(() => console.log('페이지 이탈 시 답글 임시 파일 삭제 완료'))
        .catch(error => console.error('페이지 이탈 시 답글 임시 파일 삭제 실패:', error));
    }
  }
}, [postData?.projectId]);
  
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
  
  const handleHistoryClick = () => {
    navigate(`/project/${projectId}/post/${postId}/history`);
  };

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
    
    uploadedCommentTempFileIdsRef.current = uploadedCommentTempFileIdsRef.current.filter(
      id => id !== fileToDelete.fileId
    );
    
    setCommentFiles(prev => prev.filter((_, i) => i !== index));
  };

  // 승인 처리
const handleApprove = async () => {
  const response = await api.get('/auth/session', {
    skipAuthRedirect: true,
    skipRolePath: true
  });

  if (window.confirm('승인하시겠습니까?')) {
    try {
      const response = await approvePost(postId);
      
      if (response.success) {
        alert('승인되었습니다.');
        window.location.reload();
      }
    } catch (error) {
      console.error('승인 실패:', error);
      alert('승인에 실패했습니다.');
    }
  }
};

  const handleCreateComment = async () => {
    if (!commentContent.trim()) {
      alert('댓글 내용을 입력해주세요.');
      return;
    }

    try {
      setIsSubmittingComment(true);
      
      const request = {
        content: commentContent.trim(),
        parentId: null,
        fileIds: commentFiles.map(file => file.fileId),
        linkUrls: commentLinks.map(link => link.linkUrl)
      };

      const response = await createComment(postId, request);

      if (response.success) {
        alert('댓글이 작성되었습니다.');
        setCommentContent("");
        setCommentFiles([]);
        setCommentLinks([]);
        
        uploadedCommentTempFileIdsRef.current = [];
        
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

  // 거절 파일 선택 핸들러
const handleRejectionFileChange = async (e) => {
  const selectedFiles = Array.from(e.target.files);
  
  for (const file of selectedFiles) {
    try {
      const tempFile = {
        fileName: file.name,
        fileSize: `${(file.size / 1024 / 1024).toFixed(1)}MB`,
        isUploading: true
      };
      
      setRejectionFiles(prev => [...prev, tempFile]);
      
      const response = await uploadTempFile(file, postData.projectId);
      
      if (response.success) {
        const uploadedFile = response.response[0];
        console.log("반려 임시 저장된 파일의 id: ", uploadedFile.fileId);
        
        uploadedRejectionTempFileIdsRef.current.push(uploadedFile.fileId);
        
        setRejectionFiles(prev => 
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
      setRejectionFiles(prev => prev.filter(f => !(f.fileName === file.name && f.isUploading)));
    }
  }
  
  e.target.value = '';
};

// 거절 파일 삭제
const handleRejectionFileDelete = (index) => {
  const fileToDelete = rejectionFiles[index];
  
  uploadedRejectionTempFileIdsRef.current = uploadedRejectionTempFileIdsRef.current.filter(
    id => id !== fileToDelete.fileId
  );
  
  setRejectionFiles(prev => prev.filter((_, i) => i !== index));
};

// 거절 링크 추가 버튼 클릭
const handleRejectionLinkAddClick = () => {
  setIsAddingRejectionLink(true);
  setRejectionLinkInput("");
};

// 거절 링크 추가 확인
const handleRejectionLinkAdd = () => {
  if (rejectionLinkInput.trim()) {
    setRejectionLinks(prev => [...prev, rejectionLinkInput.trim()]);
    setRejectionLinkInput("");
    setIsAddingRejectionLink(false);
  }
};

// 거절 링크 추가 취소
const handleRejectionLinkCancel = () => {
  setRejectionLinkInput("");
  setIsAddingRejectionLink(false);
};

// 거절 링크 삭제
const handleRejectionLinkDelete = (index) => {
  setRejectionLinks(prev => prev.filter((_, i) => i !== index));
};

// 거절 확인
const handleRejectConfirm = async () => {
  if (!rejectionReason.trim()) {
    alert('반려 사유를 입력해주세요.');
    return;
  }
  
  try {
    const requestBody = {
      fileIds: rejectionFiles.map(file => file.fileId),
      linkUrls: rejectionLinks,
      reject_reason: rejectionReason.trim()
    };

    const response = await rejectPost(postId, requestBody);
    
    if (response.success) {
      alert('반려되었습니다.');
      setShowRejectionInput(false);
      setRejectionReason("");
      setRejectionFiles([]);
      setRejectionLinks([]);
      uploadedRejectionTempFileIdsRef.current = [];
      
      window.location.reload();
    }
  } catch (error) {
    console.error('거절 실패:', error);
    alert('반려 처리에 실패했습니다.');
  }
};

  // 댓글 렌더링 함수 (답글 포함)
  const renderComment = (comment, isReply = false) => {
    const isEditing = editingCommentId === comment.commentId;
    const isReplying = replyingToCommentId === comment.commentId;

    return (
      <div key={comment.commentId} className={`${isReply ? 'ml-12' : ''}`}>
        <div className="rounded-lg border border-gray-200 bg-white p-4 mb-3">
          {isEditing ? (
            /* 수정 모드 */
            <>
              <textarea
                value={editCommentContent}
                onChange={(e) => setEditCommentContent(e.target.value)}
                className="min-h-[80px] w-full resize-vertical rounded-lg border border-gray-300 px-4 py-3 text-[14px] focus:border-blue-500 focus:outline-none mb-3"
                disabled={isUpdatingComment}
              />
              
              {editCommentFiles.length > 0 && (
                <div className="mb-2 flex flex-col gap-2">
                  {editCommentFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between gap-3 rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
                      <div className="flex min-w-0 flex-1 items-center gap-2">
                        <svg className="h-4 w-4 flex-shrink-0 fill-gray-600" viewBox="0 0 24 24">
                          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                        </svg>
                        <span className="truncate text-[12px] text-gray-900">
                          {file.fileName} {file.fileSize && <span className="text-gray-500">{file.fileSize}</span>}
                        </span>
                        {file.isUploading && (
                          <span className="flex-shrink-0 text-[11px] text-blue-600">업로드 중...</span>
                        )}
                      </div>
                      <button
                        onClick={() => handleEditCommentFileDelete(index)}
                        disabled={file.isUploading}
                        className="flex-shrink-0 rounded border border-red-300 bg-white px-2 py-1 text-[11px] text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        삭제
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {editCommentLinks.length > 0 && (
                <div className="mb-2 flex flex-col gap-2">
                  {editCommentLinks.map((link, index) => (
                    <div key={index} className="flex items-center justify-between gap-3 rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
                      <div className="flex min-w-0 flex-1 items-center gap-2">
                        <svg className="h-4 w-4 flex-shrink-0 fill-gray-600" viewBox="0 0 24 24">
                          <path d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z" />
                        </svg>
                        <span className="truncate text-[12px] text-blue-600">{link.linkUrl}</span>
                      </div>
                      <button
                        onClick={() => handleEditCommentLinkDelete(index)}
                        className="flex-shrink-0 rounded border border-red-300 bg-white px-2 py-1 text-[11px] text-red-600 transition-colors hover:bg-red-50"
                      >
                        삭제
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {isAddingEditCommentLink && (
                <div className="mb-2 flex gap-2">
                  <input
                    type="url"
                    value={editCommentLinkInput}
                    onChange={(e) => setEditCommentLinkInput(e.target.value)}
                    placeholder="링크 URL을 입력하세요 (https://...)"
                    className="flex-1 rounded-md border border-gray-300 px-3 py-1.5 text-[12px] focus:border-blue-500 focus:outline-none"
                    onKeyPress={(e) => e.key === 'Enter' && handleEditCommentLinkAdd()}
                  />
                  <button
                    onClick={handleEditCommentLinkAdd}
                    className="rounded-md bg-blue-500 px-3 py-1.5 text-[12px] text-white transition-colors hover:bg-blue-600"
                  >
                    추가
                  </button>
                  <button
                    onClick={handleEditCommentLinkCancel}
                    className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-[12px] text-gray-600 transition-colors hover:bg-gray-50"
                  >
                    취소
                  </button>
                </div>
              )}

              <input
                ref={editCommentFileInputRef}
                type="file"
                multiple
                onChange={handleEditCommentFileChange}
                className="hidden"
              />

              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <button
                    onClick={() => editCommentFileInputRef.current?.click()}
                    disabled={isUpdatingComment}
                    className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-[12px] text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    파일 추가
                  </button>
                  <button
                    onClick={handleEditCommentLinkAddClick}
                    disabled={isUpdatingComment || isAddingEditCommentLink}
                    className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-[12px] text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    링크 추가
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleEditCommentCancel}
                    disabled={isUpdatingComment}
                    className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-[12px] text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleUpdateComment}
                    disabled={isUpdatingComment}
                    className="rounded-md bg-blue-500 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isUpdatingComment ? '수정 중...' : '수정 완료'}
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* 일반 모드 */
            <>
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {isReply && <span className="text-gray-400 mr-1">└─</span>}
                  <span className="text-[14px] font-semibold text-gray-900">{comment.userName}</span>
                  <span className="text-[12px] text-gray-500">
                    {new Date(comment.createdAt).toLocaleString('ko-KR')}
                  </span>
                </div>
                
                {comment.userId === currentUserId && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditCommentStart(comment)}
                      className="rounded-md border border-gray-300 bg-white px-3 py-1 text-[12px] text-gray-600 transition-colors hover:bg-gray-50"
                    >
                      수정
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment.commentId)}
                      className="rounded-md border border-red-300 bg-white px-3 py-1 text-[12px] text-red-600 transition-colors hover:bg-red-50"
                    >
                      삭제
                    </button>
                  </div>
                )}
              </div>

              <p className="mb-3 text-[14px] text-gray-900 whitespace-pre-wrap">{comment.content}</p>

              {comment.files && comment.files.length > 0 && (
                <div className="mb-3 flex flex-col gap-2">
                  {comment.files.map((file) => (
                    <a
                      key={file.fileId}
                      href={file.fileUrl}
                      download={file.fileOriginalFileName}
                      className="flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 cursor-pointer transition-colors hover:bg-blue-50 hover:border-blue-300"
                    >
                      <svg className="h-4 w-4 fill-gray-600" viewBox="0 0 24 24">
                        <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                      </svg>
                      <span className="text-[12px] text-gray-900 hover:text-blue-600 transition-colors">{file.fileOriginalFileName}</span>
                      <span className="text-[11px] text-gray-500">{file.fileSize}</span>
                    </a>
                  ))}
                </div>
              )}
              
              {comment.links && comment.links.length > 0 && (
                <div className="mb-3 flex flex-col gap-2">
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

              {/* 답글 달기 버튼 */}
              {!isReply && (
                <button
                  onClick={() => handleReplyStart(comment.commentId)}
                  className="text-[12px] text-blue-600 hover:underline"
                >
                  답글 달기
                </button>
              )}
            </>
          )}
        </div>

        {/* 답글 작성 폼 */}
        {/* 답글 작성 폼 */}
        {isReplying && (
          <div className="ml-12 mb-3">
            <div className="rounded-lg border border-gray-300 bg-white p-4">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="답글을 입력하세요..."
                className="min-h-[80px] w-full resize-vertical rounded-lg border border-gray-300 px-4 py-3 text-[14px] focus:border-blue-500 focus:outline-none mb-2"
                disabled={isSubmittingReply}
              />

              {replyFiles.length > 0 && (
                <div className="mb-2 flex flex-col gap-2">
                  {replyFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between gap-3 rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
                      <div className="flex min-w-0 flex-1 items-center gap-2">
                        <svg className="h-4 w-4 flex-shrink-0 fill-gray-600" viewBox="0 0 24 24">
                          <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                        </svg>
                        <span className="truncate text-[12px] text-gray-900">
                          {file.fileName} {file.fileSize && <span className="text-gray-500">{file.fileSize}</span>}
                        </span>
                        {file.isUploading && (
                          <span className="flex-shrink-0 text-[11px] text-blue-600">업로드 중...</span>
                        )}
                      </div>
                      <button
                        onClick={() => handleReplyFileDelete(index)}
                        disabled={file.isUploading}
                        className="flex-shrink-0 rounded border border-red-300 bg-white px-2 py-1 text-[11px] text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        삭제
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {replyLinks.length > 0 && (
                <div className="mb-2 flex flex-col gap-2">
                  {replyLinks.map((link, index) => (
                    <div key={index} className="flex items-center justify-between gap-3 rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
                      <div className="flex min-w-0 flex-1 items-center gap-2">
                        <svg className="h-4 w-4 flex-shrink-0 fill-gray-600" viewBox="0 0 24 24">
                          <path d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z" />
                        </svg>
                        <span className="truncate text-[12px] text-blue-600">{link.linkUrl}</span>
                      </div>
                      <button
                        onClick={() => handleReplyLinkDelete(index)}
                        className="flex-shrink-0 rounded border border-red-300 bg-white px-2 py-1 text-[11px] text-red-600 transition-colors hover:bg-red-50"
                      >
                        삭제
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {isAddingReplyLink && (
                <div className="mb-2 flex gap-2">
                  <input
                    type="url"
                    value={replyLinkInput}
                    onChange={(e) => setReplyLinkInput(e.target.value)}
                    placeholder="링크 URL을 입력하세요 (https://...)"
                    className="flex-1 rounded-md border border-gray-300 px-3 py-1.5 text-[12px] focus:border-blue-500 focus:outline-none"
                    onKeyPress={(e) => e.key === 'Enter' && handleReplyLinkAdd()}
                  />
                  <button
                    onClick={handleReplyLinkAdd}
                    className="rounded-md bg-blue-500 px-3 py-1.5 text-[12px] text-white transition-colors hover:bg-blue-600"
                  >
                    추가
                  </button>
                  <button
                    onClick={handleReplyLinkCancel}
                    className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-[12px] text-gray-600 transition-colors hover:bg-gray-50"
                  >
                    취소
                  </button>
                </div>
              )}

              <input
                ref={replyFileInputRef}
                type="file"
                multiple
                onChange={handleReplyFileChange}
                className="hidden"
              />

              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <button
                    onClick={() => replyFileInputRef.current?.click()}
                    disabled={isSubmittingReply}
                    className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-[12px] text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    파일 추가
                  </button>
                  <button
                    onClick={handleReplyLinkAddClick}
                    disabled={isSubmittingReply || isAddingReplyLink}
                    className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-[12px] text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    링크 추가
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleReplyCancel}
                    disabled={isSubmittingReply}
                    className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-[12px] text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleSubmitReply}
                    disabled={isSubmittingReply}
                    className="rounded-md bg-blue-500 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmittingReply ? '작성 중...' : '답글 작성'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 답글 렌더링 */}
        {comment.replies && comment.replies.length > 0 && (
          <div>
            {comment.replies.map(reply => renderComment(reply, true))}
          </div>
        )}
      </div>
    );
  };

  const topLevelComments = getTopLevelComments(comments);    
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
                <button 
                  onClick={handleHistoryClick}
                  className="flex items-center gap-1 text-gray-600 transition-colors hover:text-blue-500">
                  <svg className="h-[18px] w-[18px] fill-current" viewBox="0 0 24 24">
                    <path d="M13.5,8H12V13L16.28,15.54L17,14.33L13.5,12.25V8M13,3A9,9 0 0,0 4,12H1L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3Z" />
                  </svg>
                  <span>히스토리</span>
                </button>
              </div>
            </div>
            
            <div className="flex gap-1.5">
              <button 
                onClick={handleGoToProject}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-[13px] text-gray-600 transition-colors hover:bg-gray-50 flex items-center gap-2"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
                </svg>
                <span>프로젝트로 이동</span>
              </button>
              
              <button 
                onClick={() => navigate(`/project/${projectId}/post/repost/${postId}/create`)}
                disabled={!!postData.parentPostId}
                className={`rounded-md border px-4 py-2 text-[13px] transition-colors ${
                  postData.parentPostId
                    ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'border-blue-500 bg-white text-blue-500 hover:bg-blue-50'
                }`}
              >
                답변 게시글 작성
              </button>
              
              <button 
                onClick={() => {navigate(`/project/${projectId}/post/edit/${postId}`)}}
                disabled={postData.isCompleted || postData.userId !== currentUserId}
                className={`rounded-md border border-gray-300 px-4 py-2 text-[13px] transition-colors ${
                  postData.isCompleted || postData.userId !== currentUserId 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
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
                  <a
                    key={file.fileId}
                    href={file.fileUrl}
                    download={file.fileOriginalFileName}
                    className="flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 px-3 py-2.5 cursor-pointer transition-colors hover:bg-blue-50 hover:border-blue-300"
                  >
                    <svg className="h-5 w-5 fill-gray-600" viewBox="0 0 24 24">
                      <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                    </svg>
                    <span className="text-[13px] text-gray-900 hover:text-blue-600 transition-colors">{file.fileOriginalFileName}</span>
                    <span className="text-[12px] text-gray-500">({file.fileSize})</span>
                  </a>
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
              <div className="text-[14px] text-gray-400">
                승인 상태 없음
              </div>
            )}
            
            {postData.approveStatus === '대기' && (
              <>
                {userRole === 'CUSTOMER' ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="flex gap-3">
                      <button 
                        onClick={handleApprove}
                        className="rounded-full bg-blue-500 px-6 py-2 text-[14px] font-medium text-white hover:bg-green-600 transition-colors"
                      >
                        승인
                      </button>
                      <button 
                        onClick={handleRejectClick}
                        className="rounded-full bg-red-500 px-6 py-2 text-[14px] font-medium text-white hover:bg-red-600 transition-colors"
                      >
                        거절
                      </button>
                    </div>
                    
                    {/* 거절 사유 입력란 */}
                    {showRejectionInput && (
                      <div className="w-full max-w-2xl mt-4">
                        <textarea
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                          placeholder="반려 사유를 입력해주세요..."
                          className="min-h-[120px] w-full resize-vertical rounded-lg border border-gray-300 px-4 py-3 text-[14px] focus:border-red-500 focus:outline-none"
                        />
                        
                        {/* 파일 첨부 영역 */}
                        {rejectionFiles.length > 0 && (
                          <div className="mt-2 flex flex-col gap-2">
                            {rejectionFiles.map((file, index) => (
                              <div key={index} className="flex items-center justify-between gap-3 rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
                                <div className="flex min-w-0 flex-1 items-center gap-2">
                                  <svg className="h-4 w-4 flex-shrink-0 fill-gray-600" viewBox="0 0 24 24">
                                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                                  </svg>
                                  <span className="truncate text-[12px] text-gray-900">
                                    {file.fileName} {file.fileSize && <span className="text-gray-500">{file.fileSize}</span>}
                                  </span>
                                  {file.isUploading && (
                                    <span className="flex-shrink-0 text-[11px] text-blue-600">업로드 중...</span>
                                  )}
                                </div>
                                <button
                                  onClick={() => handleRejectionFileDelete(index)}
                                  disabled={file.isUploading}
                                  className="flex-shrink-0 rounded border border-red-300 bg-white px-2 py-1 text-[11px] text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                  삭제
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* 링크 첨부 영역 */}
                        {rejectionLinks.length > 0 && (
                          <div className="mt-2 flex flex-col gap-2">
                            {rejectionLinks.map((link, index) => (
                              <div key={index} className="flex items-center justify-between gap-3 rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
                                <div className="flex min-w-0 flex-1 items-center gap-2">
                                  <svg className="h-4 w-4 flex-shrink-0 fill-gray-600" viewBox="0 0 24 24">
                                    <path d="M3.9,12C3.9,10.29 5.29,8.9 7,8.9H11V7H7A5,5 0 0,0 2,12A5,5 0 0,0 7,17H11V15.1H7C5.29,15.1 3.9,13.71 3.9,12M8,13H16V11H8V13M17,7H13V8.9H17C18.71,8.9 20.1,10.29 20.1,12C20.1,13.71 18.71,15.1 17,15.1H13V17H17A5,5 0 0,0 22,12A5,5 0 0,0 17,7Z" />
                                  </svg>
                                  <span className="truncate text-[12px] text-blue-600">{link}</span>
                                </div>
                                <button
                                  onClick={() => handleRejectionLinkDelete(index)}
                                  className="flex-shrink-0 rounded border border-red-300 bg-white px-2 py-1 text-[11px] text-red-600 transition-colors hover:bg-red-50"
                                >
                                  삭제
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* 링크 추가 입력란 */}
                        {isAddingRejectionLink && (
                          <div className="mt-2 flex gap-2">
                            <input
                              type="url"
                              value={rejectionLinkInput}
                              onChange={(e) => setRejectionLinkInput(e.target.value)}
                              placeholder="링크 URL을 입력하세요 (https://...)"
                              className="flex-1 rounded-md border border-gray-300 px-3 py-1.5 text-[12px] focus:border-red-500 focus:outline-none"
                              onKeyPress={(e) => e.key === 'Enter' && handleRejectionLinkAdd()}
                            />
                            <button
                              onClick={handleRejectionLinkAdd}
                              className="rounded-md bg-red-500 px-3 py-1.5 text-[12px] text-white transition-colors hover:bg-red-600"
                            >
                              추가
                            </button>
                            <button
                              onClick={handleRejectionLinkCancel}
                              className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-[12px] text-gray-600 transition-colors hover:bg-gray-50"
                            >
                              취소
                            </button>
                          </div>
                        )}

                        {/* hidden 파일 input */}
                        <input
                          ref={rejectionFileInputRef}
                          type="file"
                          multiple
                          onChange={handleRejectionFileChange}
                          className="hidden"
                        />

                        {/* 버튼 영역 */}
                        <div className="mt-3 flex justify-between items-center">
                          <div className="flex gap-2">
                            <button
                              onClick={() => rejectionFileInputRef.current?.click()}
                              className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-[12px] text-gray-600 transition-colors hover:bg-gray-50"
                            >
                              파일 추가
                            </button>
                            <button
                              onClick={handleRejectionLinkAddClick}
                              disabled={isAddingRejectionLink}
                              className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-[12px] text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                              링크 추가
                            </button>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={handleRejectCancel}
                              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-[13px] text-gray-600 transition-colors hover:bg-gray-50"
                            >
                              취소
                            </button>
                            <button
                              onClick={handleRejectConfirm}
                              className="rounded-md bg-red-500 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-red-600"
                            >
                              반려 확정
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <button 
                    disabled
                    className="inline-block rounded-full bg-amber-100 px-5 py-2 text-[14px] font-medium text-amber-600 cursor-not-allowed"
                  >
                    승인 대기
                  </button>
                )}
              </>
            )}
            
            {postData.approveStatus === '승인' && (
              <button 
                disabled
                className="inline-block rounded-full bg-green-100 px-5 py-2 text-[14px] font-medium text-green-600 cursor-not-allowed"
              >
                승인 완료
              </button>
            )}
            
            {postData.approveStatus === '거절' && (
              <div className="flex flex-col items-center gap-4">
                <button 
                  disabled
                  className="inline-block rounded-full bg-red-100 px-5 py-2 text-[14px] font-medium text-red-600 cursor-not-allowed"
                >
                  반려됨
                </button>
                
                {/* 반려 사유 */}
                {postData.rejectionReason && (
                  <div className="w-full max-w-2xl">
                    <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                      <label className="block text-[13px] font-semibold text-red-900 mb-2">
                        반려 사유
                      </label>
                      <p className="text-[14px] text-gray-900 whitespace-pre-wrap">
                        {postData.rejectionReason}
                      </p>
                    </div>
                  </div>
                )}

                {/* 반려 첨부 파일 */}
                {postData.rejectionFiles && postData.rejectionFiles.length > 0 && (
                  <div className="w-full max-w-2xl">
                    <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                      <label className="block text-[13px] font-semibold text-red-900 mb-2">
                        반려 첨부 파일
                      </label>
                      <div className="flex flex-col gap-2">
                        {postData.rejectionFiles.map((file) => (
                          <a
                            key={file.fileId}
                            href={file.fileUrl}
                            download={file.fileOriginalFileName}
                            className="flex items-center gap-2 rounded-md border border-red-300 bg-white px-3 py-2.5 cursor-pointer transition-colors hover:bg-red-50 hover:border-red-400"
                          >
                            <svg className="h-5 w-5 fill-red-600" viewBox="0 0 24 24">
                              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                            </svg>
                            <span className="text-[13px] text-gray-900 hover:text-red-600 transition-colors">
                              {file.fileOriginalFileName}
                            </span>
                            <span className="text-[12px] text-gray-500">({file.fileSize})</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 반려 첨부 링크 */}
                {postData.rejectionLinks && postData.rejectionLinks.length > 0 && (
                  <div className="w-full max-w-2xl">
                    <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                      <label className="block text-[13px] font-semibold text-red-900 mb-2">
                        반려 첨부 링크
                      </label>
                      <div className="flex flex-col gap-2">
                        {postData.rejectionLinks.map((link, index) => (
                          <div key={index} className="rounded-md border border-red-300 bg-white px-4 py-3">
                            <a
                              href={link.linkUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="break-all text-[14px] text-red-600 hover:underline"
                            >
                              {link.linkUrl}
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* 댓글 작성 */}
          <div className="mb-4">
            {postData.isCompleted ? (
              <div className="rounded-lg border-2 border-gray-200 bg-gray-50 px-4 py-8 text-center">
                <p className="text-[14px] text-gray-500">
                  완료된 게시글은 댓글을 작성할 수 없습니다.
                </p>
              </div>
            ) : (
              <>
                <textarea
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  placeholder="댓글을 입력하세요..."
                  className="min-h-[80px] w-full resize-vertical rounded-lg border border-gray-300 px-4 py-3 text-[14px] focus:border-blue-500 focus:outline-none"
                  disabled={isSubmittingComment}
                />
                
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
              </>
            )}
          </div>

          {/* 댓글 목록 */}
          <div className="mt-8 border-t-2 border-gray-100 pt-8">
            <h3 className="mb-4 text-[16px] font-semibold text-gray-900">
              댓글 {totalCommentCount}
            </h3>
            
            <div className="flex flex-col gap-4">
              {topLevelComments && topLevelComments.length > 0 ? (
                  topLevelComments.map((comment) => renderComment(comment))
                ) : (
                <p className="py-8 text-center text-[14px] text-gray-400">
                  아직 댓글이 없습니다.
                </p>
              )}
            </div>
          </div>
          
          {/* 하단 완료 버튼 */}
          <div className="mt-8 flex justify-end border-t border-gray-100 pt-6">
            {userRole === 'DEVELOPER' || userRole === 'ADMIN' ? (
              <button className="rounded-lg bg-red-500 px-8 py-3 text-[14px] font-medium text-white transition-colors hover:bg-red-600">
                완료
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}