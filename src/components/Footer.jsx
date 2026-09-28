import { ArrowUp } from "lucide-react";
import { SocialLinks } from "@/components/SocialLinks";
import { useTranslations } from "@/i18n/LanguageProvider";
import { PROFILE } from "@/lib/profile";

export const Footer = () => {
  const { messages } = useTranslations();

  return (
    <footer className="py-6 px-4 bg-card relative border-t border-border">
      <div className="container mx-auto max-w-5xl flex flex-wrap justify-between items-center gap-4">
        <p className="text-sm text-muted-foreground">
          {/* el año del HTML pre-renderizado es el del build: puede diferir del cliente */}
          &copy; <span suppressHydrationWarning>{new Date().getFullYear()}</span> {PROFILE.name}. {messages.footer.rights}
        </p>
        <div className="flex items-center gap-2">
          <SocialLinks size={18} className="gap-2" linkClassName="p-2 text-muted-foreground hover:text-primary" />
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
