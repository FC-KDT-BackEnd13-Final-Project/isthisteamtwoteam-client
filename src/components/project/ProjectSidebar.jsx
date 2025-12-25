import { useState, useEffect, useRef } from 'react';
import { updateUserMemo,updateProjectMemo } from '../../utils/config/api/memoApi';

export default function ProjectSidebar({ projectDetail, members = [], projectId }) {
  const [memoType, setMemoType] = useState('common'); // 'common' 또는 'personal'
  const [memberType, setMemberType] = useState('DEVELOPER'); // 'DEVELOPER' 또는 'CUSTOMER'
  
  const [userMemo, setUserMemo] = useState('');
  const [projectMemo, setProjectMemo] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  
  const userMemoTimerRef = useRef(null);
  const projectMemoTimerRef = useRef(null);

  // projectDetail에서 초기 메모 로드
  useEffect(() => {
    if (projectDetail) {
      setUserMemo(projectDetail.userMemoContent || '');
      setProjectMemo(projectDetail.projectMemoContent || '');
    }
  }, [projectDetail]);

  // 개인 메모 자동 저장 (1초 debounce)
  const handleUserMemoChange = (e) => {
    const newContent = e.target.value;
    setUserMemo(newContent);

    // 이전 타이머 취소
    if (userMemoTimerRef.current) {
      clearTimeout(userMemoTimerRef.current);
    }

    // 1초 후 자동 저장
    userMemoTimerRef.current = setTimeout(async () => {
      await saveUserMemo(newContent);
    }, 1000);
  };

  // 공용 메모 자동 저장 (1초 debounce)
  const handleProjectMemoChange = (e) => {
    const newContent = e.target.value;
    setProjectMemo(newContent);

    // 이전 타이머 취소
    if (projectMemoTimerRef.current) {
      clearTimeout(projectMemoTimerRef.current);
    }

    // 1초 후 자동 저장
    projectMemoTimerRef.current = setTimeout(async () => {
      await saveProjectMemo(newContent);
    }, 1000);
  };

  // 개인 메모 저장
  const saveUserMemo = async (content) => {
    try {
      setIsSaving(true);
      await updateUserMemo(projectId, content);
      setLastSaved(new Date());
    } catch (error) {
      console.error('개인 메모 저장 실패:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // 공용 메모 저장
  const saveProjectMemo = async (content) => {
    try {
      setIsSaving(true);
      await updateProjectMemo(projectId, content);
      setLastSaved(new Date());
    } catch (error) {
      console.error('공용 메모 저장 실패:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (userMemoTimerRef.current) {
        clearTimeout(userMemoTimerRef.current);
      }
      if (projectMemoTimerRef.current) {
        clearTimeout(projectMemoTimerRef.current);
      }
    };
  }, []);

  // 마지막 저장 시간 포맷
  const formatLastSaved = () => {
    if (!lastSaved) return '';
    const now = new Date();
    const diff = Math.floor((now - lastSaved) / 1000);

    if (diff < 5) return '방금';
    if (diff < 60) return `${diff}초 전`;
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`;
    
    return lastSaved.toLocaleTimeString('ko-KR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <aside className="w-80">
      <div className="space-y-4">
        {/* 첫 번째 카드: 이미지 + 메모 */}
        <div className="bg-white rounded-lg p-5 shadow-sm sticky top-5">
          {projectDetail ? (
            <div className="space-y-4">
              {/* 프로젝트 이미지 */}
              <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                {projectDetail.coverImage ? (
                  <img 
                    src={projectDetail.coverImage} 
                    alt={projectDetail.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-gray-400 text-center">
                    <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm">이미지 없음</p>
                  </div>
                )}
              </div>
              
              {/* 메모 탭 버튼 */}
              <div className="flex gap-2">
                <button 
                  onClick={() => setMemoType('common')}
                  className={`flex-1 px-4 py-2 border border-gray-300 rounded-md font-medium text-sm transition-colors ${
                    memoType === 'common'
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  공용 메모
                </button>
                <button 
                  onClick={() => setMemoType('personal')}
                  className={`flex-1 px-4 py-2 border border-gray-300 rounded-md font-medium text-sm transition-colors ${
                    memoType === 'personal'
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  개인 메모
                </button>
              </div>
              
              {/* 저장 상태 표시 */}
              <div className="flex items-center justify-end h-4">
                {isSaving ? (
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    저장 중...
                  </span>
                ) : lastSaved ? (
                  <span className="text-xs text-green-600">
                    ✓ {formatLastSaved()} 저장됨
                  </span>
                ) : null}
              </div>
              
              {/* 메모 입력 영역 */}
              {memoType === 'common' ? (
                <textarea
                  value={projectMemo}
                  onChange={handleProjectMemoChange}
                  placeholder="공용 메모를 입력하세요. 모든 멤버가 볼 수 있습니다."
                  className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 min-h-[150px] max-h-[250px] text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                />
              ) : (
                <textarea
                  value={userMemo}
                  onChange={handleUserMemoChange}
                  placeholder="개인 메모를 입력하세요. 나만 볼 수 있습니다."
                  className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 min-h-[150px] max-h-[250px] text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                />
              )}

              {/* 안내 메시지 */}
              <div className="text-xs text-gray-400 flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                입력 후 1초 뒤 자동 저장
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto mb-3"></div>
                <p className="text-sm text-gray-500">로딩중...</p>
              </div>
            </div>
          )}
        </div>

        {/* 두 번째 카드: 참여자 */}
        <div className="bg-white rounded-lg p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">프로젝트 참여자</h3>
          
          {/* 참여자 탭 버튼 */}
          <div className="flex gap-2 mb-3">
            <button 
              onClick={() => setMemberType('DEVELOPER')}
              className={`flex-1 px-3 py-1.5 border border-gray-300 rounded-md font-medium text-xs transition-colors ${
                memberType === 'DEVELOPER'
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              개발사
            </button>
            <button 
              onClick={() => setMemberType('CUSTOMER')}
              className={`flex-1 px-3 py-1.5 border border-gray-300 rounded-md font-medium text-xs transition-colors ${
                memberType === 'CUSTOMER'
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              고객사
            </button>
          </div>
          
          {/* 참여자 목록 */}
          <div className="space-y-2 max-h-[300px] overflow-y-auto">
            {members
              .filter(member => 
                memberType === 'DEVELOPER' 
                  ? member.role === 'DEVELOPER' 
                  : member.role === 'CUSTOMER'
              )
              .map((member) => (
                <div 
                  key={member.projectMemberId}
                  className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {/* 아바타 */}
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-semibold text-blue-600">
                      {member.userName.charAt(0)}
                    </span>
                  </div>
                  
                  {/* 이름 및 역할 */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {member.userName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {member.role === 'DEVELOPER' ? '개발사' : '고객사'}
                    </p>
                  </div>
                </div>
              ))}
            
            {/* 참여자 없을 때 */}
            {members.filter(member => 
              memberType === 'DEVELOPER' 
                ? member.role === 'DEVELOPER' 
                : member.role === 'CUSTOMER'
            ).length === 0 && (
              <p className="text-sm text-gray-400 text-center py-6">
                {memberType === 'DEVELOPER' ? '개발사' : '고객사'} 멤버가 없습니다
              </p>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}