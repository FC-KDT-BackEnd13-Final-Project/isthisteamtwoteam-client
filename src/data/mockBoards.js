/**
 * 게시글(Board) Mock 데이터
 * 대시보드와 게시글 상세 페이지에서 사용됩니다.
 */

// 승인 대기 중인 게시글 목록
export const pendingApprovals = [
  {
    id: 1,
    title: "요구사항 정의서 최종본",
    project: "전자상거래 플랫폼",
    projectId: 1, // 프로젝트와 연결하기 위한 ID
    client: "㈜신세계",
    date: "2024-11-28",
    time: "오전 10:30",
    author: "김동균",
    content: `안녕하세요.

요구사항 정의서 최종본을 첨부합니다.

1차 피드백을 반영하여 다음과 같이 수정했습니다:
- 사용자 시나리오 구체화
- 비기능 요구사항 추가
- 예외 케이스 정의

검토 후 피드백 부탁드립니다.

감사합니다.`,
    category: "requirements", // 진행단계
    files: [
      { name: "요구사항정의서_v3.0.pdf", size: "2.5MB" },
      { name: "유저플로우.png", size: "1.2MB" },
    ],
    link: "https://www.notion.so/requirements-example",
    approvalStatus: "pending", // 'pending', 'approved', 'rejected'
    views: 42,
    createdAt: "2024-11-28 14:30",
  },
  {
    id: 2,
    title: "화면설계 시안 2차",
    project: "AI 챗봇 개발",
    projectId: 2,
    client: "㈜LG",
    date: "2024-11-27",
    time: "오후 3:15",
    author: "이민수",
    content: `화면설계 시안 2차 버전입니다.

변경사항:
- 채팅 인터페이스 UX 개선
- 다크모드 추가
- 반응형 레이아웃 적용

확인 부탁드립니다.`,
    category: "design",
    files: [
      { name: "화면설계서_v2.0.fig", size: "5.3MB" },
    ],
    link: "https://www.figma.com/design/chatbot-ui",
    approvalStatus: "pending",
    views: 35,
    createdAt: "2024-11-27 15:15",
  },
  {
    id: 3,
    title: "개발 중간 보고서",
    project: "고객관리 시스템",
    projectId: 5,
    client: "㈜쿠팡",
    date: "2024-11-27",
    time: "오전 11:20",
    author: "박지영",
    content: `개발 진행 현황을 보고드립니다.

완료된 기능:
- 고객 정보 CRUD
- 검색 및 필터링
- 데이터 엑스포트

진행 중:
- 통계 대시보드
- 알림 시스템`,
    category: "development",
    files: [
      { name: "개발보고서.pdf", size: "3.1MB" },
      { name: "테스트결과.xlsx", size: "0.8MB" },
    ],
    link: null,
    approvalStatus: "pending",
    views: 28,
    createdAt: "2024-11-27 11:20",
  },
  {
    id: 4,
    title: "데이터베이스 설계서",
    project: "클라우드 마이그레이션",
    projectId: 4,
    client: "㈜삼성전자",
    date: "2024-11-26",
    time: "오후 4:50",
    author: "최준호",
    content: `데이터베이스 설계서를 제출합니다.

주요 내용:
- ERD 다이어그램
- 테이블 명세서
- 인덱스 전략
- 마이그레이션 계획`,
    category: "requirements",
    files: [
      { name: "DB설계서_v1.0.pdf", size: "4.2MB" },
      { name: "ERD.png", size: "2.1MB" },
    ],
    link: "https://dbdiagram.io/example",
    approvalStatus: "pending",
    views: 51,
    createdAt: "2024-11-26 16:50",
  },
  {
    id: 5,
    title: "UI/UX 최종 시안",
    project: "모바일 앱 리뉴얼",
    projectId: 2,
    client: "㈜카카오",
    date: "2024-11-26",
    time: "오전 9:00",
    author: "정수민",
    content: `UI/UX 최종 시안입니다.

디자인 컨셉:
- 미니멀리즘
- 밝고 친근한 톤앤매너
- 직관적인 네비게이션`,
    category: "designPub",
    files: [
      { name: "UI_최종시안.fig", size: "7.8MB" },
      { name: "디자인가이드.pdf", size: "2.1MB" },
    ],
    link: "https://www.figma.com/design/final-ui",
    approvalStatus: "pending",
    views: 67,
    createdAt: "2024-11-26 09:00",
  },
  {
    id: 6,
    title: "보안 점검 체크리스트",
    project: "보안 시스템 업그레이드",
    projectId: 8,
    client: "㈜KT",
    date: "2024-11-25",
    time: "오후 2:30",
    author: "강태우",
    content: `보안 점검 체크리스트 제출합니다.

점검 항목:
- 인증/인가 시스템
- 데이터 암호화
- API 보안
- 네트워크 보안`,
    category: "inspection",
    files: [
      { name: "보안점검리스트.xlsx", size: "1.5MB" },
    ],
    link: null,
    approvalStatus: "pending",
    views: 39,
    createdAt: "2024-11-25 14:30",
  },
  {
    id: 7,
    title: "테스트 결과 보고서",
    project: "ERP 시스템 도입",
    projectId: 7,
    client: "㈜현대자동차",
    date: "2024-11-25",
    time: "오전 10:00",
    author: "윤서준",
    content: `테스트 결과를 보고합니다.

테스트 결과:
- 단위 테스트: 98% 통과
- 통합 테스트: 95% 통과
- 성능 테스트: 목표치 달성

발견된 이슈는 첨부 파일 참조 부탁드립니다.`,
    category: "inspection",
    files: [
      { name: "테스트결과보고서.pdf", size: "3.7MB" },
      { name: "이슈목록.xlsx", size: "0.9MB" },
    ],
    link: null,
    approvalStatus: "pending",
    views: 44,
    createdAt: "2024-11-25 10:00",
  },
  {
    id: 8,
    title: "API 연동 명세서",
    project: "데이터 분석 시스템",
    projectId: 6,
    client: "㈜네이버",
    date: "2024-11-24",
    time: "오후 5:20",
    author: "한지우",
    content: `API 연동 명세서입니다.

포함 내용:
- REST API 엔드포인트 목록
- 요청/응답 스키마
- 인증 방식
- 에러 코드 정의`,
    category: "development",
    files: [
      { name: "API명세서_v1.0.pdf", size: "2.8MB" },
    ],
    link: "https://swagger.io/api-docs",
    approvalStatus: "pending",
    views: 56,
    createdAt: "2024-11-24 17:20",
  },
];

// 반려된 게시글 목록
export const rejectedDocuments = [
  {
    id: 9,
    title: "디자인 시안 1차",
    project: "모바일 앱 리뉴얼",
    projectId: 2,
    client: "㈜카카오",
    date: "2024-11-20",
    time: "오후 2:00",
    author: "정수민",
    content: `디자인 시안 1차 버전입니다.

메인 화면과 주요 기능 화면을 디자인했습니다.`,
    category: "designPub",
    files: [
      { name: "디자인시안_v1.0.fig", size: "6.2MB" },
    ],
    link: "https://www.figma.com/design/v1",
    approvalStatus: "rejected",
    rejectReason: "색상 변경 요청",
    views: 73,
    createdAt: "2024-11-20 14:00",
  },
  {
    id: 10,
    title: "API 명세서",
    project: "데이터 분석 시스템",
    projectId: 6,
    client: "㈜네이버",
    date: "2024-11-19",
    time: "오전 11:30",
    author: "한지우",
    content: `API 명세서 초안입니다.

기본적인 CRUD API를 정의했습니다.`,
    category: "development",
    files: [
      { name: "API명세서_초안.pdf", size: "1.9MB" },
    ],
    link: null,
    approvalStatus: "rejected",
    rejectReason: "기능 추가 필요",
    views: 62,
    createdAt: "2024-11-19 11:30",
  },
  {
    id: 11,
    title: "화면 설계서 초안",
    project: "전자상거래 플랫폼",
    projectId: 1,
    client: "㈜신세계",
    date: "2024-11-18",
    time: "오후 4:15",
    author: "김동균",
    content: `화면 설계서 초안을 제출합니다.

주요 화면의 와이어프레임을 작성했습니다.`,
    category: "design",
    files: [
      { name: "화면설계서_초안.pdf", size: "3.4MB" },
    ],
    link: null,
    approvalStatus: "rejected",
    rejectReason: "레이아웃 수정 필요",
    views: 85,
    createdAt: "2024-11-18 16:15",
  },
];

// 전체 게시글 데이터 (승인 대기 + 반려 + 추가 게시글)
// ID로 게시글을 찾을 때 사용
export const allBoards = [...pendingApprovals, ...rejectedDocuments];

/**
 * ID로 게시글을 찾는 헬퍼 함수
 * @param {number} boardId - 찾고자 하는 게시글 ID
 * @returns {object|null} - 찾은 게시글 객체 또는 null
 */
export const getBoardById = (boardId) => {
  // boardId를 숫자로 변환 (URL 파라미터는 문자열이므로)
  const id = parseInt(boardId, 10);

  // allBoards 배열에서 ID가 일치하는 게시글을 찾아서 반환
  return allBoards.find((board) => board.id === id) || null;
};
