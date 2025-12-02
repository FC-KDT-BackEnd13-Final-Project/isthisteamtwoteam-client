/**
 * 승인 요청 페이지의 Mock 데이터
 *
 * 실제 프로젝트에서는 서버에서 이 데이터를 가져와야 합니다.
 */

export const approvalData = {
  // 전체 통계
  stats: {
    pending: 15,    // 승인 대기 중인 항목 수
    approved: 42,   // 승인 완료된 항목 수
    rejected: 6,    // 반려된 항목 수
  },

  // 카테고리별 승인 요청 항목들
  sections: [
    {
      title: "요구사항 정의",
      count: 3,
      items: [
        {
          id: "1",
          title: "전자상거래 플랫폼 기능 요구사항 정의서 v1.2",
          project: "전자상거래 플랫폼 구축",
          client: "㈜신세계",
          date: "2024/11/28 오전 10:30",
          status: "pending",
          completed: false,
        },
        {
          id: "2",
          title: "AI 챗봇 대화 시나리오 및 기능 명세서",
          project: "AI 챗봇 개발",
          client: "㈜LG",
          date: "2024/11/27 오후 3:15",
          status: "approved",
          completed: true,
        },
        {
          id: "3",
          title: "고객 관리 시스템 비기능 요구사항 정의",
          project: "고객관리 시스템 구축",
          client: "㈜쿠팡",
          date: "2024/11/27 오전 11:20",
          status: "rejected",
          completed: false,
        },
      ],
    },
    {
      title: "화면설계",
      count: 4,
      items: [
        {
          id: "4",
          title: "회원가입 및 로그인 프로세스 화면 설계서",
          project: "전자상거래 플랫폼 구축",
          client: "㈜신세계",
          date: "2024/11/26 오전 10:00",
          status: "pending",
          completed: false,
        },
        {
          id: "5",
          title: "관리자 페이지 메뉴 구조 및 화면 정의서",
          project: "고객관리 시스템 구축",
          client: "㈜쿠팡",
          date: "2024/11/25 오후 4:15",
          status: "approved",
          completed: true,
        },
        {
          id: "6",
          title: "데이터 시각화 대시보드 화면 설계",
          project: "데이터 분석 시스템",
          client: "㈜네이버",
          date: "2024/11/24 오전 9:30",
          status: "pending",
          completed: false,
        },
        {
          id: "7",
          title: "모바일 주문 화면 플로우 설계서",
          project: "모바일 앱 리뉴얼",
          client: "㈜카카오",
          date: "2024/11/23 오후 2:20",
          status: "approved",
          completed: true,
        },
      ],
    },
    {
      title: "디자인/퍼블리싱",
      count: 5,
      items: [
        {
          id: "8",
          title: "모바일 앱 UI/UX 디자인 시안 2차",
          project: "모바일 앱 리뉴얼",
          client: "㈜카카오",
          date: "2024/11/26 오전 9:00",
          status: "pending",
          completed: false,
        },
        {
          id: "9",
          title: "보안 시스템 관리자 대시보드 디자인 최종본",
          project: "보안 시스템 업그레이드",
          client: "㈜KT",
          date: "2024/11/25 오후 2:30",
          status: "approved",
          completed: true,
        },
        {
          id: "10",
          title: "브랜드 컬러 가이드라인 및 디자인 시스템",
          project: "데이터 분석 시스템",
          client: "㈜네이버",
          date: "2024/11/24 오후 5:20",
          status: "rejected",
          completed: false,
        },
        {
          id: "11",
          title: "반응형 웹 퍼블리싱 (PC/Mobile/Tablet)",
          project: "물류 관리 시스템",
          client: "㈜CJ대한통운",
          date: "2024/11/22 오후 3:20",
          status: "pending",
          completed: false,
        },
        {
          id: "12",
          title: "메인 페이지 HTML/CSS 마크업 산출물",
          project: "전자상거래 플랫폼 구축",
          client: "㈜신세계",
          date: "2024/11/21 오전 11:00",
          status: "approved",
          completed: true,
        },
      ],
    },
    {
      title: "개발",
      count: 3,
      items: [
        {
          id: "13",
          title: "결제 모듈 API 연동 개발 완료",
          project: "전자상거래 플랫폼 구축",
          client: "㈜신세계",
          date: "2024/11/20 오후 3:30",
          status: "pending",
          completed: false,
        },
        {
          id: "14",
          title: "사용자 권한 관리 기능 개발",
          project: "고객관리 시스템 구축",
          client: "㈜쿠팡",
          date: "2024/11/19 오전 10:15",
          status: "approved",
          completed: true,
        },
        {
          id: "15",
          title: "실시간 데이터 처리 배치 프로그램",
          project: "데이터 분석 시스템",
          client: "㈜네이버",
          date: "2024/11/18 오후 5:00",
          status: "pending",
          completed: false,
        },
      ],
    },
    {
      title: "검수",
      count: 2,
      items: [
        {
          id: "16",
          title: "통합 테스트 결과 보고서",
          project: "모바일 앱 리뉴얼",
          client: "㈜카카오",
          date: "2024/11/17 오전 11:00",
          status: "pending",
          completed: false,
        },
        {
          id: "17",
          title: "보안 취약점 점검 결과 및 조치사항",
          project: "보안 시스템 업그레이드",
          client: "㈜KT",
          date: "2024/11/16 오후 2:45",
          status: "approved",
          completed: true,
        },
      ],
    },
    {
      title: "유지보수",
      count: 1,
      items: [
        {
          id: "18",
          title: "월간 유지보수 활동 보고서 (2024년 10월)",
          project: "ERP 시스템 도입",
          client: "㈜현대자동차",
          date: "2024/11/15 오전 9:00",
          status: "approved",
          completed: true,
        },
      ],
    },
  ],
};
