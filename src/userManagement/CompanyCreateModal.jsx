import { useState, useRef, useEffect } from "react";
import { getCompanies } from "../utils/api/dashboardApi";

export default function CustomerMakeForm({
  handleSubmit,
  formData,
  handleChange,
  mode
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const roleDropdownRef = useRef(null);

  const roles = [
    { value: "ADMIN", label: "관리자" },
    { value: "DEVELOPER", label: "개발자" },
    { value: "CUSTOMER", label: "고객사" }
  ];

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const data = await getCompanies();
        setCompanies(data);
        setLoading(false);
      } catch (error) {
        console.error("회사 목록 조회 실패:", error);
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      
      if (
        roleDropdownRef.current &&
        !roleDropdownRef.current.contains(event.target)
      ) {
        setIsRoleDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectCompany = (company) => {
    setSelectedCompany(company.name);
    setSearchTerm(company.name);
    setIsDropdownOpen(false);

    const event = {
      target: {
        name: "companyId",
        value: company.id,
      },
    };
    handleChange(event);
  };

  const handleSelectRole = (roleValue) => {
    const event = {
      target: {
        name: "role",
        value: roleValue,
      },
    };
    handleChange(event);
    setIsRoleDropdownOpen(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && filteredCompanies.length > 0) {
      e.preventDefault();
      handleSelectCompany(filteredCompanies[0]);
    }
  };

  const selectedRoleLabel = roles.find(r => r.value === formData.role)?.label || "권한 선택";

  // 폼 제출 전 검증
  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // 필수 필드 검증
    if (!formData.name || !formData.email || !formData.phone || !formData.companyId || !formData.role) {
      alert("모든 필드를 입력해주세요.");
      return;
    }
    
    // 생성 모드일 때만 비밀번호 필수
    if (mode === "create" && !formData.password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    
    handleSubmit(e);
  };

  return (
    <div className="p-8">
      <h2 className="mb-2 text-xl font-semibold text-gray-900">고객사 회원 정보</h2>
      <p className="mb-6 text-sm leading-relaxed text-gray-400">
        회원의 기본 정보를 입력해주세요.
      </p>

      <form onSubmit={handleFormSubmit}>
        <div className="mb-5">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            이름 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            placeholder="이름을 입력하세요"
            required
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
          />
        </div>

        <div className="mb-5">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            회사 <span className="text-red-500">*</span>
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
              placeholder={loading ? "회사 목록 불러오는 중..." : "회사를 검색하세요"}
              autoComplete="off"
              disabled={loading}
              required
              className="w-full cursor-pointer rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 disabled:bg-gray-50"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23999' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 16px center",
              }}
            />

            {isDropdownOpen && !loading && (
              <div
                ref={dropdownRef}
                className="absolute left-0 right-0 top-full z-50 mt-1 max-h-[250px] overflow-y-auto rounded-lg border border-gray-200 bg-white shadow-lg"
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

        <div className="mb-5">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            권한 <span className="text-red-500">*</span>
          </label>
          <div className="relative" ref={roleDropdownRef}>
            <input type="hidden" name="role" value={formData.role} required />
            <button
              type="button"
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="w-full cursor-pointer rounded-lg border border-gray-200 bg-white px-4 py-3 text-left text-sm outline-none transition focus:border-blue-500"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23999' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 16px center",
              }}
            >
              <span className={formData.role ? "text-gray-900" : "text-gray-400"}>
                {selectedRoleLabel}
              </span>
            </button>

            {isRoleDropdownOpen && (
              <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-lg border border-gray-200 bg-white shadow-lg">
                {roles.map((role) => (
                  <div
                    key={role.value}
                    onClick={() => handleSelectRole(role.value)}
                    className={`cursor-pointer px-4 py-3 text-sm transition hover:bg-gray-50 ${
                      formData.role === role.value
                        ? "bg-blue-50 font-medium text-blue-600"
                        : "text-gray-700"
                    }`}
                  >
                    {role.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="mb-5">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            전화번호 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
            placeholder="전화번호를 입력하세요"
            required
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
          />
        </div>

        <div className="mb-5">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            이메일 <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            placeholder="이메일을 입력하세요"
            required
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
          />
        </div>

        <div className="mb-5">
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            비밀번호 {mode === "edit" ? <span className="text-gray-400 text-xs">(변경 시에만 입력)</span> : <span className="text-red-500">*</span>}
          </label>
          <input
            type="password"
            name="password"
            value={formData.password || ""}
            onChange={handleChange}
            placeholder={mode === "edit" ? "변경하지 않으려면 비워두세요" : "비밀번호를 입력하세요"}
            required={mode === "create"}
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="w-[200px] rounded-lg bg-blue-500 py-3.5 text-[15px] font-semibold text-white transition hover:bg-blue-600"
          >
            {mode === "edit" ? "수정" : "생성"}
          </button>
        </div>
      </form>
    </div>
  );
}