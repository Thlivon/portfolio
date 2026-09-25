import { useState } from "react";
import { ArrowRight, ExternalLink, Github, MonitorSmartphone } from "lucide-react";
import { useTranslations } from "@/i18n/LanguageProvider";
import { SectionHeading } from "@/components/SectionHeading";
import { cn } from "@/lib/utils";
import { PROFILE } from "@/lib/profile";

const hasUrl = (url) => url && url !== "#";

const ProjectImage = ({ src, alt, placeholder }) => {
  const [broken, setBroken] = useState(false);

  if (!src || broken) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-linear-to-br from-primary/20 to-secondary text-muted-foreground">
        <MonitorSmartphone className="h-10 w-10 text-primary" aria-hidden="true" />
        <span className="text-xs">{placeholder}</span>
      </div>
    );
  }

  return (
    <img
      src={import.meta.env.BASE_URL + src.replace(/^\//, "")}
      alt={alt}
      width="800"
      height="400"
      loading="lazy"
      decoding="async"
      onError={() => setBroken(true)}
      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
    />
  );
};

export const ProjectsSection = ({ number }) => {
  const { messages } = useTranslations();
  const { projects, nav } = messages;

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <SectionHeading
          number={number}
          eyebrow={nav.projects}
          title={projects.heading1}
          highlight={projects.heading2}
          subtitle={projects.subtitle}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.items.map((project) => {
            const mainUrl = hasUrl(project.demoUrl) ? project.demoUrl : project.githubUrl;
            return (
              <article
                key={project.title}
                className={cn(
                  "group relative bg-card border border-border rounded-xl overflow-hidden shadow-xs card-hover flex flex-col",
                  project.featured && "md:col-span-2"
                )}
              >
                {project.productive && (
                  <span className="absolute top-3 left-3 z-10 px-3 py-1 text-xs font-medium rounded-full bg-primary text-primary-foreground shadow-sm">
                    {projects.productiveBadge}
                  </span>
                )}
                <div
                  className={cn(
                    // las capturas son ~2.2:1; la destacada ocupa 2 columnas y usa un formato más panorámico
                    "aspect-[2/1] overflow-hidden bg-secondary",
                    project.featured && "md:aspect-[21/9]"
                  )}
                >
                  <ProjectImage src={project.image} alt={project.title} placeholder={projects.noImage} />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold mb-2">
                    {hasUrl(mainUrl) ? (
                      <a
                        href={mainUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-primary transition-colors"
                      >
                        {project.title}
                      </a>
                    ) : (
                      project.title
                    )}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">{project.description}</p>

                  <ul className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-4 mt-auto text-sm font-medium">
                    {hasUrl(project.demoUrl) && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-primary hover:underline underline-offset-4"
                      >
                        <ExternalLink size={16} aria-hidden="true" /> {projects.viewSite}
                      </a>
                    )}
                    {hasUrl(project.githubUrl) && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-foreground/80 hover:text-primary transition-colors"
                      >
                        <Github size={16} aria-hidden="true" /> {projects.viewCode}
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <a className="outline-button" target="_blank" rel="noopener noreferrer" href={PROFILE.github}>
            {projects.githubCta} <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};
