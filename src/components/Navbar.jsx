import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "@/i18n/LanguageProvider";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";

const NAV_LINKS = [
  { key: "home", href: "#hero" },
  { key: "about", href: "#about" },
  { key: "experience", href: "#experience" },
  { key: "skills", href: "#skills" },
  { key: "projects", href: "#projects" },
  { key: "education", href: "#education" },
  { key: "contact", href: "#contact" },
];

export const Navbar = () => {
  const { messages } = useTranslations();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    // nav en sí no lleva backdrop-blur: un ancestro con filter/backdrop-filter se
    // vuelve el containing block de sus descendientes "fixed" (el overlay del menú
    // mobile de más abajo), así que ese estilo va en el wrapper interno, no acá.
    <nav className="fixed top-0 w-full z-40">
      <div
        className={cn(
          "transition-all duration-300",
          isScrolled ? "py-3 bg-background/80 backdrop-blur-md shadow-xs" : "py-5"
        )}
      >
        <div className="container flex items-center justify-between">
          <a
            className="text-xl font-bold text-primary flex items-center"
            href="#hero"
          >
            <span className="relative z-10">
              <span className="text-glow text-foreground"> {messages.nav.brandName} </span>{" "}
              {messages.nav.brandSuffix}
            </span>
          </a>

          <div className="flex items-center gap-2">
            {/* desktop nav */}
            <div className="hidden md:flex items-center space-x-8">
              {NAV_LINKS.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="text-foreground/80 hover:text-primary transition-colors duration-300"
                >
                  {messages.nav[item.key]}
                </a>
              ))}
              <LanguageSwitcher />
            </div>

            <ThemeToggle />

            {/* mobile nav */}
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className="md:hidden p-2 text-foreground z-50"
              aria-label={isMenuOpen ? messages.nav.closeMenu : messages.nav.openMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}{" "}
            </button>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "fixed inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center",
          "transition-all duration-300 md:hidden",
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center space-y-8 text-xl">
          {NAV_LINKS.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="text-foreground/80 hover:text-primary transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
            >
              {messages.nav[item.key]}
            </a>
          ))}
          <LanguageSwitcher />
        </div>
      </div>
    </nav>
  );
};
