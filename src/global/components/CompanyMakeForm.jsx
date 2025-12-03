export default function CompanyMakeForm({
  mode,
  handleSubmit,
  formData,
  handleChange,
}) {
  return (
    <>
      {/* Form Area */}
      <div className="p-8">
        <h2 className="mb-2 text-xl font-semibold text-gray-900">회사 정보</h2>
        <p className="mb-6 text-sm leading-relaxed text-gray-400">
          회원의 기본 정보를 입력해주세요.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              회사명
            </label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="회사명을 입력하세요"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm transition outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              주소
            </label>
            <input
              type="text"
              name="companyAddress"
              value={formData.companyAddress}
              onChange={handleChange}
              placeholder="회사주소를 입력하세요"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm transition outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              대표
            </label>
            <input
              type="text"
              name="ceoName"
              value={formData.ceoName}
              onChange={handleChange}
              placeholder="회사대표를 입력하세요"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm transition outline-none focus:border-blue-500"
            />
          </div>

          <div className="mb-5 grid grid-cols-2 gap-5">
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                담당자
              </label>
              <input
                type="text"
                name="managerName"
                value={formData.managerName}
                onChange={handleChange}
                placeholder="담당자명을 입력하세요"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm transition outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                담당자 전화번호
              </label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="전화번호를 입력하세요"
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm transition outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="mb-5">
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              사업자등록증
            </label>
            <input
              type="text"
              name="businessNumber"
              value={formData.businessNumber}
              onChange={handleChange}
              placeholder="사업자등록번호를 입력하세요"
              className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm transition outline-none focus:border-blue-500"
            />
          </div>

          {mode === "create" ? (
            <button
              type="submit"
              className="mt-5 w-[200px] rounded-lg bg-blue-500 py-3.5 text-[15px] font-semibold text-white transition hover:bg-blue-600"
            >
              생성
            </button>
          ) : (
            <button
              type="submit"
              className="mt-5 w-[200px] rounded-lg bg-blue-500 py-3.5 text-[15px] font-semibold text-white transition hover:bg-blue-600"
            >
              수정
            </button>
          )}
        </form>
      </div>
    </>
  );
}
