import { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import { getPostDetail, completePost } from "../utils/api/post/postApi";
import { useNavigate } from "react-router-dom";
export default function PostDetailPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-[1400px]">
        {/* 흰색 컨텐츠 박스 */}
        <div className="rounded-lg bg-white p-8 shadow-sm">
          
          {/* 제목 */}
          <h1 className="mb-4 text-[28px] font-semibold leading-tight text-gray-900">
            게시글 제목
          </h1>

          {/* 헤더 정보 */}
          <div className="mb-8 flex items-center justify-between border-b-2 border-gray-100 pb-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 text-[13px] text-gray-500">
                <span>작성자: 홍길동</span>
                <span>작성일: 2024-12-13</span>
                <span>조회수: 42</span>
                <button className="flex items-center gap-1 text-gray-600 transition-colors hover:text-blue-500">
                  <svg className="h-[18px] w-[18px] fill-current" viewBox="0 0 24 24">
                    <path d="M13.5,8H12V13L16.28,15.54L17,14.33L13.5,12.25V8M13,3A9,9 0 0,0 4,12H1L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3Z" />
                  </svg>
                  <span>히스토리</span>
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-[13px] text-gray-600 transition-colors hover:bg-gray-50">
                수정하기
              </button>
            </div>
          </div>

          {/* 진행단계 */}
          <div className="mb-6">
            <label className="mb-2 block text-[14px] font-semibold text-gray-900">
              진행단계
            </label>
            <span className="inline-block rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-[14px] font-medium text-blue-600">
              디자인
            </span>
          </div>

          {/* 파일 첨부 */}
          <div className="mb-6">
            <label className="mb-2 block text-[14px] font-semibold text-gray-900">
              파일 첨부
            </label>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 fill-gray-600" viewBox="0 0 24 24">
                    <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                  </svg>
                  <span className="text-[13px] text-gray-900">디자인_시안.pdf</span>
                  <span className="text-[12px] text-gray-500">(2.4MB)</span>
                </div>
                <button className="rounded border border-gray-300 bg-white px-3 py-1 text-[12px] text-gray-600 transition-colors hover:bg-gray-50">
                  다운로드
                </button>
              </div>
            </div>
          </div>

          {/* 링크 첨부 */}
          <div className="mb-6">
            <label className="mb-2 block text-[14px] font-semibold text-gray-900">
              링크 첨부
            </label>
            <div className="rounded-lg border border-gray-300 bg-gray-50 px-4 py-3">
              <a
                href="#"
                className="break-all text-[14px] text-blue-600 hover:underline"
              >
                https://example.com/design-reference
              </a>
            </div>
          </div>

          {/* 글 내용 */}
          <div className="mb-6">
            <label className="mb-2 block text-[14px] font-semibold text-gray-900">
              글
            </label>
            <div className="min-h-[300px] whitespace-pre-wrap rounded-lg border border-gray-300 bg-white p-4 text-[14px] leading-relaxed text-gray-900">
              디자인 시안에 대한 피드백 부탁드립니다.
              
              주요 확인 사항:
              1. 전체적인 색상 톤
              2. 레이아웃 구성
              3. 사용자 경험
            </div>
          </div>

          {/* 승인 상태 */}
          <div className="my-8 py-5 text-center">
            <span className="inline-block rounded-full bg-amber-100 px-5 py-2 text-[14px] font-medium text-amber-600">
              승인 대기
            </span>
          </div>

          {/* 댓글 섹션 */}
          <div className="mt-8 border-t-2 border-gray-100 pt-8">
            <h3 className="mb-4 text-[16px] font-semibold text-gray-900">댓글</h3>

            {/* 댓글 작성 */}
            <div className="mb-4">
              <textarea
                placeholder="댓글을 입력하세요..."
                className="min-h-[80px] w-full resize-vertical rounded-lg border border-gray-300 px-4 py-3 text-[14px] focus:border-blue-500 focus:outline-none"
              />
              <div className="mt-2 flex justify-end">
                <button className="rounded-md bg-blue-500 px-4 py-2 text-[13px] font-medium text-white transition-colors hover:bg-blue-600">
                  댓글 작성
                </button>
              </div>
            </div>

            {/* 댓글 목록 */}
            <div className="flex flex-col gap-3">
              {/* 댓글 1 */}
              <div>
                <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[14px] font-semibold text-gray-900">
                      김철수
                    </span>
                    <span className="text-[12px] text-gray-500">
                      2024-12-13 14:30
                    </span>
                  </div>
                  <div className="mb-2 text-[14px] leading-relaxed text-gray-700">
                    전체적인 디자인이 깔끔하네요. 색상도 좋습니다!
                  </div>
                  <div className="flex gap-2">
                    <button className="text-[12px] text-blue-500 transition-colors hover:text-blue-600">
                      답글
                    </button>
                    <button className="text-[12px] text-gray-500 transition-colors hover:text-gray-600">
                      수정
                    </button>
                    <button className="text-[12px] text-gray-500 transition-colors hover:text-gray-600">
                      삭제
                    </button>
                  </div>
                </div>

                {/* 답글 */}
                <div className="ml-10 mt-3 rounded-lg border border-gray-200 border-l-4 border-l-blue-500 bg-white p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="text-[14px] font-semibold text-gray-900">
                      홍길동
                    </span>
                    <span className="text-[12px] text-gray-500">
                      2024-12-13 15:00
                    </span>
                  </div>
                  <div className="mb-2 text-[14px] leading-relaxed text-gray-700">
                    감사합니다! 추가 의견 있으시면 말씀해주세요.
                  </div>
                  <div className="flex gap-2">
                    <button className="text-[12px] text-gray-500 transition-colors hover:text-gray-600">
                      수정
                    </button>
                    <button className="text-[12px] text-gray-500 transition-colors hover:text-gray-600">
                      삭제
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 하단 완료 버튼 */}
          <div className="mt-8 flex justify-end border-t border-gray-100 pt-6">
            <button className="rounded-lg bg-red-500 px-8 py-3 text-[14px] font-medium text-white transition-colors hover:bg-red-600">
              완료
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}