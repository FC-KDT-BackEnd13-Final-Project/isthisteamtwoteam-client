import { useNavigate } from 'react-router-dom';

export default function ApprovalSection({ approvalRequests, isLoading, projectId }) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">승인 대기 게시글</h2>
        <p className="text-sm text-gray-500">로딩 중...</p>
      </div>
    );
  }

  if (!approvalRequests) return null;

  const allApprovals = [
    ...(approvalRequests.screenDesign || []),
    ...(approvalRequests.designPublishing || []),
    ...(approvalRequests.development || []),
    ...(approvalRequests.qa || []),
    ...(approvalRequests.maintenance || [])
  ];

  const handlePostClick = (postId) => {
    navigate(`/project/${projectId}/post/${postId}`);
  };

  return (
    <div className="mb-6 rounded-lg bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">
          승인 대기 게시글 ({approvalRequests.statusCount.pendingCnt})
        </h2>
      </div>

      {allApprovals.length === 0 ? (
        <p className="text-sm text-gray-500">승인 대기 중인 게시글이 없습니다.</p>
      ) : (
        <div className="space-y-2">
          {allApprovals.map((post) => (
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
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-600">
                승인 대기
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}