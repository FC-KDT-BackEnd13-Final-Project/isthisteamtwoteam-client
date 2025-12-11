import ProjectCard from "./ProjectCard";

export default function ProjectList({
  projects,
  onViewProject,
  onCreateProject,
}) {
  return (
    <div className="rounded-[12px] bg-white p-[18px] shadow-[0_1px_3px_rgba(0,0,0,0.08)]">
      <div className="mb-[14px] flex items-center justify-between border-b border-[#e0e0e0] pb-[14px]">
        <h2 className="text-[16px] font-semibold text-[#1a1a1a]">
          모든 프로젝트 리스트
        </h2>
        

        <div className="flex gap-2.5">
          <button
            onClick={() => alert("전체 프로젝트 페이지로 이동.")}
            className="cursor-pointer rounded-[6px] border border-[#d0d0d0] bg-white px-[15px] py-2 text-[13px] font-semibold text-[#555] transition-all duration-200 hover:bg-[#f0f0f0]"
          >
            더보기
          </button>
          <button
            onClick={onCreateProject}
            className="cursor-pointer rounded-[6px] border border-[#007bff] bg-[#007bff] px-[15px] py-2 text-[13px] font-semibold text-white transition-all duration-200 hover:border-[#0056b3] hover:bg-[#0056b3]"
          >
            프로젝트 생성
          </button>
        </div>
      </div>

      <div className="grid max-h-[600px] grid-cols-[repeat(auto-fill,minmax(380px,1fr))] gap-4 overflow-y-auto pr-2 max-[1200px]:grid-cols-[repeat(auto-fill,minmax(320px,1fr))] max-[768px]:grid-cols-1">
        {projects.length === 0 && (
          <div className="col-span-3 py-10 text-center text-[#999]">
            <p>진행중인 프로젝트가 없습니다.</p>
          </div>
        )}        
        {projects.map((project) => (
          <ProjectCard
            key={project.project_id}
            project={project}
            onView={onViewProject}
          />
        ))}
      </div>
    </div>
  );
}
