import "./App.css";
import { Route, Routes } from "react-router-dom";
import ProjectPage from "./pages/ProjectPage";
import SidebarHeaderLayout from "./global/components/SidebarHeaderLayout";
import Login from "./pages/Login";
import FindPasswordPage from "./pages/FindPasswordPage";
import NotificationPage from "./pages/NotificationPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import UserManagementPage from "./pages/UserManagementPage";
import DashBoard from "./pages/DashBoard";
import SidebarLayout from "./global/components/SidebarLayout";
import RequestPendingPage from "./pages/RequestPendingPage";
import CheckListPage from "./pages/ChecklistPage";
import RemoveProjectPage from "./pages/RemoveProjectPage";
import SettingPage from "./pages/SettingPage";

function App() {
  return (
    <Routes>
      {/* Layout 없는 라우트 */}
      <Route path="/login" element={<Login />} />
      <Route path="/find-password" element={<FindPasswordPage />} />
      <Route path="/change-password" element={<ChangePasswordPage />} />

      {/* Sidebar + Header 레이아웃 */}
      <Route path="/project" element={<SidebarHeaderLayout />}>
        <Route index element={<ProjectPage />} />
      </Route>

      {/* Sidebar만 있는 레이아웃 */}
      <Route path="/" element={<SidebarLayout />}>
        <Route index element={<DashBoard />} />
        <Route path="notification" element={<NotificationPage />} />
        <Route path="request-pending" element={<RequestPendingPage />} />
        <Route path="checklist" element={<CheckListPage />} />
        <Route path="user-management" element={<UserManagementPage />} />
        <Route path="remove-projects" element={<RemoveProjectPage />} />
        <Route path="settings" element={<SettingPage />} />
      </Route>
    </Routes>
  );
}

export default App;
