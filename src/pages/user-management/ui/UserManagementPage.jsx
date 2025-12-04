import { useState, useMemo } from "react";

// 설정 및 데이터 가져오기
import { tabs as tabsConfig, tableConfig } from "../../../shared/config/tableConfig";
import { mockUsers } from "../../../data/mockUsers";

// 컴포넌트 가져오기
import Breadcrumb from "../../../shared/ui/Breadcrumb/Breadcrumb";
import TabButton from "../../../shared/ui/TabButton/TabButton";
import SearchBar from "../../../shared/ui/SearchBar/SearchBar";
import UserTable from "../../../shared/ui/Table/UserTable";
import Pagination from "../../../shared/ui/Pagination/Pagination";
import UserFormModal from "../../../features/user/create-user/ui/UserFormModal";

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

  const [activeTab, setActiveTab] = useState("developer"); // 현재 활성화된 탭
  const [searchQuery, setSearchQuery] = useState(""); // 검색어
  const [selectedIds, setSelectedIds] = useState([]); // 선택된 회원 ID 목록
  const [users, setUsers] = useState(mockUsers); // 전체 회원 목록
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호
  const [modalState, setModalState] = useState({
    isOpen: false, // 모달 열림/닫힘 상태
    mode: "create", // 모달 모드: 'create'(신규 등록) 또는 'edit'(수정)
    userData: null, // 수정 시 기존 회원 데이터
  });

  // ========================================
  // 2. 상수 및 계산된 값
  // ========================================

  const itemsPerPage = 10; // 페이지당 표시할 항목 수

  // 현재 탭에 맞는 테이블 컬럼 설정
  const columns = tableConfig[activeTab];

  // 각 탭의 회원 수를 계산하여 탭 정보 생성
  const tabs = tabsConfig.map((tab) => ({
    ...tab,
    count: users.filter((user) => user.type === tab.id).length,
  }));

  // ========================================
  // 3. 데이터 처리 (필터링 및 페이지네이션)
  // ========================================

  /**
   * 필터링된 회원 목록
   * 1. 현재 탭에 해당하는 회원만 필터링
   * 2. 검색어가 있으면 추가로 검색 필터링
   */
  const filteredUsers = useMemo(() => {
    // 현재 탭의 회원 타입으로 필터링
    let filtered = users.filter((u) => u.type === activeTab);

    // 검색어가 있으면 검색 필터링
    if (searchQuery.trim()) {
      const query = searchQuery;
      filtered = filtered.filter(
        (u) =>
          u.id?.includes(query) ||
          u.name?.includes(query) ||
          u.email?.includes(query) ||
          u.companyName?.includes(query) ||
          u.ceoName?.includes(query),
      );
    }

    return filtered;
  }, [activeTab, searchQuery, users]);

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // 현재 페이지에 표시할 회원 목록
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // ========================================
  // 4. 이벤트 핸들러 함수들
  // ========================================

  /**
   * 새 회원 등록 모달 열기
   */
  const handleCreateUser = () => {
    setModalState({
      isOpen: true,
      mode: "create",
      userData: null,
    });
  };

  /**
   * 회원 정보 수정 모달 열기
   */
  const handleEditUser = (userId) => {
    const user = users.find((u) => u.id === userId);
    setModalState({
      isOpen: true,
      mode: "edit",
      userData: user,
    });
  };

  /**
   * 회원 삭제
   * 회원 목록과 선택 목록에서 모두 제거
   */
  const handleDelete = (userId) => {
    console.log("삭제");
    setUsers(users.filter((user) => user.id !== userId));
    setSelectedIds((prev) => prev.filter((id) => id !== userId));
  };

  /**
   * 전체 선택/해제
   * 현재 페이지의 모든 회원을 선택하거나 해제
   */
  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedIds(paginatedUsers.map((u) => u.id));
    } else {
      setSelectedIds([]);
    }
  };

  /**
   * 개별 회원 선택/해제
   */
  const handleSelectOne = (id, checked) => {
    if (checked) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((i) => i !== id));
    }
  };

  /**
   * 탭 변경 핸들러
   * 탭 변경 시 페이지와 선택 목록 초기화
   */
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCurrentPage(1);
    setSelectedIds([]);
  };

  /**
   * 모달 제출 핸들러
   * 새 회원 등록 또는 기존 회원 정보 수정
   */
  const handleModalSubmit = (data) => {
    if (modalState.mode === "create") {
      // 새 회원 등록
      console.log("새 회원 등록: ", data);
      setUsers([...users, data]);
    } else {
      // 기존 회원 정보 수정
      let userIndex = users.findIndex((u) => u.id === data.id);
      let tempUsers = [...users];
      tempUsers[userIndex] = data;
      setUsers(tempUsers);
    }
  };

  /**
   * 모달 닫기 핸들러
   */
  const handleModalClose = () => {
    setModalState({ isOpen: false, mode: "create", userData: null });
  };

  // ========================================
  // 5. 화면 그리기 (렌더링)
  // ========================================

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <div className="mx-auto max-w-[1400px] p-5">
        {/* 페이지 헤더 */}
        <div className="mb-5 py-8">
          <h1 className="mb-3 text-3xl font-bold text-gray-900">회원관리</h1>
          {/* 브레드크럼 네비게이션 */}
          <Breadcrumb />
        </div>

        {/* 메인 컨텐츠 영역 */}
        <div className="overflow-hidden rounded-xl bg-white">
          {/* 탭 버튼 영역 */}
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
            {/* 검색 바 및 새 회원 등록 버튼 */}
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onCreateUser={handleCreateUser}
            />

            {/* 회원 목록 테이블 */}
            <UserTable
              columns={columns}
              users={paginatedUsers}
              selectedIds={selectedIds}
              onSelectAll={handleSelectAll}
              onSelectOne={handleSelectOne}
              onEdit={handleEditUser}
              onDelete={handleDelete}
            />

            {/* 페이지네이션 */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              itemsPerPage={itemsPerPage}
              totalItems={filteredUsers.length}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>

        {/* 회원 등록/수정 모달 */}
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
