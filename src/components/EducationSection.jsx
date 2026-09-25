import { BookOpen, GraduationCap, Languages } from "lucide-react";
import { useTranslations } from "@/i18n/LanguageProvider";
import { SectionHeading } from "@/components/SectionHeading";

const Subtitle = ({ Icon, children }) => (
  <h3 className="text-xl font-semibold flex items-center gap-3">
    <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
    {children}
  </h3>
);

export const EducationSection = ({ number }) => {
  const { messages } = useTranslations();
  const { education, nav } = messages;

  return (
    <section id="education" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <SectionHeading
          number={number}
          eyebrow={nav.education}
          title={education.heading1}
          highlight={education.heading2}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Subtitle Icon={GraduationCap}>{education.academicTitle}</Subtitle>
            {education.education.map((item) => (
              <div key={item.title} className="bg-card border border-border p-6 rounded-xl shadow-xs">
                <p className="text-sm text-muted-foreground mb-1">{item.period}</p>
                <h4 className="font-semibold text-lg">{item.title}</h4>
                <p className="text-primary">{item.institution}</p>
                {item.progress && (
                  <div className="mt-4">
                    <div
                      className="h-2 w-full rounded-full bg-secondary overflow-hidden"
                      role="progressbar"
                      aria-valuemin={0}
                      aria-valuemax={item.progress.total}
                      aria-valuenow={item.progress.done}
                      aria-label={education.progressLabel}
                    >
                      <div
                        className="h-full bg-primary rounded-full origin-left animate-grow"
                        style={{ width: `${(item.progress.done / item.progress.total) * 100}%` }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {item.progress.done}/{item.progress.total} {education.progressLabel}
                    </p>
                  </div>
                )}
              </div>
            ))}

            <Subtitle Icon={Languages}>{education.languagesTitle}</Subtitle>
            <ul className="bg-card border border-border p-6 rounded-xl shadow-xs space-y-2">
              {education.languages.map((lang) => (
                <li key={lang.name} className="flex justify-between">
                  <span className="font-medium">{lang.name}</span>
                  <span className="text-muted-foreground">{lang.level}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-6">
            <Subtitle Icon={BookOpen}>{education.coursesTitle}</Subtitle>
            <ul className="bg-card border border-border rounded-xl shadow-xs divide-y divide-border">
              {education.courses.map((course) => (
                <li key={course.title} className="p-5">
                  <h4 className="font-medium">{course.title}</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    {course.date} · {course.platform} · {course.detail}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
