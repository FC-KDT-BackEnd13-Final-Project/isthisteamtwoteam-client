// src/components/post/ProjectApprovalSection.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProjectApprovalSection({ approvalRequests, isLoading, projectId }) {
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
  
  // 최소 1페이지 보장
  const totalPages = Math.max(1, Math.ceil(filteredApprovals.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentApprovals = filteredApprovals.slice(startIndex, endIndex);

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
        <h2 className="mb-4 text-lg font-semibold text-gray-900">승인 관리</h2>
        <p className="text-sm text-gray-500">로딩 중...</p>
      </div>
    );
  }

  if (!approvalRequests) {
    return (
      <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">승인 관리</h2>
        <p className="text-sm text-gray-500">승인 데이터를 불러올 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">
          승인 관리
        </h2>
      </div>

      <div className="flex items-center justify-between gap-2 border-b border-gray-200 mb-4">
        {/* 탭들 */}
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

        {/* 더보기 버튼 */}
        <button
          onClick={() => navigate(`/projects/${projectId}/request-pending`, { state: { approvalRequests } })}
          className="text-sm text-blue-500 hover:text-blue-600 font-medium py-2 px-4"
        >
          더보기
        </button>
      </div>

      {filteredApprovals.length === 0 ? (
        <div className="py-10">
          <p className="text-sm text-gray-500 text-center">
            {activeTab === 'pending' && '승인 대기 중인 게시글이 없습니다.'}
            {activeTab === 'approved' && '승인 완료된 게시글이 없습니다.'}
            {activeTab === 'rejected' && '승인 거절된 게시글이 없습니다.'}
          </p>
        </div>
      ) : (
        <div>
          {/* 게시글 목록 */}
          <div className="space-y-2 mb-4">
            {currentApprovals.map((post) => (
              <div
                key={post.post_id}
                onClick={() => navigate(`/project/${projectId}/post/${post.post_id}`)}
                className="rounded-lg border border-gray-200 p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-gray-900">{post.post_title}</h3>
                    <p className="text-xs text-gray-500">
                      {post.postStageName} · {post.author_name} · {new Date(post.created_at).toLocaleDateString('ko-KR')}
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
                
                {/* 거절 사유 표시 */}
                {post.requestStatus === 'STATUS_REJECTED' && post.reject_reason && (
                  <div className="mt-2 rounded-md bg-red-50 border border-red-200 p-3">
                    <p className="text-xs font-medium text-red-900 mb-1">거절 사유</p>
                    <p className="text-xs text-red-700">{post.reject_reason}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 페이지네이션 - 항상 표시 (최소 1페이지) */}
          <div className="flex items-center justify-center gap-2 pt-4 border-t border-gray-200">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              이전
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors ${
                  currentPage === page
                    ? 'bg-blue-500 text-white'
                    : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1.5 rounded-md text-[13px] font-medium transition-colors ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              다음
            </button>
          </div>
        </div>
      )}
    </div>
  );
}