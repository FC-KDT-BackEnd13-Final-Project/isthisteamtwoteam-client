import { useState, useEffect } from "react";

// 데이터 가져오기

// 컴포넌트 가져오기
import EmptyState from "../components/common/EmptyState/EmptyState";
import LoadingState from "../components/common/LoadingState/LoadingState";
import PageHeader from "../components/common/PageHeader/PageHeader";
import { EmptyTrashIcon } from "../components/common/icons/RemoveProjectIcon";
import ControlBar from "../components/removeProject/ControlBar";
import RemovedProjectItem from "../components/removeProject/RemovedProjectItem";

import { getDeletedProjects } from "../utils/api/project/projectApi";

/**
 * 삭제된 프로젝트 관리 페이지 (휴지통)
 *
 * 이 페이지는 다음 기능을 제공합니다:
 * 1. 삭제된 프로젝트 목록 표시
 * 2. 프로젝트 검색 기능
 * 3. 프로젝트 선택 (전체 선택, 개별 선택)
 * 4. 프로젝트 복원 (개별, 일괄)
 * 5. 프로젝트 영구 삭제 (개별, 일괄)
 *
 * 참고: 삭제된 프로젝트는 30일 동안 보관됩니다.
 */
export default function RemoveProjectPage() {
  // ========================================
  // 1. 상태(State) 관리
  // ========================================

  const [projects, setProjects] = useState([]); // 빈 배열로 초기화 (mock 데이터 제거)
  const [selectedIds, setSelectedIds] = useState(new Set()); // 선택된 프로젝트 ID 목록 (Set 사용)
  const [searchQuery, setSearchQuery] = useState(""); // 검색어
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState(null); // 에러 상태 추가

  // ========================================
  // 2. 데이터 처리
  // ========================================
  useEffect(() => {
  const fetchDeletedProjects = async () => {
    try {
      setLoading(true);
      const response = await getDeletedProjects();
      
      if (response.success) {
        setProjects(response.response.content);
      } else {
        setError(response.message || '프로젝트를 불러오는데 실패했습니다.');
      }
    } catch (err) {
      console.error('삭제된 프로젝트 조회 실패:', err);
      setError('프로젝트를 불러오는데 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  fetchDeletedProjects();
}, []);



  /**
   * 검색어로 프로젝트 필터링
   * 프로젝트 ID, 이름, 클라이언트명에서 검색
   */
  const filteredProjects = projects.filter((project) => {
  const query = searchQuery.toLowerCase();
  return (
    project.projectId.toString().includes(query) ||
    project.projectName.toLowerCase().includes(query)
  );
});


  // 전체 선택 상태 확인
  const isAllSelected =
    filteredProjects.length > 0 &&
    filteredProjects.every((p) => selectedIds.has(p.projectId));

  // 선택된 항목이 있는지 확인
  const hasSelection = selectedIds.size > 0;

  // ========================================
  // 3. 이벤트 핸들러 함수들
  // ========================================

  /**
   * 전체 선택/해제 핸들러
   * 현재 필터링된 모든 프로젝트를 선택하거나 해제
   */
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedIds(new Set(filteredProjects.map((p) => p.id)));
    } else {
      setSelectedIds(new Set());
    }
  };

  /**
   * 개별 선택/해제 핸들러
   * 체크박스 토글 시 선택 목록에 추가하거나 제거
   */
  const handleToggle = (id) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedIds(newSelected);
  };

  /**
   * 선택된 프로젝트 일괄 복원 핸들러
   * 선택된 모든 프로젝트를 복원 (목록에서 제거)
   */
  const handleRestoreSelected = () => {
    if (selectedIds.size === 0) return;

    if (
      window.confirm(
        `선택한 ${selectedIds.size}개의 프로젝트를 복원하시겠습니까?`,
      )
    ) {
      // 선택된 프로젝트를 목록에서 제거
      setProjects((prev) => prev.filter((p) => !selectedIds.has(p.id)));
      setSelectedIds(new Set());
      alert("선택한 프로젝트가 복원되었습니다.");
    }
  };

  /**
   * 선택된 프로젝트 일괄 영구삭제 핸들러
   * 선택된 모든 프로젝트를 영구 삭제 (복구 불가능)
   */
  const handleDeleteSelected = () => {
    if (selectedIds.size === 0) return;

    if (
      window.confirm(
        `선택한 ${selectedIds.size}개의 프로젝트를 영구 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.`,
      )
    ) {
      // 선택된 프로젝트를 목록에서 제거
      setProjects((prev) => prev.filter((p) => !selectedIds.has(p.id)));
      setSelectedIds(new Set());
      alert("선택한 프로젝트가 영구 삭제되었습니다.");
    }
  };

  /**
   * 개별 프로젝트 복원 핸들러
   * 단일 프로젝트를 복원
   */
  const handleRestore = (id) => {
    if (window.confirm("이 프로젝트를 복원하시겠습니까?")) {
      // 프로젝트를 목록에서 제거
      setProjects((prev) => prev.filter((p) => p.id !== id));
      // 선택 목록에서도 제거
      setSelectedIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
      alert("프로젝트가 복원되었습니다.");
    }
  };

  /**
   * 개별 프로젝트 영구삭제 핸들러
   * 단일 프로젝트를 영구 삭제 (복구 불가능)
   */
  const handlePermanentDelete = (id) => {
    if (
      window.confirm(
        "이 프로젝트를 영구 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.",
      )
    ) {
      // 프로젝트를 목록에서 제거
      setProjects((prev) => prev.filter((p) => p.id !== id));
      // 선택 목록에서도 제거
      setSelectedIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
      alert("프로젝트가 영구 삭제되었습니다.");
    }
  };

  // ========================================
  // 4. 화면 그리기 (렌더링)
  // ========================================

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <LoadingState message="로딩 중..." size="large" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-5 font-[-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,'Helvetica_Neue',Arial,sans-serif]">
      <div className="mx-auto max-w-[1200px] rounded-[12px] bg-white p-8">
        {/* 페이지 헤더 */}
        <PageHeader
          title="삭제된 프로젝트"
          description="삭제된 프로젝트는 30일 동안 보관되며, 필요한 프로젝트는 복원할 수 있습니다."
        />

        {/* 컨트롤 바: 전체 선택, 일괄 작업 버튼, 검색 */}
        <ControlBar
          isAllSelected={isAllSelected}
          hasSelection={hasSelection}
          searchQuery={searchQuery}
          onSelectAll={handleSelectAll}
          onRestoreSelected={handleRestoreSelected}
          onDeleteSelected={handleDeleteSelected}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* 프로젝트 목록 */}
        <div className="overflow-hidden rounded-lg border border-[#e8e8e8]">
          {filteredProjects.length === 0 ? (
            // 검색 결과가 없거나 삭제된 프로젝트가 없을 때
            <EmptyState
              icon={<EmptyTrashIcon />}
              message="삭제된 프로젝트가 없습니다."
              subMessage="휴지통이 비어있습니다."
            />
          ) : (
            // 프로젝트 목록 표시
            filteredProjects.map((project) => (
              <RemovedProjectItem
                key={project.projectId}
                project={project}
                isSelected={selectedIds.has(project.projectId)}
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
