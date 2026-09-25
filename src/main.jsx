import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "@fontsource-variable/inter";
import "./index.css";
import App from "./App.jsx";

// Analytics/Speed Insights solo existen en Vercel (base "/"); en GitHub Pages y en dev darían 404.
const onVercel = import.meta.env.PROD && import.meta.env.BASE_URL === "/";

const app = (
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
    {onVercel && <Analytics />}
    {onVercel && <SpeedInsights />}
  </StrictMode>
);

// /es y /en vienen pre-renderizados desde el build (scripts/prerender.js): se hidratan.
// En dev, "/" y el 404 el root está vacío y se renderiza normal.
const root = document.getElementById("root");
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
