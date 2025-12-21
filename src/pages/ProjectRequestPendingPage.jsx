import {
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "../components/common/icons/RequestPendingIcon";
import LoadingState from "../components/common/LoadingState/LoadingState";
import StatCard from "../components/requestPending/RequestStatCard";
import Section from "../components/requestPending/RequestSection";
import { useEffect, useState } from "react";
import { getRequestPendingPosts } from "../utils/config/api/getRequestPendingPostsApi";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function ProjectRequestPendingPage() {
  const { projectId } = useParams();  // ✅ projectId 받기
  const location = useLocation();     // ✅ location에서 state 받기
  const [requestPendingPosts, setRequestPendingPosts] = useState(
    location.state?.approvalRequests || null  // ✅ 전달받은 데이터 사용
  );
  const [error, setError] = useState(false);
 
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ 데이터가 없을 때만 API 호출
    if (!requestPendingPosts && projectId) {
      const fetchData = async () => {
        try {
          const response = await getRequestPendingPosts(projectId);  // projectId 전달
          setRequestPendingPosts(response);
        } catch (err) {
          console.error("데이터 불러오기 실패:", err);
          setError(true);

          setRequestPendingPosts({
            statusCount: { pendingCnt: 0, approvedCnt: 0, rejectedCnt: 0 },
            stageCount: {
              requirementsCnt: 0,
              screenDesignCnt: 0,
              designPublishingCnt: 0,
              developmentCnt: 0,
              qaCnt: 0,
              maintenanceCnt: 0,
            },
            requirements: [],
            screenDesign: [],
            designPublishing: [],
            development: [],
            qa: [],
            maintenance: [],
          });
        }
      };

      fetchData();
    }
  }, [projectId, requestPendingPosts]);


  if (!requestPendingPosts) {
    return (
      <div className="min-h-screen bg-gray-100">
        <LoadingState message="로딩 중..." size="large" />
      </div>
    );
  }

  const handleViewDetail = (postId) => {
    navigate(`/project/${projectId}/post/${postId}`);  
  };


  return (
    <div className="min-h-screen bg-gray-100 font-sans py-5">
      <div className="mx-auto max-w-[1350px]">
        <button
          onClick={() => navigate(`/project/${projectId}`)}
          className="mb-4 text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1"
        >
          ← 프로젝트로 돌아가기
        </button>
        <div className="mb-6">
          <h1 className="mb-1.5 text-[22px] font-semibold text-[#1a1a1a]">
            승인 요청
          </h1>
        </div>

        {/* 통계 카드 */}
        <div className="mb-6 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
          <StatCard
            icon={<ClockIcon />}
            iconClass="bg-[#fff3e6] text-[#ff9500]"
            value={requestPendingPosts.statusCount.pendingCnt}
            label="승인 대기"
          />

          <StatCard
            icon={<CheckCircleIcon />}
            iconClass="bg-[#e6f7f1] text-[#16a34a]"
            value={requestPendingPosts.statusCount.approvedCnt}
            label="승인 완료"
          />

          <StatCard
            icon={<XCircleIcon />}
            iconClass="bg-[#ffe6e6] text-[#dc2626]"
            value={requestPendingPosts.statusCount.rejectedCnt}
            label="반려"
          />
        </div>

        {/* 카테고리별 목록 */}
        <Section
          title="요구사항 정의"
          count={requestPendingPosts.stageCount.requirementsCnt}
          items={requestPendingPosts.requirements || []}
          onViewDetail={handleViewDetail}
        />
        <Section
          title="화면 설계"
          count={requestPendingPosts.stageCount.screenDesignCnt}
          items={requestPendingPosts.screenDesign || []}
          onViewDetail={handleViewDetail}
        />
        <Section
          title="디자인, 퍼블리싱"
          count={requestPendingPosts.stageCount.designPublishingCnt}
          items={requestPendingPosts.designPublishing || []}
          onViewDetail={handleViewDetail}
        />
        <Section
          title="개발"
          count={requestPendingPosts.stageCount.developmentCnt}
          items={requestPendingPosts.development || []}
          onViewDetail={handleViewDetail}
        />
        <Section
          title="검수"
          count={requestPendingPosts.stageCount.qaCnt}
          items={requestPendingPosts.qa || []}
          onViewDetail={handleViewDetail}
        />
        <Section
          title="유지보수"
          count={requestPendingPosts.stageCount.maintenanceCnt}
          items={requestPendingPosts.maintenance || []}
          onViewDetail={handleViewDetail}
        />
      </div>
    </div>
  );
}