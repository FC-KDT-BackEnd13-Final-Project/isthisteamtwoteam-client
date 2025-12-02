import { useEffect, useRef } from "react";

/**
 * 체크리스트 항목 컴포넌트
 *
 * 개별 체크리스트 항목을 표시하고 편집/삭제 기능을 제공합니다.
 * 편집 모드와 일반 모드 두 가지 상태가 있습니다.
 *
 * 사용 예시:
 * <ChecklistItem
 *   item={{ id: 1, text: "요구사항 정의서 파일 업로드" }}
 *   isEditing={false}
 *   editingText=""
 *   setEditingText={(text) => console.log(text)}
 *   onEdit={(id) => console.log('편집', id)}
 *   onDelete={(id) => console.log('삭제', id)}
 *   onSave={() => console.log('저장')}
 *   onCancel={() => console.log('취소')}
 * />
 */
const ChecklistItem = ({
  item,           // 체크리스트 항목 데이터 { id, text }
  onEdit,         // 편집 버튼 클릭 시 실행할 함수
  onDelete,       // 삭제 버튼 클릭 시 실행할 함수
  onSave,         // 저장 버튼 클릭 시 실행할 함수
  onCancel,       // 취소 버튼 클릭 시 실행할 함수
  isEditing,      // 현재 편집 모드인지 여부
  editingText,    // 편집 중인 텍스트
  setEditingText, // 편집 중인 텍스트 업데이트 함수
}) => {
  // 입력창 ref (편집 모드일 때 자동으로 포커스하기 위함)
  const inputRef = useRef(null);

  // 편집 모드가 되면 입력창에 자동 포커스 및 전체 선택
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  /**
   * 키보드 입력 처리
   * - Enter: 저장
   * - Escape: 취소
   */
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
      {/* 편집 모드일 때 */}
      {isEditing ? (
        <>
          {/* 입력 필드 */}
          <input
            ref={inputRef}
            type="text"
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 border border-[#e0e0e0] bg-white py-2.5 px-3.5 rounded-[6px] text-[14px] text-[#333] transition-colors duration-200 focus:outline-none focus:border-[#007bff]"
          />

          {/* 완료/취소 버튼 */}
          <div className="flex gap-2 shrink-0 max-[968px]:w-full max-[968px]:justify-end">
            {/* 완료 버튼 */}
            <button
              onClick={onSave}
              className="py-1.5 px-3 border border-[#007bff] rounded text-[12px] font-medium cursor-pointer transition-all duration-200 whitespace-nowrap bg-[#007bff] text-white hover:bg-[#0056b3] hover:border-[#0056b3] max-[968px]:flex-1"
            >
              완료
            </button>

            {/* 취소 버튼 */}
            <button
              onClick={onCancel}
              className="py-1.5 px-3 border border-[#e0e0e0] rounded text-[12px] font-medium cursor-pointer transition-all duration-200 whitespace-nowrap bg-white text-[#666] hover:bg-[#f5f5f5] max-[968px]:flex-1"
            >
              취소
            </button>
          </div>
        </>
      ) : (
        /* 일반 모드일 때 */
        <>
          {/* 텍스트 표시 (수정 불가) */}
          <input
            type="text"
            value={item.text}
            disabled
            className="flex-1 border-none bg-transparent py-2.5 px-3.5 rounded-[6px] text-[14px] text-[#333] cursor-default"
          />

          {/* 수정/삭제 버튼 */}
          <div className="flex gap-2 shrink-0 max-[968px]:w-full max-[968px]:justify-end">
            {/* 수정 버튼 */}
            <button
              onClick={() => onEdit(item.id)}
              className="py-1.5 px-3 border border-[#e0e0e0] rounded text-[12px] font-medium cursor-pointer transition-all duration-200 whitespace-nowrap bg-white text-[#666] hover:bg-[#f5f5f5] max-[968px]:flex-1"
            >
              수정
            </button>

            {/* 삭제 버튼 */}
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

export default ChecklistItem;
