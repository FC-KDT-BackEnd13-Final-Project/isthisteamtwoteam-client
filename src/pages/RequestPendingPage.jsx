// 데이터 가져오기
import { approvalData } from "../data/mockApprovalData";

// 컴포넌트 가져오기
import {
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "../components/request-pending/Icons";
import StatCard from "../components/request-pending/StatCard";
import Section from "../components/request-pending/Section";

/**
 * 승인 요청 알림 페이지
 *
 * 이 페이지는 다음 정보를 보여줍니다:
 * 1. 통계 카드 3개 (승인 대기, 승인 완료, 반려)
 * 2. 카테고리별 승인 요청 목록
 */
export default function RequestPendingPage() {
  // ========================================
  // 이벤트 핸들러
  // ========================================

  /**
   * 게시글 상세보기 핸들러
   * 게시글 ID를 받아 해당 게시글의 상세 페이지로 이동합니다.
   */
  const handleViewDetail = (id) => {
    alert(`게시글 ${id} 상세 페이지로 이동합니다.`);
  };

  // ========================================
  // 화면 그리기 (렌더링)
  // ========================================

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-5 px-4 font-[-apple-system,BlinkMacSystemFont,'Segoe_UI','Roboto','Oxygen','Ubuntu',sans-serif] text-[#0a0a0a] leading-normal">
      <div className="max-w-[1200px] mx-auto">
        {/* ========== 헤더 ========== */}
        <div className="mb-6">
          {/* 페이지 제목 */}
          <h1 className="text-[22px] font-semibold text-[#1a1a1a] mb-1.5">
            승인 요청 알림
          </h1>

          {/* 경로 표시 (Breadcrumb) */}
          <div className="flex items-center gap-2 text-[14px] text-[#999]">
            <span>알림</span>
            <span>▸</span>
            <span className="text-[#007bff] font-medium">승인 요청</span>
          </div>
        </div>

        {/* ========== 통계 카드 3개 ========== */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 mb-6">
          {/* 1. 승인 대기 */}
          <StatCard
            icon={<ClockIcon />}
            iconClass="bg-[#fff3e6] text-[#ff9500]"
            value={approvalData.stats.pending}
            label="승인 대기"
          />

          {/* 2. 승인 완료 */}
          <StatCard
            icon={<CheckCircleIcon />}
            iconClass="bg-[#e6f7f1] text-[#16a34a]"
            value={approvalData.stats.approved}
            label="승인 완료"
          />

          {/* 3. 반려 */}
          <StatCard
            icon={<XCircleIcon />}
            iconClass="bg-[#ffe6e6] text-[#dc2626]"
            value={approvalData.stats.rejected}
            label="반려"
          />
        </div>

        {/* ========== 카테고리별 승인 요청 목록 ========== */}
        {approvalData.sections.map((section, index) => (
          <Section
            key={index}
            title={section.title}
            count={section.count}
            items={section.items}
            onViewDetail={handleViewDetail}
          />
        ))}
      </div>
    </div>
  );
}
