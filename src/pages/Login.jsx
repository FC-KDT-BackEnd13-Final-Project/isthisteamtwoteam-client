import { useState } from "react";
import Icon from "../global/components/Icon";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center font-sans">
      <div className="w-full max-w-[400px] px-5">
        <h1
          className="text-center text-4xl font-semibold text-gray-800 mb-10"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Login
        </h1>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate("/");
          }}
        >
          <div className="mb-5">
            <div className="relative flex items-center">
              <Icon
                name="user"
                size={20}
                className="absolute left-4 text-gray-400 pointer-events-none"
              />
              <input
                type="text"
                placeholder="USERNAME"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full py-4 pr-5 pl-12 bg-white border border-gray-300 rounded-lg text-gray-800 text-base outline-none transition-all focus:border-gray-500"
              />
            </div>
          </div>

          <div className="mb-5">
            <div className="relative flex items-center">
              <Icon
                name="lock"
                size={20}
                className="absolute left-4 text-gray-400 pointer-events-none"
              />
              <input
                type="password"
                placeholder="PASSWORD"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full py-4 pr-5 pl-12 bg-white border border-gray-300 rounded-lg text-gray-800 text-base outline-none transition-all focus:border-gray-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-blue-600 border-none rounded-lg text-white text-base font-semibold uppercase tracking-wider cursor-pointer transition-all hover:bg-blue-700 hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 mb-5"
          >
            Login
          </button>

          <div className="text-center">
            <a
              href="#"
              className="text-gray-500 text-sm no-underline transition-colors hover:text-gray-800 hover:underline"
            >
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
