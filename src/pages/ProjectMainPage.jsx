import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ProjectMainPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [currentStage, setCurrentStage] = useState('개발');

  const tabs = [
    { id: 'all', label: '전체', count: 14 },
    { id: 'requirements', label: '요구사항 정의', count: 1 },
    { id: 'design', label: '화면 설계', count: 0 },
    { id: 'designPub', label: '디자인, 퍼블리싱', count: 2 },
    { id: 'development', label: '개발', count: 4 },
    { id: 'inspection', label: '검수', count: 0 },
    { id: 'maintenance', label: '유지보수', count: 0 },
    { id: 'uploadedFile', label: '업로드된 파일 목록', count: 0 }
  ];

  const stages = ['전체', '진행 전', '진행 중단', '요구사항 정의', '화면 설계', '디자인/퍼블리싱', '개발', '검수', '유지보수', '완료'];

  const posts = [
    {
      id: 1,
      number: '번호',
      title: '게시글제목',
      author: '담당자성함',
      date: '날짜',
      status: '완료여부(상태)',
      content: '[re] 원하시는 요청에 대한 부가적인 자료입니다',
      attachments: 0
    },
    {
      id: 2,
      content: '[re] 부가자료 다시 보냅니다!!',
      attachments: 0
    },
    {
      id: 3,
      number: '권호',
      title: '게시글제목',
      author: '담당자성함',
      date: '날짜',
      status: '완료여부(상태)',
      attachments: 3
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <div className="mx-auto max-w-[1400px] px-4 py-5">
        {/* 페이지 제목 */}
        <div className="mb-5">
          <h1 className="text-[22px] font-semibold text-[#1a1a1a]">
            프로젝트명
          </h1>
        </div>

        <div className="flex gap-6">
          {/* 메인 콘텐츠 */}
          <main className="flex-1">
            {/* 프로젝트 헤더 */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold text-gray-900">프로젝트명</span>
                <div className="flex gap-2 flex-wrap">
                  {stages.map((stage) => (
                    <span
                      key={stage}
                      className={`px-3 py-1.5 text-xs font-medium rounded-md ${
                        stage === currentStage
                          ? 'bg-blue-100 text-blue-700 border border-blue-200'
                          : 'bg-gray-50 text-gray-600 border border-gray-200'
                      }`}
                    >
                      {stage}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 체크리스트 섹션 */}
            <div className="bg-white rounded-lg p-6 mb-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-5">checklist</h2>
              
              {/* 프로젝트 개요서류 */}
              <div className="border border-gray-200 rounded-lg p-5 mb-4 bg-gray-50">
                <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
                  프로젝트 개요서류 제출해주세요.
                  <span className="text-lg">□</span>
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium mb-1 text-gray-600">담번</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      placeholder="project_개요.pdf" 
                      readOnly 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1 text-gray-600">참고자료 입니다.</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      value="https://www.youtube.com/" 
                      readOnly 
                    />
                  </div>
                </div>
              </div>

              {/* 일정표 */}
              <div className="border border-gray-200 rounded-lg p-5 bg-gray-50">
                <h3 className="text-sm font-semibold mb-4">프로젝트 일정표를 제출해주세요.</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium mb-1 text-gray-600">담번</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      placeholder="일정표.pdf" 
                      readOnly 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1 text-gray-600">참고자료 입니다.</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
                      value="https://www.youtube.com/" 
                      readOnly 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 게시글 섹션 */}
            <div className="bg-white rounded-lg shadow-sm mb-6">
              {/* 탭 메뉴 */}
              <div className="flex border-b border-gray-200 bg-gray-50 px-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative px-4 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab.label} ({tab.count})
                  </button>
                ))}
              </div>

              {/* 콘텐츠 영역 */}
              <div className="p-8">
                {/* 검색바와 버튼 */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="검색어를 입력하세요"
                        className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <svg className="absolute left-3 top-3 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                  <button className="px-6 py-2.5 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center gap-2 whitespace-nowrap">
                    <span>+</span>
                    <span>게시글 생성</span>
                  </button>
                </div>

                {/* 테이블 */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="w-12 px-6 py-4">
                          <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                        </th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">제목</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">단계</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">승인 여부</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">생성 시간</th>
                        <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">작성자</th>
                        <th className="px-6 py-4"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {posts.map((post) => (
                        <tr key={post.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-900">{post.title || post.content}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{post.status || '-'}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">-</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{post.date || '-'}</td>
                          <td className="px-6 py-4 text-sm text-gray-600">{post.author || '-'}</td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button className="px-4 py-1.5 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors">
                                수정
                              </button>
                              <button className="px-4 py-1.5 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors">
                                삭제
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* 페이지네이션 */}
                <div className="flex items-center justify-between mt-6">
                  <div className="text-sm text-gray-600">
                    1 - {posts.length} of {posts.length} items
                  </div>
                  <div className="flex justify-center flex-1">
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors">
                      1
                    </button>
                  </div>
                  <div className="w-[150px]"></div>
                </div>
              </div>
            </div>
          </main>

          {/* 우측 프로필 카드 */}
          <aside className="w-80">
            <div className="bg-white rounded-lg p-5 shadow-sm sticky top-5">
              <div className="space-y-4">
                <button className="w-full py-10 border border-gray-300 rounded-full bg-blue-50 font-semibold text-base text-blue-600 hover:bg-blue-100 transition-colors">
                  사진
                </button>
                
                <div className="flex gap-2">
                  <button className="flex-1 px-4 py-2 border border-gray-300 rounded-md bg-blue-500 text-white font-medium text-sm hover:bg-blue-600 transition-colors">
                    전체
                  </button>
                  <button className="flex-1 px-4 py-2 border border-gray-300 rounded-md bg-white font-medium text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    개인
                  </button>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <p className="text-sm leading-relaxed mb-2 font-semibold text-gray-900">
                    김동균 이메일 : kimdong3021
                  </p>
                  <p className="text-sm leading-relaxed mb-2 font-semibold text-gray-900">
                    비상연락망 : 101123213
                  </p>
                  <p className="text-sm leading-relaxed mb-2 text-gray-700">
                    디자인 단계입니다.
                  </p>
                  <p className="text-sm leading-relaxed mb-2 text-gray-700">
                    아래 링크에서 디자인 확인 가능합니다.
                  </p>
                  <p className="text-sm leading-relaxed text-blue-600 underline cursor-pointer hover:text-blue-800">
                    www.main.......design
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}