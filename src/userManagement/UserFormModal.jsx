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
    company: "",
    role: ""
  });

  // ✅ activeTab에 따라 기본 role 반환하는 함수
  const getDefaultRole = (tab) => {
    switch(tab) {
      case "developer":
        return "DEVELOPER"; // 백엔드 형식에 맞춰서 수정하세요
      case "customer":
        return "CUSTOMER";
      case "company":
        return "COMPANY";
      default:
        return "";
    }
  };

  // initialData가 있을 때 (수정 모드) 또는 생성 모드
  useEffect(() => {
    if (initialData) {
      // 수정 모드
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        password: "", // 수정 시 비밀번호는 비워둠
        phone: initialData.phone || "",
        companyId: initialData.companyId || "",
        company: initialData.companyName || "",
        role: initialData.role || getDefaultRole(activeTab) // ✅ role이 없으면 activeTab 기반으로 설정
      });
    } else {
      // 생성 모드일 때도 activeTab 기반으로 role 설정
      setFormData(prev => ({
        ...prev,
        role: getDefaultRole(activeTab) // ✅ 생성 모드에서도 기본값 설정
      }));
    }
  }, [initialData, activeTab]); // ✅ activeTab도 dependency에 추가

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