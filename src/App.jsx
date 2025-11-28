import "./App.css";
import { Route, Routes } from "react-router-dom";
import ProjectPage from "./pages/ProjectPage";
import Layout from "./global/components/Layout";
import Login from "./pages/Login";
import FindPasswordPage from "./pages/FindPasswordPage";
import NotificationPage from "./pages/NotificationPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import UserManagementPage from "./pages/UserManagementPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <Routes>
      {/* Layout 없는 라우트 */}
      <Route path="/login" element={<Login />} />

      <Route path="/find-password" element={<FindPasswordPage />} />

      <Route path="/change-password" element={<ChangePasswordPage />} />

      {/* Layout 있는 라우트 */}
      <Route
        path="/*"
        element={
          <Layout>
            <Routes>
              <Route path="/" element={<ProjectPage />} />
              <Route path="/user-management" element={<UserManagementPage />} />

              <Route path="/notification" element={<NotificationPage />} />

              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
