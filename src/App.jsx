// src/App.jsx
import "./styles/App.css";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Layouts
import SidebarLayout from "./components/layout/SidebarLayout";

// Pages - 공통 (권한별로 공유)
import LoginPage from "./pages/LoginPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import FindPasswordPage from "./pages/FindPasswordPage";
import ProjectMainPage from "./pages/ProjectMainPage";
import PostDetailPage from "./pages/PostDetailPage";
import EditPostDetailPage from "./pages/EditPostDetailPage";
import PostHistoryPage from "./pages/PostHistoryPage";
import ProjectHistoryPage from "./pages/ProjectHistoryPage";
import CreatePostPage from "./pages/CreatePostPage";
import BoardPage from "./pages/BoardPage";
import NotificationPage from "./pages/NotificationPage";

// Pages - 관리자 전용
import DashboardPage from "./pages/DashboardPage";
import CheckListPage from "./pages/CheckListPage";
import UserManagementPage from "./pages/UserManagementPage";
import RemoveProjectPage from "./pages/RemoveProjectPage";
import RequestPendingPage from "./pages/RequestPendingPage";
import CreateProjectPage from "./pages/CreateProjectPage";
import ProjectPage from "./pages/ProjectPage";
import CreateUserPage from "./pages/CreateUserPage";
import { EditProjectPage } from "./pages/EditProjectPage";

// Pages - 개발사/고객사 전용
import CustomerDashboardPage from "./pages/customer/CustomerDashboardPage";
import DeveloperDashboardPage from "./pages/developer/DeveloperDashboardPage";
import ProjectRequestPendingPage from "./pages/ProjectRequestPendingPage";
import ChangePasswordPage from "./pages/ChangePasswordPage";
import DeveloperSidebarHeaderLayout from "./components/layout/developer/DeveloperSidebarHeaderLayout";
import CustomerSidebarHeaderLayout from "./components/layout/customer/CustomerSidebarHeaderLayout copy";

function App() {
  return (
    <Routes>
      {/* ========== 인증 없이 접근 가능한 페이지 ========== */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/login/reset" element={<ForgotPasswordPage />} />
      <Route path="/find-password" element={<FindPasswordPage />} />

      {/* ========== 공통 프로젝트/게시글 페이지 (권한별로 공유) ========== */}
      <Route path="/" element={<SidebarLayout />}>
        <Route path="project/:projectId" element={<ProjectMainPage />} />
        <Route path="project/:projectId/post/:postId" element={<PostDetailPage />} />
        <Route path="project/:projectId/post/create" element={<CreatePostPage />} />
        <Route path="project/:projectId/post/edit/:postId" element={<EditPostDetailPage />} />
        <Route path="projects/:projectId/request-pending" element={<ProjectRequestPendingPage />} />

        <Route path="change-password" element={<ChangePasswordPage />} />
      </Route>

      {/* ========== 관리자 전용 페이지 ========== */}
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <SidebarLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="notification" element={<NotificationPage />} />
        <Route path="request-pending" element={<RequestPendingPage />} />
        <Route path="checklist" element={<CheckListPage />} />
        <Route path="user-management" element={<UserManagementPage />} />
        <Route path="remove-projects" element={<RemoveProjectPage />} />
        <Route path="create-project" element={<CreateProjectPage />} />
        <Route path="projects" element={<ProjectPage />} />
        <Route path="create-user" element={<CreateUserPage />} />
        <Route path="edit-user/:userId" element={<CreateUserPage />} />
        <Route path="edit-project/:projectId" element={<EditProjectPage />} />
      </Route>

      {/* ========== 개발사 전용 페이지 ========== */}
      <Route
        path="/developer"
        element={
          <ProtectedRoute allowedRoles={["DEVELOPER"]} >
            <DeveloperSidebarHeaderLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DeveloperDashboardPage />} />
        <Route path="project/:projectId" element={<ProjectMainPage />} />
        <Route path="project/:projectId/post/:postId" element={<PostDetailPage />} />
        <Route path="project/:projectId/post/create" element={<CreatePostPage />} />
        <Route path="post/edit/:postId" element={<EditPostDetailPage />} />
        <Route path="board" element={<BoardPage />} />
        <Route path="board/history/:boardId" element={<PostHistoryPage />} />
        <Route path="project-history/:projectId" element={<ProjectHistoryPage />} />
        <Route path="notification" element={<NotificationPage />} />
      </Route>

      {/* ========== 고객사 전용 페이지 ========== */}
      <Route
        path="/customer"
        element={
          <ProtectedRoute allowedRoles={["CUSTOMER"]}>
            <CustomerSidebarHeaderLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<CustomerDashboardPage/>} />
        <Route path="project/:projectId" element={<ProjectMainPage />} />
        <Route path="project/:projectId/post/:postId" element={<PostDetailPage />} />
        <Route path="project/:projectId/post/create" element={<CreatePostPage />} />
        <Route path="post/edit/:postId" element={<EditPostDetailPage />} />
        <Route path="board" element={<BoardPage />} />
        <Route path="board/history/:boardId" element={<PostHistoryPage />} />
        <Route path="notification" element={<NotificationPage />} />
      </Route>
    </Routes>
  );
}

export default App;