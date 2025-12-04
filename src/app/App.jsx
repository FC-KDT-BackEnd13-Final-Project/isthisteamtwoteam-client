import "./App.css";
import { Route, Routes } from "react-router-dom";
import ProjectPage from "../pages/project/ui/ProjectPage";
import SidebarHeaderLayout from "../shared/layouts/SidebarHeaderLayout";
import LoginPage from "../pages/login/ui/LoginPage";
import FindPasswordPage from "../pages/find-password/ui/FindPasswordPage";
import NotificationPage from "../pages/notification/ui/NotificationPage";
import ChangePasswordPage from "../pages/change-password/ui/ChangePasswordPage";
import UserManagementPage from "../pages/user-management/ui/UserManagementPage";
import DashboardPage from "../pages/dashboard/ui/DashboardPage";
import SidebarLayout from "../shared/layouts/SidebarLayout";
import RequestPendingPage from "../pages/request-pending/ui/RequestPendingPage";
import RemoveProjectPage from "../pages/remove-project/ui/RemoveProjectPage";
import CheckListPage from "../pages/checklist/ui/CheckListPage";
import BoardPage from "../pages/board/ui/BoardPage";

function App() {
  return (
    <Routes>
      {/* Layout 없는 라우트 */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/find-password" element={<FindPasswordPage />} />

      {/* Sidebar + Header 레이아웃 */}
      <Route path="/project" element={<SidebarHeaderLayout />}>
        <Route path=":projectId" element={<ProjectPage />} />
        <Route path="board" element={<BoardPage />} />
      </Route>

      {/* Sidebar만 있는 레이아웃 */}
      <Route path="/" element={<SidebarLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="notification" element={<NotificationPage />} />
        <Route path="request-pending" element={<RequestPendingPage />} />
        <Route path="checklist" element={<CheckListPage />} />
        <Route path="user-management" element={<UserManagementPage />} />
        <Route path="remove-projects" element={<RemoveProjectPage />} />
        <Route path="change-password" element={<ChangePasswordPage />} />
      </Route>
    </Routes>
  );
}

export default App;
