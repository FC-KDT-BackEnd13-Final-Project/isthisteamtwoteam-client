import { useState } from "react";
import Icon from "../../../shared/ui/Icon/Icon";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  let navigate = useNavigate();

  // 로그인 처리 함수
  const handleLogin = async (e) => {
    e.preventDefault();

    // 에러 초기화
    setError("");

    // 로딩 시작
    setLoading(true);

    try {
      // TODO: 여기에 API 호출 추가 예정
      console.log("로그인 시도:", { username, password });

      // 임시: 2초 후 성공한 것 처럼 처리
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (username === "test" && password === "1234") {
        // 성공시 홈으로 이동
        navigate("/");
      } else {
        throw new Error("아이디 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch (err) {
      // 에러 처리
      setError("로그인에 실패했습니다. 다시 시도해주세요");
      console.error("로그인 에러:", err);
    } finally {
      // 로딩 종료
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 font-sans">
      <div className="w-full max-w-[400px] px-5">
        <h1
          className="mb-10 text-center text-4xl font-semibold text-gray-800"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
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
                placeholder="USERNAME"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
