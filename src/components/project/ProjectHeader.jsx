export default function ProjectHeader({ projectDetail }) {
  const currentStageName = projectDetail?.stage || null;
  const stages = ['진행 전', '진행 중단', '요구사항 정의', '화면 설계', '디자인, 퍼블리싱', '개발', '검수', '유지보수', '완료'];

  return (
    <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {projectDetail?.name || '프로젝트명'}
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
      
      {/* 단계 표시 */}
      <div className="flex gap-2 flex-wrap">
        {stages.map((stage) => (
          <span
            key={stage}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              stage === currentStageName
                ? 'bg-blue-100 text-blue-700 border border-blue-200'
                : 'bg-gray-50 text-gray-600 border border-gray-200'
            }`}
          >
            {stage}
          </span>
        ))}
      </div>
    </div>
  );
}

