import { Sun, Moon } from "lucide-react";
import { useTranslations } from "@/i18n/LanguageProvider";

// El tema inicial lo aplica el script inline de index.html (antes de pintar). Acá solo se
// alterna la clase; el ícono se resuelve con CSS (dark:), así no hay estado que desincronizar.
export const ThemeToggle = () => {
  const { messages } = useTranslations();

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle("dark");
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", isDark ? "#060914" : "#f8fafc");
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      // storage bloqueado (modo privado): el cambio vale solo para esta visita
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={messages.theme.toggle}
      title={messages.theme.toggle}
      className="p-2 rounded-full text-foreground/80 hover:text-primary hover:bg-primary/10 transition-colors duration-300"
    >
      <Sun className="h-5 w-5 hidden dark:block" aria-hidden="true" />
      <Moon className="h-5 w-5 dark:hidden" aria-hidden="true" />
    </button>
  );
};
