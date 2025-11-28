import { useState } from "react";

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    // 비밀번호 변경 API 호출
    console.log("비밀번호 변경 요청");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center font-sans">
      <div className="w-full max-w-[400px] px-5">
        <h1 className="text-center text-4xl font-semibold text-gray-800 mb-10">
          Change Password
        </h1>

        <form onSubmit={handleSubmit}>
          {/* 현재 비밀번호 */}
          <div className="mb-5">
            <div className="relative flex items-center">
              <svg
                className="absolute left-[18px] text-gray-400 pointer-events-none"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                type="password"
                placeholder="CURRENT PASSWORD"
                required
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full py-4 pr-5 pl-[50px] bg-white border border-gray-300 rounded-lg text-gray-800 text-base outline-none transition-all focus:border-gray-500"
              />
            </div>
          </div>

          {/* 새 비밀번호 */}
          <div className="mb-5">
            <div className="relative flex items-center">
              <svg
                className="absolute left-[18px] text-gray-400 pointer-events-none"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                type="password"
                placeholder="NEW PASSWORD"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full py-4 pr-5 pl-[50px] bg-white border border-gray-300 rounded-lg text-gray-800 text-base outline-none transition-all focus:border-gray-500"
              />
            </div>
          </div>

          {/* 비밀번호 확인 */}
          <div className="mb-5">
            <div className="relative flex items-center">
              <svg
                className="absolute left-[18px] text-gray-400 pointer-events-none"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                type="password"
                placeholder="CONFIRM PASSWORD"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full py-4 pr-5 pl-[50px] bg-white border border-gray-300 rounded-lg text-gray-800 text-base outline-none transition-all focus:border-gray-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 mt-2.5 bg-blue-600 border-none rounded-lg text-white text-base font-semibold uppercase tracking-wider cursor-pointer transition-all hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-600/30 active:translate-y-0"
          >
            Change
          </button>
        </form>
      </div>
    </div>
  );
}
