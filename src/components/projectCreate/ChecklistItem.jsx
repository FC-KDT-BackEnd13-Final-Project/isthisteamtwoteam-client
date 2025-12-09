import React from 'react';

const ChecklistItem = ({
    item,
    onTextChange,
    onCheckToggle,
    onDelete,
    canDelete
}) => {
    return (
        <div className="flex items-center gap-3 group">
            {/* 입력창 + 체크박스 */}
            <div className="flex-1 relative">
                <div className="flex items-center border border-gray-300 rounded-lg bg-white focus-within:ring-2 focus-within:ring-blue-500">
                    {/* 체크박스 */}
                    <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={() => onCheckToggle(item.id)}
                        className="w-4 h-4 ml-5 text-blue-600 border-gray-300 rounded focus:ring-0 cursor-pointer flex-shrink-0"
                    />
                    
                    {/* 텍스트 입력 */}
                    <input
                        type="text"
                        value={item.text}
                        onChange={(e) => onTextChange(item.id, e.target.value)}
                        className="flex-1 px-4 py-3 bg-transparent focus:outline-none"
                        placeholder="체크리스트 항목을 입력하세요"
                    />
                </div>
            </div>
            
            {/* 삭제 버튼 */}
            <button
                onClick={() => onDelete(item.id)}
                className="text-gray-300 hover:text-red-500 font-bold text-2xl px-2 transition-colors flex-shrink-0"
                disabled={!canDelete}
            >
                ×
            </button>
        </div>
    );
};

export default ChecklistItem;