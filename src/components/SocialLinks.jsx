import { Github, Linkedin, Mail } from "lucide-react";
import { useTranslations } from "@/i18n/LanguageProvider";
import { PROFILE } from "@/lib/profile";
import { cn } from "@/lib/utils";

const LINKS = [
  { key: "linkedin", href: PROFILE.linkedin, Icon: Linkedin },
  { key: "github", href: PROFILE.github, Icon: Github },
  { key: "email", href: `mailto:${PROFILE.email}`, Icon: Mail },
];

// Íconos de redes usados en Hero, Contacto y Footer; cada lugar solo cambia estilo y tamaño.
export const SocialLinks = ({ withEmail = false, size = 20, className, linkClassName }) => {
  const { messages } = useTranslations();

  return (
    <div className={cn("flex items-center", className)}>
      {LINKS.filter((l) => withEmail || l.key !== "email").map(({ key, href, Icon }) => (
        <a
          key={key}
          href={href}
          aria-label={messages.social[key]}
          title={messages.social[key]}
          {...(href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
          className={cn("transition-colors", linkClassName)}
        >
          <Icon size={size} aria-hidden="true" />
        </a>
      ))}
    </div>
  );
};
