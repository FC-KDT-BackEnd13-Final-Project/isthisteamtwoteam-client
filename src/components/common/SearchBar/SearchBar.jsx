import { Icons } from "../icons/GlobalIcon";

/**
 * 검색 바 컴포넌트
 *
 * 회원 ID, 이름, 이메일 등을 검색할 수 있는 입력창입니다.
 * 검색어를 입력하면 실시간으로 필터링됩니다.
 *
 * Props:
 * @param {string} value - 현재 검색어
 * @param {Function} onChange - 검색어 변경 시 실행할 함수
 * @param {Function} onCreateUser - "New Member" 버튼 클릭 시 실행할 함수
 *
 * 사용 예시:
 * <SearchBar
 *   value={searchQuery}
 *   onChange={(e) => setSearchQuery(e.target.value)}
 *   onCreateUser={() => console.log('새 회원 등록')}
 * />
 */
const SearchBar = ({ value, onChange, onCreateUser }) => {
  return (
    <div className="flex justify-between items-center mb-6 gap-4">
      {/* 검색 입력창 */}
      <div className="flex-1 max-w-[500px] relative">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Search for id, name, email"
          className="w-full py-3 px-5 pr-12 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 transition"
        />
        {/* 검색 아이콘 */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
          {Icons.search}
        </div>
      </div>

      {/* 새 회원 등록 버튼 */}
      <div className="flex gap-2">
        <button
          className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition"
          onClick={onCreateUser}
        >
          {Icons.plus}
          New Member
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
