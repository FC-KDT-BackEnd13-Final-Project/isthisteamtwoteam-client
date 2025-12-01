import React, { useState, useEffect, useRef } from "react";

// 아이콘 컴포넌트
const ClipboardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-20 h-20 mb-4 text-[#cbd5e0]"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
    />
  </svg>
);

// 초기 체크리스트 데이터
const initialChecklists = [
  { id: 1, text: "요구사항 정의서 파일 업로드" },
  { id: 2, text: "도메인 주소" },
  { id: 3, text: "희망 견적 비용" },
  { id: 4, text: "사업자등록증 png 파일 업로드" },
  { id: 5, text: "로고 AI파일" },
  { id: 6, text: "도메인 등록" },
  { id: 7, text: "요구사항 정의" },
  { id: 8, text: "디자인 시안 검토" },
  { id: 9, text: "개발 일정 확인" },
  { id: 10, text: "계약서 작성" },
  { id: 11, text: "착수금 입금" },
  { id: 12, text: "킥오프 미팅" },
];

// ChecklistItem 컴포넌트
const ChecklistItem = ({
  item,
  onEdit,
  onDelete,
  onSave,
  onCancel,
  isEditing,
  editingText,
  setEditingText,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSave();
    } else if (e.key === "Escape") {
      e.preventDefault();
      onCancel();
    }
  };

  return (
    <div className="flex items-center gap-3 py-3 px-4 border border-[#e8e8e8] rounded-[6px] bg-[#f8f9fa] transition-all duration-200 hover:bg-white hover:border-[#d0d0d0] max-[968px]:flex-col max-[968px]:items-stretch">
      {isEditing ? (
        <>
          <input
            ref={inputRef}
            type="text"
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 border border-[#e0e0e0] bg-white py-2.5 px-3.5 rounded-[6px] text-[14px] text-[#333] transition-colors duration-200 focus:outline-none focus:border-[#007bff]"
          />
          <div className="flex gap-2 shrink-0 max-[968px]:w-full max-[968px]:justify-end">
            <button
              onClick={onSave}
              className="py-1.5 px-3 border border-[#007bff] rounded text-[12px] font-medium cursor-pointer transition-all duration-200 whitespace-nowrap bg-[#007bff] text-white hover:bg-[#0056b3] hover:border-[#0056b3] max-[968px]:flex-1"
            >
              완료
            </button>
            <button
              onClick={onCancel}
              className="py-1.5 px-3 border border-[#e0e0e0] rounded text-[12px] font-medium cursor-pointer transition-all duration-200 whitespace-nowrap bg-white text-[#666] hover:bg-[#f5f5f5] max-[968px]:flex-1"
            >
              취소
            </button>
          </div>
        </>
      ) : (
        <>
          <input
            type="text"
            value={item.text}
            disabled
            className="flex-1 border-none bg-transparent py-2.5 px-3.5 rounded-[6px] text-[14px] text-[#333] cursor-default"
          />
          <div className="flex gap-2 shrink-0 max-[968px]:w-full max-[968px]:justify-end">
            <button
              onClick={() => onEdit(item.id)}
              className="py-1.5 px-3 border border-[#e0e0e0] rounded text-[12px] font-medium cursor-pointer transition-all duration-200 whitespace-nowrap bg-white text-[#666] hover:bg-[#f5f5f5] max-[968px]:flex-1"
            >
              수정
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="py-1.5 px-3 border border-[#e0e0e0] rounded text-[12px] font-medium cursor-pointer transition-all duration-200 whitespace-nowrap bg-white text-[#dc3545] hover:bg-[#fff5f5] hover:border-[#dc3545] max-[968px]:flex-1"
            >
              삭제
            </button>
          </div>
        </>
      )}
    </div>
  );
};

// EmptyState 컴포넌트
const EmptyState = () => (
  <div className="text-center py-[60px] px-5 text-[#999]">
    <ClipboardIcon />
    <p className="text-[16px] mb-2">등록된 체크리스트가 없습니다</p>
    <p className="text-[14px] text-[#cbd5e0]">
      + 버튼을 눌러 새로운 체크리스트를 추가하세요
    </p>
  </div>
);

// 메인 컴포넌트
export default function CheckListPage() {
  const [checklists, setChecklists] = useState(initialChecklists);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [nextId, setNextId] = useState(13);

  // 검색 필터링
  const filteredChecklists = checklists.filter((item) =>
    item.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 편집 시작
  const handleEdit = (id) => {
    const item = checklists.find((c) => c.id === id);
    if (item) {
      setEditingId(id);
      setEditingText(item.text);
    }
  };

  // 편집 저장
  const handleSave = () => {
    if (!editingText.trim()) {
      alert("체크리스트 내용을 입력해주세요.");
      return;
    }

    setChecklists((prev) =>
      prev.map((item) =>
        item.id === editingId ? { ...item, text: editingText.trim() } : item
      )
    );
    setEditingId(null);
    setEditingText("");
  };

  // 편집 취소
  const handleCancel = () => {
    // 새로 추가된 빈 항목이면 삭제
    const item = checklists.find((c) => c.id === editingId);
    if (item && !item.text.trim()) {
      setChecklists((prev) => prev.filter((c) => c.id !== editingId));
    }
    setEditingId(null);
    setEditingText("");
  };

  // 삭제
  const handleDelete = (id) => {
    if (window.confirm("이 체크리스트를 삭제하시겠습니까?")) {
      setChecklists((prev) => prev.filter((c) => c.id !== id));
    }
  };

  // 새 체크리스트 추가
  const handleAddNew = () => {
    const newItem = { id: nextId, text: "" };
    setChecklists((prev) => [...prev, newItem]);
    setEditingId(nextId);
    setEditingText("");
    setNextId((prev) => prev + 1);
  };

  // 전체 저장
  const handleSaveAll = () => {
    if (editingId !== null) {
      alert("편집 중인 항목이 있습니다. 먼저 수정을 완료하거나 취소해주세요.");
      return;
    }

    const emptyItem = checklists.find((c) => !c.text.trim());
    if (emptyItem) {
      alert("내용이 비어있는 체크리스트가 있습니다.");
      return;
    }

    alert("체크리스트가 저장되었습니다.");
    console.log("Saved checklists:", checklists);
  };

  return (
    <div className="min-h-screen bg-white p-5 font-[-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,'Helvetica_Neue',Arial,sans-serif]">
      <div className="max-w-[900px] mx-auto bg-white rounded-[12px] p-8">
        <h1 className="text-[28px] font-semibold text-[#1a1a1a] mb-4 leading-[1.4]">
          체크리스트 관리
        </h1>

        <div className="mb-8 pb-6 border-b-2 border-[#f0f0f0]">
          <p className="text-[14px] text-[#999] mt-2">
            저장된 체크리스트를 관리하고 수정할 수 있습니다.
          </p>
        </div>

        {/* 검색 섹션 */}
        <div className="mb-6">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="검색"
            className="w-full py-3 px-4 border border-[#e0e0e0] rounded-lg text-[14px] text-[#333] bg-[#fafafa] transition-all duration-200 focus:outline-none focus:border-[#007bff] focus:bg-white placeholder:text-[#999]"
          />
        </div>

        {/* 체크리스트 항목 */}
        <div className="flex flex-col gap-2">
          {filteredChecklists.length === 0 && searchTerm === "" ? (
            <EmptyState />
          ) : filteredChecklists.length === 0 ? (
            <div className="text-center py-10 text-[#999]">
              검색 결과가 없습니다.
            </div>
          ) : (
            filteredChecklists.map((item) => (
              <ChecklistItem
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

        {/* 추가 버튼 */}
        <button
          onClick={handleAddNew}
          className="mt-3 py-2.5 px-4 bg-white border border-[#e0e0e0] rounded-[6px] text-[#666] text-[13px] cursor-pointer transition-all duration-200 w-full font-medium hover:bg-[#f5f5f5]"
        >
          +
        </button>

        {/* 하단 액션 */}
        <div className="flex justify-end mt-8 pt-6 border-t border-[#f0f0f0]">
          <button
            onClick={handleSaveAll}
            className="py-3 px-8 border-none rounded-lg text-[14px] font-medium cursor-pointer bg-[#155dfc] text-white transition-all duration-200 hover:bg-[#155dfc]"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}
