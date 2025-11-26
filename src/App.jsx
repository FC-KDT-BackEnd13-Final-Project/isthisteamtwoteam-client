import "./App.css";
import { Route, Routes } from "react-router-dom";
import ProjectPage from "./pages/ProjectPage";
import Layout from "./global/components/Layout";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      {/* Layout 없는 라우트 */}
      <Route path="/login" element={<Login />} />

      {/* Layout 있는 라우트 */}
      <Route
        path="/*"
        element={
          <Layout>
            <Routes>
              <Route path="/" element={<ProjectPage />} />
            </Routes>
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
