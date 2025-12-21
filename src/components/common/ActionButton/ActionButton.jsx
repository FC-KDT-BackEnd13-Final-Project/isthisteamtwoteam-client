/**
 * 공통 액션 버튼 컴포넌트
 * 
 * @param {string} variant - 버튼 스타일 ("edit" | "delete" | "custom")
 * @param {string} label - 버튼 텍스트
 * @param {function} onClick - 클릭 핸들러
 * @param {boolean} disabled - 비활성화 여부
 * @param {React.ReactNode} icon - 아이콘 (선택)
 * @param {string} className - 추가 클래스명 (선택)
 */
export default function ActionButton({
  variant = "edit",
  label,
  onClick,
  disabled = false,
  icon,
  className = "",
}) {
  const baseClasses = "flex items-center gap-1 rounded border px-3 py-1.5 text-xs font-medium transition-colors";
  
  const variantClasses = {
    edit: "border-gray-300 bg-white text-blue-500 hover:border-blue-500 hover:bg-blue-50",
    delete: "border-gray-300 bg-white text-red-500 hover:border-red-500 hover:bg-red-50",
    custom: "",
  };

  const defaultIcons = {
    edit: (
      <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
      </svg>
    ),
    delete: (
      <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
        <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
      </svg>
    ),
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {icon || defaultIcons[variant]}
      {label}
    </button>
  );
}


