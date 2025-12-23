// components/ChecklistFileModal.jsx
import { useState, useRef, useEffect } from 'react';
import { X, Upload, Link2, Trash2 } from 'lucide-react';
import { uploadTempFile,deleteTempFiles, attachFilesToChecklist } from '../../utils/config/api/file/fileApi';

export default function ChecklistFileModal({ 
  isOpen, 
  onClose, 
  onSave, 
  checklistId,
  projectId 
}) {
  const [tempFiles, setTempFiles] = useState([]); // 업로드된 임시파일
  const [links, setLinks] = useState([]); // 링크 목록
  const [newLink, setNewLink] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // 모달이 닫힐 때 임시파일 정리
  useEffect(() => {
    return () => {
      if (tempFiles.length > 0) {
        const fileIds = tempFiles.map(f => f.fileId);
        deleteTempFiles(projectId, fileIds).catch(console.error);
      }
    };
  }, [tempFiles, projectId]);

  // 파일 선택 핸들러
  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setIsUploading(true);
    try {
      // 각 파일을 개별적으로 업로드
      const uploadPromises = files.map(file => uploadTempFile(file, projectId));
      const results = await Promise.all(uploadPromises);
      
      // 업로드된 파일 정보 추가
      const uploadedFiles = results.map(result => result.response[0]);
      setTempFiles(prev => [...prev, ...uploadedFiles]);
    } catch (error) {
      console.error('파일 업로드 실패:', error);
      alert('파일 업로드에 실패했습니다.');
    } finally {
      setIsUploading(false);
      e.target.value = ''; // input 초기화
    }
  };

  // 임시파일 제거
  const handleRemoveTempFile = async (fileId) => {
    try {
      await deleteTempFiles(projectId, [fileId]);
      setTempFiles(prev => prev.filter(f => f.fileId !== fileId));
    } catch (error) {
      console.error('파일 삭제 실패:', error);
      alert('파일 삭제에 실패했습니다.');
    }
  };

  // 링크 추가
  const handleAddLink = () => {
    if (!newLink.trim()) return;
    
    // URL 형식 검증
    try {
      new URL(newLink);
      setLinks(prev => [...prev, newLink]);
      setNewLink('');
    } catch {
      alert('올바른 URL 형식을 입력해주세요. (예: https://example.com)');
    }
  };

  // 링크 제거
  const handleRemoveLink = (index) => {
    setLinks(prev => prev.filter((_, i) => i !== index));
  };

  // 저장
  const handleSave = async () => {
    if (tempFiles.length === 0 && links.length === 0) {
      alert('파일 또는 링크를 추가해주세요.');
      return;
    }

    try {
      const fileIds = tempFiles.map(f => f.fileId);
      
      await attachFilesToChecklist(projectId, checklistId, fileIds, links);
      
      // 부모 컴포넌트에 전달 (UI 업데이트용)
      onSave(checklistId, tempFiles, links);
      
      // 상태 초기화 및 모달 닫기
      setTempFiles([]);
      setLinks([]);
      setNewLink('');
      onClose();
    } catch (error) {
      console.error('저장 실패:', error);
      alert('저장에 실패했습니다.');
    }
  };

  // 모달 닫기 (임시파일 삭제)
  const handleClose = async () => {
    if (tempFiles.length > 0) {
      try {
        const fileIds = tempFiles.map(f => f.fileId);
        await deleteTempFiles(projectId, fileIds);
      } catch (error) {
        console.error('임시파일 삭제 실패:', error);
      }
    }
    
    setTempFiles([]);
    setLinks([]);
    setNewLink('');
    onClose();
  };

  if (!isOpen) return null;

  return (
  <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* 헤더 */}
        <div className="flex items-center justify-between p-6 border-b">
          <h3 className="text-lg font-semibold">파일 및 링크 추가</h3>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 본문 */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* 파일 업로드 섹션 */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-gray-700">파일 첨부</label>
              <button
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 text-sm transition-colors"
              >
                <Upload className="w-4 h-4" />
                {isUploading ? '업로드 중...' : '파일 선택'}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {/* 업로드된 파일 목록 */}
            {tempFiles.length > 0 && (
              <div className="space-y-2">
                {tempFiles.map((file) => (
                  <div
                    key={file.fileId}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
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
                      onClick={() => handleRemoveTempFile(file.fileId)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {tempFiles.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-8 border-2 border-dashed rounded-lg">
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
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddLink()}
                placeholder="https://example.com"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleAddLink}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm transition-colors"
              >
                추가
              </button>
            </div>

            {/* 추가된 링크 목록 */}
            {links.length > 0 && (
              <div className="space-y-2">
                {links.map((link, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
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
                      onClick={() => handleRemoveLink(index)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {links.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-8 border-2 border-dashed rounded-lg">
                링크를 추가해주세요
              </p>
            )}
          </div>
        </div>

        {/* 푸터 */}
        <div className="flex items-center justify-end gap-3 p-6 border-t bg-gray-50">
          <button
            onClick={handleClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 transition-colors"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            disabled={tempFiles.length === 0 && links.length === 0}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
}