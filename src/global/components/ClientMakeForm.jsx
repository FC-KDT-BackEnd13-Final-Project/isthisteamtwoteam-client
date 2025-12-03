import { useState, useRef, useEffect } from "react";

export default function ClientMakeForm({
  handleSubmit,
  formData,
  handleChange,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // 회사 목록 (실제로는 API에서 받아올 데이터)
  const companies = [
    { id: "company1", name: "삼성전자" },
    { id: "company2", name: "LG전자" },
    { id: "company3", name: "현대자동차" },
    { id: "company4", name: "SK하이닉스" },
    { id: "company5", name: "네이버" },
    { id: "company6", name: "카카오" },
    { id: "company7", name: "포스코" },
    { id: "company8", name: "한화그룹" },
    { id: "company9", name: "롯데그룹" },
    { id: "company10", name: "GS그룹" },
  ];

  // 검색어로 필터링된 회사 목록
  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 회사 선택 핸들러
  const handleSelectCompany = (company) => {
    setSelectedCompany(company.name);
    setSearchTerm(company.name);
    setIsDropdownOpen(false);

    // formData에 회사 정보 저장 (필요시)
    // handleChange를 사용하려면 이벤트 객체 형태로 전달
    const event = {
      target: {
        name: "companyId",
        value: company.id,
      },
    };
    handleChange(event);
  };

  // Enter 키로 첫 번째 결과 선택
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && filteredCompanies.length > 0) {
      e.preventDefault();
      handleSelectCompany(filteredCompanies[0]);
    }
  };

  return (
    <div className="p-8">
      <h2 className="mb-2 text-xl font-semibold text-gray-900">
        고객사 회원 정보
      </h2>
      <p className="mb-6 text-sm leading-relaxed text-gray-400">
        회원의 기본 정보를 입력해주세요.
      </p>

      <form onSubmit={handleSubmit}>
        {/* 이름 */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            이름
          </label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            placeholder="이름을 입력하세요"
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm transition outline-none focus:border-blue-500"
          />
        </div>

        {/* 회사 목록 (검색 가능) */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            회사명
          </label>
          <div className="relative">
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsDropdownOpen(true);
              }}
              onFocus={() => setIsDropdownOpen(true)}
              onKeyDown={handleKeyDown}
              placeholder="회사를 검색하세요"
              autoComplete="off"
              className="w-full cursor-pointer rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm transition outline-none focus:border-blue-500"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23999' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 16px center",
              }}
            />

            {/* 드롭다운 */}
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute top-full right-0 left-0 z-50 mt-1 max-h-[250px] overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg"
              >
                {filteredCompanies.length > 0 ? (
                  filteredCompanies.map((company) => (
                    <div
                      key={company.id}
                      onClick={() => handleSelectCompany(company)}
                      className={`cursor-pointer px-4 py-3 text-sm transition hover:bg-gray-50 ${
                        selectedCompany === company.name
                          ? "bg-blue-50 font-medium text-blue-600"
                          : "text-gray-700"
                      }`}
                    >
                      {company.name}
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-center text-sm text-gray-400">
                    검색 결과가 없습니다
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 전화번호 */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            전화번호
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
            placeholder="전화번호를 입력하세요"
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm transition outline-none focus:border-blue-500"
          />
        </div>

        {/* 이메일 */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            이메일
          </label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            placeholder="이메일을 입력하세요"
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm transition outline-none focus:border-blue-500"
          />
        </div>

        {/* 비밀번호 */}
        <div className="mb-5">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            비밀번호
          </label>
          <input
            type="password"
            name="password"
            value={formData.password || ""}
            onChange={handleChange}
            placeholder="비밀번호를 입력하세요"
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm transition outline-none focus:border-blue-500"
          />
        </div>

        {/* 생성 버튼 */}
        <button
          type="submit"
          className="mt-5 w-[200px] rounded-lg bg-blue-500 py-3.5 text-[15px] font-semibold text-white transition hover:bg-blue-600"
        >
          생성
        </button>
      </form>
    </div>
  );
}
