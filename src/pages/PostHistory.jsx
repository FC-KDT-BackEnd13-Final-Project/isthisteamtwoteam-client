import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostHistory } from '../utils/config/api/post/postApi';

const PostHistory = () => {
  const { projectId, postId } = useParams();
  const [historyData, setHistoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openIndexes, setOpenIndexes] = useState([0]); // 배열로 변경하여 여러 항목 열기 가능

  useEffect(() => {
    fetchHistoryData();
  }, [postId]);

  const fetchHistoryData = async () => {
    try {
      setLoading(true);
      const data = await getPostHistory(postId);
      
      if (data.success) {
        setHistoryData(data.response);
      } else {
        setError('히스토리 데이터를 불러오는데 실패했습니다.');
      }
    } catch (err) {
      setError('네트워크 오류가 발생했습니다.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 아코디언 토글 함수 - 여러 개 열기 가능
  const toggleAccordion = (index) => {
    setOpenIndexes(prev => {
      if (prev.includes(index)) {
        // 이미 열려있으면 닫기
        return prev.filter(i => i !== index);
      } else {
        // 닫혀있으면 열기
        return [...prev, index];
      }
    });
  };

  // 텍스트 Diff 비교 함수
  const diffText = (beforeText, afterText) => {
    // 둘 다 없는 경우
    if (!beforeText && !afterText) {
      return <div className="text-sm text-gray-400">내용 없음</div>;
    }

    // 변경사항이 없는 경우
    if (beforeText === afterText) {
      return <div className="whitespace-pre-wrap text-sm">{afterText}</div>;
    }

    return (
      <div className="py-1">
        {beforeText && (
          <pre className="m-0 mb-1 px-3 py-2 text-sm rounded border-l-[3px] border-[#dc3545] bg-[#fff5f5] text-[#dc3545] leading-6 whitespace-pre-wrap font-[inherit]">
            - {beforeText}
          </pre>
        )}
        {afterText && (
          <pre className="m-0 mb-1 px-3 py-2 text-sm rounded border-l-[3px] border-[#28a745] bg-[#f0fff4] text-[#28a745] leading-6 whitespace-pre-wrap font-[inherit]">
            + {afterText}
          </pre>
        )}
      </div>
    );
  };

  // 날짜/시간 포맷팅 함수
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }).replace(/\. /g, '-').replace('.', '');
  };

  // 게시글 정보 찾기 (POST 타입이 아닌 경우, 가장 가까운 이전 POST 히스토리에서 가져오기)
  const getPostInfo = (currentIndex) => {
    // 현재 또는 이전 POST 타입 히스토리 찾기
    for (let i = currentIndex; i < historyData.histories.length; i++) {
      const history = historyData.histories[i];
      if (history.targetType === 'POST') {
        return history.details;
      }
    }
    return null;
  };

  // 스냅샷 렌더링 함수
  const renderSnapshot = (history, index) => {
    const { targetType, changeType, details, changedByUserName, changedAt, changeIp } = history;

    // 메타 정보 (공통)
    const metaInfo = (
      <div className="text-xs text-[#999] mb-5 pb-4 border-b border-dashed border-[#e0e0e0]">
        <span>작성자: {changedByUserName}</span>
        <span className="ml-4">변경일시: {formatDateTime(changedAt)}</span>
        <span className="ml-4">IP: {changeIp}</span>
      </div>
    );

    // POST 타입 - 게시글 변경
    if (targetType === 'POST') {
      return (
        <div className="p-5 border-2 border-[#007bff] rounded-lg bg-[#fcfdff]">
          {/* 제목 */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-[#666] mb-1 mt-0">
              제목
            </label>
            <div className="text-[22px] font-semibold text-[#1a1a1a]">
              {diffText(details.beTitle, details.afTitle)}
            </div>
          </div>

          {metaInfo}

          {/* 진행단계 */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-[#666] mb-1 mt-4">
              진행단계
            </label>
            {details.beStageName !== details.afStageName ? (
              <div className="py-1">
                {details.beStageName && (
                  <span className="inline-block px-3 py-1.5 bg-[#fff5f5] rounded-md text-[#dc3545] text-xs font-medium mr-2">
                    - {details.beStageName}
                  </span>
                )}
                {details.afStageName && (
                  <span className="inline-block px-3 py-1.5 bg-[#f0fff4] rounded-md text-[#28a745] text-xs font-medium">
                    + {details.afStageName}
                  </span>
                )}
              </div>
            ) : (
              <span className="inline-block px-3 py-1.5 bg-[#f0f6ff] rounded-md text-[#5a9aeb] text-xs font-medium">
                {details.afStageName || '없음'}
              </span>
            )}
          </div>

          {/* 완료 여부 */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-[#666] mb-1 mt-4">
              완료 여부
            </label>
            {details.beIsCompleted !== details.afIsCompleted ? (
              <div className="py-1">
                {details.beIsCompleted !== undefined && details.beIsCompleted !== null && (
                  <span className="inline-block px-3 py-1.5 bg-[#fff5f5] rounded-md text-[#dc3545] text-xs font-medium mr-2">
                    - {details.beIsCompleted ? '완료' : '진행중'}
                  </span>
                )}
                <span className="inline-block px-3 py-1.5 bg-[#f0fff4] rounded-md text-[#28a745] text-xs font-medium">
                  + {details.afIsCompleted ? '완료' : '진행중'}
                </span>
              </div>
            ) : (
              <span className="inline-block px-3 py-1.5 bg-[#f0f6ff] rounded-md text-[#5a9aeb] text-xs font-medium">
                {details.afIsCompleted ? '완료' : '진행중'}
              </span>
            )}
          </div>

          {/* 글 내용 */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-[#666] mb-1 mt-4">
              글 내용
            </label>
            <div className="p-3 border border-[#e0e0e0] rounded-md min-h-[100px] text-sm leading-6 bg-white">
              {diffText(details.beContent, details.afContent)}
            </div>
          </div>
        </div>
      );
    }

    // LINK 타입 - 링크 추가/삭제
    if (targetType === 'LINK') {
      const isDelete = changeType === 'DELETE';
      const isCreate = changeType === 'CREATE';
      const postInfo = getPostInfo(index);

      return (
        <div className="p-5 border-2 border-[#007bff] rounded-lg bg-[#fcfdff]">
          {/* 링크 변경 정보 */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-[#666] mb-1 mt-0">
              링크 변경
            </label>
            {isDelete ? (
              <div className="px-3 py-2 rounded-md border-l-[3px] border-[#dc3545] bg-[#fff5f5]">
                <span className="text-xs font-bold text-[#dc3545] mr-2">삭제됨</span>
                <a
                  href={details.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#dc3545] hover:underline break-all"
                >
                  {details.linkUrl}
                </a>
              </div>
            ) : isCreate ? (
              <div className="px-3 py-2 rounded-md border-l-[3px] border-[#28a745] bg-[#f0fff4]">
                <span className="text-xs font-bold text-[#28a745] mr-2">추가됨</span>
                <a
                  href={details.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#28a745] hover:underline break-all"
                >
                  {details.linkUrl}
                </a>
              </div>
            ) : (
              <div className="px-3 py-2 rounded-md bg-[#f0f6ff] border border-[#e0e0e0]">
                <a
                  href={details.linkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[#5a9aeb] hover:underline break-all"
                >
                  {details.linkUrl}
                </a>
              </div>
            )}
          </div>

          {metaInfo}

          {/* 게시글 정보 (당시 상태) */}
          {postInfo && (
            <>
              <div className="mb-4">
                <label className="block text-xs font-semibold text-[#666] mb-1 mt-4">
                  제목
                </label>
                <div className="text-lg font-semibold text-[#1a1a1a]">
                  {postInfo.afTitle || postInfo.beTitle}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold text-[#666] mb-1 mt-4">
                  진행단계
                </label>
                <span className="inline-block px-3 py-1.5 bg-[#f0f6ff] rounded-md text-[#5a9aeb] text-xs font-medium">
                  {postInfo.afStageName || postInfo.beStageName || '없음'}
                </span>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold text-[#666] mb-1 mt-4">
                  완료 여부
                </label>
                <span className="inline-block px-3 py-1.5 bg-[#f0f6ff] rounded-md text-[#5a9aeb] text-xs font-medium">
                  {(postInfo.afIsCompleted ?? postInfo.beIsCompleted) ? '완료' : '진행중'}
                </span>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold text-[#666] mb-1 mt-4">
                  글 내용
                </label>
                <div className="p-3 border border-[#e0e0e0] rounded-md min-h-[100px] text-sm leading-6 bg-white whitespace-pre-wrap">
                  {postInfo.afContent || postInfo.beContent}
                </div>
              </div>
            </>
          )}
        </div>
      );
    }

    // FILE 타입 - 파일 추가/삭제
    if (targetType === 'FILE') {
      const isDelete = changeType === 'DELETE';
      const isCreate = changeType === 'CREATE';
      const postInfo = getPostInfo(index);

      return (
        <div className="p-5 border-2 border-[#007bff] rounded-lg bg-[#fcfdff]">
          {/* 파일 변경 정보 */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-[#666] mb-1 mt-0">
              파일 변경
            </label>
            {isDelete ? (
              <div className="px-3 py-2 rounded-md border-l-[3px] border-[#dc3545] bg-[#fff5f5]">
                <span className="text-xs font-bold text-[#dc3545] mr-2">삭제됨</span>
                <span className="text-xs text-[#dc3545]">
                  {details.fileName || details.fileOriginalFileName}
                </span>
              </div>
            ) : isCreate ? (
              <div className="px-3 py-2 rounded-md border-l-[3px] border-[#28a745] bg-[#f0fff4]">
                <span className="text-xs font-bold text-[#28a745] mr-2">추가됨</span>
                <span className="text-xs text-[#28a745]">
                  {details.fileName || details.fileOriginalFileName}
                </span>
              </div>
            ) : (
              <div className="px-3 py-2 rounded-md bg-[#f0f6ff] border border-[#e0e0e0]">
                <span className="text-xs text-[#5a9aeb]">
                  {details.fileName || details.fileOriginalFileName}
                </span>
              </div>
            )}
          </div>

          {metaInfo}

          {/* 게시글 정보 (당시 상태) */}
          {postInfo && (
            <>
              <div className="mb-4">
                <label className="block text-xs font-semibold text-[#666] mb-1 mt-4">
                  제목
                </label>
                <div className="text-lg font-semibold text-[#1a1a1a]">
                  {postInfo.afTitle || postInfo.beTitle}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold text-[#666] mb-1 mt-4">
                  진행단계
                </label>
                <span className="inline-block px-3 py-1.5 bg-[#f0f6ff] rounded-md text-[#5a9aeb] text-xs font-medium">
                  {postInfo.afStageName || postInfo.beStageName || '없음'}
                </span>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold text-[#666] mb-1 mt-4">
                  완료 여부
                </label>
                <span className="inline-block px-3 py-1.5 bg-[#f0f6ff] rounded-md text-[#5a9aeb] text-xs font-medium">
                  {(postInfo.afIsCompleted ?? postInfo.beIsCompleted) ? '완료' : '진행중'}
                </span>
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold text-[#666] mb-1 mt-4">
                  글 내용
                </label>
                <div className="p-3 border border-[#e0e0e0] rounded-md min-h-[100px] text-sm leading-6 bg-white whitespace-pre-wrap">
                  {postInfo.afContent || postInfo.beContent}
                </div>
              </div>
            </>
          )}
        </div>
      );
    }

    // 기타 타입
    return (
      <div className="p-5 border-2 border-[#007bff] rounded-lg bg-[#fcfdff]">
        {metaInfo}
        <div className="text-sm text-gray-500">알 수 없는 변경 유형입니다.</div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 py-10 px-5">
        <div className="max-w-[900px] mx-auto bg-white rounded-xl p-8 shadow-sm">
          <div className="text-center text-gray-600">로딩 중...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-10 px-5">
        <div className="max-w-[900px] mx-auto bg-white rounded-xl p-8 shadow-sm">
          <div className="text-center text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-[900px] mx-auto bg-white rounded-xl p-8 shadow-sm">
        <h1 className="text-2xl font-semibold mb-2 text-[#1a1a1a]">
          게시글 히스토리
        </h1>
        <p className="text-sm text-[#999] mb-8 pb-5 border-b border-[#f0f0f0]">
          게시글의 변경사항을 시간순으로 확인할 수 있습니다.
        </p>

        <div id="historyList">
          {historyData?.histories?.map((history, index) => {
            const isOpen = openIndexes.includes(index);
            
            return (
              <div
                key={index}
                className={`mb-3 rounded-lg border overflow-hidden transition-all duration-300 ${
                  isOpen 
                    ? 'border-[#007bff] shadow-[0_2px_8px_rgba(0,123,255,0.1)]' 
                    : 'border-[#e0e0e0]'
                }`}
              >
                <button
                  className={`w-full px-5 py-4 border-none text-left cursor-pointer flex justify-between items-center transition-colors duration-200 ${
                    isOpen ? 'bg-[#e9f5ff]' : 'bg-[#f8f9fa]'
                  }`}
                  onClick={() => toggleAccordion(index)}
                >
                  <div className="flex-grow flex justify-between items-center">
                    <span className="text-sm font-medium text-[#333] leading-6">
                      <span className="text-[#666] font-normal mr-2">
                        {formatDateTime(history.changedAt)}
                      </span>
                      {history.title}
                    </span>
                    <svg
                      className={`w-5 h-5 transition-transform duration-300 ml-2.5 ${
                        isOpen ? 'rotate-180 fill-[#0056b3]' : 'fill-[#007bff]'
                      }`}
                      viewBox="0 0 24 24"
                    >
                      <path d="M7 10l5 5 5-5z" />
                    </svg>
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    isOpen ? 'max-h-[2000px]' : 'max-h-0'
                  }`}
                >
                  <div className="px-5 py-5 bg-white">
                    {renderSnapshot(history, index)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PostHistory;