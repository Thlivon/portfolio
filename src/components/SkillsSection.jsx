import { Database, LayoutTemplate, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTranslations } from "@/i18n/LanguageProvider";
import { SectionHeading } from "@/components/SectionHeading";

const CATEGORIES = [
  { key: "frontend", Icon: LayoutTemplate },
  { key: "backend", Icon: Database },
  { key: "tools", Icon: Wrench },
];

const LEVELS = ["advanced", "intermediate", "basic"];

const levelKey = (level) => {
  if (level >= 80) return "advanced";
  if (level >= 60) return "intermediate";
  return "basic";
};

const CHIP_STYLE = {
  advanced: "bg-primary/15 border-primary/40 text-foreground",
  intermediate: "bg-secondary border-border text-secondary-foreground",
  basic: "border-border border-dashed text-muted-foreground",
};

export const SkillsSection = ({ number }) => {
  const { messages } = useTranslations();
  const { skills, nav } = messages;

  return (
    <section id="skills" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <SectionHeading
          number={number}
          eyebrow={nav.skills}
          title={skills.heading1}
          highlight={skills.heading2}
          subtitle={skills.subtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES.map(({ key, Icon }) => {
            const items = skills.items.filter((s) => s.category === key);
            return (
              <div key={key} className="bg-card border border-border rounded-xl p-6">
                <h3 className="flex items-center gap-2 font-semibold text-lg mb-5">
                  <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  {skills.categories[key]}
                </h3>

                <div className="space-y-4">
                  {LEVELS.map((level) => {
                    const group = items.filter((s) => levelKey(s.level) === level);
                    if (group.length === 0) return null;
                    return (
                      <div key={level}>
                        <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                          {skills.levels[level]}
                        </p>
                        <ul className="flex flex-wrap gap-2">
                          {group.map((skill) => (
                            <li
                              key={skill.name}
                              className={cn("px-3 py-1 text-sm rounded-full border", CHIP_STYLE[level])}
                            >
                              {skill.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
