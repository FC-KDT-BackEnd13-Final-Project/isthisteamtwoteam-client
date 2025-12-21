/**
 * 공통 로딩 상태 컴포넌트
 * 
 * @param {string} message - 로딩 메시지 (기본값: "로딩 중...")
 * @param {string} size - 크기 (기본값: "default", "small" | "default" | "large")
 */
export default function LoadingState({ 
  message = "로딩 중...", 
  size = "default" 
}) {
  const sizeClasses = {
    small: "py-10",
    default: "py-20",
    large: "py-40",
  };

  return (
    <div className={`text-center text-gray-500 ${sizeClasses[size]}`}>
      <div className="mb-4 flex justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"></div>
      </div>
      <p className="text-[15px]">{message}</p>
    </div>
  );
}


