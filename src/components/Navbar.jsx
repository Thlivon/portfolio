import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "@/i18n/LanguageProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";

// Mismo orden que las secciones en Home.jsx
const NAV_LINKS = ["projects", "experience", "skills", "about", "education", "contact"];

export const Navbar = () => {
  const { messages } = useTranslations();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Resalta el link de la sección que cruza la franja central del viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    for (const id of ["hero", ...NAV_LINKS]) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const close = () => setIsMenuOpen(false);
    const onKey = (e) => e.key === "Escape" && close();
    // desde lg el overlay se oculta por CSS: sin esto el scroll quedaría bloqueado (p. ej. al rotar una tablet)
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onDesktop = (e) => e.matches && close();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [isMenuOpen]);

  const linkClass = (key) =>
    cn(
      "transition-colors duration-300 hover:text-primary",
      active === key ? "text-primary" : "text-foreground/80"
    );

  return (
    // nav en sí no lleva backdrop-blur: un ancestro con filter/backdrop-filter se
    // vuelve el containing block de sus descendientes "fixed" (el overlay del menú
    // mobile de más abajo), así que ese estilo va en el wrapper interno, no acá.
    <nav className="fixed top-0 w-full z-40">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:rounded-md focus:bg-primary focus:text-primary-foreground"
      >
        {messages.nav.skipToContent}
      </a>
      <div
        className={cn(
          "transition-all duration-300",
          isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" : "py-5"
        )}
      >
        <div className="container flex items-center justify-between">
          <a className="text-xl font-bold text-primary flex items-center whitespace-nowrap" href="#hero">
            <span className="text-glow text-foreground">{messages.nav.brandName}</span>
            <span className="ml-1.5">{messages.nav.brandSuffix}</span>
          </a>

          <div className="flex items-center gap-2">
            {/* desktop nav */}
            <div className="hidden lg:flex items-center gap-6 text-sm whitespace-nowrap">
              {NAV_LINKS.map((key) => (
                <a
                  key={key}
                  href={`#${key}`}
                  aria-current={active === key ? "true" : undefined}
                  className={linkClass(key)}
                >
                  {messages.nav[key]}
                </a>
              ))}
              <LanguageSwitcher />
            </div>

            <ThemeToggle />

            {/* mobile nav */}
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="lg:hidden p-2 text-foreground z-50"
              aria-label={isMenuOpen ? messages.nav.closeMenu : messages.nav.openMenu}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        inert={!isMenuOpen}
        className={cn(
          "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
          "transition-all duration-300 lg:hidden",
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center space-y-8 text-xl">
          {NAV_LINKS.map((key) => (
            <a key={key} href={`#${key}`} className={linkClass(key)} onClick={() => setIsMenuOpen(false)}>
              {messages.nav[key]}
            </a>
          ))}
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
};
