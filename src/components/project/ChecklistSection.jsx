import { useState, useRef } from 'react';
import { Link2, Paperclip, ExternalLink, Download, ChevronDown, ChevronUp, Plus, Upload, Trash2, X } from 'lucide-react';
import { uploadTempFile, deleteTempFiles, attachFilesToChecklist } from '../../utils/config/api/file/fileApi';
import { updateChecklistStatus } from '../../utils/config/api/checklist/checklistApi'; // ✅ 추가

export default function ChecklistSection({ 
  checklists, 
  setChecklists, 
  projectId,
  userRole
}) {
  const [expandedChecklists, setExpandedChecklists] = useState({});
  const [activeUploadChecklistId, setActiveUploadChecklistId] = useState(null);
  
  // 업로드 상태 관리
  const [tempFiles, setTempFiles] = useState({});
  const [links, setLinks] = useState({});
  const [newLink, setNewLink] = useState({});
  const [isUploading, setIsUploading] = useState({});
  const fileInputRefs = useRef({});

  const isCustomer = userRole === 'CUSTOMER';
  const canCheckChecklist = userRole === 'ADMIN' || userRole === 'DEVELOPER'; // ✅ 체크 권한

  // ✅ 체크박스 변경 핸들러 수정
  const handleCheckboxChange = async (checklistId, currentChecked) => {
    // 권한 체크
    if (!canCheckChecklist) {
      alert('체크리스트 체크 권한이 없습니다.\n(ADMIN 또는 DEVELOPER만 가능)');
      return;
    }

    try {
      // 낙관적 업데이트 (UI 먼저 변경)
      setChecklists(prev => 
        prev.map(item => 
          item.id === checklistId 
            ? { ...item, checked: !currentChecked }
            : item
        )
      );

      // API 호출
      const response = await updateChecklistStatus(projectId, checklistId, !currentChecked);
      
      if (!response.success) {
        // 실패 시 원래대로 되돌림
        setChecklists(prev => 
          prev.map(item => 
            item.id === checklistId 
              ? { ...item, checked: currentChecked }
              : item
          )
        );
        alert('체크리스트 상태 변경에 실패했습니다.');
      }
    } catch (error) {
      console.error('체크리스트 업데이트 실패:', error);
      
      // 실패 시 원래대로 되돌림
      setChecklists(prev => 
        prev.map(item => 
          item.id === checklistId 
            ? { ...item, checked: currentChecked }
            : item
        )
      );
      
      alert('체크리스트 상태 변경에 실패했습니다.');
    }
  };

  const toggleChecklist = (checklistId) => {
    setExpandedChecklists(prev => ({
      ...prev,
      [checklistId]: !prev[checklistId]
    }));
  };

  // ... (나머지 함수들은 동일)

  return (
    <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">체크리스트</h2>
      
      {/* 체크리스트가 없는 경우 */}
      {(!checklists || checklists.length === 0) ? (
        <div className="py-10">
          <p className="text-sm text-gray-500 text-center">
            체크리스트가 존재하지 않습니다.
          </p>
        </div>
      ) : (
        <>
          {checklists.map((checklist) => (
            <div key={checklist.id} className="border border-gray-200 rounded-lg mb-4 bg-white hover:shadow-md transition-shadow">
              {/* 체크리스트 헤더 */}
              <div 
                className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleChecklist(checklist.id)}
              >
                <div className="flex items-center gap-3 flex-1">
                  <div onClick={(e) => e.stopPropagation()}>
                    <input 
                      type="checkbox" 
                      checked={checklist.checked}
                      onChange={() => handleCheckboxChange(checklist.id, checklist.checked)} // ✅ 수정
                      disabled={!canCheckChecklist} // ✅ 권한 없으면 비활성화
                      className={`w-5 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 ${
                        canCheckChecklist ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
                      }`} // ✅ 스타일 조건부 적용
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
                    
                    {/* CUSTOMER만 파일 추가 버튼 표시 */}
                    {isCustomer && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleUploadUI(checklist.id);
                        }}
                        className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full transition-colors ${
                          activeUploadChecklistId === checklist.id
                            ? 'bg-red-100 text-red-700 hover:bg-red-200'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {activeUploadChecklistId === checklist.id ? (
                          <>
                            <X className="w-3 h-3" />
                            닫기
                          </>
                        ) : (
                          <>
                            <Plus className="w-3 h-3" />
                            추가
                          </>
                        )}
                      </button>
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

              {/* 나머지 코드는 동일 */}
            </div>
          ))}
        </>
      )}
    </div>
  );
}