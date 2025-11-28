import { useState, useMemo } from "react";
import { tabs as tabsConfig, tableConfig } from "../constants/tableConfig";
import { mockUsers } from "../data/mockUsers";
import { Icons } from "../global/components/Icons";
import UserFormModal from "../global/components/UserFormModal";

export default function UserManagementPage() {
  const [activeTab, setActiveTab] = useState("developer");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: "create", // 'create' or 'edit'
    userData: null, // 수정 시 기존 데이터
  });

  // 새 회원 등록
  const handleCreateUser = () => {
    setModalState({
      isOpen: true,
      mode: "create",
      userData: null,
    });
  };

  const handleEditUser = (userId) => {
    const user = mockUsers.find((u) => u.id === userId);
    setModalState({
      isOpen: true,
      mode: "edit",
      userData: user,
    });
  };

  const itemsPerPage = 10;

  // 테이블 렌더링
  const columns = tableConfig[activeTab];

  const tabs = tabsConfig.map((tab) => ({
    ...tab,
    count: mockUsers.filter((user) => user.type === tab.id).length,
  }));

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
                  onClick={handleCreateUser}
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
                            onClick={() => handleEditUser(user.id)}
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
        {modalState.isOpen && (
          <UserFormModal
            key={`${activeTab}-${modalState.userData?.id || "new"}`}
            mode={modalState.mode}
            initialData={modalState.userData}
            activeTab={activeTab}
            onClose={() =>
              setModalState({ isOpen: false, mode: "create", userData: null })
            }
            onSubmit={(data) => {
              if (modalState.mode === "create") {
                console.log("새 회원 등록: ", data);
              } else {
                console.log("회원 수정: ", data);
              }
            }}
          />
        )}
      </div>
    </div>
  );
}
