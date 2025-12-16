import { useEffect, useRef } from "react";

const EditableChecklistItem = ({
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

  console.log(`EditableChecklistItem - id: ${item.id}, isEditing: ${isEditing}`);

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
    <div className="flex items-center gap-3 py-3 px-4 border border-[#e8e8e8] rounded-[6px] bg-[#f8f9fa] hover:bg-white hover:border-[#d0d0d0]">
      {isEditing ? (
        <>
          <input
            ref={inputRef}
            type="text"
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 border border-[#e0e0e0] bg-white py-2.5 px-3.5 rounded-[6px] text-[14px] focus:outline-none focus:border-[#007bff]"
          />

          <div className="flex gap-2">
            <button
              onClick={onSave}
              className="py-1.5 px-3 border border-[#007bff] rounded text-[12px] font-medium bg-[#007bff] text-white hover:bg-[#0056b3]"
            >
              완료
            </button>
            <button
              onClick={onCancel}
              className="py-1.5 px-3 border border-[#e0e0e0] rounded text-[12px] font-medium bg-white text-[#666] hover:bg-[#f5f5f5]"
            >
              취소
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex-1 py-2.5 px-3.5 text-[14px] text-[#333]">
            {item.content}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onEdit(item.id)}
              className="py-1.5 px-3 border border-[#e0e0e0] rounded text-[12px] font-medium bg-white text-[#666] hover:bg-[#f5f5f5]"
            >
              수정
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="py-1.5 px-3 border border-[#e0e0e0] rounded text-[12px] font-medium bg-white text-[#dc3545] hover:bg-[#fff5f5]"
            >
              삭제
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EditableChecklistItem;