import { BookOpen, GraduationCap, Languages } from "lucide-react";

const education = [
  {
    period: "Marzo 2021 - Actualidad",
    title: "Licenciatura en Sistemas",
    institution: "Universidad Nacional de Lanús",
    detail: "28 de 36 asignaturas aprobadas.",
  },
  {
    period: "Marzo 2015 - Noviembre 2020",
    title: "Bachiller en Economía y Administración",
    institution: "Colegio San Juan de la Cruz",
    detail: "",
  },
];

const courses = [
  {
    date: "Enero 2025",
    title: "Aprende Oracle SQL desde cero",
    platform: "Udemy",
    detail: "15,5 horas instruidas por Apasoft Training.",
  },
  {
    date: "Octubre 2024",
    title: "Curso Completo de IA Generativa: ChatGPT, Midjourney y más!",
    platform: "Udemy",
    detail: "18 horas instruidas por Santiago Hernández.",
  },
  {
    date: "Agosto 2023",
    title: "Máster en SQL Server: Desde Cero a Nivel Profesional",
    platform: "Udemy",
    detail: "16 horas instruidas por Mariano Puglisi.",
  },
  {
    date: "Marzo 2022",
    title: "SQL: Creación de Bases de Datos (De cero a profesional)",
    platform: "Udemy",
    detail: "2 horas instruidas por Numpi Cursos.",
  },
  {
    date: "Marzo 2022",
    title: "Aprende SQL desde cero: ¡Curso con más de 50 ejercicios!",
    platform: "Udemy",
    detail: "1,5 horas instruidas por Raúl Montesinos.",
  },
];

const languages = [
  { name: "Español", level: "Nativo" },
  { name: "Inglés", level: "Intermedio básico" },
];

export const EducationSection = () => {
  return (
    <section id="education" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Educación <span className="text-primary"> & Cursos</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold flex items-center gap-3">
              <GraduationCap className="h-6 w-6 text-primary" />
              Formación académica
            </h3>
            {education.map((item) => (
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
              Idiomas
            </h3>
            <div className="gradient-border p-6 bg-card">
              <ul className="space-y-2">
                {languages.map((lang) => (
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
              Cursos
            </h3>
            {courses.map((course) => (
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
