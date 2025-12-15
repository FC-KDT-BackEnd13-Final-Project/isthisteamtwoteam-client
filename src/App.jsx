// src/App.jsx
import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import SidebarHeaderLayout from "./components/layout/developer/DeveloperSidebarHeaderLayout";
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
import PostDetailPage from "./pages/PostDetailPage";
import CreateUserPage from "./pages/CreateUserPage";
import ProjectTrashPage from "./pages/ProjectTrashPage";
import CustomerDashboardPage from "./pages/customer/CustomerDashboardPage";
import DeveloperDashboardPage from "./pages/developer/DeveloperDashboardPage";
import DeveloperSidebarHeaderLayout from "./components/layout/developer/DeveloperSidebarHeaderLayout";
import CustomerSidebarHeaderLayout from "./components/layout/customer/CustomerSidebarHeaderLayout copy";
import { EditProjectPage } from "./pages/EditProjectPage";
import ProjectMainPage from "./pages/ProjectMainPage";

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
        <Route path="create-project" element={<CreateProjectPage />} /> 
        <Route path="projects" element={<ProjectPage/>}/>
        <Route path="posts/:postId" element={<PostDetailPage/>} />
        <Route path="create-user" element={<CreateUserPage />} />
        <Route path="edit-user/:userId" element={<CreateUserPage />} />
        <Route path="edit-project/:projectId" element={<EditProjectPage/>}/>
        <Route path="project/:projectId" element={<ProjectMainPage/>} />
      </Route>

      {/* ========== 개발사 전용 페이지 ========== */}
      <Route path="/developer" element={
        <ProtectedRoute allowedRoles={['DEVELOPER']}>
          <DeveloperSidebarHeaderLayout/>
        </ProtectedRoute>
      }>
        <Route path="dashboard" element={<DeveloperDashboardPage/>} />
        <Route path="project/:projectId" element={<ProjectMainPage />} />
        <Route path="board" element={<BoardPage />} />
        <Route path="board/history/:boardId" element={<PostHistoryPage />} />
        <Route path="project-history/:projectId" element={<ProjectHistoryPage />} />
        <Route path="notification" element={<NotificationPage />} />
        <Route path="change-password" element={<ChangePasswordPage/>} />
      </Route>

      {/* ========== 고객사 전용 페이지 ========== */}
      <Route path="/customer" element={
          <ProtectedRoute allowedRoles={['CUSTOMER']}>
            <CustomerSidebarHeaderLayout />
          </ProtectedRoute>
        }>
          <Route path="change-password" element={<ChangePasswordPage />} />
          <Route path="dashboard" element={<CustomerDashboardPage/>} />
          <Route path="project/:projectId" element={<ProjectMainPage />} />
          <Route path="board" element={<BoardPage />} />
          <Route path="board/history/:boardId" element={<PostHistoryPage />} />
          <Route path="notification" element={<NotificationPage />} />
          <Route path="change-password" element={<ChangePasswordPage />} />
        </Route>
    </Routes>
  );
}

export default App;