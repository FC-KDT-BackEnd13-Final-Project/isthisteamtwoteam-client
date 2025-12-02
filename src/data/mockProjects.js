/**
 * 프로젝트(Project) Mock 데이터
 * 대시보드와 프로젝트 상세 페이지에서 사용됩니다.
 */

// 진행 중인 프로젝트 목록
export const progressProjects = [
  { id: 1, name: "전자상거래 플랫폼 구축", client: "㈜신세계", status: "개발" },
  { id: 2, name: "AI 챗봇 개발", client: "㈜LG", status: "검수" },
  {
    id: 5,
    name: "고객관리 시스템 구축",
    client: "㈜쿠팡",
    status: "화면 설계",
  },
  { id: 6, name: "데이터 분석 시스템", client: "㈜네이버", status: "개발" },
  {
    id: 19,
    name: "물류 관리 시스템",
    client: "㈜CJ대한통운",
    status: "요구사항 정의",
  },
  { id: 20, name: "스마트팩토리 솔루션", client: "㈜LG화학", status: "개발" },
  { id: 21, name: "VR 교육 콘텐츠", client: "㈜NHN", status: "디자인" },
  { id: 22, name: "자산관리 시스템", client: "㈜KB국민은행", status: "개발" },
  { id: 23, name: "클라우드 연동 서비스", client: "㈜SKT", status: "개발" },
  {
    id: 24,
    name: "신규 ERP 모듈 개발",
    client: "㈜아모레",
    status: "화면 설계",
  },
  { id: 25, name: "추가 프로젝트 1", client: "㈜A고객", status: "개발" },
  { id: 26, name: "추가 프로젝트 2", client: "㈜B고객", status: "화면 설계" },
];

// 유지보수 단계의 프로젝트 목록
export const maintenanceProjects = [
  { id: 3, name: "모바일 앱 리뉴얼", client: "㈜카카오", status: "유지보수" },
  {
    id: 4,
    name: "클라우드 마이그레이션",
    client: "㈜삼성전자",
    status: "유지보수",
  },
  {
    id: 7,
    name: "ERP 시스템 도입",
    client: "㈜현대자동차",
    status: "유지보수",
  },
  {
    id: 8,
    name: "보안 시스템 업그레이드",
    client: "㈜KT",
    status: "유지보수",
  },
  { id: 27, name: "인사관리 시스템", client: "㈜포스코", status: "유지보수" },
  { id: 28, name: "백오피스 시스템", client: "㈜롯데", status: "유지보수" },
];

// 모든 프로젝트 상세 정보 (대시보드 하단에 표시되는 프로젝트 카드용)
export const allProjectsData = [
  {
    id: 1,
    name: "전자상거래 플랫폼 구축",
    client: "㈜신세계",
    startDate: "2024/01/15",
    updateDate: "2024/11/20",
    stage: "개발",
    number: "PRJ-2024-001",
    description: "대규모 온라인 쇼핑몰 구축 프로젝트",
    manager: "김동균",
    team: ["김동균", "이민수", "박지영"],
    progress: 65,
    budget: "5억원",
    status: "진행중",
  },
  {
    id: 2,
    name: "모바일 앱 리뉴얼",
    client: "㈜카카오",
    startDate: "2024/02/01",
    updateDate: "2024/11/18",
    stage: "유지보수",
    number: "PRJ-2024-002",
    description: "기존 모바일 앱의 전면 리뉴얼",
    manager: "정수민",
    team: ["정수민", "최준호"],
    progress: 95,
    budget: "3억원",
    status: "완료 임박",
  },
  {
    id: 3,
    name: "AI 챗봇 개발",
    client: "㈜LG",
    startDate: "2024/03/10",
    updateDate: "2024/11/22",
    stage: "검수",
    number: "PRJ-2024-003",
    description: "고객 상담용 AI 챗봇 시스템 개발",
    manager: "이민수",
    team: ["이민수", "한지우", "윤서준"],
    progress: 85,
    budget: "4억원",
    status: "검수 중",
  },
  {
    id: 4,
    name: "클라우드 마이그레이션",
    client: "㈜삼성전자",
    startDate: "2024/01/05",
    updateDate: "2024/11/15",
    stage: "유지보수",
    number: "PRJ-2024-004",
    description: "온프레미스 시스템의 클라우드 전환",
    manager: "최준호",
    team: ["최준호", "강태우"],
    progress: 100,
    budget: "8억원",
    status: "유지보수",
  },
  {
    id: 5,
    name: "고객관리 시스템 구축",
    client: "㈜쿠팡",
    startDate: "2024/04/01",
    updateDate: "2024/11/25",
    stage: "화면 설계",
    number: "PRJ-2024-005",
    description: "통합 고객관리 CRM 시스템",
    manager: "박지영",
    team: ["박지영", "김동균"],
    progress: 35,
    budget: "6억원",
    status: "진행중",
  },
  {
    id: 6,
    name: "데이터 분석 시스템",
    client: "㈜네이버",
    startDate: "2024/05/10",
    updateDate: "2024/11/20",
    stage: "개발",
    number: "PRJ-2024-006",
    description: "빅데이터 분석 및 시각화 시스템",
    manager: "한지우",
    team: ["한지우", "이민수", "정수민"],
    progress: 50,
    budget: "7억원",
    status: "진행중",
  },
  {
    id: 7,
    name: "ERP 시스템 도입",
    client: "㈜현대자동차",
    startDate: "2024/02/20",
    updateDate: "2024/11/10",
    stage: "유지보수",
    number: "PRJ-2024-007",
    description: "전사 통합 ERP 시스템 구축",
    manager: "윤서준",
    team: ["윤서준", "박지영", "최준호"],
    progress: 100,
    budget: "12억원",
    status: "유지보수",
  },
  {
    id: 8,
    name: "보안 시스템 업그레이드",
    client: "㈜KT",
    startDate: "2024/06/15",
    updateDate: "2024/11/08",
    stage: "요구사항 정의",
    number: "PRJ-2024-008",
    description: "네트워크 및 정보 보안 시스템 강화",
    manager: "강태우",
    team: ["강태우", "윤서준"],
    progress: 100,
    budget: "5억원",
    status: "유지보수",
  },
];

/**
 * ID로 프로젝트를 찾는 헬퍼 함수
 * @param {number} projectId - 찾고자 하는 프로젝트 ID
 * @returns {object|null} - 찾은 프로젝트 객체 또는 null
 */
export const getProjectById = (projectId) => {
  // projectId를 숫자로 변환 (URL 파라미터는 문자열이므로)
  const id = parseInt(projectId, 10);

  // allProjectsData 배열에서 ID가 일치하는 프로젝트를 찾아서 반환
  return allProjectsData.find((project) => project.id === id) || null;
};

/**
 * 프로젝트 ID로 해당 프로젝트의 게시글 목록을 가져오는 헬퍼 함수
 * (실제로는 boards 데이터에서 필터링해야 하지만, 여기서는 참고용으로 정의)
 * @param {number} projectId - 프로젝트 ID
 * @returns {array} - 해당 프로젝트의 게시글 배열
 */
export const getProjectBoards = (projectId) => {
  // 실제 사용 시에는 mockBoards.js에서 import하여 필터링
  // 여기서는 함수 정의만 해둠
  console.log(`프로젝트 ID ${projectId}의 게시글을 조회합니다.`);
  return [];
};
