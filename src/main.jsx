import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";  
import { BrowserRouter } from "react-router-dom";
import { store } from "./utils/store.js";
import { Provider } from "react-redux";
import { AuthProvider } from "./context/AuthConext.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
    <AuthProvider>
      <App />
    </AuthProvider>  
    </BrowserRouter>
  </Provider>,
);
