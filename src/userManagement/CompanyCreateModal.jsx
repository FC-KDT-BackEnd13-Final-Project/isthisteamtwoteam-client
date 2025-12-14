import { useState } from "react";
import CompanyMakeForm from "./CompanyMakeForm"; // ✅ CompanyMakeForm import

export default function CompanyCreateModal({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    companyName: "",
    companyAddress: "",
    ceoName: "",
    managerName: "",
    phoneNumber: "",
    businessNumber: "",
    companyPhone: "",      // ✅ 추가

  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      console.log('=== 회사 생성 데이터 ===');
      console.log(formData);
      
      await onSubmit(formData);
    } catch (error) {
      console.error('회사 생성 실패:', error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/50">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white shadow-xl">
        <div className="flex items-center justify-between border-b p-6">
          <h2 className="text-xl font-semibold">회사 생성</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            ✕
          </button>
        </div>

        {/* ✅ CompanyMakeForm 사용 */}
        <CompanyMakeForm
          mode="create"
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}