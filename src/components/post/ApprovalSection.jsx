import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ApprovalSection({ approvalRequests, isLoading, projectId }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('pending');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  // 전체 게시글 가져오기
  const getAllPosts = () => {
    if (!approvalRequests) return [];
    return [
      ...(approvalRequests.requirements || []),
      ...(approvalRequests.screenDesign || []),
      ...(approvalRequests.designPublishing || []),
      ...(approvalRequests.development || []),
      ...(approvalRequests.qa || []),
      ...(approvalRequests.maintenance || [])
    ];
  };

  // 각 상태별 실제 개수 계산
  const getPendingCount = () => {
    const allPosts = getAllPosts();
    return allPosts.filter(post => post.requestStatus === 'STATUS_PENDING').length;
  };

  const getApprovedCount = () => {
    const allPosts = getAllPosts();
    return allPosts.filter(post => post.requestStatus === 'STATUS_APPROVED').length;
  };

  const getRejectedCount = () => {
    const allPosts = getAllPosts();
    return allPosts.filter(post => post.requestStatus === 'STATUS_REJECTED').length;
  };

  // 필터링된 게시글 가져오기
  const getFilteredApprovals = () => {
    const allPosts = getAllPosts();

    switch (activeTab) {
      case 'pending':
        return allPosts.filter(post => post.requestStatus === 'STATUS_PENDING');
      case 'approved':
        return allPosts.filter(post => post.requestStatus === 'STATUS_APPROVED');
      case 'rejected':
        return allPosts.filter(post => post.requestStatus === 'STATUS_REJECTED');
      default:
        return allPosts;
    }
  };

  const filteredApprovals = getFilteredApprovals();
  const totalPages = Math.ceil(filteredApprovals.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentApprovals = filteredApprovals.slice(startIndex, endIndex);

  const handlePostClick = (postId) => {
    navigate(`/project/${projectId}/post/${postId}`);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">승인 대기 게시글</h2>
        <p className="text-sm text-gray-500">로딩 중...</p>
      </div>
    );
  }

  if (!approvalRequests) return null;

  return (
    <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          승인 관리
        </h2>

      </div>


<div className="flex items-center justify-between gap-2 border-b border-gray-200 mb-4">
  {/* ✅ 탭들을 감싸는 div 추가 */}
  <div className="flex gap-2">
    <button
      onClick={() => handleTabChange('pending')}
      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
        activeTab === 'pending'
          ? 'border-amber-500 text-amber-600'
          : 'border-transparent text-gray-500 hover:text-gray-700'
      }`}
    >
      승인 대기 ({getPendingCount()})
    </button>
    
    <button
      onClick={() => handleTabChange('approved')}
      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
        activeTab === 'approved'
          ? 'border-green-500 text-green-600'
          : 'border-transparent text-gray-500 hover:text-gray-700'
      }`}
    >
      승인 완료 ({getApprovedCount()})
    </button>
    
    <button
      onClick={() => handleTabChange('rejected')}
      className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
        activeTab === 'rejected'
          ? 'border-red-500 text-red-600'
          : 'border-transparent text-gray-500 hover:text-gray-700'
      }`}
    >
      승인 거절 ({getRejectedCount()})
    </button>
  </div>

  {/* ✅ 더보기 버튼 추가 */}
  <button
    onClick={() => navigate(`/projects/${projectId}/request-pending`, {state : {approvalRequests}})}
    className="text-sm text-blue-500 hover:text-blue-600 font-medium py-2 px-4"
  >
    더보기 
  </button>
</div>

      {filteredApprovals.length === 0 ? (
  <div style={{ minHeight: '420px' }}>
    <p className="text-sm text-gray-500">
      {activeTab === 'pending' && '승인 대기 중인 게시글이 없습니다.'}
      {activeTab === 'approved' && '승인 완료된 게시글이 없습니다.'}
      {activeTab === 'rejected' && '승인 거절된 게시글이 없습니다.'}
    </p>
  </div>
) : (
  <div>
    {/* ✅ 게시글 목록만 고정 높이 */}
    <div style={{ minHeight: '420px' }}>
      <div className="space-y-2">
        {currentApprovals.map((post) => (
          <div
            key={post.postId}
            onClick={() => handlePostClick(post.postId)}
            className="flex items-center justify-between rounded-lg border border-gray-200 p-4 hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-900">{post.postTitle}</h3>
              <p className="text-xs text-gray-500">
                {post.postStageName} · {new Date(post.createdAt).toLocaleDateString('ko-KR')}
              </p>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${
              post.requestStatus === 'STATUS_PENDING' 
                ? 'bg-amber-100 text-amber-600'
                : post.requestStatus === 'STATUS_APPROVED'
                ? 'bg-green-100 text-green-600'
                : 'bg-red-100 text-red-600'
            }`}>
              {post.approveStatus}
            </span>
          </div>
        ))}
      </div>
    </div>

    {/* ✅ 페이지네이션은 고정 높이 밖에 배치 */}
    <div className=" flex items-center justify-center gap-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        이전
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-1 text-sm font-medium rounded ${
            currentPage === page
              ? 'bg-blue-500 text-white'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-blue-50'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        다음
      </button>
    </div>
  </div>
)}
    </div>
  );
}