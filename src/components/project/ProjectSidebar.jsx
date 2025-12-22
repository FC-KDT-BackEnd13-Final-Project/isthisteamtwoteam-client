import { useState } from 'react';

export default function ProjectSidebar({ projectDetail, members=[] }) {
  const [memoType, setMemoType] = useState('common'); // 'common' 또는 'personal'
  const [memberType, setMemberType] = useState('developer'); // 'developer' 또는 'customer'

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
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  공통 메모
                </button>
                <button 
                  onClick={() => setMemoType('personal')}
                  className={`flex-1 px-4 py-2 border border-gray-300 rounded-md font-medium text-sm transition-colors ${
                    memoType === 'personal'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  개인 메모
                </button>
              </div>
              
              {/* 메모 내용 */}
              <div className="p-4 border border-gray-200 rounded-lg bg-gray-50 min-h-[150px] max-h-[250px] overflow-y-auto">
                {memoType === 'common' ? (
                  projectDetail.projectMemoContent ? (
                    <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {projectDetail.projectMemoContent}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-400 text-center py-12">
                      공통 메모가 없습니다
                    </p>
                  )
                ) : (
                  projectDetail.userMemoContent ? (
                    <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                      {projectDetail.userMemoContent}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-400 text-center py-12">
                      개인 메모가 없습니다
                    </p>
                  )
                )}
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
              onClick={() => setMemberType('developer')}
              className={`flex-1 px-3 py-1.5 border border-gray-300 rounded-md font-medium text-xs transition-colors ${
                memberType === 'developer'
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              개발사
            </button>
            <button 
              onClick={() => setMemberType('customer')}
              className={`flex-1 px-3 py-1.5 border border-gray-300 rounded-md font-medium text-xs transition-colors ${
                memberType === 'customer'
                  ? 'bg-blue-500 text-white'
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
                memberType === 'developer' 
                  ? member.role === 'ADMIN' 
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
                      {member.role === 'ADMIN' ? '개발사' : '고객사'}
                    </p>
                  </div>
                </div>
              ))}
            
            {/* 참여자 없을 때 */}
            {members.filter(member => 
              memberType === 'developer' 
                ? member.role === 'ADMIN' 
                : member.role === 'CUSTOMER'
            ).length === 0 && (
              <p className="text-sm text-gray-400 text-center py-6">
                {memberType === 'developer' ? '개발사' : '고객사'} 멤버가 없습니다
              </p>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}

