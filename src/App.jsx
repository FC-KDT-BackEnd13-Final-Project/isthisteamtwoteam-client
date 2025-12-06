import "../styles/App.css";
import { Route, Routes } from "react-router-dom";
import SidebarHeaderLayout from "./components/layout/SidebarHeaderLayout";
import SidebarLayout from "./components/layout/SidebarLayout";
import BoardPage from "./pages/BoardPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import CheckListPage from "./pages/CheckListPage";
import DashboardPage from "./pages/DashboardPage";
import FindPasswordPage from "./pages/FindPasswordPage";
import LoginPage from "./pages/LoginPage";
import NotificationPage from "./pages/NotificationPage";
import PostHistoryPage from "./pages/PostHistoryPage";
import ProjectHistoryPage from "./pages/ProjectHistoryPage";
import ProjectPage from "./pages/ProjectPage";
import RemoveProjectPage from "./pages/RemoveProjectPage";
import RequestPendingPage from "./pages/RequestPendingPage";
import UserManagementPage from "./pages/UserManagementPage";

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
        <Route path="board/history/:boardId" element={<PostHistoryPage />} />
        <Route
          path="project-history/:projectId"
          element={<ProjectHistoryPage />}
        />
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
