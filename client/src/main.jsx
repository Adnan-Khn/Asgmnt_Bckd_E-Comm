import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthStore } from "./state/AuthContext.jsx";
import AppRoutes from "./routes/AppRoutes.jsx";

createRoot(document.getElementById("root")).render(
  <AuthStore>
    <AppRoutes />
  </AuthStore>,
);
