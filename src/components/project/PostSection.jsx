import { useState } from 'react';
import { Download } from 'lucide-react';

export default function PostSection({ 
  postsData, 
  activeTab, 
  onTabChange, 
  isPostsLoading 
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  // 탭 배열 생성
  const tabs = [
    { 
      id: 'all', 
      label: '전체', 
      count: postsData ? (
        (postsData.stageCount?.requirementsCnt || 0) +
        (postsData.stageCount?.screenDesignCnt || 0) +
        (postsData.stageCount?.designPublishingCnt || 0) +
        (postsData.stageCount?.developmentCnt || 0) +
        (postsData.stageCount?.qaCnt || 0) +
        (postsData.stageCount?.maintenanceCnt || 0)
      ) : 0
    },
    { 
      id: 'requirements', 
      label: '요구사항 정의', 
      count: postsData?.stageCount?.requirementsCnt || 0
    },
    { 
      id: 'design', 
      label: '화면 설계', 
      count: postsData?.stageCount?.screenDesignCnt || 0
    },
    { 
      id: 'designPub', 
      label: '디자인, 퍼블리싱', 
      count: postsData?.stageCount?.designPublishingCnt || 0
    },
    { 
      id: 'development', 
      label: '개발', 
      count: postsData?.stageCount?.developmentCnt || 0
    },
    { 
      id: 'inspection', 
      label: '검수', 
      count: postsData?.stageCount?.qaCnt || 0
    },
    { 
      id: 'maintenance', 
      label: '유지보수', 
      count: postsData?.stageCount?.maintenanceCnt || 0
    },
    { 
      id: 'uploadedFile', 
      label: '업로드된 파일 목록', 
      count: postsData?.stageCount?.filesCnt || 0
    }
  ];

  // 필터링 함수
  const getPostsByFilter = (data, filter) => {
    if (!data) return [];
    
    switch(filter) {
      case 'all':
        return [
          ...(data.requirements || []),
          ...(data.screenDesign || []),
          ...(data.designPublishing || []),
          ...(data.development || []),
          ...(data.qa || []),
          ...(data.maintenance || [])
        ];
      case 'requirements':
        return data.requirements || [];
      case 'design':
        return data.screenDesign || [];
      case 'designPub':
        return data.designPublishing || [];
      case 'development':
        return data.development || [];
      case 'inspection':
        return data.qa || [];
      case 'maintenance':
        return data.maintenance || [];
      case 'uploadedFile':
        return (data.files || []).map(file => ({
          postId: file.fileId,
          title: file.fileTitle,
          content: file.fileSize,
          authorName: file.uploadUserName || '-',
          createdAt: file.uploadedAt ? file.uploadedAt.replace('T', ' ').substring(0, 16) : '-',
          filePath: file.filePath,
          isFile: true,
          stageName: '파일',
        }));
      default:
        return [];
    }
  };

  const posts = getPostsByFilter(postsData, activeTab);
  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // 페이지 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 탭 변경 핸들러
  const handleTabChange = (tabId) => {
    onTabChange(tabId);
    setCurrentPage(1);
  };

  // 페이지 번호 배열 생성 (최대 5개씩 표시)
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return pageNumbers;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm mb-6">
      {/* 탭 메뉴 */}
      <div className="flex border-b border-gray-200 bg-gray-50 px-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`relative px-4 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* 콘텐츠 영역 */}
      <div className="p-8">
        {/* 검색바와 버튼 */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="검색어를 입력하세요"
                className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <svg className="absolute left-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <button className="px-6 py-2.5 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center gap-2 whitespace-nowrap">
            <span>+</span>
            <span>게시글 생성</span>
          </button>
        </div>

        {/* 테이블 */}
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="w-12 px-6 py-4">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                </th>
                {activeTab === 'uploadedFile' ? (
                  <>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">파일 이름</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">용량</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">업로드 시간</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">작성자</th>
                    <th className="px-6 py-4"></th>
                  </>
                ) : (
                  <>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">제목</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">단계</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">승인 여부</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">생성 시간</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">작성자</th>
                    <th className="px-6 py-4"></th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {isPostsLoading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    로딩 중...
                  </td>
                </tr>
              ) : posts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    게시글이 없습니다.
                  </td>
                </tr>
              ) : (
                currentPosts.map((post) => (
                  <tr key={post.postId} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                    </td>
                    
                    {activeTab === 'uploadedFile' ? (
                      <>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {post.title}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {post.content}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {post.createdAt}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {post.authorName || '-'}
                        </td>
                        <td className="px-6 py-4">
                          <a
                            href={post.filePath}
                            download
                            className="inline-flex items-center gap-2 px-3 py-2 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors"
                          >
                            <Download className="w-2 h-2" />
                            다운로드
                          </a>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {post.title || post.content}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {post.stageName || '-'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {post.isCompleted ? (
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                              승인 완료
                            </span>
                          ) : (
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                              승인 대기
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {post.createdAt}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {post.authorName || '-'}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => {
                                console.log('수정:', post.postId);
                              }}
                              className="px-4 py-1.5 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
                            >
                              수정
                            </button>
                            <button 
                              onClick={() => {
                                console.log('삭제:', post.postId);
                              }}
                              className="px-4 py-1.5 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                            >
                              삭제
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-600">
            {posts.length > 0 ? (
              <>
                {indexOfFirstPost + 1} - {Math.min(indexOfLastPost, posts.length)} of {posts.length} items
              </>
            ) : (
              '0 items'
            )}
          </div>
          
          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              {/* 이전 페이지 버튼 */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                이전
              </button>
              
              {/* 페이지 번호 */}
              {getPageNumbers().map((number) => (
                <button
                  key={number}
                  onClick={() => handlePageChange(number)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === number
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {number}
                </button>
              ))}
              
              {/* 다음 페이지 버튼 */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === totalPages
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                다음
              </button>
            </div>
          )}
          
          <div className="w-[150px]"></div>
        </div>
      </div>
    </div>
  );
}

