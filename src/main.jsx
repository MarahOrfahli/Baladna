import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

import "leaflet/dist/leaflet.css";
import "./i18n.js";

import { initializeAppLanguage } from "./store/useLangStore";
initializeAppLanguage();

import "./index.css";
import { ThemeProvider } from "./hooks/context/ThemeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
