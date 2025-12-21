import { useState } from "react";
import Icon from "../components/common/icons/Icon";
import { useNavigate } from "react-router-dom";
import api from "../utils/config/api/axios";

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  /* =========================
     1️⃣ 인증 코드 발송
     ========================= */
  const handleSendCode = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await api.post("/password/find", { email });
      setSuccess("인증 코드가 이메일로 발송되었습니다.");
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || "인증 코드 발송 실패");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     2️⃣ 비밀번호 재설정
     ========================= */
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await api.post("/password/reset", {
        email,
        code,
        newPassword,
      });

      setSuccess("비밀번호가 성공적으로 변경되었습니다.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "비밀번호 재설정 실패");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 font-sans">
      <div className="w-full max-w-[400px] px-5">
        <h1 className="mb-10 text-center text-4xl font-semibold text-gray-800">
          Forgot Password
        </h1>

        {/* =========================
            STEP 1: 이메일 입력
           ========================= */}
        {step === 1 && (
          <form onSubmit={handleSendCode}>
            <div className="mb-5">
              <div className="relative flex items-center">
                <Icon
                  name="user"
                  size={20}
                  className="pointer-events-none absolute left-4 text-gray-400"
                />
                <input
                  type="email"
                  placeholder="EMAIL"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 py-4 pl-12 text-base focus:border-gray-500 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mb-5 w-full rounded-lg bg-blue-600 py-4 font-semibold text-white hover:bg-blue-700 transition"
            >
              {loading ? "전송 중..." : "인증 코드 보내기"}
            </button>
          </form>
        )}

        {/* =========================
            STEP 2: 코드 + 새 비밀번호
           ========================= */}
        {step === 2 && (
          <form onSubmit={handleResetPassword}>
            <div className="mb-5">
              <input
                type="text"
                placeholder="인증 코드"
                required
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full rounded-lg border border-gray-300 py-4 px-4 text-base"
              />
            </div>

            <div className="mb-5">
              <input
                type="password"
                placeholder="새 비밀번호"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 py-4 px-4 text-base"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mb-5 w-full rounded-lg bg-blue-600 py-4 font-semibold text-white hover:bg-blue-700 transition"
            >
              {loading ? "변경 중..." : "비밀번호 변경"}
            </button>
          </form>
        )}

        {/* 에러 / 성공 메시지 */}
        {error && (
          <div className="mt-4 rounded-lg bg-red-100 p-3 text-sm text-red-700">
            {error}
          </div>
        )}
        {success && (
          <div className="mt-4 rounded-lg bg-green-100 p-3 text-sm text-green-700">
            {success}
          </div>
        )}
      </div>
    </div>
  );
}
