import { useState } from 'react';
import { Link2, Paperclip, ExternalLink, Download, ChevronDown, ChevronUp } from 'lucide-react';

export default function ChecklistSection({ checklists, setChecklists }) {
  const [expandedChecklists, setExpandedChecklists] = useState({});

  const toggleChecklist = (checklistId) => {
    setExpandedChecklists(prev => ({
      ...prev,
      [checklistId]: !prev[checklistId]
    }));
  };

  return (
    <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-5">checklist</h2>
      
      {checklists.map((checklist) => (
        <div key={checklist.id} className="border border-gray-200 rounded-lg mb-4 bg-white hover:shadow-md transition-shadow">
          {/* 체크리스트 헤더 (클릭 가능) */}
          <div 
            className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 transition-colors"
            onClick={() => toggleChecklist(checklist.id)}
          >
            <div className="flex items-center gap-3 flex-2">
              <div onClick={(e) => e.stopPropagation()}>
                <input 
                  type="checkbox" 
                  checked={checklist.checked}
                  onChange={async (e) => {
                    e.stopPropagation();
                    
                    try {
                      setChecklists(prev => 
                        prev.map(item => 
                          item.id === checklist.id 
                            ? { ...item, checked: e.target.checked }
                            : item
                        )
                      );
                    } catch (error) {
                      console.error('체크리스트 업데이트 실패:', error);
                    }
                  }}
                  className="w-5 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
              </div>
              <h3 className="text-sm font-semibold text-gray-900">
                {checklist.checkListContent}
              </h3>
              <div className="flex items-center gap-2 ml-3">
                {checklist.links.length > 0 && (
                  <span className="flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    <Link2 className="w-3 h-3" />
                    {checklist.links.length}
                  </span>
                )}
                {checklist.files.length > 0 && (
                  <span className="flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                    <Paperclip className="w-3 h-3" />
                    {checklist.files.length}
                  </span>
                )}
              </div>
            </div>
            {(checklist.links.length > 0 || checklist.files.length > 0) && (
              <div className="ml-3">
                {expandedChecklists[checklist.id] ? (
                  <ChevronUp className="w-5 h-5 text-gray-500" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                )}
              </div>
            )}
          </div>

          {/* 드롭다운 컨텐츠 */}
          {expandedChecklists[checklist.id] && (
            <div className="px-5 pb-5 border-t border-gray-100">
              {/* 링크 섹션 */}
              {checklist.links.length > 0 && (
                <div className="mt-4 mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Link2 className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold text-gray-700">링크</span>
                    <span className="text-xs text-gray-500">({checklist.links.length})</span>
                  </div>
                  <div className="space-y-2">
                    {checklist.links.map((link, i) => (
                      <a
                        key={i}
                        href={link.linkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 p-3 bg-white hover:bg-gray-50 rounded-lg border border-blue-200 transition-all"
                      >
                        <ExternalLink className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <span className="text-sm text-blue-700 group-hover:text-blue-800 truncate flex-1">
                          {link.linkUrl}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* 파일 섹션 */}
              {checklist.files.length > 0 && (
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Paperclip className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-semibold text-gray-700">첨부파일</span>
                    <span className="text-xs text-gray-500">({checklist.files.length})</span>
                  </div>
                  <div className="space-y-2">
                    {checklist.files.map((file) => (
                      <a
                        key={file.fileId}
                        href={file.fileUrl}
                        download
                        className="group flex items-center justify-between gap-3 p-3 bg-white hover:bg-gray-50 rounded-lg border border-gray-300 transition-all"
                      >
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <Paperclip className="w-4 h-4 text-gray-600 flex-shrink-0" />
                          <span className="text-sm text-gray-700 group-hover:text-gray-900 truncate">
                            {decodeURIComponent(file.fileName)}
                          </span>
                        </div>
                        <Download className="w-4 h-4 text-gray-600 group-hover:text-gray-900 flex-shrink-0" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

