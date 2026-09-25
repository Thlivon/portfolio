import { ArrowDown, ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { useTranslations } from "@/i18n/LanguageProvider";
import { PROFILE } from "@/lib/profile";

export const HeroSection = () => {
  const { messages } = useTranslations();
  const { hero } = messages;

  const socials = [
    { href: PROFILE.linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: PROFILE.github, label: "GitHub", Icon: Github },
    { href: `mailto:${PROFILE.email}`, label: PROFILE.email, Icon: Mail },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-svh flex flex-col items-center justify-center px-4 pt-24 pb-20 text-center"
    >
      <div className="container max-w-4xl mx-auto z-10 space-y-6">
        <p className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-sm text-primary opacity-0 animate-fade-in">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
          {hero.badge}
        </p>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          <span className="opacity-0 animate-fade-in">{hero.greeting} </span>
          <span className="text-primary opacity-0 animate-fade-in-delay-1">{hero.firstName} </span>
          <span className="text-gradient opacity-0 animate-fade-in-delay-2">{hero.lastName}</span>
        </h1>

        <p className="text-xl md:text-2xl font-medium text-foreground/90 opacity-0 animate-fade-in-delay-2">
          {hero.role}
        </p>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-delay-3">
          {hero.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2 opacity-0 animate-fade-in-delay-4">
          <a href="#projects" className="cosmic-button">
            {hero.ctaProjects} <ArrowRight size={16} aria-hidden="true" />
          </a>
          <a href={PROFILE.cvUrl} target="_blank" rel="noopener noreferrer" className="outline-button">
            {hero.ctaCv} <Download size={16} aria-hidden="true" />
          </a>
        </div>

        <div className="flex justify-center gap-2 opacity-0 animate-fade-in-delay-4">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              title={label}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              className="p-2 rounded-full text-foreground/70 hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <Icon size={22} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

      <a
        href="#projects"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center animate-bounce text-muted-foreground hover:text-primary [@media(max-height:700px)]:hidden"
      >
        <span className="text-sm mb-1">{hero.scroll}</span>
        <ArrowDown className="h-5 w-5 text-primary" aria-hidden="true" />
      </a>
    </section>
  );
};
