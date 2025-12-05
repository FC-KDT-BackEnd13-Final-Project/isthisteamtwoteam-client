import { useState, useMemo } from "react";

// 컴포넌트 가져오기
import {
  BellIcon,
  SearchIcon,
  CloseIcon,
  CheckIcon,
  EmptyIcon,
} from "../../../shared/ui/Icon/NotificationIcon";
import NotificationItem from "../../../entities/notification/ui/NotificationItem";

// 날짜 포맷 함수 가져오기
import { formatDate, formatFullDate } from "../../../shared/lib/date/dateUtils";

// Mock 데이터 - 실제로는 서버에서 가져올 데이터입니다
const mockNotifications = [
  {
    id: "1",
    title: "새 메시지 수신",
    message:
      "John Doe로부터 프로젝트 제안에 관한 새 메시지를 받았습니다. 가능한 한 빨리 검토하고 답변해 주세요.",
    type: "info",
    date: new Date(Date.now() - 1000 * 60 * 30),
    isRead: false,
  },
  {
    id: "2",
    title: "결제 성공",
    message:
      "$99.99 결제가 성공적으로 처리되었습니다. 구독이 한 달 더 갱신되었습니다.",
    type: "success",
    date: new Date(Date.now() - 1000 * 60 * 60 * 2),
    isRead: false,
  },
  {
    id: "3",
    title: "저장공간 부족",
    message:
      "저장공간이 90% 찼습니다. 서비스 중단을 방지하기 위해 플랜 업그레이드 또는 불필요한 파일 삭제를 고려하세요.",
    type: "warning",
    date: new Date(Date.now() - 1000 * 60 * 60 * 5),
    isRead: true,
  },
  {
    id: "4",
    title: "로그인 실패 시도",
    message:
      "인식되지 않은 기기에서 귀하의 계정에 접근하려는 시도가 있었습니다. 본인이 아닌 경우 즉시 비밀번호를 변경하세요.",
    type: "error",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24),
    isRead: true,
  },
  {
    id: "5",
    title: "주간 보고서 제공",
    message:
      "주간 분석 보고서를 다운로드할 수 있습니다. 최신 성과 지표와 인사이트를 확인하세요.",
    type: "info",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    isRead: true,
  },
  {
    id: "6",
    title: "팀원 합류",
    message:
      'Sarah Wilson이 "마케팅 캠페인" 팀에 합류했습니다. 새 팀원을 환영하고 관련 프로젝트 정보를 공유하세요.',
    type: "success",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
    isRead: true,
  },
];

/**
 * 알림 페이지 메인 컴포넌트
 *
 * 이 페이지는 다음 기능을 제공합니다:
 * 1. 알림 목록 표시
 * 2. 탭으로 필터링 (전체, 읽지 않음, 읽음)
 * 3. 검색 기능
 * 4. 읽음 처리
 */

export default function NotificationPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // 필터링된 알림
  const filteredNotifications = useMemo(() => {
    let filtered = notifications;

    // 탭 필터
    if (activeTab === "unread") {
      filtered = filtered.filter((n) => !n.isRead);
    } else if (activeTab === "read") {
      filtered = filtered.filter((n) => n.isRead);
    }

    // 검색 필터
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (n) =>
          n.title.toLowerCase().includes(query) ||
          n.message.toLowerCase().includes(query),
      );
    }

    return filtered;
  }, [notifications, activeTab, searchQuery]);

  // 카운트 계산
  const counts = useMemo(
    () => ({
      all: notifications.length,
      unread: notifications.filter((n) => !n.isRead).length,
      read: notifications.filter((n) => n.isRead).length,
    }),
    [notifications],
  );

  // 읽음 처리
  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  };

  // 모두 읽음 처리
  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  // 검색 초기화
  const clearSearch = () => {
    setSearchQuery("");
  };

  // 탭 목록
  const tabs = [
    { id: "all", label: "전체", count: counts.all },
    { id: "unread", label: "읽지 않음", count: counts.unread },
    { id: "read", label: "읽음", count: counts.read },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl p-6">
        {/* ========== 헤더 ========== */}
        <div className="mb-6 flex items-center justify-between">
          {/* 왼쪽: 제목 영역 */}
          <div className="flex items-center gap-3">
            <div className="text-gray-900">
              <BellIcon />
            </div>
            <div>
              <h1 className="text-2xl font-medium">알림</h1>
              <p className="text-sm text-gray-500">최신 활동을 확인하세요</p>
            </div>
          </div>

          {/* 오른쪽: 읽지 않은 알림 개수 및 모두 읽음 버튼 */}
          <div className="flex items-center gap-3">
            {counts.unread > 0 && (
              <>
                <span className="rounded-lg bg-gray-900 px-3 py-1 text-xs font-medium text-white">
                  {counts.unread}개 읽지 않음
                </span>
                <button
                  onClick={handleMarkAllAsRead}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium transition hover:bg-gray-100"
                >
                  <CheckIcon />
                  모두 읽음으로 표시
                </button>
              </>
            )}
          </div>
        </div>

        {/* ========== 검색창 ========== */}
        <div className="relative mb-6">
          {/* 검색 아이콘 */}
          <div className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400">
            <SearchIcon />
          </div>

          {/* 검색 입력창 */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="알림 검색..."
            className="w-full rounded-lg border border-gray-200 py-2 pr-10 pl-10 text-sm transition outline-none focus:border-gray-900"
          />

          {/* 검색어 지우기 버튼 (검색어가 있을 때만 표시) */}
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute top-1/2 right-1 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg hover:bg-gray-100"
            >
              <CloseIcon />
            </button>
          )}
        </div>

        {/* ========== 검색 결과 정보 ========== */}
        {searchQuery && (
          <p className="mb-4 text-sm text-gray-500">
            "{searchQuery}"에 대한 결과 {filteredNotifications.length}개
          </p>
        )}

        {/* ========== 탭 메뉴 (전체, 읽지 않음, 읽음) ========== */}
        <div className="mb-6">
          <div className="inline-flex rounded-lg bg-gray-100 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-md px-4 py-2 text-sm font-medium transition ${
                  activeTab === tab.id
                    ? "bg-white text-gray-900 shadow-sm"
                    : "text-gray-500 hover:text-gray-900"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* ========== 알림 목록 ========== */}
        <div className="flex flex-col gap-4">
          {/* 알림이 있을 때 */}
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onRead={handleMarkAsRead}
                formatDate={formatDate}
                formatFullDate={formatFullDate}
              />
            ))
          ) : (
            /* 알림이 없을 때 */
            <div className="py-12 text-center">
              {/* 빈 상태 아이콘 */}
              <div className="mb-4 flex justify-center text-gray-400">
                <EmptyIcon />
              </div>

              {/* 제목 */}
              <h3 className="mb-2 text-lg font-medium">
                {searchQuery ? "알림을 찾을 수 없음" : "알림 없음"}
              </h3>

              {/* 설명 메시지 */}
              <p className="mb-4 text-gray-500">
                {searchQuery
                  ? `"${searchQuery}"와(과) 일치하는 알림이 없습니다. 검색어를 조정해 보세요.`
                  : activeTab === "unread"
                    ? "모두 확인했습니다! 읽지 않은 알림이 없습니다."
                    : activeTab === "read"
                      ? "읽은 알림이 없습니다."
                      : "아직 알림이 없습니다."}
              </p>

              {/* 검색어 지우기 버튼 (검색 중일 때만 표시) */}
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium transition hover:bg-gray-100"
                >
                  검색 지우기
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
