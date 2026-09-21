import { ArrowUp } from "lucide-react";
import { useTranslations } from "@/i18n/LanguageProvider";

export const Footer = () => {
  const { messages } = useTranslations();

  return (
    <footer className="py-12 px-4 bg-card relative border-t border-border mt-12 pt-8 flex flex-wrap justify-between items-center">
      {" "}
      <p className="text-sm text-muted-foreground">
        {" "}
        &copy; {new Date().getFullYear()} Thomas Livon. {messages.footer.rights}
      </p>
      <a
        href="#hero"
        aria-label={messages.nav.home}
        className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
      >
        <ArrowUp size={20} />
      </a>
    </footer>
  );
};
