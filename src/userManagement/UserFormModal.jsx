import { useState, useEffect } from "react";
import CompanyMakeForm from "./CompanyMakeForm";
import DeveloperMakeForm from "./developerMakeForm";
import CustomerMakeForm from "./CustomerMakeForm";

export default function UserFormModal({ mode, initialData, activeTab, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    company: "", // 👈 개발사용 companyName 추가
    role: ""
  });

  // initialData가 있을 때 (수정 모드)
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        password: "", // 수정 시 비밀번호는 비워둠
        phone: initialData.phone || "",
        companyId: initialData.companyId || "",
        companyName: initialData.companyName || "", // 👈 companyName 설정
        role: initialData.role || ""
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // 수정 모드에서 비밀번호가 비어있으면 제외
      const submitData = { ...formData };
      
      if (mode === "edit" && !submitData.password) {
        delete submitData.password;
      }

      console.log('=== 폼 제출 데이터 ===');
      console.log('모드:', mode);
      console.log('activeTab:', activeTab);
      console.log('제출 데이터:', submitData);
      
      await onSubmit(submitData);
    } catch (error) {
      console.error('Submit 실패:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/50">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-xl font-semibold">
            {mode === "create" ? "회원 생성" : "회원 수정"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        {activeTab === "customer" && (
          <CustomerMakeForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            mode={mode}
          />
        )}
        {activeTab === "developer" && (
          <DeveloperMakeForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            mode={mode}
          />
        )}
        {activeTab === "company" && (
          <CompanyMakeForm
            formData={formData}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            mode={mode}
          />
        )}
      </div>
    </div>
  );
}