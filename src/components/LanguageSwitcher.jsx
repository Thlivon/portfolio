import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { SUPPORTED_LANGUAGES } from "@/i18n/languages";
import { useTranslations } from "@/i18n/LanguageProvider";

export const LanguageSwitcher = ({ className }) => {
  const { lang } = useTranslations();

  return (
    <div className={cn("flex items-center gap-1 text-sm font-medium", className)}>
      {SUPPORTED_LANGUAGES.map((code) => (
        <Link
          key={code}
          to={`/${code}`}
          aria-current={lang === code ? "true" : undefined}
          className={cn(
            "px-2 py-1 rounded-md transition-colors duration-300 uppercase",
            lang === code
              ? "text-primary"
              : "text-foreground/60 hover:text-primary"
          )}
        >
          {code}
        </Link>
      ))}
    </div>
  );
};
