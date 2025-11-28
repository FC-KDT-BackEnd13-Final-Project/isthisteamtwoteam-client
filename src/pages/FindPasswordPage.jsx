import { useState } from "react";

export default function FindPasswordPage() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSendCode = () => {
    // 이메일로 인증코드 발송 로직
    console.log("인증코드 발송:", email);
  };

  const handleVerifyCode = () => {
    // 인증코드 확인 로직
    console.log("인증코드 확인:", verificationCode);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 비밀번호 변경 로직
    console.log("비밀번호 변경 요청");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center font-sans">
      <div className="w-full max-w-[500px] px-5">
        <h1 className="text-center text-4xl font-semibold text-gray-800 mb-10">
          Find Password
        </h1>

        <form onSubmit={handleSubmit}>
          {/* 이메일 입력 */}
          <div className="mb-5">
            <div className="relative flex items-center gap-2.5">
              <svg
                className="absolute left-[18px] text-gray-400 pointer-events-none"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 py-4 pr-5 pl-[50px] bg-white border border-gray-300 rounded-lg text-gray-800 text-base outline-none transition-all focus:border-gray-500"
              />
              <button
                type="button"
                onClick={handleSendCode}
                className="py-4 px-6 bg-white border border-gray-300 rounded-lg text-gray-800 text-sm font-semibold cursor-pointer transition-all hover:bg-gray-100 hover:border-gray-500 whitespace-nowrap"
              >
                Send
              </button>
            </div>
          </div>

          {/* 인증코드 입력 */}
          <div className="mb-5">
            <div className="relative flex items-center gap-2.5">
              <svg
                className="absolute left-[18px] text-gray-400 pointer-events-none"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
              <input
                type="text"
                placeholder="VERIFICATION CODE"
                required
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                className="flex-1 py-4 pr-5 pl-[50px] bg-white border border-gray-300 rounded-lg text-gray-800 text-base outline-none transition-all focus:border-gray-500"
              />
              <button
                type="button"
                onClick={handleVerifyCode}
                className="py-4 px-6 bg-white border border-gray-300 rounded-lg text-gray-800 text-sm font-semibold cursor-pointer transition-all hover:bg-gray-100 hover:border-gray-500 whitespace-nowrap"
              >
                Verify
              </button>
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
