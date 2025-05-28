import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// import { BrowserRouter } from "react-router-dom";
// import AppRoutes from "./routes/AppRoutes.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    
      {/* <AppRoutes /> */}
      <App/>
    
  </StrictMode>
);
