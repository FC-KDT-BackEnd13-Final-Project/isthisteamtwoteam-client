import { InfoIcon, SuccessIcon, WarningIcon, ErrorIcon } from "./Icons";

// 알림 타입별 아이콘과 스타일 설정
const TYPE_CONFIG = {
  info: {
    icon: <InfoIcon />,
    iconColor: "text-blue-600",
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
  },
  success: {
    icon: <SuccessIcon />,
    iconColor: "text-green-600",
    badgeColor: "bg-green-100 text-green-800 border-green-300",
  },
  warning: {
    icon: <WarningIcon />,
    iconColor: "text-yellow-600",
    badgeColor: "bg-yellow-100 text-yellow-800 border-yellow-300",
  },
  error: {
    icon: <ErrorIcon />,
    iconColor: "text-red-600",
    badgeColor: "bg-red-100 text-red-800 border-red-300",
  },
};

/**
 * 알림 항목 컴포넌트
 *
 * 각각의 알림을 표시하는 컴포넌트입니다.
 * 클릭하면 읽음 처리됩니다.
 *
 * @param {object} notification - 알림 데이터
 * @param {string} notification.id - 알림 ID
 * @param {string} notification.title - 알림 제목
 * @param {string} notification.message - 알림 내용
 * @param {string} notification.type - 알림 타입 (info, success, warning, error)
 * @param {Date} notification.date - 알림 날짜
 * @param {boolean} notification.isRead - 읽음 여부
 * @param {function} onRead - 읽음 처리 함수
 * @param {function} formatDate - 상대 시간 포맷 함수 (예: "2시간 전")
 * @param {function} formatFullDate - 전체 날짜 포맷 함수 (예: "12월 2일 14:30")
 */
const NotificationItem = ({
  notification,
  onRead,
  formatDate,
  formatFullDate,
}) => {
  const config = TYPE_CONFIG[notification.type];

  return (
    <div
      onClick={() => onRead(notification.id)}
      className={`p-4 border rounded-lg cursor-pointer transition hover:shadow-md ${
        !notification.isRead
          ? "bg-blue-50 border-blue-200"
          : "bg-white border-gray-200"
      }`}
    >
      <div className="flex items-start gap-3">
        {/* 알림 타입 아이콘 (info, success, warning, error) */}
        <div className={`flex-shrink-0 mt-0.5 ${config.iconColor}`}>
          {config.icon}
        </div>

        {/* 알림 내용 */}
        <div className="flex-1 min-w-0">
          {/* 상단: 제목과 타입 배지 */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="flex items-center gap-2 flex-1">
              {/* 제목 - 읽지 않은 알림은 굵게 표시 */}
              <h4
                className={`text-sm truncate ${
                  !notification.isRead ? "font-medium" : ""
                }`}
              >
                {notification.title}
              </h4>

              {/* 타입 배지 (info, success, warning, error) */}
              <span
                className={`px-2 py-0.5 text-xs font-medium rounded border ${config.badgeColor}`}
              >
                {notification.type}
              </span>
            </div>

            {/* 읽지 않은 알림 표시 (파란색 점) */}
            {!notification.isRead && (
              <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2" />
            )}
          </div>

          {/* 알림 메시지 */}
          <p className="text-sm text-gray-500 leading-relaxed mb-3">
            {notification.message}
          </p>

          {/* 하단: 날짜 정보 */}
          <div className="flex items-center justify-between text-xs text-gray-400">
            {/* 상대 시간 (예: "2시간 전") */}
            <span>{formatDate(notification.date)}</span>
            {/* 전체 날짜 (예: "12월 2일 14:30") */}
            <span>{formatFullDate(notification.date)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
