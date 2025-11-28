import { useState } from "react";
import CompanyMakeForm from "./CompanyMakeForm";
import ClientMakeForm from "./ClientMakeForm";
import DeveloperMakeForm from "./developerMakeForm";

export default function RegisterModal({ onClose, activeTab }) {
  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress: "",
    ceoName: "",
    managerName: "",
    phoneNumber: "",
    businessNumber: "",
  });

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
        {/* 탭별 폼 렌더링 */}
        {activeTab === "developer" && (
          <DeveloperMakeForm
            handleSubmit={handleSubmit}
            formData={formData}
            handleChange={handleChange}
          />
        )}

        {activeTab === "client" && (
          <ClientMakeForm
            handleSubmit={handleSubmit}
            formData={formData}
            handleChange={handleChange}
          />
        )}

        {activeTab === "company" && (
          <CompanyMakeForm
            handleSubmit={handleSubmit}
            formData={formData}
            handleChange={handleChange}
          />
        )}
      </div>
    </div>
  );
}
