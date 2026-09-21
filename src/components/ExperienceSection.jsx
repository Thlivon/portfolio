import { Briefcase, Calendar } from "lucide-react";
import { useTranslations } from "@/i18n/LanguageProvider";

export const ExperienceSection = () => {
  const { messages } = useTranslations();
  const { experience } = messages;

  return (
    <section id="experience" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          {experience.heading1} <span className="text-primary"> {experience.heading2}</span>
        </h2>

        <div className="space-y-8">
          {experience.items.map((exp) => (
            <article
              key={exp.company}
              className="bg-card p-6 md:p-8 rounded-lg shadow-xs card-hover text-left"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-primary/10 shrink-0">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{exp.role}</h3>
                    <p className="text-primary font-medium">{exp.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground md:pt-3 shrink-0">
                  <Calendar className="h-4 w-4" />
                  <span>{exp.period}</span>
                </div>
              </div>

              <p className="text-muted-foreground mb-4">{exp.summary}</p>

              <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                {exp.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>

              {exp.clients.length > 0 && (
                <div className="mb-3">
                  <h4 className="font-medium mb-2">{experience.clientsLabel}</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.clients.map((c) => (
                      <span
                        key={c}
                        className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {exp.projects.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">{experience.projectsLabel}</h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.projects.map((p) => (
                      <span
                        key={p}
                        className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
