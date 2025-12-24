import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function PostSection({ postsData, activeTab, onTabChange, isPostsLoading, handleDeletePost, currentUserId }) {
  const navigate = useNavigate();
  const { projectId } = useParams();
  
  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10; // 페이지당 게시글 수

  // API 응답에서 모든 게시글 추출
  const getAllPosts = () => {
    if (!postsData) return [];

    const allPosts = [
      ...(postsData.requirements || []),
      ...(postsData.screenDesign || []),
      ...(postsData.designPublishing || []),
      ...(postsData.development || []),
      ...(postsData.qa || []),
      ...(postsData.maintenance || [])
    ];

    return allPosts;
  };

  // 계층 구조 변환 함수
// 계층 구조 변환 함수
const buildPostHierarchy = (posts) => {
  if (!posts || posts.length === 0) return [];

  // 부모 게시글과 자식 게시글 분리
  const parentPosts = posts.filter(post => !post.parentId);
  const childPosts = posts.filter(post => post.parentId);

  // 각 부모 게시글에 자식 게시글 연결
  const hierarchy = parentPosts.map(parent => ({
    ...parent,
    children: childPosts
      .filter(child => child.parentId === parent.postId)
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)) // 오래된 순서대로 정렬
  }));

  return hierarchy;
};

  // 계층 구조를 평탄화하여 렌더링 가능한 배열로 변환 (페이지네이션용)
  const flattenHierarchy = (hierarchicalPosts) => {
    const flattened = [];
    
    hierarchicalPosts.forEach(parent => {
      flattened.push({ ...parent, isChild: false });
      
      if (parent.children && parent.children.length > 0) {
        parent.children.forEach(child => {
          flattened.push({ ...child, isChild: true });
        });
      }
    });
    
    return flattened;
  };

  const handlePostClick = (postId) => {
    navigate(`/project/${projectId}/post/${postId}`);
  };

  const handleCreatePost = () => {
    navigate(`/project/${projectId}/post/create`);
  };

  const formatDate = (dateString) => {
    // 이미 "2025-12-24 10:59" 형식으로 오므로 그대로 반환
    return dateString;
  };

  // 승인 상태에 따른 배지 렌더링
  const renderApprovalBadge = (approveStatus) => {
    if (approveStatus === '대기') {
      return (
        <span className="inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
          대기
        </span>
      );
    } else if (approveStatus === '승인') {
      return (
        <span className="inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
          승인
        </span>
      );
    } else if (approveStatus === '거절') {
      return (
        <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800">
          거절
        </span>
      );
    }
    return (
      <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
        -
      </span>
    );
  };

  // 게시글 행 렌더링 (부모 또는 자식)
  const renderPostRow = (post) => {
    const isChild = post.isChild;
    
    return (
      <tr
        key={post.postId}
        onClick={() => handlePostClick(post.postId)}
        className="cursor-pointer border-b border-gray-200 transition-colors hover:bg-gray-50"
      >
        <td className="px-4 py-3 text-left">
          <div className={`text-sm text-gray-900 ${isChild ? 'pl-8' : ''}`}>
            {isChild && (
              <span className="mr-2 text-gray-400">└─</span>
            )}
            {post.title}
          </div>
        </td>
        <td className="px-4 py-3 text-center text-sm text-gray-700">
          {post.stageName}
        </td>
        <td className="px-4 py-3 text-center">
          {renderApprovalBadge(post.approveStatus)}
        </td>
        <td className="px-4 py-3 text-center text-sm text-gray-700">
          {post.isCompleted ? (
            <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
              완료
            </span>
          ) : (
            <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
              진행중
            </span>
          )}
        </td>
        <td className="px-4 py-3 text-center text-sm text-gray-500">
          {formatDate(post.createdAt)}
        </td>
        <td className="px-4 py-3 text-center text-sm text-gray-700">
          {post.authorName}
        </td>
      </tr>
    );
  };

  // 탭별 게시글 필터링
  const getFilteredPosts = () => {
    const allPosts = getAllPosts();

    if (activeTab === 'all') {
      return allPosts;
    }

    return allPosts.filter(post => post.stageName === activeTab);
  };

  const filteredPosts = getFilteredPosts();
  const hierarchicalPosts = buildPostHierarchy(filteredPosts);
  const flattenedPosts = flattenHierarchy(hierarchicalPosts);

  // 페이지네이션 계산 (평탄화된 배열 기준)
  const totalPages = Math.max(1, Math.ceil(flattenedPosts.length / postsPerPage));
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = flattenedPosts.slice(indexOfFirstPost, indexOfLastPost);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 탭 변경 시 페이지 1로 리셋
  const handleTabChangeWithReset = (tabId) => {
    setCurrentPage(1);
    onTabChange(tabId);
  };

  // 탭 데이터 생성
  const getTabs = () => {
    if (!postsData) return [{ id: 'all', label: '전체', count: 0 }];

    const stageCount = postsData.stageCount || {};
    const totalCount = 
      (stageCount.requirementsCnt || 0) +
      (stageCount.screenDesignCnt || 0) +
      (stageCount.designPublishingCnt || 0) +
      (stageCount.developmentCnt || 0) +
      (stageCount.qaCnt || 0) +
      (stageCount.maintenanceCnt || 0);

    return [
      { id: 'all', label: '전체', count: totalCount },
      { id: '요구사항 정의', label: '요구사항 정의', count: stageCount.requirementsCnt || 0 },
      { id: '화면 설계', label: '화면 설계', count: stageCount.screenDesignCnt || 0 },
      { id: '디자인, 퍼블리싱', label: '디자인, 퍼블리싱', count: stageCount.designPublishingCnt || 0 },
      { id: '개발', label: '개발', count: stageCount.developmentCnt || 0 },
      { id: '검수', label: '검수', count: stageCount.qaCnt || 0 },
      { id: '유지보수', label: '유지보수', count: stageCount.maintenanceCnt || 0 }
    ];
  };

  const tabs = getTabs();

  // 페이지 번호 렌더링
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 text-sm rounded transition-colors ${
            currentPage === i
              ? 'bg-blue-500 text-white font-medium'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
          }`}
        >
          {i}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <section className="mb-6 rounded-lg bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">게시글</h2>
        <button
          onClick={handleCreatePost}
          className="flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
        >
          <span className="text-lg">+</span>
          <span>게시글 생성</span>
        </button>
      </div>

      {/* 탭 네비게이션 */}
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChangeWithReset(tab.id)}
              className={`border-b-2 px-1 pb-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </nav>
      </div>

      {/* 게시글 테이블 */}
      <div className="overflow-x-auto">
        {isPostsLoading ? (
          <div className="py-8 text-center text-gray-500">
            게시글을 불러오는 중...
          </div>
        ) : flattenedPosts.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            게시글이 없습니다.
          </div>
        ) : (
          <>
            <table className="w-full">
              <thead className="border-b-2 border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
                    제목
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                    단계
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                    승인 여부
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                    완료 여부
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                    생성 시간
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
                    작성자
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentPosts.map((post) => renderPostRow(post))}
              </tbody>
            </table>

            {/* 페이지네이션 - 항상 표시 */}
            <div className="mt-6 flex items-center justify-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm rounded bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                이전
              </button>
              
              {renderPageNumbers()}
              
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm rounded bg-white text-gray-700 hover:bg-gray-100 border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                다음
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}