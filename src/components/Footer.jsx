import { ArrowUp, Github, Linkedin } from "lucide-react";
import { useTranslations } from "@/i18n/LanguageProvider";
import { PROFILE } from "@/lib/profile";

export const Footer = () => {
  const { messages } = useTranslations();

  return (
    <footer className="py-6 px-4 bg-card relative border-t border-border">
      <div className="container mx-auto max-w-5xl flex flex-wrap justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} {PROFILE.name}. {messages.footer.rights}
        </p>
        <div className="flex items-center gap-2">
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Linkedin size={18} aria-hidden="true" />
          </a>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Github size={18} aria-hidden="true" />
          </a>
          <a
            href="#hero"
            aria-label={messages.nav.backToTop}
            title={messages.nav.backToTop}
            className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
          >
            <ArrowUp size={20} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
};
