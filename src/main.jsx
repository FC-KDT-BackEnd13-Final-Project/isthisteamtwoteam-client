import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./components/App.jsx";
import { BrowserRouter } from "react-router-dom";
import { store } from "./utils/store.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
);
