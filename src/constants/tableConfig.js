// 테이블 컬럼 설정
export const tableConfig = {
  developer: [
    { key: "id", label: "ID" },
    { key: "name", label: "이름" },
    { key: "position", label: "직책" },
    { key: "email", label: "이메일" },
    { key: "phone", label: "전화번호" },
  ],
  client: [
    { key: "id", label: "ID" },
    { key: "name", label: "이름" },
    { key: "companyName", label: "회사명" },
    { key: "email", label: "이메일" },
    { key: "phone", label: "전화번호" },
  ],
  company: [
    { key: "id", label: "ID" },
    { key: "companyName", label: "회사명" },
    { key: "companyAddress", label: "주소" },
    { key: "companyHead", label: "대표" },
    { key: "companyManager", label: "담당자" },
    { key: "phone", label: "담당자 전화번호" },
    { key: "businessNumber", label: "사업자등록증" },
  ],
};

// 탭 목록
export const tabs = [
  {
    id: "developer",
    label: "개발사",
  },
  {
    id: "client",
    label: "고객사",
  },
  {
    id: "company",
    label: "회사",
  },
];
