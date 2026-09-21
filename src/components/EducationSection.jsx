import { BookOpen, GraduationCap, Languages } from "lucide-react";
import { useTranslations } from "@/i18n/LanguageProvider";

export const EducationSection = () => {
  const { messages } = useTranslations();
  const { education } = messages;

  return (
    <section id="education" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          {education.heading1} <span className="text-primary"> {education.heading2}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold flex items-center gap-3">
              <GraduationCap className="h-6 w-6 text-primary" />
              {education.academicTitle}
            </h3>
            {education.education.map((item) => (
              <div
                key={item.title}
                className="gradient-border p-6 card-hover bg-card"
              >
                <p className="text-sm text-muted-foreground mb-1">
                  {item.period}
                </p>
                <h4 className="font-semibold text-lg">{item.title}</h4>
                <p className="text-primary">{item.institution}</p>
                {item.detail && (
                  <p className="text-muted-foreground mt-2">{item.detail}</p>
                )}
              </div>
            ))}

            <h3 className="text-2xl font-semibold flex items-center gap-3 pt-4">
              <Languages className="h-6 w-6 text-primary" />
              {education.languagesTitle}
            </h3>
            <div className="gradient-border p-6 bg-card">
              <ul className="space-y-2">
                {education.languages.map((lang) => (
                  <li key={lang.name} className="flex justify-between">
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-muted-foreground">{lang.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-semibold flex items-center gap-3">
              <BookOpen className="h-6 w-6 text-primary" />
              {education.coursesTitle}
            </h3>
            {education.courses.map((course) => (
              <div
                key={course.title}
                className="gradient-border p-6 card-hover bg-card"
              >
                <p className="text-sm text-muted-foreground mb-1">
                  {course.date} · {course.platform}
                </p>
                <h4 className="font-semibold text-lg">{course.title}</h4>
                <p className="text-muted-foreground mt-1">{course.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
