import { useEffect, useState } from "react";
import EditableChecklistItem from "../components/checklist/EditableChecklistItem";
import EmptyState from "../components/common/EmptyState/EmptyState";
import { ClipboardIcon } from "../components/common/icons/ChecklistIcon";
import { getChecklists, updateChecklist, createChecklist, deleteChecklist } from "../utils/api/checklist/checklistApi";

export default function CheckListPage() {
  const [checklists, setChecklists] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageInfo, setPageInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getChecklists(currentPage, 10);
        // API 응답의 checkListId를 id로 변환
        const normalizedData = response.content.map(item => ({
          id: item.checkListId,
          content: item.content
        }));
        setChecklists(normalizedData);
        setPageInfo(response.pageInfo);
        setLoading(false);
      } catch (error) {
        console.error("데이터를 불러올 수 없습니다.", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage]);

  const filteredChecklists = checklists.filter((item) =>
    item.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id) => {
    const item = checklists.find((c) => c.id === id);
    if (item) {
      setEditingId(id);
      setEditingText(item.content);
    }
  };

  const handleSave = async () => {
    if (!editingText.trim()) {
      alert("체크리스트 내용을 입력해주세요.");
      return;
    }

    // 음수 ID인 경우 새 항목
    const isNewItem = editingId < 0;

    try {
      if (isNewItem) {
        const newChecklist = await createChecklist(editingText.trim());

        setChecklists((prev) =>
          prev.map((item) =>
            item.id === editingId
              ? { id: newChecklist.checkListId, content: editingText.trim() }
              : item
          )
        );
        alert("추가되었습니다.");
      } else {
        await updateChecklist(editingId, editingText.trim());

        setChecklists((prev) =>
          prev.map((item) =>
            item.id === editingId ? { ...item, content: editingText.trim() } : item
          )
        );
        alert("수정되었습니다.");
      }

      setEditingId(null);
      setEditingText("");
    } catch (error) {
      console.error("저장 실패:", error);
      alert("작업을 실패하였습니다.");
    }
  };

  const handleCancel = () => {
    const item = checklists.find((c) => c.id === editingId);
    if (item && !item.content) {
      setChecklists((prev) => prev.filter((c) => c.id !== editingId));
    }
    setEditingId(null);
    setEditingText("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("이 체크리스트를 삭제하시겠습니까?")) {
      return;
    }

    try {
      await deleteChecklist(id);
      setChecklists((prev) => prev.filter((c) => c.id !== id));
      alert("체크리스트가 삭제되었습니다.");
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제에 실패했습니다. 프로젝트에서 사용 중인 체크리스트는 삭제할 수 없습니다.");
    }
  };

  const handleAddNew = () => {
    const tempId = -Date.now();
    const newItem = { id: tempId, content: "" };
    setChecklists((prev) => [...prev, newItem]);
    setEditingId(tempId);
    setEditingText("");
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">로딩 중...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <div className="mx-auto max-w-[900px]">
        <h1 className="mb-4 text-[28px] font-semibold text-[#1a1a1a]">
          체크리스트 관리
        </h1>

        <div className="rounded-[12px] bg-white p-8">
          <div className="mb-6">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="검색"
              className="w-full rounded-lg border border-[#e0e0e0] bg-[#fafafa] px-4 py-3 text-[14px] focus:border-[#007bff] focus:bg-white focus:outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            {checklists.length === 0 ? (
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

          <button
            onClick={handleAddNew}
            className="mt-3 w-full rounded-[6px] border border-[#e0e0e0] bg-white px-4 py-2.5 text-[13px] font-medium text-[#666] hover:bg-[#f5f5f5]"
          >
            +
          </button>

          {pageInfo && pageInfo.totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: pageInfo.totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-9 h-9 rounded ${
                    currentPage === i
                      ? "bg-blue-500 text-white"
                      : "border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}