import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createNewMember, getUserDetail, updateUser } from "../utils/config/api/usersApi";

export default function CreateUserPage() {
  const { userId } = useParams();
  const isEditMode = !!userId;

  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    company: "",
    role: "" // 👈 빈 문자열로 변경
  });

  useEffect(() => {
    fetchCompanies();
    if (isEditMode) {
      fetchUserDetail();
    }
  }, [userId]);

  const fetchUserDetail = async () => {
    try {
      const data = await getUserDetail(userId);
      setFormData({
        name: data.name,
        email: data.email,
        password: "",
        phone: data.phone,
        company: data.company,
        role: data.role
      });
    } catch (error) {
      alert("회원 정보를 불러올 수 없습니다.");
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/companies");
      const data = await response.json();
      if (data.success) {
        setCompanies(data.response);
      }
    } catch (error) {
      console.error("회사 목록 조회 실패:", error);
      alert("회사 목록을 불러올 수 없습니다.");
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 생성 모드일 때 검증
    if (!isEditMode) {
      if (!formData.name.trim()) {
        alert("이름을 입력해주세요.");
        return;
      }
      
      if (!formData.email.trim()) {
        alert("이메일을 입력해주세요.");
        return;
      }
      
      if (!formData.password.trim()) {
        alert("비밀번호를 입력해주세요.");
        return;
      }
      
      if (!formData.phone.trim()) {
        alert("전화번호를 입력해주세요.");
        return;
      }
      
      if (!formData.company) {
        alert("회사를 선택해주세요.");
        return;
      }
      
      if (!formData.role) {
        alert("권한을 선택해주세요.");
        return;
      }
    }
    
    // 수정 모드일 때 검증 (비밀번호, 회사, 역할 제외)
    if (isEditMode) {
      if (!formData.name.trim()) {
        alert("이름을 입력해주세요.");
        return;
      }
      
      if (!formData.email.trim()) {
        alert("이메일을 입력해주세요.");
        return;
      }
      
      if (!formData.phone.trim()) {
        alert("전화번호를 입력해주세요.");
        return;
      }
    }
    
    try {
      if (isEditMode) {
        await updateUser(userId, formData);
        alert("회원 정보가 수정되었습니다.");
      } else {
        await createNewMember(formData);
        alert("회원이 생성되었습니다.");
      }
      navigate("/user-management");
    } catch (error) {
      alert(isEditMode ? "회원 수정에 실패했습니다." : "회원 생성에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-2xl font-semibold text-gray-900">
          {isEditMode ? "회원 수정" : "회원 생성"}
        </h1>
        
        <form onSubmit={handleSubmit} className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              이름
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              이메일
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              비밀번호 {isEditMode && <span className="text-gray-400 text-xs">(변경 시에만 입력)</span>}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={isEditMode ? "변경하지 않으려면 비워두세요" : ""}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              전화번호
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="010-1234-5678"
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              회사
            </label>
            <select
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            >
              <option value="">회사를 선택하세요</option>
              {companies.map((company) => (
                <option key={company.id} value={company.name}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              역할
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            >
              <option value="">역할을 선택하세요</option>
              <option value="ADMIN">관리자</option>
              <option value="DEVELOPER">개발사</option>
              <option value="CLIENT">고객사</option>
            </select>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="submit"
              className="rounded-md bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
            >
              {isEditMode ? "수정" : "생성"}
            </button>
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-md border border-gray-300 bg-white px-6 py-2 text-gray-700 hover:bg-gray-50"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}