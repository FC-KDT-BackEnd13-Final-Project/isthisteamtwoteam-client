import { useState, useMemo, useEffect } from "react";

// 설정 및 데이터 가져오기
import { tabs as tabsConfig, tableConfig } from "../utils/config/tableConfig";

// 컴포넌트 가져오기
import TabButton from "../components/common/TabButton/TabButton";
import SearchBar from "../components/common/SearchBar/SearchBar";
import UserTable from "../components/common/Table/UserTable";
import Pagination from "../components/common/Pagination/Pagination";
import LoadingState from "../components/common/LoadingState/LoadingState";
import UserFormModal from "../userManagement/UserFormModal";
import CompanyCreateModal from "../userManagement/CompanyCreateModal";
import { getUsers, createUser, updateUser, createCompany,deleteUser } from "../utils/api/usersApi";

export default function UserManagementPage() {
  const [activeTab, setActiveTab] = useState("developer");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [users, setUsers] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: "create",
    userData: null,
  });
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsers();
        console.log("API 응답:", response);
        setUsers(response);
        setLoading(false);
      } catch (error) {
        console.error("유저 데이터 불러오기 실패:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const itemsPerPage = 10;

  const usersByType = users
    ? {
        developer: users.developers?.items || [],
        customer: users.customers?.items || [],
        company: users.companies?.items || [],
      }
    : { developer: [], customer: [], company: [] };

  const columns = tableConfig?.[activeTab] || [];

  const allUsers = [
    ...(usersByType.developer || []).map((user) => ({
      ...user,
      id: user.userId,
      type: "developer",
    })),
    ...(usersByType.customer || []).map((user) => ({
      ...user,
      id: user.userId,
      type: "customer",
    })),
    ...(usersByType.company || []).map((user) => ({ ...user, type: "company" })),
  ];

  const tabs = tabsConfig.map((tab) => ({
    ...tab,
    count: users
      ? tab.id === "developer"
        ? users.developers?.total || 0
        : tab.id === "customer"
          ? users.customers?.total || 0
          : users.companies?.total || 0
      : 0,
  }));

  const filteredUsers = useMemo(() => {
    let filtered = usersByType[activeTab] || [];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((u) => {
        if (activeTab === "developer") {
          return (
            u.name?.toLowerCase().includes(query) ||
            u.email?.toLowerCase().includes(query) ||
            u.phone?.toLowerCase().includes(query)
          );
        } else if (activeTab === "customer") {
          return (
            u.name?.toLowerCase().includes(query) ||
            u.email?.toLowerCase().includes(query) ||
            u.phone?.toLowerCase().includes(query) ||
            u.companyName?.toLowerCase().includes(query)
          );
        } else {
          return (
            u.id?.toString().includes(query) ||
            u.companyName?.toLowerCase().includes(query) ||
            u.address?.toLowerCase().includes(query) ||
            u.manager?.toLowerCase().includes(query) ||
            u.userPhone?.toLowerCase().includes(query)
          );
        }
      });
    }

    return filtered.map((user) => {
      if (activeTab === "developer" || activeTab === "customer") {
        return { ...user, id: user.userId };
      }
      return user;
    });
  }, [activeTab, searchQuery, usersByType]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage));

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <LoadingState message="로딩 중..." size="large" />
      </div>
    );
  }

  if (!users) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        데이터를 불러올 수 없습니다.
      </div>
    );
  }

  const handleCreateUser = () => {
    setModalState({
      isOpen: true,
      mode: "create",
      userData: null,
    });
  };

  const handleCreateCompany = () => {
    setIsCompanyModalOpen(true);
  };

  const handleEditUser = (userId) => {
    console.log("=== 수정 시작 ===");
    console.log("전달받은 userId:", userId);
    console.log("allUsers:", allUsers);

    const user = allUsers.find((u) => u.id === userId);
    console.log("찾은 user:", user);

    if (!user) {
      alert("유저를 찾을 수 없습니다.");
      return;
    }

    setModalState({
      isOpen: true,
      mode: "edit",
      userData: user,
    });
  };

  // 👇 handleDelete 수정 - 회사 삭제 방지 + 통합 엔드포인트
  const handleDelete = async (userId) => {
    // 회사 탭에서는 삭제 불가
    if (activeTab === 'company') {
      alert('회사는 삭제할 수 없습니다.');
      return;
    }

    if (!window.confirm("정말 삭제하시겠습니까?")) {
      return;
    }

    try {
      console.log("=== 삭제 시작 ===");
      console.log("삭제할 userId:", userId);
      console.log("현재 activeTab:", activeTab);

      // API 호출 (통합 엔드포인트)
      await deleteUser(userId, activeTab);
      
      alert("회원이 삭제되었습니다.");

      // 데이터 새로고침
      const updatedData = await getUsers();
      setUsers(updatedData);
      
      // 선택된 ID 목록에서 제거
      setSelectedIds((prev) => prev.filter((id) => id !== userId));
      
    } catch (error) {
      console.error("삭제 실패:", error);
      alert(`삭제에 실패했습니다: ${error.message}`);
    }
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedIds(paginatedUsers.map((u) => u.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id, checked) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((i) => i !== id));
    }
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCurrentPage(1);
    setSelectedIds([]);
  };

  const handleModalSubmit = async (data) => {
    try {
      console.log("modalState:", modalState);
      console.log("userData:", modalState.userData);
      console.log("userId:", modalState.userData?.id);

      if (modalState.mode === "create") {
        await createUser(data, activeTab);
        alert("회원이 생성되었습니다.");
      } else {
        if (!modalState.userData?.id) {
          alert("유저 ID가 없습니다.");
          return;
        }
        await updateUser(modalState.userData.id, data, activeTab);
        alert("회원 정보가 수정되었습니다.");
      }

      const updatedData = await getUsers();
      setUsers(updatedData);
      setModalState({ isOpen: false, mode: "create", userData: null });
    } catch (error) {
      console.error("작업 실패:", error);
      alert(`작업에 실패했습니다: ${error.message}`);
    }
  };

  const handleCompanySubmit = async (data) => {
    try {
      await createCompany(data);
      alert("회사가 생성되었습니다.");
      
      const updatedData = await getUsers();
      setUsers(updatedData);
      setIsCompanyModalOpen(false);
    } catch (error) {
      console.error("회사 생성 실패:", error);
      alert(`회사 생성에 실패했습니다: ${error.message}`);
    }
  };

  const handleModalClose = () => {
    setModalState({ isOpen: false, mode: "create", userData: null });
  };

  const handleCompanyModalClose = () => {
    setIsCompanyModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-0 py-8">
          <h1 className="mb-3 text-3xl font-bold text-gray-900">회원관리</h1>
        </div>

        <div className="overflow-hidden rounded-xl bg-white">
          <div className="flex border-b border-gray-200 bg-gray-50 px-8">
            {tabs.map((tab) => (
              <TabButton
                key={tab.id}
                tab={tab}
                isActive={activeTab === tab.id}
                onClick={() => handleTabChange(tab.id)}
              />
            ))}
          </div>

          <div className="p-8">
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="검색어를 입력하세요"
              rightContent={
                activeTab === "company" ? (
                  <button
                    onClick={handleCreateCompany}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    회사 생성
                  </button>
                ) : (
                  <button
                    onClick={handleCreateUser}
                    className="flex items-center gap-2 rounded-lg bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    계정 생성
                  </button>
                )
              }
            />

            <UserTable
              columns={columns}
              users={paginatedUsers}
              selectedIds={selectedIds}
              onSelectAll={handleSelectAll}
              onSelectOne={handleSelectOne}
              onEdit={handleEditUser}
              onDelete={handleDelete}
            />

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              totalItems={filteredUsers.length}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        {modalState.isOpen && (
          <UserFormModal
            key={`${activeTab}-${modalState.userData?.id || "new"}`}
            mode={modalState.mode}
            initialData={modalState.userData}
            activeTab={activeTab}
            onClose={handleModalClose}
            onSubmit={handleModalSubmit}
          />
        )}

        {isCompanyModalOpen && (
          <CompanyCreateModal
            onClose={handleCompanyModalClose}
            onSubmit={handleCompanySubmit}
          />
        )}
      </div>
    </div>
  );
}