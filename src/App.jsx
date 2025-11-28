import "./App.css";
import { Route, Routes } from "react-router-dom";
import ProjectPage from "./pages/ProjectPage";
import SidebarHeaderLayout from "./global/components/SidebarHeaderLayout";
import Login from "./pages/Login";
import FindPasswordPage from "./pages/FindPasswordPage";
import NotificationPage from "./pages/NotificationPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import UserManagementPage from "./pages/UserManagementPage";
import RegisterPage from "./pages/RegisterPage";
import DashBoard from "./pages/DashBoard";
import SidebarLayout from "./global/components/SidebarLayout";

function App() {
  return (
    <Routes>
      {/* Layout 없는 라우트 */}
      <Route path="/login" element={<Login />} />
      <Route path="/find-password" element={<FindPasswordPage />} />
      <Route path="/change-password" element={<ChangePasswordPage />} />
      <Route path="/dashboard" element={<DashBoard />} />

      {/* Sidebar + Header 레이아웃 */}
      <Route path="/" element={<SidebarHeaderLayout />}>
        <Route index element={<ProjectPage />} /> {/* / */}
        <Route path="notification" element={<NotificationPage />} />{" "}
        {/* /notification */}
      </Route>

      {/* Sidebar만 있는 레이아웃 */}
      <Route path="/project" element={<SidebarLayout />}>
        <Route path="user-management" element={<UserManagementPage />} />{" "}
        {/* /project/user-management */}
        <Route path="register" element={<RegisterPage />} />{" "}
        {/* /project/register */}
      </Route>
    </Routes>
  );
}

export default App;
