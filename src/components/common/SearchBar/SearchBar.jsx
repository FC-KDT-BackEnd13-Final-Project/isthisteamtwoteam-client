/**
 * 공통 검색 바 컴포넌트
 * 
 * @param {string} value - 검색어 값
 * @param {function} onChange - 검색어 변경 핸들러
 * @param {string} placeholder - 플레이스홀더 (기본값: "검색어를 입력하세요")
 * @param {React.ReactNode} rightContent - 우측에 표시할 추가 컨텐츠 (선택)
 * @param {string} className - 추가 클래스명 (선택)
 */
export default function SearchBar({ 
  value, 
  onChange, 
  placeholder = "검색어를 입력하세요",
  rightContent,
  className = "",
}) {
  return (
    <div className={`mb-6 flex items-center justify-between gap-4 ${className}`}>
      <div className="relative flex-1">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-lg border border-gray-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500"
        />
        <svg
          className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      {rightContent}
    </div>
  );
}