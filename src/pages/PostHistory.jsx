import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPostHistory } from '../utils/config/api/post/postApi';

const PostHistory = () => {
  const { projectId, postId } = useParams();
  const [historyData, setHistoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openIndex, setOpenIndex] = useState(0); // 첫 번째 항목을 기본으로 열기

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

  // 아코디언 토글 함수
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // 텍스트 Diff 비교 함수
  const diffText = (prevText, currentText) => {
    if (prevText === currentText) {
      return <div className="whitespace-pre-wrap">{currentText}</div>;
    }

    return (
      <div className="py-1">
        {prevText && (
          <pre className="m-0 mb-1 px-3 py-2 text-sm rounded border-l-[3px] border-[#dc3545] bg-[#fff5f5] text-[#dc3545] leading-6 whitespace-pre-wrap font-[inherit]">
            - {prevText}
          </pre>
        )}
        {currentText && (
          <pre className="m-0 mb-1 px-3 py-2 text-sm rounded border-l-[3px] border-[#28a745] bg-[#f0fff4] text-[#28a745] leading-6 whitespace-pre-wrap font-[inherit]">
            + {currentText}
          </pre>
        )}
      </div>
    );
  };

  // 배열 Diff 비교 함수 (첨부파일, 링크용)
  const diffArray = (prevArray = [], currentArray = []) => {
    const prevSet = new Set(prevArray);
    const currentSet = new Set(currentArray);

    return (
      <div className="py-2">
        {/* 제거된 항목 */}
        {prevArray.map((item, idx) => {
          if (!currentSet.has(item)) {
            return (
              <div
                key={`removed-${idx}`}
                className="mb-1 px-2.5 py-1 rounded flex items-center leading-[1.4] border-l-[3px] border-[#dc3545] bg-[#fff5f5]"
              >
                <span className="mr-1 font-bold text-sm text-[#dc3545]">-</span>
                <span className="text-sm text-[#dc3545]">{item}</span>
              </div>
            );
          }
          return null;
        })}

        {/* 추가된 항목과 변경 없는 항목 */}
        {currentArray.map((item, idx) => {
          if (!prevSet.has(item)) {
            // 추가된 항목
            return (
              <div
                key={`added-${idx}`}
                className="mb-1 px-2.5 py-1 rounded flex items-center leading-[1.4] border-l-[3px] border-[#28a745] bg-[#f0fff4]"
              >
                <span className="mr-1 font-bold text-sm text-[#28a745]">+</span>
                <span className="text-sm text-[#28a745]">{item}</span>
              </div>
            );
          } else {
            // 변경 없는 항목
            return (
              <div
                key={`unchanged-${idx}`}
                className="mb-1 px-2.5 py-1 rounded flex items-center leading-[1.4]"
              >
                <span className="text-sm">{item}</span>
              </div>
            );
          }
        })}
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

  // 스냅샷 렌더링 함수
  const renderSnapshot = (history, index) => {
    const details = history.details;
    const prevHistory = historyData.histories[index + 1]; // 이전 히스토리 (다음 인덱스)
    const prevDetails = prevHistory?.details || {};

    return (
      <div className="p-5 border-2 border-[#007bff] rounded-lg bg-[#fcfdff]">
        {/* 제목 */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-[#666] mb-1 mt-4 first:mt-0">
            제목
          </label>
          <div className="text-[22px] font-semibold text-[#1a1a1a]">
            {diffText(prevDetails.afTitle, details.afTitle)}
          </div>
        </div>

        {/* 메타 정보 */}
        <div className="text-xs text-[#999] mb-5 pb-4 border-b border-dashed border-[#e0e0e0]">
          <span>작성자: {history.changedByUserName}</span>
          <span className="ml-4">변경일시: {formatDateTime(history.changedAt)}</span>
          <span className="ml-4">IP: {history.changeIp}</span>
        </div>

        {/* 진행단계 */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-[#666] mb-1 mt-4">
            진행단계
          </label>
          {prevDetails.afStageName !== details.afStageName ? (
            <div className="py-1">
              {prevDetails.afStageName && (
                <span className="inline-block px-3 py-1.5 bg-[#fff5f5] rounded-md text-[#dc3545] text-xs font-medium mr-2">
                  - {prevDetails.afStageName}
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
              {details.afStageName}
            </span>
          )}
        </div>

        {/* 완료 여부 */}
        <div className="mb-4">
          <label className="block text-xs font-semibold text-[#666] mb-1 mt-4">
            완료 여부
          </label>
          {prevDetails.afIsCompleted !== details.afIsCompleted ? (
            <div className="py-1">
              {prevDetails.afIsCompleted !== undefined && (
                <span className="inline-block px-3 py-1.5 bg-[#fff5f5] rounded-md text-[#dc3545] text-xs font-medium mr-2">
                  - {prevDetails.afIsCompleted ? '완료' : '진행중'}
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
            {diffText(prevDetails.afContent, details.afContent)}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="bg-white py-10 px-5">
        <div className="max-w-[900px] mx-auto bg-white rounded-xl p-8">
          <div className="text-center text-gray-600">로딩 중...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white py-10 px-5">
        <div className="max-w-[900px] mx-auto bg-white rounded-xl p-8">
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
            const isOpen = openIndex === index;
            
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