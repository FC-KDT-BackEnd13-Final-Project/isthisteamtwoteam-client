// components/ChecklistSection.jsx
import { useState, useRef } from 'react';
import { Link2, Paperclip, ExternalLink, Download, ChevronDown, ChevronUp, Plus, Upload, Trash2, X } from 'lucide-react';
import { uploadTempFile, deleteTempFiles, attachFilesToChecklist } from '../../utils/config/api/file/fileApi';

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

  const toggleChecklist = (checklistId) => {
    setExpandedChecklists(prev => ({
      ...prev,
      [checklistId]: !prev[checklistId]
    }));
  };

  // 파일/링크 추가 UI 토글
  const toggleUploadUI = (checklistId) => {
    if (activeUploadChecklistId === checklistId) {
      // 닫을 때 임시파일 삭제
      handleCancelUpload(checklistId);
    } else {
      setActiveUploadChecklistId(checklistId);
      // 초기화
      setTempFiles(prev => ({ ...prev, [checklistId]: [] }));
      setLinks(prev => ({ ...prev, [checklistId]: [] }));
      setNewLink(prev => ({ ...prev, [checklistId]: '' }));
    }
  };

  // 파일 선택 핸들러
  const handleFileSelect = async (e, checklistId) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsUploading(prev => ({ ...prev, [checklistId]: true }));
    try {
      const uploadPromises = files.map(file => uploadTempFile(file, projectId));
      const results = await Promise.all(uploadPromises);
      
      const uploadedFiles = results.map(result => result.response[0]);
      setTempFiles(prev => ({
        ...prev,
        [checklistId]: [...(prev[checklistId] || []), ...uploadedFiles]
      }));
    } catch (error) {
      console.error('파일 업로드 실패:', error);
      alert('파일 업로드에 실패했습니다.');
    } finally {
      setIsUploading(prev => ({ ...prev, [checklistId]: false }));
      e.target.value = '';
    }
  };

  // 임시파일 제거
  const handleRemoveTempFile = async (checklistId, fileId) => {
    try {
      await deleteTempFiles(projectId, [fileId]);
      setTempFiles(prev => ({
        ...prev,
        [checklistId]: prev[checklistId].filter(f => f.fileId !== fileId)
      }));
    } catch (error) {
      console.error('파일 삭제 실패:', error);
      alert('파일 삭제에 실패했습니다.');
    }
  };

  // 링크 추가
  const handleAddLink = (checklistId) => {
    const linkValue = newLink[checklistId]?.trim();
    if (!linkValue) return;
    
    try {
      new URL(linkValue);
      setLinks(prev => ({
        ...prev,
        [checklistId]: [...(prev[checklistId] || []), linkValue]
      }));
      setNewLink(prev => ({ ...prev, [checklistId]: '' }));
    } catch {
      alert('올바른 URL 형식을 입력해주세요. (예: https://example.com)');
    }
  };

  // 링크 제거
  const handleRemoveLink = (checklistId, index) => {
    setLinks(prev => ({
      ...prev,
      [checklistId]: prev[checklistId].filter((_, i) => i !== index)
    }));
  };

  // 저장
  const handleSave = async (checklistId) => {
    const checklistTempFiles = tempFiles[checklistId] || [];
    const checklistLinks = links[checklistId] || [];

    if (checklistTempFiles.length === 0 && checklistLinks.length === 0) {
      alert('파일 또는 링크를 추가해주세요.');
      return;
    }

    try {
      const fileIds = checklistTempFiles.map(f => f.fileId);
      
      await attachFilesToChecklist(projectId, checklistId, fileIds, checklistLinks);
      
      // UI 업데이트
      setChecklists(prev => 
        prev.map(item => {
          if (item.id === checklistId) {
            return {
              ...item,
              files: [
                ...item.files,
                ...checklistTempFiles.map(f => ({
                  fileId: f.fileId,
                  fileName: f.fileOriginalFileName,
                  fileUrl: f.filePath,
                  fileSize: f.fileSize
                }))
              ],
              links: [
                ...item.links,
                ...checklistLinks.map(url => ({ linkUrl: url }))
              ]
            };
          }
          return item;
        })
      );
      
      // 상태 초기화
      setActiveUploadChecklistId(null);
      setTempFiles(prev => ({ ...prev, [checklistId]: [] }));
      setLinks(prev => ({ ...prev, [checklistId]: [] }));
      setNewLink(prev => ({ ...prev, [checklistId]: '' }));
      
      alert('파일 및 링크가 추가되었습니다.');
    } catch (error) {
      console.error('저장 실패:', error);
      alert('저장에 실패했습니다.');
    }
  };

  // 취소
  const handleCancelUpload = async (checklistId) => {
    const checklistTempFiles = tempFiles[checklistId] || [];
    
    if (checklistTempFiles.length > 0) {
      try {
        const fileIds = checklistTempFiles.map(f => f.fileId);
        await deleteTempFiles(projectId, fileIds);
      } catch (error) {
        console.error('임시파일 삭제 실패:', error);
      }
    }
    
    setActiveUploadChecklistId(null);
    setTempFiles(prev => ({ ...prev, [checklistId]: [] }));
    setLinks(prev => ({ ...prev, [checklistId]: [] }));
    setNewLink(prev => ({ ...prev, [checklistId]: '' }));
  };

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

              {/* 파일/링크 추가 UI */}
              {activeUploadChecklistId === checklist.id && (
                <div className="px-5 pb-5 border-t border-gray-200 bg-gray-50">
                  <div className="space-y-4 pt-4">
                    {/* 파일 업로드 섹션 */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className="text-sm font-semibold text-gray-700">파일 첨부</label>
                        <button
                          onClick={() => fileInputRefs.current[checklist.id]?.click()}
                          disabled={isUploading[checklist.id]}
                          className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 text-sm transition-colors"
                        >
                          <Upload className="w-4 h-4" />
                          {isUploading[checklist.id] ? '업로드 중...' : '파일 선택'}
                        </button>
                        <input
                          ref={(el) => fileInputRefs.current[checklist.id] = el}
                          type="file"
                          multiple
                          onChange={(e) => handleFileSelect(e, checklist.id)}
                          className="hidden"
                        />
                      </div>

                      {/* 업로드된 파일 목록 */}
                      {(tempFiles[checklist.id] || []).length > 0 && (
                        <div className="space-y-2">
                          {(tempFiles[checklist.id] || []).map((file) => (
                            <div
                              key={file.fileId}
                              className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                            >
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                <Upload className="w-4 h-4 text-gray-500 flex-shrink-0" />
                                <span className="text-sm text-gray-700 truncate">
                                  {file.fileOriginalFileName}
                                </span>
                                <span className="text-xs text-gray-500">
                                  ({file.fileSize})
                                </span>
                              </div>
                              <button
                                onClick={() => handleRemoveTempFile(checklist.id, file.fileId)}
                                className="text-red-500 hover:text-red-700 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {(tempFiles[checklist.id] || []).length === 0 && (
                        <p className="text-sm text-gray-400 text-center py-4 border-2 border-dashed rounded-lg bg-white">
                          파일을 선택해주세요
                        </p>
                      )}
                    </div>

                    {/* 링크 추가 섹션 */}
                    <div>
                      <label className="text-sm font-semibold text-gray-700 mb-3 block">링크 추가</label>
                      
                      <div className="flex gap-2 mb-3">
                        <input
                          type="url"
                          value={newLink[checklist.id] || ''}
                          onChange={(e) => setNewLink(prev => ({ ...prev, [checklist.id]: e.target.value }))}
                          onKeyPress={(e) => e.key === 'Enter' && handleAddLink(checklist.id)}
                          placeholder="https://example.com"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          onClick={() => handleAddLink(checklist.id)}
                          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm transition-colors"
                        >
                          추가
                        </button>
                      </div>

                      {/* 추가된 링크 목록 */}
                      {(links[checklist.id] || []).length > 0 && (
                        <div className="space-y-2">
                          {(links[checklist.id] || []).map((link, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200"
                            >
                              <div className="flex items-center gap-2 flex-1 min-w-0">
                                <Link2 className="w-4 h-4 text-blue-500 flex-shrink-0" />
                                <a 
                                  href={link} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-sm text-blue-600 hover:text-blue-800 truncate"
                                >
                                  {link}
                                </a>
                              </div>
                              <button
                                onClick={() => handleRemoveLink(checklist.id, index)}
                                className="text-red-500 hover:text-red-700 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {(links[checklist.id] || []).length === 0 && (
                        <p className="text-sm text-gray-400 text-center py-4 border-2 border-dashed rounded-lg bg-white">
                          링크를 추가해주세요
                        </p>
                      )}
                    </div>

                    {/* 버튼 그룹 */}
                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        onClick={() => handleCancelUpload(checklist.id)}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors text-sm"
                      >
                        취소
                      </button>
                      <button
                        onClick={() => handleSave(checklist.id)}
                        disabled={(tempFiles[checklist.id] || []).length === 0 && (links[checklist.id] || []).length === 0}
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm"
                      >
                        저장
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 드롭다운 컨텐츠 (기존 파일/링크 표시) */}
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
        </>
      )}
    </div>
  );
}