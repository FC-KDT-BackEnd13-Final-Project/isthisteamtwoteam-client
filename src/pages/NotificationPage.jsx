import { useState, useMemo } from "react";

// 아이콘 컴포넌트
const Icons = {
  bell: (
    <svg
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      className="w-8 h-8"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
  ),
  search: (
    <svg
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  ),
  close: (
    <svg
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  ),
  check: (
    <svg
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      className="w-4 h-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 13l4 4L19 7"
      />
    </svg>
  ),
  info: (
    <svg
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  success: (
    <svg
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  warning: (
    <svg
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  ),
  error: (
    <svg
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  empty: (
    <svg
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      className="w-12 h-12"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M20 13.5v-8A2.5 2.5 0 0017.5 3h-11A2.5 2.5 0 004 5.5v8a2.5 2.5 0 002.5 2.5h11a2.5 2.5 0 002.5-2.5z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 8h16M8 21h8"
      />
    </svg>
  ),
};

// 타입별 스타일
const typeStyles = {
  info: {
    icon: "text-blue-600",
    badge: "bg-blue-100 text-blue-800 border-blue-300",
  },
  success: {
    icon: "text-green-600",
    badge: "bg-green-100 text-green-800 border-green-300",
  },
  warning: {
    icon: "text-yellow-600",
    badge: "bg-yellow-100 text-yellow-800 border-yellow-300",
  },
  error: {
    icon: "text-red-600",
    badge: "bg-red-100 text-red-800 border-red-300",
  },
};

// Mock 데이터
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

// 날짜 포맷 함수
function formatDate(date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}일 전`;
  if (hours > 0) return `${hours}시간 전`;
  return "방금 전";
}

function formatFullDate(date) {
  return date.toLocaleDateString("ko-KR", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

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
          n.message.toLowerCase().includes(query)
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
    [notifications]
  );

  // 읽음 처리
  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
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
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="text-gray-900">{Icons.bell}</div>
            <div>
              <h1 className="text-2xl font-medium">알림</h1>
              <p className="text-sm text-gray-500">최신 활동을 확인하세요</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {counts.unread > 0 && (
              <>
                <span className="px-3 py-1 text-xs font-medium rounded-lg bg-gray-900 text-white">
                  {counts.unread}개 읽지 않음
                </span>
                <button
                  onClick={handleMarkAllAsRead}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-100 transition"
                >
                  {Icons.check}
                  모두 읽음으로 표시
                </button>
              </>
            )}
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {Icons.search}
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="알림 검색..."
            className="w-full py-2 pl-10 pr-10 text-sm border border-gray-200 rounded-lg outline-none focus:border-gray-900 transition"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100"
            >
              {Icons.close}
            </button>
          )}
        </div>

        {/* Search Results Info */}
        {searchQuery && (
          <p className="mb-4 text-sm text-gray-500">
            "{searchQuery}"에 대한 결과 {filteredNotifications.length}개
          </p>
        )}

        {/* Tabs */}
        <div className="mb-6">
          <div className="inline-flex p-1 bg-gray-100 rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition ${
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

        {/* Notifications List */}
        <div className="flex flex-col gap-4">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => handleMarkAsRead(notification.id)}
                className={`p-4 border rounded-lg cursor-pointer transition hover:shadow-md ${
                  !notification.isRead
                    ? "bg-blue-50 border-blue-200"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div
                    className={`flex-shrink-0 mt-0.5 ${
                      typeStyles[notification.type].icon
                    }`}
                  >
                    {Icons[notification.type]}
                  </div>

                  {/* Body */}
                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <div className="flex items-center gap-2 flex-1">
                        <h4
                          className={`text-sm truncate ${
                            !notification.isRead ? "font-medium" : ""
                          }`}
                        >
                          {notification.title}
                        </h4>
                        <span
                          className={`px-2 py-0.5 text-xs font-medium rounded border ${
                            typeStyles[notification.type].badge
                          }`}
                        >
                          {notification.type}
                        </span>
                      </div>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2" />
                      )}
                    </div>

                    {/* Message */}
                    <p className="text-sm text-gray-500 leading-relaxed mb-3">
                      {notification.message}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>{formatDate(notification.date)}</span>
                      <span>{formatFullDate(notification.date)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 flex justify-center mb-4">
                {Icons.empty}
              </div>
              <h3 className="text-lg font-medium mb-2">
                {searchQuery ? "알림을 찾을 수 없음" : "알림 없음"}
              </h3>
              <p className="text-gray-500 mb-4">
                {searchQuery
                  ? `"${searchQuery}"와(과) 일치하는 알림이 없습니다. 검색어를 조정해 보세요.`
                  : activeTab === "unread"
                  ? "모두 확인했습니다! 읽지 않은 알림이 없습니다."
                  : activeTab === "read"
                  ? "읽은 알림이 없습니다."
                  : "아직 알림이 없습니다."}
              </p>
              {searchQuery && (
                <button
                  onClick={clearSearch}
                  className="px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-100 transition"
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
