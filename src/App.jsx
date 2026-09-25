import { Routes, Route, Navigate, useParams } from "react-router-dom";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { DEFAULT_LANGUAGE, detectBrowserLanguage, isSupportedLanguage } from "@/i18n/languages";

const RootRedirect = () => <Navigate to={`/${detectBrowserLanguage()}`} replace />;

const LangHome = () => {
  const { lang } = useParams();
  if (!isSupportedLanguage(lang)) return <Navigate to={`/${DEFAULT_LANGUAGE}`} replace />;

  return (
    <LanguageProvider lang={lang}>
      <Home />
    </LanguageProvider>
  );
};

// Sin Router: main.jsx lo envuelve en BrowserRouter y entry-server.jsx en StaticRouter (prerender).
function App() {
  return (
    <Routes>
      <Route index element={<RootRedirect />} />
      <Route path=":lang" element={<LangHome />} />
      <Route
        path="*"
        element={
          <LanguageProvider lang={DEFAULT_LANGUAGE}>
            <NotFound />
          </LanguageProvider>
        }
      />
    </Routes>
  );
}

export default App;
