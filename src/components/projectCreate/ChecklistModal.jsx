import React from 'react';

const ChecklistModal = ({
    isOpen,
    onClose,
    checklists,
    selectedItems,
    onToggleItem,
    onSave,
    searchTerm,
    setSearchTerm
}) => {
    if (!isOpen) return null;

    const filteredChecklists = checklists.filter(item => 
        item.content?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="fixed inset-0 bg-gray-500/60 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col shadow-xl">
                {/* 헤더 */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-800">전체 체크리스트 조회 화면</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                    >
                        ×
                    </button>
                </div>
                
                {/* 검색 */}
                <div className="p-6 border-b border-gray-200">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="체크리스트 검색"
                    />
                </div>
                
                {/* 목록 */}
                <div className="flex-1 overflow-y-auto p-6" style={{ minHeight: '400px' }}>
                    <div className="space-y-3">
                        {filteredChecklists.map(item => (
                            <div
                                key={item.id}
                                onClick={() => onToggleItem(item)}
                                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedItems.some(i => i.id === item.id)}
                                    onChange={() => {}}
                                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-0 cursor-pointer mr-4 flex-shrink-0"
                                />
                                <span className="flex-1 text-gray-800">{item.content}</span>
                            </div>
                        ))}
                        
                        {filteredChecklists.length === 0 && (
                            <div className="text-center text-gray-500 py-12">
                                검색 결과가 없습니다
                            </div>
                        )}
                    </div>
                </div>
                
                {/* 푸터 */}
                <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                    <button
                        onClick={onSave}
                        className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
                    >
                        저장 ({selectedItems.length}개 선택됨)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChecklistModal;