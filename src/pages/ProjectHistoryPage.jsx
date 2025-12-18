import ProjectHistoryTimeline from "../components/projectHistory/ProjectHistoryTimeline";
import PageHeader from "../components/common/PageHeader/PageHeader";

export default function ProjectHistoryPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8 bg-white min-h-screen">
      {/* 상단 헤더 영역 */}
      <PageHeader
        title="프로젝트 히스토리"
        rightContent={
          <div className="flex flex-wrap gap-4 text-sm text-slate-600">
            <span className="flex items-center gap-1.5">
              <span className="text-slate-400">📋</span>
              <span>삼성전자 웹사이트 리뉴얼</span>
            </span>

            <span className="flex items-center gap-1.5">
              <span className="text-slate-400">🏢</span>
              <span>삼성전자</span>
            </span>

            <span className="flex items-center gap-1.5">
              <span className="text-slate-400">📅</span>
              <span>2024.11.01 ~ 2024.12.31</span>
            </span>
          </div>
        }
      />

      <div className="mb-8 pb-6 border-b border-slate-200"></div>

      <ProjectHistoryTimeline />
    </main>
  );
}
