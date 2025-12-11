import { useState, useMemo, useEffect } from "react";

// 설정 및 데이터 가져오기
import { tabs as tabsConfig, tableConfig } from "../utils/config/tableConfig";

// 컴포넌트 가져오기
import Breadcrumb from "../components/common/Breadcrumb/Breadcrumb";
import TabButton from "../components/common/TabButton/TabButton";
import SearchBar from "../components/common/SearchBar/SearchBar";
import UserTable from "../components/common/Table/UserTable";
import Pagination from "../components/common/Pagination/Pagination";
import UserFormModal from "../userManagement/UserFormModal";
import { getUsers } from "../utils/api/usersApi";

/**
 * 회원 관리 페이지
 *
 * 이 페이지는 다음 기능을 제공합니다:
 * 1. 회원 타입별 탭 필터링 (개발자, 사업자, 관리자)
 * 2. 회원 검색 (ID, 이름, 이메일, 회사명, 대표자명)
 * 3. 회원 선택 (전체 선택, 개별 선택)
 * 4. 회원 추가/수정/삭제
 * 5. 페이지네이션
 */
export default function UserManagementPage() {
  // ========================================
  // 1. 상태(State) 관리
  // ========================================

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
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUsers();
        console.log("API 응답:", response); // 디버깅용
        setUsers(response);
        setLoading(false);
      } catch (error) {
        console.error('유저 데이터 불러오기 실패:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ========================================
  // 2. 상수 및 계산된 값
  // ========================================

  const itemsPerPage = 10;

  // API 데이터를 탭별로 분류 (항상 배열 보장!)
  const usersByType = users ? {
    developer: users.developers?.items || [],
    customer: users.customers?.items || [],
    company: users.companies?.items || [],
  } : { developer: [], customer: [], company: [] };

  // 현재 탭에 맞는 테이블 컬럼 설정
  const columns = tableConfig?.[activeTab] || [];

  // 모든 유저를 하나의 배열로 합치기 (type 속성 추가)
  const allUsers = [
    ...(usersByType.developer || []).map(user => ({ ...user, type: 'developer' })),
    ...(usersByType.customer || []).map(user => ({ ...user, type: 'customer' })),
    ...(usersByType.company || []).map(user => ({ ...user, type: 'company' })),
  ];

  // 각 탭의 회원 수를 계산하여 탭 정보 생성
  const tabs = tabsConfig.map((tab) => ({
    ...tab,
    count: users ? (
      tab.id === 'developer' ? users.developers?.total || 0 :
      tab.id === 'customer' ? users.customers?.total || 0 :
      users.companies?.total || 0
    ) : 0,
  }));

  // ========================================
  // 3. 데이터 처리 (필터링 및 페이지네이션)
  // ========================================

  const filteredUsers = useMemo(() => {
    // 현재 탭의 유저 가져오기 (항상 배열 보장)
    let filtered = usersByType[activeTab] || [];

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((u) => {
        if (activeTab === 'developer') {
          return (
            u.name?.toLowerCase().includes(query) ||
            u.email?.toLowerCase().includes(query) ||
            u.phone?.toLowerCase().includes(query)
          );
        } else if (activeTab === 'customer') {
          return (
            u.name?.toLowerCase().includes(query) ||
            u.email?.toLowerCase().includes(query) ||
            u.phone?.toLowerCase().includes(query) ||
            u.companyName?.toLowerCase().includes(query)
          );
        } else { // company
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

    return filtered;
  }, [activeTab, searchQuery, usersByType]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / itemsPerPage));

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // ========================================
  // 조건부 렌더링
  // ========================================

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">로딩 중...</div>;
  }

  if (!users) {
    return <div className="flex justify-center items-center min-h-screen">데이터를 불러올 수 없습니다.</div>;
  }

  // ========================================
  // 4. 이벤트 핸들러 함수들
  // ========================================

  const handleCreateUser = () => {
    setModalState({
      isOpen: true,
      mode: "create",
      userData: null,
    });
  };

  const handleEditUser = (userId) => {
    const user = allUsers.find((u) => u.id === userId);
    setModalState({
      isOpen: true,
      mode: "edit",
      userData: user,
    });
  };

  const handleDelete = (userId) => {
    console.log("삭제", userId);
    const updatedUsers = { ...users };
    if (activeTab === 'developer' && updatedUsers.developers) {
      updatedUsers.developers.items = (updatedUsers.developers.items || []).filter(u => u.id !== userId);
      updatedUsers.developers.total = Math.max(0, (updatedUsers.developers.total || 0) - 1);
    } else if (activeTab === 'customer' && updatedUsers.customers) {
      updatedUsers.customers.items = (updatedUsers.customers.items || []).filter(u => u.id !== userId);
      updatedUsers.customers.total = Math.max(0, (updatedUsers.customers.total || 0) - 1);
    } else if (updatedUsers.companies) {
      updatedUsers.companies.items = (updatedUsers.companies.items || []).filter(u => u.id !== userId);
      updatedUsers.companies.total = Math.max(0, (updatedUsers.companies.total || 0) - 1);
    }
    setUsers(updatedUsers);
    setSelectedIds((prev) => prev.filter((id) => id !== userId));
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
      if (modalState.mode === "create") {
        console.log("=== 회원 생성 시작 ===");
        console.log("activeTab:", activeTab);
        console.log("받은 데이터:", data);
        
        // API 호출
        await createUser(data, activeTab);
        
        console.log("✅ 회원 생성 성공!");
        
        // 데이터 다시 불러오기
        const updatedData = await getUsers();
        setUsers(updatedData);
        
        // 모달 닫기
        setModalState({ isOpen: false, mode: "create", userData: null });
        
        alert("회원이 성공적으로 등록되었습니다.");
        
      } else {
        console.log("회원 정보 수정: ", data);
        // TODO: 수정 API도 나중에 추가
      }
    } catch (error) {
      console.error("❌ 회원 생성 실패:", error);
      alert(`회원 등록에 실패했습니다: ${error.message}`);
    }
  };

  const handleModalClose = () => {
    setModalState({ isOpen: false, mode: "create", userData: null });
  };

  // ========================================
  // 5. 화면 그리기 (렌더링)
  // ========================================

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <div className="mx-auto max-w-[1350px]">
        <div className="mb-5 py-8">
          <h1 className="mb-3 text-3xl font-bold text-gray-900">회원관리</h1>
          <Breadcrumb />
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
              onCreateUser={handleCreateUser}
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
      </div>
    </div>
  );
}