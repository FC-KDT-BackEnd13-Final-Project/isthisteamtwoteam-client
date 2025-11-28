import { useState, useMemo } from "react";
import RegisterModal from "../global/components/RegisterModal";

// 아이콘 컴포넌트
const Icons = {
  search: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-[18px] h-[18px]"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  ),
  plus: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-4 h-4"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  ),
  edit: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-[18px] h-[18px]"
    >
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  ),
  trash: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-[18px] h-[18px]"
    >
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  chevronLeft: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-4 h-4"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  ),
  chevronRight: (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="w-4 h-4"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  ),
};

export default function UserManagementPage() {
  const [activeTab, setActiveTab] = useState("developer");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [newMemberModal, setNewMemberModal] = useState(false);

  const itemsPerPage = 10;

  // Mock 데이터
  const mockUsers = [
    // ===== 개발자 (Developer) =====
    {
      id: "12451",
      name: "Leslie Alexander",
      position: "프론트엔드 개발자",
      email: "leslie@example.com",
      phone: "+62 819 1314 1435",
      type: "developer",
    },
    {
      id: "12452",
      name: "Guy Hawkins",
      position: "백엔드 개발자",
      email: "guy@example.com",
      phone: "+62 819 1314 1436",
      type: "developer",
    },
    {
      id: "12453",
      name: "Kristin Watson",
      position: "PM",
      email: "kristin@example.com",
      phone: "+62 819 1314 1437",
      type: "developer",
    },
    {
      id: "12458",
      name: "Esther Howard",
      position: "디자이너",
      email: "esther@example.com",
      phone: "+62 819 1314 1438",
      type: "developer",
    },

    // ===== 고객사 회원 (Client) =====
    {
      id: "12454",
      name: "Jane Cooper",
      companyName: "삼성전자",
      email: "jane@example.com",
      phone: "+62 819 1314 1439",
      type: "client",
    },
    {
      id: "12455",
      name: "Robert Fox",
      companyName: "LG전자",
      email: "robert@example.com",
      phone: "+62 819 1314 1440",
      type: "client",
    },

    // ===== 회사 (Company) =====
    {
      id: "12456",
      companyName: "네이버",
      companyAddress: "경기도 성남시 분당구 정자일로 95",
      companyHead: "최수연",
      companyManager: "Jenny Wilson",
      phone: "+62 819 1314 1441",
      businessNumber: "123-1230-123",
      type: "company",
    },
    {
      id: "12457",
      companyName: "카카오",
      companyAddress: "제주특별자치도 제주시 첨단로 242",
      companyHead: "홍은택",
      companyManager: "Wade Warren",
      phone: "+62 819 1314 1442",
      businessNumber: "123-1230-123",
      type: "company",
    },
    {
      id: "12459",
      companyName: "토스",
      companyAddress: "서울특별시 강남구 테헤란로 131",
      companyHead: "이승건",
      companyManager: "김철수",
      phone: "+62 819 1314 1443",
      businessNumber: "123-1230-123",
      type: "company",
    },
  ];

  // 테이블 컬럼 설정
  const tableConfig = {
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

  // 테이블 렌더링
  const columns = tableConfig[activeTab];

  // 탭 목록
  const tabs = [
    {
      id: "developer",
      label: "개발사",
      count: mockUsers.filter((u) => u.type === "developer").length,
    },
    {
      id: "client",
      label: "고객사",
      count: mockUsers.filter((u) => u.type === "client").length,
    },
    {
      id: "company",
      label: "회사",
      count: mockUsers.filter((u) => u.type === "company").length,
    },
  ];

  // 필터링된 사용자
  const filteredUsers = useMemo(() => {
    let filtered = mockUsers.filter((u) => u.type === activeTab);

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (u) =>
          u.id.toLowerCase().includes(query) ||
          u.name.toLowerCase().includes(query) ||
          u.email.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [activeTab, searchQuery]);

  // 페이지네이션
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 전체 선택
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedIds(paginatedUsers.map((u) => u.id));
    } else {
      setSelectedIds([]);
    }
  };

  // 개별 선택
  const handleSelectOne = (id, checked) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((i) => i !== id));
    }
  };

  // 수정
  const handleEdit = (id) => {
    console.log("수정:", id);
  };

  // 삭제
  const handleDelete = (id) => {
    console.log("삭제:", id);
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <div className="max-w-[1400px] mx-auto p-5">
        {/* Header */}
        <div className="py-8 mb-5">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">회원관리</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-600">
              Dashboard
            </a>
            <span className="text-gray-300">▸</span>
            <a href="#" className="hover:text-gray-600">
              Members
            </a>
            <span className="text-gray-300">▸</span>
            <span className="text-blue-500 font-medium">회원관리</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl overflow-hidden">
          {/* Tabs */}
          <div className="flex bg-gray-50 px-8 border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setCurrentPage(1);
                  setSelectedIds([]);
                }}
                className={`px-8 py-[18px] text-[15px] font-medium relative transition-all ${
                  activeTab === tab.id
                    ? "text-blue-500 bg-blue-50"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab.label} ({tab.count})
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-500" />
                )}
              </button>
            ))}
          </div>

          <div className="p-8">
            {/* Search and Actions */}
            <div className="flex justify-between items-center mb-6 gap-4">
              <div className="flex-1 max-w-[500px] relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for id, name, email"
                  className="w-full py-3 px-5 pr-12 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 transition"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  {Icons.search}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition"
                  onClick={() => {
                    // 모달열기
                    setNewMemberModal(true);
                  }}
                >
                  {Icons.plus}
                  New Member
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-5 py-4 text-left">
                      <input
                        type="checkbox"
                        className="w-[18px] h-[18px] cursor-pointer"
                        checked={
                          paginatedUsers.length > 0 &&
                          selectedIds.length === paginatedUsers.length
                        }
                        onChange={(e) => handleSelectAll(e.target.checked)}
                      />
                    </th>
                    {columns.map((col) => (
                      <th
                        key={col.key}
                        className="px-5 py-4 text-left text-sm font-semibold text-gray-500"
                      >
                        {col.label} ^
                      </th>
                    ))}
                    <th className="px-5 py-4 text-left text-sm font-semibold text-gray-500"></th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50 border-b border-gray-100"
                    >
                      <td className="px-5 py-[18px]">
                        <input
                          type="checkbox"
                          className="w-[18px] h-[18px] cursor-pointer"
                          checked={selectedIds.includes(user.id)}
                          onChange={(e) =>
                            handleSelectOne(user.id, e.target.checked)
                          }
                        />
                      </td>
                      {columns.map((col) => (
                        <td
                          key={col.key}
                          className={`px-5 py-[18px] text-sm ${
                            col.key === "id"
                              ? "text-blue-500"
                              : col.key === "name" || col.key === "companyName"
                              ? "font-medium text-gray-900"
                              : "text-gray-700"
                          }`}
                        >
                          {user[col.key]}
                        </td>
                      ))}
                      <td className="px-5 py-[18px]">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleEdit(user.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition"
                          >
                            {Icons.edit}
                          </button>
                          <button
                            onClick={() => handleDelete(user.id)}
                            className="w-8 h-8 flex items-center justify-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition"
                          >
                            {Icons.trash}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {paginatedUsers.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-5 py-12 text-center text-gray-400"
                      >
                        검색 결과가 없습니다.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6 pt-5 border-t border-gray-100">
              <div className="text-sm text-gray-500">
                {(currentPage - 1) * itemsPerPage + 1} -{" "}
                {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of{" "}
                {filteredUsers.length} items
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={currentPage}
                  onChange={(e) => setCurrentPage(Number(e.target.value))}
                  className="px-3 py-2 border border-gray-200 rounded-md text-sm outline-none cursor-pointer"
                >
                  {Array.from({ length: totalPages }, (_, i) => (
                    <option key={i + 1} value={i + 1}>
                      Page {i + 1}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  {Icons.chevronLeft}
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="w-9 h-9 flex items-center justify-center border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  {Icons.chevronRight}
                </button>
              </div>
            </div>
          </div>
        </div>
        {newMemberModal && (
          <RegisterModal
            onClose={() => setNewMemberModal(false)}
            activeTab={activeTab} // 현재 선택된 탭 전달
          />
        )}
      </div>
    </div>
  );
}
