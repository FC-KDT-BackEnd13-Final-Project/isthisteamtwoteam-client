import {
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "../components/common/icons/RequestPendingIcon";
import StatCard from "../components/requestPending/RequestStatCard";
import Section from "../components/requestPending/RequestSection";
import { useEffect, useState } from "react";
import { getRequestPendingPosts } from "../utils/api/getRequestPendingPostsApi";

export default function RequestPendingPage() {
  const [requestPendingPosts, setRequestPendingPosts] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getRequestPendingPosts();
        setRequestPendingPosts(response);
      } catch (err) {
        console.error("데이터 불러오기 실패:", err);
        setError(true);

        setRequestPendingPosts({
          statusCount: {
            pendingCnt: 0,
            approvedCnt: 0,
            rejectedCnt: 0,
          },
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
  }, []);

  if (!requestPendingPosts) return <div>Loading...</div>;

  const handleViewDetail = (id) => {
    alert(`게시글 ${id} 상세 페이지로 이동합니다.`);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans py-5">
      <div className="mx-auto max-w-[1350px]">
        <div className="mb-6">
          <h1 className="mb-1.5 text-[22px] font-semibold text-[#1a1a1a]">
            승인 요청
          </h1>

          <div className="flex items-center gap-2 text-[14px] text-[#999]">
            <span>알림</span>
            <span>▸</span>
            <span className="font-medium text-[#007bff]">승인 요청</span>
          </div>
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