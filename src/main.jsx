import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { LanguageProvider } from "./context/LanguageContext.jsx";

import "./styles/global.css";
import "./styles/orbit.css";
import "./styles/animation.css";
import "./styles/responsive.css";
import "./styles/home-responsive.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>
);