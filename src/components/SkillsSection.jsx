import { useState } from "react";
import { cn } from "@/lib/utils";

const skills = [
  // Frontend
  { name: "JavaScript", level: 90, category: "frontend" },
  { name: "Desarrollo de Formularios", level: 90, category: "frontend" },
  { name: "Wix Corvid (Velo by Wix)", level: 90, category: "frontend" },
  { name: "React", level: 70, category: "frontend" },
  { name: "TypeScript", level: 50, category: "frontend" },
  { name: "Tailwind", level: 50, category: "frontend" },

  // Backend / Bases de Datos
  { name: "SQL Server", level: 100, category: "backend" },
  { name: "Oracle", level: 100, category: "backend" },
  { name: "MySQL", level: 90, category: "backend" },
  { name: "Java", level: 80, category: "backend" },
  { name: "Python", level: 80, category: "backend" },
  { name: "Node.js", level: 80, category: "backend" },
  { name: "Visual Basic .NET", level: 60, category: "backend" },
  { name: "C", level: 45, category: "backend" },

  // Tools
  { name: "Git & GitHub", level: 100, category: "tools" },
  { name: "Hibernate", level: 80, category: "tools" },
  { name: "Spring Boot", level: 80, category: "tools" },
  { name: "n8n-AI workflow automation", level: 70, category: "tools" },
  { name: "Claude Code", level: 70, category: "tools" },
  { name: ".NET Framework", level: 60, category: "tools" },
  { name: "ASP.NET Core", level: 60, category: "tools" },
  { name: "Windows Forms", level: 60, category: "tools" },
];

const categories = ["all", "frontend", "backend", "tools"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary"> Skills</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/70 text-forefround hover:bd-secondary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, key) => (
            <div
              key={key}
              className="bg-card p-6 rounded-lg shadow-xs card-hover"
            >
              <div className="text-left mb-4">
                <h3 className="font-semibold text-lg"> {skill.name}</h3>
              </div>
              <div className="w-full bg-secondary/50 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-2 rounded-full origin-left animate-[grow_1.5s_ease-out]"
                  style={{ width: skill.level + "%" }}
                />
              </div>

              <div className="text-right mt-1">
                <span className="text-sm text-muted-foreground">
                  {skill.level}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
