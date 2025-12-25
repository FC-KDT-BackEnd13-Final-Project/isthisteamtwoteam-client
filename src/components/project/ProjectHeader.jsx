import { useState, useEffect } from 'react';
import { updateProjectStage } from '../../utils/config/api/project/projectApi';
import { useAuth } from '../../context/AuthConext';

export default function ProjectHeader({ projectDetail, onStageUpdate }) {
  const { user } = useAuth();
  const [isEditingStage, setIsEditingStage] = useState(false);
  const [selectedStage, setSelectedStage] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [currentStage, setCurrentStage] = useState(null); // ✅ 로컬 상태 추가

  // ADMIN 또는 DEVELOPER만 단계 변경 가능
  const canEditStage = user?.role === 'ADMIN' || user?.role === 'DEVELOPER';
  
  const stages = [
    '진행 전', 
    '진행 중단', 
    '요구사항 정의', 
    '화면 설계', 
    '디자인, 퍼블리싱', 
    '개발', 
    '검수', 
    '유지보수', 
    '완료'
  ];

  // ✅ projectDetail이 변경되면 currentStage 업데이트
  useEffect(() => {
    if (projectDetail) {
      setCurrentStage(projectDetail.stage || projectDetail.stageName);
    }
  }, [projectDetail]);

  const handleEditClick = () => {
    setSelectedStage(currentStage);
    setIsEditingStage(true);
  };

  const handleStageClick = (stage) => {
    if (isEditingStage) {
      setSelectedStage(stage);
    }
  };

  const handleCancel = () => {
    setIsEditingStage(false);
    setSelectedStage(null);
  };

  const handleSave = async () => {
    if (!selectedStage || selectedStage === currentStage) {
      setIsEditingStage(false);
      return;
    }

    setIsUpdating(true);
    try {
      await updateProjectStage(projectDetail.projectId, selectedStage);
      
      // ✅ 즉시 로컬 상태 업데이트 (새로고침 없이 UI 반영)
      setCurrentStage(selectedStage);
      
      alert('프로젝트 단계가 변경되었습니다.');
      setIsEditingStage(false);
      setSelectedStage(null);
      
      // 부모 컴포넌트에 변경 알림 (백그라운드에서 데이터 동기화)
      if (onStageUpdate) {
        onStageUpdate();
      }
    } catch (error) {
      console.error('단계 변경 실패:', error);
      alert('단계 변경에 실패했습니다.');
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {projectDetail?.name || projectDetail?.projectName || '프로젝트명'}
        </h2>
        
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span className="font-medium">{projectDetail?.companyName || '-'}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>
              {projectDetail?.startDate} ~ {projectDetail?.endDate}
            </span>
          </div>
        </div>
      </div>
      
      {/* 단계 표시 및 편집 */}
      <div className="space-y-3">
        {/* 변경하기/저장/취소 버튼 */}
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium text-gray-700">
            프로젝트 단계
          </div>
          
          {canEditStage && (
            <div className="flex items-center gap-2">
              {!isEditingStage ? (
                <button
                  onClick={handleEditClick}
                  className="px-3 py-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-md transition-colors"
                >
                  변경하기
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSave}
                    disabled={isUpdating || selectedStage === currentStage}
                    className="px-4 py-1.5 text-xs font-medium bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                  >
                    {isUpdating ? '저장 중...' : '저장'}
                  </button>
                  <button
                    onClick={handleCancel}
                    disabled={isUpdating}
                    className="px-4 py-1.5 text-xs font-medium border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 disabled:opacity-50 transition-colors"
                  >
                    취소
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* 단계 버튼들 */}
        <div className="flex gap-2 flex-wrap">
          {stages.map((stage) => {
            const isCurrent = stage === currentStage; // ✅ 로컬 상태 사용
            const isSelected = stage === selectedStage;
            
            return (
              <button
                key={stage}
                onClick={() => handleStageClick(stage)}
                disabled={!isEditingStage || isUpdating}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  isEditingStage
                    ? isSelected
                      ? 'bg-green-100 text-green-700 border-2 border-green-500 shadow-sm'
                      : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100 cursor-pointer'
                    : isCurrent
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-gray-50 text-gray-600 border border-gray-200'
                } ${isEditingStage && !isUpdating ? 'cursor-pointer' : ''} ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {stage}
                {isEditingStage && isSelected && (
                  <span className="ml-1">✓</span>
                )}
              </button>
            );
          })}
        </div>

        {/* 안내 메시지 */}
        {isEditingStage && (
          <div className="text-xs text-gray-500 bg-blue-50 border border-blue-200 rounded-md px-3 py-2">
            변경할 단계를 클릭한 후 '저장' 버튼을 눌러주세요.
          </div>
        )}
      </div>
    </div>
  );
}