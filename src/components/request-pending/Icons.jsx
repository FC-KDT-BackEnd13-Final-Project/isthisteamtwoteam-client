// 승인 요청 페이지에서 사용하는 아이콘들
// SVG로 만들어진 간단한 아이콘 컴포넌트들입니다

// 시계 아이콘 - "승인 대기" 카드에 사용
export const ClockIcon = () => (
  <svg
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="10" strokeWidth="2"></circle>
    <polyline points="12 6 12 12 16 14" strokeWidth="2"></polyline>
  </svg>
);

// 체크 원 아이콘 - "승인 완료" 카드에 사용
export const CheckCircleIcon = () => (
  <svg
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      strokeWidth="2"
    ></path>
  </svg>
);

// X 원 아이콘 - "반려" 카드에 사용
export const XCircleIcon = () => (
  <svg
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="10" strokeWidth="2"></circle>
    <line x1="15" y1="9" x2="9" y2="15" strokeWidth="2"></line>
    <line x1="9" y1="9" x2="15" y2="15" strokeWidth="2"></line>
  </svg>
);

// 오른쪽 화살표 아이콘 - "게시글 이동" 버튼에 사용
export const ChevronRightIcon = () => (
  <svg
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    className="h-4 w-4"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M9 5l7 7-7 7"
    ></path>
  </svg>
);
