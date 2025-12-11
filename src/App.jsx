// src/App.jsx
import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import SidebarHeaderLayout from "./components/layout/SidebarHeaderLayout";
import SidebarLayout from "./components/layout/SidebarLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Pages
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
import CreateProjectPage from "./pages/Createprojectpage";
import UserManagementPage from "./pages/UserManagementPage"

function App() {
  return (
    <Routes>
      {/* 로그인 페이지 */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/find-password" element={<FindPasswordPage />} />

      {/* ========== 관리자 전용 페이지 ========== */}
      <Route path="/" element={
        <ProtectedRoute allowedRoles={['ADMIN']}>
          <SidebarLayout />
        </ProtectedRoute>
      }>
        <Route index element={<DashboardPage />} />
        <Route path="notification" element={<NotificationPage />} />
        <Route path="request-pending" element={<RequestPendingPage />} />
        <Route path="checklist" element={<CheckListPage />} />
        <Route path="user-management" element={<UserManagementPage/>} />
        <Route path="remove-projects" element={<RemoveProjectPage />} />
        <Route path="change-password" element={<ChangePasswordPage />} />
        <Route path="create-project" element={<CreateProjectPage />} /> 
        <Route path="projects" element={<ProjectPage/>}/>


      </Route>

      {/* ========== 개발사 전용 페이지 ========== */}
      <Route path="/developer" element={
        <ProtectedRoute allowedRoles={['DEVELOPER']}>
          <SidebarHeaderLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="project/:projectId" element={<ProjectPage />} />
        <Route path="board" element={<BoardPage />} />
        <Route path="board/history/:boardId" element={<PostHistoryPage />} />
        <Route path="project-history/:projectId" element={<ProjectHistoryPage />} />
        <Route path="notification" element={<NotificationPage />} />
        <Route path="change-password" element={<ChangePasswordPage />} />
      </Route>

      {/* ========== 고객사 전용 페이지 ========== */}
      <Route path="/client" element={
        <ProtectedRoute allowedRoles={['CLIENT']}>
          <SidebarHeaderLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="project/:projectId" element={<ProjectPage />} />
        <Route path="board" element={<BoardPage />} />
        <Route path="board/history/:boardId" element={<PostHistoryPage />} />
        <Route path="notification" element={<NotificationPage />} />
        <Route path="change-password" element={<ChangePasswordPage />} />
      </Route>
    </Routes>
  );
}

export default App;