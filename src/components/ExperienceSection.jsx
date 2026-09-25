import { Calendar, ChevronDown } from "lucide-react";
import { useTranslations } from "@/i18n/LanguageProvider";
import { SectionHeading } from "@/components/SectionHeading";

const VISIBLE_BULLETS = 3;

const Chips = ({ label, items, className }) =>
  items.length > 0 && (
    <div className="mt-4">
      <h4 className="text-sm font-medium mb-2">{label}</h4>
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item} className={`px-2 py-1 text-xs font-medium border rounded-full ${className}`}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

export const ExperienceSection = ({ number }) => {
  const { messages } = useTranslations();
  const { experience, nav } = messages;

  return (
    <section id="experience" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <SectionHeading
          number={number}
          eyebrow={nav.experience}
          title={experience.heading1}
          highlight={experience.heading2}
        />

        <ol className="relative border-l-2 border-primary/30 ml-2 space-y-10">
          {experience.items.map((exp, i) => {
            const visible = exp.bullets.slice(0, VISIBLE_BULLETS);
            const hidden = exp.bullets.slice(VISIBLE_BULLETS);
            return (
              <li key={exp.company} className="relative pl-8">
                <span
                  aria-hidden="true"
                  className={`absolute -left-[9px] top-2 h-4 w-4 rounded-full border-2 border-primary ${i === 0 ? "bg-primary" : "bg-background"}`}
                />
                <article className="bg-card border border-border p-6 md:p-8 rounded-xl shadow-xs">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{exp.role}</h3>
                      <p className="text-primary font-medium">{exp.company}</p>
                    </div>
                    <p className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
                      <Calendar className="h-4 w-4" aria-hidden="true" />
                      {exp.period}
                    </p>
                  </div>

                  <p className="text-muted-foreground mb-4">{exp.summary}</p>

                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    {visible.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>

                  {hidden.length > 0 && (
                    <details className="group">
                      <summary className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                        <span className="group-open:hidden">
                          {experience.showMore} (+{hidden.length})
                        </span>
                        <span className="hidden group-open:inline">{experience.showLess}</span>
                        <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
                      </summary>
                      <ul className="list-disc pl-5 space-y-1 text-muted-foreground mt-1">
                        {hidden.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </details>
                  )}

                  <Chips
                    label={experience.clientsLabel}
                    items={exp.clients}
                    className="bg-secondary text-secondary-foreground"
                  />
                  <Chips
                    label={experience.projectsLabel}
                    items={exp.projects}
                    className="border-primary/30 text-primary"
                  />
                </article>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};
