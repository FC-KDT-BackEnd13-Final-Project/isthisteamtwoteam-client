import { useMemo } from "react";
import DocumentItem from "./DocumentItem";
import ProjectItem from "./ProjectItem";

export default function FilteredList({
  activeFilter,
  title,
  pendingApprovals,
  rejectedDocuments,
  progressProjects,
  maintenanceProjects,
  onViewBoard,
  onViewProject,
}) {
  // 필터링 로직을 Widget 내부로 이동
  const { type, data, statusClass, statusText } = useMemo(() => {
    if (activeFilter === "pending") {
      return {
        type: "board",
        data: pendingApprovals,
        statusClass: "bg-[#fff3e6 text-[#ff9500]",
        statusText: "승인대기",
      };
    }
    if (activeFilter === "rejected") {
      return {
        type: "board",
        data: rejectedDocuments,
        statusClass: "bg-[#ffe6e6] text-[#ff3b30]",
        statusText: "반려",
      };
    }
    if (activeFilter === "progress") {
      return {
        type: "project",
        data: progressProjects,
        statusClass: "bg-[#e8f4ff] text-[#007bff]",
        statusText: "진행중",
      };
    }
    if (activeFilter === "maintenance") {
      return {
        type: "project",
        data: maintenanceProjects,
        statusClass: "bg-[#e6f7f1] text-[#00c48c]",
        statusText: "유지보수",
      };
    }

    return { data: [], statusClass: "", statusText: "", type: "" };
  }, [
    activeFilter,
    pendingApprovals,
    rejectedDocuments,
    progressProjects,
    maintenanceProjects,
  ]);

  return (
    <div className="mb-5 rounded-[12px] bg-white p-[18px] shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
      <div className="mb-[14px] flex items-center justify-between border-b border-[#e0e0e0] pb-[14px]">
        <h2 className="text-[16px] font-semibold text-[#1a1a1a]">{title}</h2>
      </div>

      <div className="grid max-h-[220px] grid-cols-3 gap-4 overflow-y-auto pr-2.5 max-[1200px]:grid-cols-1">
        {data.length === 0 && (
          <div className="col-span-3 py-10 text-center text-[#999]">
            <p>항목이 없습니다.</p>
          </div>
        )}

        {data.length > 0 &&
          data.map((item) => {
            if (type === "board") {
              return (
                <DocumentItem
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  project={item.project}
                  client={item.client}
                  date={item.date}
                  time={item.time}
                  reason={item.reason}
                  status={statusText}
                  statusClass={statusClass}
                  onView={onViewBoard}
                />
              );
            }
            return (
              <ProjectItem
                key={item.id}
                id={item.id}
                logo={item.name.substring(0, 2)}
                name={item.name}
                subtitle={item.client}
                status={item.status}
                statusClass={statusClass}
                onView={onViewProject}
              />
            );
          })}
      </div>
    </div>
  );
}
