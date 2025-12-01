import React, { useState } from "react";

// 아이콘 컴포넌트들
const RestoreIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
    <path d="M13,3A9,9 0 0,0 4,12H1L4.89,15.89L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3Z" />
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
    <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] fill-[#999]">
    <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
  </svg>
);

const EmptyTrashIcon = () => (
  <svg viewBox="0 0 24 24" className="w-16 h-16 mb-4 opacity-30 fill-[#999]">
    <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
  </svg>
);

// 초기 데이터
const initialProjects = [
  {
    id: "PRJ-015",
    name: "레거시 시스템 마이그레이션",
    client: "㈜우리은행",
    createdDate: "2024.05.10",
    deletedDate: "2024.11.25",
    imageUrl: "",
  },
  {
    id: "PRJ-018",
    name: "물류 관리 시스템",
    client: "㈜CJ대한통운",
    createdDate: "2024.06.15",
    deletedDate: "2024.11.24",
    imageUrl: "",
  },
  {
    id: "PRJ-022",
    name: "인사관리 시스템 개선",
    client: "㈜포스코",
    createdDate: "2024.03.20",
    deletedDate: "2024.11.23",
    imageUrl: "",
  },
  {
    id: "PRJ-025",
    name: "IoT 플랫폼 구축",
    client: "㈜SK텔레콤",
    createdDate: "2024.04.05",
    deletedDate: "2024.11.22",
    imageUrl: "",
  },
  {
    id: "PRJ-029",
    name: "블록체인 기반 인증 시스템",
    client: "㈜신한은행",
    createdDate: "2024.07.12",
    deletedDate: "2024.11.20",
    imageUrl: "",
  },
  {
    id: "PRJ-033",
    name: "스마트팩토리 솔루션",
    client: "㈜LG화학",
    createdDate: "2024.02.28",
    deletedDate: "2024.11.18",
    imageUrl: "",
  },
  {
    id: "PRJ-037",
    name: "빅데이터 분석 플랫폼",
    client: "㈜한화",
    createdDate: "2024.08.01",
    deletedDate: "2024.11.15",
    imageUrl: "",
  },
  {
    id: "PRJ-040",
    name: "VR 교육 콘텐츠",
    client: "㈜NHN",
    createdDate: "2024.09.10",
    deletedDate: "2024.11.10",
    imageUrl: "",
  },
  {
    id: "PRJ-042",
    name: "자산관리 시스템",
    client: "㈜KB국민은행",
    createdDate: "2024.01.15",
    deletedDate: "2024.11.05",
    imageUrl: "",
  },
  {
    id: "PRJ-045",
    name: "모바일 결제 시스템",
    client: "㈜토스",
    createdDate: "2024.10.20",
    deletedDate: "2024.11.01",
    imageUrl: "",
  },
];

// ProjectItem 컴포넌트
const ProjectItem = ({
  project,
  isSelected,
  onToggle,
  onRestore,
  onDelete,
}) => {
  const logo = project.imageUrl ? (
    <img
      src={project.imageUrl}
      alt={project.name}
      className="w-full h-full object-cover rounded-lg"
    />
  ) : (
    project.name.substring(0, 2)
  );

  return (
    <div className="flex items-center py-4 px-5 border-b border-[#e8e8e8] last:border-b-0 transition-all duration-200 hover:bg-[#fafafa]">
      <div className="mr-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onToggle(project.id)}
          className="w-[18px] h-[18px] cursor-pointer"
        />
      </div>
      <div className="w-12 h-12 flex items-center justify-center bg-[#f0f6ff] rounded-lg mr-4 text-[16px] font-semibold text-[#5a9aeb]">
        {logo}
      </div>
      <div className="flex-1 min-w-0 grid grid-cols-[2fr_1.5fr_1fr_1fr] gap-6 items-center">
        <div className="min-w-0">
          <div className="text-[13px] font-medium text-[#5a9aeb] mb-1">
            {project.id}
          </div>
          <div className="text-[14px] text-[#333] overflow-hidden text-ellipsis whitespace-nowrap">
            {project.name}
          </div>
        </div>
        <div className="text-[13px] text-[#666]">{project.client}</div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[12px] text-[#999]">생성일</span>
          <span className="text-[13px] text-[#333]">{project.createdDate}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-[12px] text-[#999]">삭제일</span>
          <span className="text-[13px] text-[#333]">{project.deletedDate}</span>
        </div>
      </div>
      <div className="flex gap-2 ml-4">
        <button
          onClick={() => onRestore(project.id)}
          className="py-1.5 px-3 border border-[#5a9aeb] bg-white rounded-[6px] text-[12px] text-[#5a9aeb] cursor-pointer transition-all duration-200 flex items-center gap-1 hover:bg-[#f0f6ff]"
        >
          <RestoreIcon />
          복원
        </button>
        <button
          onClick={() => onDelete(project.id)}
          className="py-1.5 px-3 border border-[#ff6b6b] bg-white rounded-[6px] text-[12px] text-[#ff6b6b] cursor-pointer transition-all duration-200 flex items-center gap-1 hover:bg-[#fff5f5]"
        >
          <TrashIcon />
          영구삭제
        </button>
      </div>
    </div>
  );
};

// EmptyState 컴포넌트
const EmptyState = () => (
  <div className="text-center py-20 px-5 text-[#999]">
    <EmptyTrashIcon />
    <p className="text-[15px] mb-2">삭제된 프로젝트가 없습니다.</p>
    <p className="text-[13px] text-[#bbb]">휴지통이 비어있습니다.</p>
  </div>
);

// 메인 컴포넌트
export default function RemoveProjectPage() {
  const [projects, setProjects] = useState(initialProjects);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  // 검색 필터링
  const filteredProjects = projects.filter((project) => {
    const query = searchQuery.toLowerCase();
    return (
      project.id.toLowerCase().includes(query) ||
      project.name.toLowerCase().includes(query) ||
      project.client.toLowerCase().includes(query)
    );
  });

  // 전체 선택/해제
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedIds(new Set(filteredProjects.map((p) => p.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  // 개별 선택/해제
  const handleToggle = (id) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  // 선택 복원
  const handleRestoreSelected = () => {
    if (selectedIds.size === 0) return;
    if (
      window.confirm(
        `선택한 ${selectedIds.size}개의 프로젝트를 복원하시겠습니까?`
      )
    ) {
      setProjects((prev) => prev.filter((p) => !selectedIds.has(p.id)));
      setSelectedIds(new Set());
      alert("선택한 프로젝트가 복원되었습니다.");
    }
  };

  // 선택 영구삭제
  const handleDeleteSelected = () => {
    if (selectedIds.size === 0) return;
    if (
      window.confirm(
        `선택한 ${selectedIds.size}개의 프로젝트를 영구 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`
      )
    ) {
      setProjects((prev) => prev.filter((p) => !selectedIds.has(p.id)));
      setSelectedIds(new Set());
      alert("선택한 프로젝트가 영구 삭제되었습니다.");
    }
  };

  // 개별 복원
  const handleRestore = (id) => {
    if (window.confirm("이 프로젝트를 복원하시겠습니까?")) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setSelectedIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
      alert("프로젝트가 복원되었습니다.");
    }
  };

  // 개별 영구삭제
  const handlePermanentDelete = (id) => {
    if (
      window.confirm(
        "이 프로젝트를 영구 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다."
      )
    ) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setSelectedIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
      alert("프로젝트가 영구 삭제되었습니다.");
    }
  };

  const isAllSelected =
    filteredProjects.length > 0 &&
    filteredProjects.every((p) => selectedIds.has(p.id));
  const hasSelection = selectedIds.size > 0;

  return (
    <div className="min-h-screen bg-white p-5 font-[-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,'Helvetica_Neue',Arial,sans-serif]">
      <div className="max-w-[1200px] mx-auto bg-white rounded-[12px] p-8">
        {/* Header */}
        <div className="mb-8 pb-6 border-b-2 border-[#f0f0f0]">
          <h1 className="text-[24px] text-[#1a1a1a] mb-2">삭제된 프로젝트</h1>
          <p className="text-[14px] text-[#999]">
            삭제된 프로젝트는 30일 동안 보관되며, 필요한 프로젝트는 복원할 수
            있습니다.
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center mb-5 p-4 bg-[#f8f9fa] rounded-lg">
          <div className="flex gap-3 items-center">
            <label className="flex items-center gap-2 text-[14px] text-[#666]">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={(e) => handleSelectAll(e.target.checked)}
                className="w-[18px] h-[18px] cursor-pointer"
              />
              <span>전체 선택</span>
            </label>
            <button
              onClick={handleRestoreSelected}
              disabled={!hasSelection}
              className={`py-1.5 px-3 border-none rounded-[6px] text-[12px] font-medium cursor-pointer transition-all duration-200 flex items-center gap-1 ${
                hasSelection
                  ? "bg-[#5a9aeb] text-white hover:bg-[#4a8ada]"
                  : "bg-[#e0e0e0] text-[#999] cursor-not-allowed"
              }`}
            >
              <RestoreIcon />
              선택 복원
            </button>
            <button
              onClick={handleDeleteSelected}
              disabled={!hasSelection}
              className={`py-1.5 px-3 border-none rounded-[6px] text-[12px] font-medium cursor-pointer transition-all duration-200 flex items-center gap-1 ${
                hasSelection
                  ? "bg-[#ff6b6b] text-white hover:bg-[#ff5252]"
                  : "bg-[#e0e0e0] text-[#999] cursor-not-allowed"
              }`}
            >
              <TrashIcon />
              선택 영구삭제
            </button>
          </div>
          <div className="flex items-center gap-2 py-2 px-3 bg-white border border-[#e0e0e0] rounded-[6px] w-[300px]">
            <SearchIcon />
            <input
              type="text"
              placeholder="프로젝트 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 border-none outline-none text-[14px]"
            />
          </div>
        </div>

        {/* Project List */}
        <div className="border border-[#e8e8e8] rounded-lg overflow-hidden">
          {filteredProjects.length === 0 ? (
            <EmptyState />
          ) : (
            filteredProjects.map((project) => (
              <ProjectItem
                key={project.id}
                project={project}
                isSelected={selectedIds.has(project.id)}
                onToggle={handleToggle}
                onRestore={handleRestore}
                onDelete={handlePermanentDelete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
