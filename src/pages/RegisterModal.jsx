import { useState } from "react";

export default function RegisterModal({ isOpen, onClose, activeTab }) {
  const [currentTab, setCurrentTab] = useState(activeTab || "developer");
  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress: "",
    ceoName: "",
    managerName: "",
    phoneNumber: "",
    businessNumber: "",
  });

  const tabs = [
    { id: "developer", label: "개발사", count: 441 },
    { id: "client", label: "고객사", count: 100 },
    { id: "company", label: "회사", count: 300 },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("회원 등록:", formData);
    // API 호출 후
    onClose(); // 모달 닫기
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 배경 어둡게 */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* 모달 컨텐츠 */}
      <div className="relative bg-white rounded-xl max-w-[900px] w-full max-h-[90vh] overflow-y-auto mx-4">
        {/* 닫음 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 text-2xl"
        >
          x
        </button>

        {/* Tabs */}
        <div className="flex bg-gray-50 px-8 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`px-8 py-[18px] text-[15px] font-medium relative transition-all ${
                activeTab === tab.id
                  ? "text-blue-500 bg-blue-50"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.label} ({tab.count})
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-500" />
              )}
            </button>
          ))}
        </div>

        {/* Form Area */}
        <div className="p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            회원 정보
          </h2>
          <p className="text-sm text-gray-400 mb-6 leading-relaxed">
            회원의 기본 정보를 입력해주세요.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                회사명
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="회사명을 입력하세요"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 transition"
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                회사주소
              </label>
              <input
                type="text"
                name="companyAddress"
                value={formData.companyAddress}
                onChange={handleChange}
                placeholder="회사주소를 입력하세요"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 transition"
              />
            </div>

            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                회사대표
              </label>
              <input
                type="text"
                name="ceoName"
                value={formData.ceoName}
                onChange={handleChange}
                placeholder="회사대표를 입력하세요"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 transition"
              />
            </div>

            <div className="grid grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  회사 담당자
                </label>
                <input
                  type="text"
                  name="managerName"
                  value={formData.managerName}
                  onChange={handleChange}
                  placeholder="담당자명을 입력하세요"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  담당자 전화번호
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
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
                value={formData.businessNumber}
                onChange={handleChange}
                placeholder="사업자등록번호를 입력하세요"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg text-sm outline-none focus:border-blue-500 transition"
              />
            </div>

            <button
              type="submit"
              className="w-[200px] py-3.5 mt-5 bg-blue-500 text-white text-[15px] font-semibold rounded-lg hover:bg-blue-600 transition"
            >
              생성
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
