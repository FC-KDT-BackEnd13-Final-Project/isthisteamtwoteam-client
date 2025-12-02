/**
 * 날짜 관련 유틸리티 함수들
 *
 * 날짜를 사용자가 읽기 쉬운 형태로 변환하는 함수들입니다.
 */

/**
 * 상대 시간으로 변환
 *
 * 현재 시간과 비교하여 "방금 전", "2시간 전", "3일 전" 형태로 변환합니다.
 *
 * @param {Date} date - 변환할 날짜
 * @returns {string} 상대 시간 문자열 (예: "2시간 전", "3일 전")
 */
export function formatDate(date) {
  const now = new Date();
  const diff = now.getTime() - date.getTime(); // 밀리초 단위 차이

  const hours = Math.floor(diff / (1000 * 60 * 60)); // 시간 계산
  const days = Math.floor(hours / 24); // 일 계산

  // 1일 이상 지났으면 "n일 전"
  if (days > 0) return `${days}일 전`;

  // 1시간 이상 지났으면 "n시간 전"
  if (hours > 0) return `${hours}시간 전`;

  // 그 외에는 "방금 전"
  return "방금 전";
}

/**
 * 전체 날짜 포맷
 *
 * 날짜를 "12월 2일 14:30" 형태로 변환합니다.
 *
 * @param {Date} date - 변환할 날짜
 * @returns {string} 포맷된 날짜 문자열 (예: "12월 2일 14:30")
 */
export function formatFullDate(date) {
  return date.toLocaleDateString("ko-KR", {
    month: "short", // "12월"
    day: "numeric", // "2일"
    hour: "2-digit", // "14"
    minute: "2-digit", // "30"
  });
}
