// 테이블 컬럼 설정
export const tableConfig = {
  developer: [

    { key: "name", label: "이름" },
    { key: "companyName", label: "회사명" }, // 👈 추가
    { key: "email", label: "이메일" },
    { key: "phone", label: "전화번호" },
  ],
  customer: [  // ← 'client'가 아니라 'customer'로 변경!
    { key: "name", label: "이름" },
    { key: "companyName", label: "회사명" },
    { key: "email", label: "이메일" },
    { key: "phone", label: "전화번호" },
  ],
  company: [
    { key: "companyName", label: "회사명" },
    { key: "address", label: "주소" },           // ← 'companyAddress' → 'address'
    { key: "manager", label: "담당자" },         // ← 'managerName' → 'manager'
    { key: "userPhone", label: "담당자 전화번호" }, // ← 'phoneNumber' → 'userPhone'
  ],
};

// 탭 목록
export const tabs = [
  {
    id: "developer",
    label: "개발사",
  },
  {
    id: "customer",  // ← 'client' → 'customer'
    label: "고객사",
  },
  {
    id: "company",
    label: "회사",
  },
];