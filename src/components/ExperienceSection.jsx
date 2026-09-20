import { Briefcase, Calendar } from "lucide-react";

const experiences = [
  {
    period: "Julio 2023 - Actualidad",
    role: "Desarrollador FullStack y Analista de Sistemas",
    company: "Engage Business Solution",
    summary:
      "Desarrollo FullStack de aplicativos afines a Gestión de Incidencias, Gestión Administrativa, Gestión Financiera y Gestión de Cobranzas.",
    bullets: [
      "Arquitectura y desarrollo de funcionalidades en SQL Server y Oracle",
      "Personalización de productos Engage",
      "Desarrollo frontend con formularios y JavaScript",
      "Integración de procesos con SAP, OpenDev, SNP y SUME",
      "Automatización de procesos de deployment y testing mediante Bash Scripting",
      "Redacción de documentación funcional, técnica y manuales de usuario",
      "Testing integral de soluciones desarrolladas (QA, validación funcional y técnica)",
    ],
    clients: ["Medife", "Sol Naciente", "Banco Industrial (BIND)"],
    projects: [
      "Administración de Propiedades",
      "Portal de Recaudaciones",
      "Portal de Visitas",
      "Gestión de Pólizas y Adendas",
      "Gestión de Cobranzas",
      "Gestión de Agencias Externas",
    ],
  },
  {
    period: "Febrero 2021 - Junio 2023",
    role: "Desarrollador FrontEnd y Analista de Sistemas",
    company: "Banfield GL",
    summary:
      "Desarrollador Frontend de sitio corporativo utilizando JavaScript nativo en Wix, con integración a bases de datos y automatización de procesos de gestión de garantías.",
    bullets: [
      "JavaScript nativo: desarrollo de funciones asíncronas para optimización de procesos",
      "Wix Corvid (Velo by Wix): implementación de lógica de negocio y personalización de sitio web",
      "Bases de datos: integración para gestión de ventas y registro de operaciones",
      "Automatización: generación de códigos de garantía únicos y personalizados",
    ],
    clients: [],
    projects: [],
  },
];

export const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          Mi <span className="text-primary"> Experiencia</span>
        </h2>

        <div className="space-y-8">
          {experiences.map((exp) => (
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
                  <h4 className="font-medium mb-2">Clientes</h4>
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
                  <h4 className="font-medium mb-2">Proyectos destacados</h4>
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
