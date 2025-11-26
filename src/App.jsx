import "./App.css";
import { Route, Routes } from "react-router-dom";
import ProjectPage from "./pages/ProjectPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProjectPage />} />
    </Routes>
  );
}

export default App;
