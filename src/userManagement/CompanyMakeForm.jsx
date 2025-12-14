export default function CompanyMakeForm({
  mode,
  handleSubmit,
  formData,
  handleChange,
}) {
  // ✅ 폼 제출 전 유효성 검사
  const handleFormSubmit = (e) => {
    e.preventDefault();

    // 필수 필드 검증
    if (!formData.companyName?.trim()) {
      alert("회사명을 입력해주세요.");
      return;
    }

    if (!formData.managerName?.trim()) {
      alert("담당자명을 입력해주세요.");
      return;
    }

    if (!formData.phoneNumber?.trim()) {
      alert("담당자 전화번호를 입력해주세요.");
      return;
    }

    // 유효성 검사 통과 시 실제 제출
    handleSubmit(e);
  };

  return (
    <>
      {/* Form Area */}
      <div className="p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">회사 정보</h2>
        <p className="text-sm text-gray-400 mb-6 leading-relaxed">
          회사의 기본 정보를 입력해주세요.
        </p>

        <form onSubmit={handleFormSubmit}>
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              회사명 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName || ""}
              onChange={handleChange}
              placeholder="회사명을 입력하세요"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 transition"
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              주소
            </label>
            <input
              type="text"
              name="companyAddress"
              value={formData.companyAddress || ""}
              onChange={handleChange}
              placeholder="회사주소를 입력하세요"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 transition"
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              대표
            </label>
            <input
              type="text"
              name="ceoName"
              value={formData.ceoName || ""}
              onChange={handleChange}
              placeholder="회사대표를 입력하세요"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 transition"
            />
          </div>

          {/* ✅ 회사 전화번호 추가 */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              회사 전화번호
            </label>
            <input
              type="text"
              name="companyPhone"
              value={formData.companyPhone || ""}
              onChange={handleChange}
              placeholder="회사 전화번호를 입력하세요"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 transition"
            />
          </div>

          <div className="grid grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                담당자 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="managerName"
                value={formData.managerName || ""}
                onChange={handleChange}
                placeholder="담당자명을 입력하세요"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                담당자 전화번호 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber || ""}
                onChange={handleChange}
                placeholder="전화번호를 입력하세요"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 transition"
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              사업자등록증
            </label>
            <input
              type="text"
              name="businessNumber"
              value={formData.businessNumber || ""}
              onChange={handleChange}
              placeholder="사업자등록번호를 입력하세요"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 transition"
            />
          </div>

          <div className="flex justify-start">
            <button
              type="submit"
              className="w-[200px] py-3.5 mt-5 bg-blue-500 text-white text-[15px] font-semibold rounded-lg hover:bg-blue-600 transition"
            >
              {mode === "create" ? "생성" : "수정"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}