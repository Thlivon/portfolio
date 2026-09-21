import { Briefcase, Code, User } from "lucide-react";
import { useTranslations } from "@/i18n/LanguageProvider";

const ICONS = [Code, User, Briefcase];

export const AboutSection = () => {
  const { messages } = useTranslations();
  const { about } = messages;

  return (
    <section id="about" className="py-24 px-4 relative">
      {" "}
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          {about.heading1} <span className="text-primary"> {about.heading2}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">{about.role}</h3>

            <p className="text-muted-foreground">{about.paragraph1}</p>

            <p className="text-muted-foreground">{about.paragraph2}</p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <a href="#contact" className="cosmic-button">
                {" "}
                {about.contactCta}
              </a>

              <a
                href="https://drive.google.com/drive/folders/1REodZWPIyKNbVxmDdp_Zz6RkLyhAoPyj?usp=sharing"
                className="px-6 py-2 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                {about.downloadCv}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {about.cards.map((card, index) => {
              const Icon = ICONS[index];
              return (
                <div key={card.title} className="gradient-border p-6 card-hover">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-lg"> {card.title}</h4>
                      <p className="text-muted-foreground">{card.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
