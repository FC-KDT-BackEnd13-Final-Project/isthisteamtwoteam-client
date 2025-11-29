import { useState } from "react";
import CompanyMakeForm from "./CompanyMakeForm";
import ClientMakeForm from "./ClientMakeForm";
import DeveloperMakeForm from "./developerMakeForm";

export default function UserFormModal({
  mode = "create",
  initialData = null,
  activeTab,
  onClose,
  onSubmit,
}) {
  // 탭별 초기 formData 생성
  const getInitialFormData = () => {
    console.log(initialData);
    if (initialData) return initialData;

    const base = { id: "1", type: activeTab };

    switch (activeTab) {
      case "developer":
        return { ...base, name: "", position: "", email: "", phone: "" };
      case "client":
        return {
          ...base,
          name: "",
          companyName: "",
          email: "",
          phone: "",
        };
      case "company":
        return {
          ...base,
          companyName: "",
          companyAddress: "",
          ceoName: "",
          managerName: "",
          phone: "",
          businessNumber: "",
        };
      default:
        return base;
    }
  };

  const [formData, setFormData] = useState(getInitialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
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
            mode={mode}
            handleSubmit={handleSubmit}
            formData={formData}
            handleChange={handleChange}
          />
        )}

        {activeTab === "client" && (
          <ClientMakeForm
            mode={mode}
            handleSubmit={handleSubmit}
            formData={formData}
            handleChange={handleChange}
          />
        )}

        {activeTab === "company" && (
          <CompanyMakeForm
            mode={mode}
            handleSubmit={handleSubmit}
            formData={formData}
            handleChange={handleChange}
          />
        )}
      </div>
    </div>
  );
}
