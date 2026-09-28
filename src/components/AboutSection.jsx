import { Briefcase, Code, Download, User } from "lucide-react";
import { useTranslations } from "@/i18n/LanguageProvider";
import { SectionHeading } from "@/components/SectionHeading";
import { PROFILE } from "@/lib/profile";

const ICONS = { code: Code, user: User, briefcase: Briefcase };

export const AboutSection = ({ number }) => {
  const { messages } = useTranslations();
  const { about, nav } = messages;

  return (
    <section id="about" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <SectionHeading number={number} eyebrow={nav.about} title={about.heading1} highlight={about.heading2} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <p className="text-muted-foreground text-lg">{about.paragraph1}</p>
            <p className="text-muted-foreground">{about.paragraph2}</p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a href="#contact" className="cosmic-button">
                {about.contactCta}
              </a>
              <a href={PROFILE.cvUrl} className="outline-button" target="_blank" rel="noopener noreferrer">
                {about.downloadCv} <Download size={16} aria-hidden="true" />
              </a>
            </div>
          </div>

          <ul className="grid grid-cols-1 gap-6">
            {about.cards.map((card) => {
              const Icon = ICONS[card.icon] ?? Code;
              return (
                <li key={card.title} className="bg-card border border-border p-6 rounded-xl shadow-xs">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10 shrink-0">
                      <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{card.title}</h3>
                      <p className="text-muted-foreground">{card.description}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};
