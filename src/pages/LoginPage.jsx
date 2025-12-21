import { useState } from "react";
import Icon from "../components/common/icons/Icon";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthConext";
import api from "../utils/config/api/axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  let navigate = useNavigate();
  const {login} = useAuth();

  // 로그인 처리 함수
  const handleLogin = async (e) => {
    e.preventDefault();

    // 에러 초기화
    setError("");

    // 로딩 시작
    setLoading(true);

    try {
      const response = await login({ 
        email,
        password 
      });

      const sessionRes = await api.get("/auth/session");
      const userRole = sessionRes.data.response.role; // "ADMIN"
      
      // role에 따라 다른 페이지로 이동
      if (userRole === 'ADMIN') {
        navigate("/"); // 관리자 대시보드
      } else if (userRole === 'DEVELOPER') {
        navigate("/developer/dashboard"); // 개발사 페이지
      } else if (userRole === 'CUSTOMER') {
        navigate("/customer/dashboard"); // 고객사 페이지
      }
      console.log("user.role", userRole)
      
    } catch (err) {
      setError(err.response?.data?.message || "로그인에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 font-sans">
      <div className="w-full max-w-[400px] px-5">
          <h1 className="mb-10 text-center text-4xl font-semibold text-gray-800">
          Login
        </h1>

        <form onSubmit={handleLogin}>
          <div className="mb-5">
            <div className="relative flex items-center">
              <Icon
                name="user"
                size={20}
                className="pointer-events-none absolute left-4 text-gray-400"
              />
              <input
                type="text"
                placeholder="EMAIL"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white py-4 pr-5 pl-12 text-base text-gray-800 transition-all outline-none focus:border-gray-500"
              />
            </div>
          </div>

          <div className="mb-5">
            <div className="relative flex items-center">
              <Icon
                name="lock"
                size={20}
                className="pointer-events-none absolute left-4 text-gray-400"
              />
              <input
                type="password"
                placeholder="PASSWORD"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-white py-4 pr-5 pl-12 text-base text-gray-800 transition-all outline-none focus:border-gray-500"
              />
            </div>
          </div>

          {/* 에러 메세지 표시 */}
          {error && (
            <div className="mb-4 rounded-lg border border-red-400 bg-red-100 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading} // 로딩 중 비활성화
            className={`mb-5 w-full cursor-pointer rounded-lg border-none bg-blue-600 py-4 text-base font-semibold tracking-wider text-white uppercase transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg active:translate-y-0 ${
              loading
                ? "cursor-not-allowed bg-gray-400"
                : "bg-blue-600 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lg active:translate-y-0"
            }`}
          >
            {loading ? "로그인 중" : "Login"}
          </button>

          <div className="text-center">
            <a
              href="#"
              className="text-sm text-gray-500 no-underline transition-colors hover:text-gray-800 hover:underline"
            >
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
