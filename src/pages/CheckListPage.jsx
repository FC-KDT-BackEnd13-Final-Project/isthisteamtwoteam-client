import { useState } from "react";

// 데이터 가져오기
import { initialChecklists } from "../utils/data/mockChecklistData";

// 컴포넌트 가져오기
import EditableChecklistItem from "../components/checklist/EditableChecklistItem";
import EmptyState from "../components/common/EmptyState/EmptyState";
import { ClipboardIcon } from "../components/common/icons/ChecklistIcon";

/**
 * 체크리스트 관리 페이지
 *
 * 이 페이지는 다음 기능을 제공합니다:
 * 1. 체크리스트 목록 표시
 * 2. 체크리스트 추가/수정/삭제
 * 3. 검색 기능
 * 4. 전체 저장
 */
export default function CheckListPage() {
  // ========================================
  // 1. 상태(State) 관리
  // ========================================

  const [checklists, setChecklists] = useState(initialChecklists); // 체크리스트 목록
  const [searchTerm, setSearchTerm] = useState(""); // 검색어
  const [editingId, setEditingId] = useState(null); // 현재 편집 중인 항목 ID
  const [editingText, setEditingText] = useState(""); // 편집 중인 텍스트
  const [nextId, setNextId] = useState(13); // 다음 생성할 항목의 ID

  // ========================================
  // 2. 데이터 처리
  // ========================================

  /**
   * 검색어로 체크리스트 필터링
   * 검색어가 포함된 항목만 표시
   */
  const filteredChecklists = checklists.filter((item) =>
    item.text.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // ========================================
  // 3. 이벤트 핸들러 함수들
  // ========================================

  /**
   * 편집 시작 핸들러
   * 수정 버튼을 클릭하면 해당 항목을 편집 모드로 전환
   */
  const handleEdit = (id) => {
    const item = checklists.find((c) => c.id === id);
    if (item) {
      setEditingId(id);
      setEditingText(item.text);
    }
  };

  /**
   * 편집 저장 핸들러
   * 수정한 내용을 저장
   */
  const handleSave = () => {
    // 빈 값 체크
    if (!editingText.trim()) {
      alert("체크리스트 내용을 입력해주세요.");
      return;
    }

    // 체크리스트 업데이트
    setChecklists((prev) =>
      prev.map((item) =>
        item.id === editingId ? { ...item, text: editingText.trim() } : item,
      ),
    );

    // 편집 모드 종료
    setEditingId(null);
    setEditingText("");
  };

  /**
   * 편집 취소 핸들러
   * 수정을 취소하고 원래 상태로 복원
   */
  const handleCancel = () => {
    // 새로 추가된 빈 항목이면 삭제
    const item = checklists.find((c) => c.id === editingId);
    if (item && !item.text.trim()) {
      setChecklists((prev) => prev.filter((c) => c.id !== editingId));
    }

    // 편집 모드 종료
    setEditingId(null);
    setEditingText("");
  };

  /**
   * 삭제 핸들러
   * 체크리스트 항목 삭제
   */
  const handleDelete = (id) => {
    if (window.confirm("이 체크리스트를 삭제하시겠습니까?")) {
      setChecklists((prev) => prev.filter((c) => c.id !== id));
    }
  };

  /**
   * 새 체크리스트 추가 핸들러
   * 빈 항목을 추가하고 편집 모드로 전환
   */
  const handleAddNew = () => {
    const newItem = { id: nextId, text: "" };
    setChecklists((prev) => [...prev, newItem]);
    setEditingId(nextId);
    setEditingText("");
    setNextId((prev) => prev + 1);
  };

  /**
   * 전체 저장 핸들러
   * 모든 체크리스트를 서버에 저장 (현재는 alert만 표시)
   */
  const handleSaveAll = () => {
    // 편집 중인 항목 체크
    if (editingId !== null) {
      alert("편집 중인 항목이 있습니다. 먼저 수정을 완료하거나 취소해주세요.");
      return;
    }

    // 빈 항목 체크
    const emptyItem = checklists.find((c) => !c.text.trim());
    if (emptyItem) {
      alert("내용이 비어있는 체크리스트가 있습니다.");
      return;
    }

    // 저장 완료 (실제로는 서버에 전송해야 함)
    alert("체크리스트가 저장되었습니다.");
    console.log("Saved checklists:", checklists);
  };

  // ========================================
  // 4. 화면 그리기 (렌더링)
  // ========================================

  return (
    <div className="min-h-screen bg-white p-5 font-[-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,'Helvetica_Neue',Arial,sans-serif]">
      <div className="mx-auto max-w-[900px] rounded-[12px] bg-white p-8">
        {/* 페이지 제목 섹션 */}
        <h1 className="mb-4 text-[28px] leading-[1.4] font-semibold text-[#1a1a1a]">
          체크리스트 관리
        </h1>

        {/* 페이지 설명 섹션 */}
        <div className="mb-8 border-b-2 border-[#f0f0f0] pb-6">
          <p className="mt-2 text-[14px] text-[#999]">
            저장된 체크리스트를 관리하고 수정할 수 있습니다.
          </p>
        </div>

        {/* 검색 입력 섹션 */}
        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="검색"
            className="w-full rounded-lg border border-[#e0e0e0] bg-[#fafafa] px-4 py-3 text-[14px] text-[#333] transition-all duration-200 placeholder:text-[#999] focus:border-[#007bff] focus:bg-white focus:outline-none"
          />
        </div>

        {/* 체크리스트 목록 표시 영역 */}
        <div className="flex flex-col gap-2">
          {/*
            조건부 렌더링:
            1. 검색어가 없고 체크리스트가 없으면 → EmptyState 표시
            2. 검색어가 있는데 결과가 없으면 → "검색 결과가 없습니다" 표시
            3. 그 외의 경우 → 체크리스트 항목들을 표시
          */}
          {filteredChecklists.length === 0 && searchTerm === "" ? (
            <EmptyState
              icon={<ClipboardIcon />}
              message="등록된 체크리스트가 없습니다"
              subMessage="+ 버튼을 눌러 새로운 체크리스트를 추가하세요"
            />
          ) : filteredChecklists.length === 0 ? (
            <div className="py-10 text-center text-[#999]">
              검색 결과가 없습니다.
            </div>
          ) : (
            filteredChecklists.map((item) => (
              <EditableChecklistItem
                key={item.id}
                item={item}
                isEditing={editingId === item.id}
                editingText={editingText}
                setEditingText={setEditingText}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onSave={handleSave}
                onCancel={handleCancel}
              />
            ))
          )}
        </div>

        {/* 새 체크리스트 추가 버튼 */}
        <button
          onClick={handleAddNew}
          className="mt-3 w-full cursor-pointer rounded-[6px] border border-[#e0e0e0] bg-white px-4 py-2.5 text-[13px] font-medium text-[#666] transition-all duration-200 hover:bg-[#f5f5f5]"
        >
          +
        </button>

        {/* 하단 저장 버튼 영역 */}
        <div className="mt-8 flex justify-end border-t border-[#f0f0f0] pt-6">
          <button
            onClick={handleSaveAll}
            className="cursor-pointer rounded-lg border-none bg-[#155dfc] px-8 py-3 text-[14px] font-medium text-white transition-all duration-200 hover:bg-[#155dfc]"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
