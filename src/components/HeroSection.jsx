import { ArrowDown } from "lucide-react";

//Profesional con más de 4 años de experiencia en desarrollo y gestión de proyectos, con enfoque en optimización de procesos, mejora continua, análisis de datos, resolución de problemas y trabajo en equipo. Destaco por mi capacidad de adaptación a entornos ágiles, colaboración multidisciplinaria y orientación a resultados medibles que impulsan la eficiencia operativa y el crecimiento del negocio. Comprometido con la innovación y la transformación digital, busco aportar valor a través de soluciones escalables y estratégicas que generen impacto positivo en la organización.

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="opacity-0 animate-fade-in"> Hola, soy</span>
            <span className="text-primary opacity-0 animate-fade-in-delay-1">
              {" "}
              Thomas
            </span>
            <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-2">
              {" "}
              Livon
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-2-2xl mx-auto opacity-0 animate-fade-in-delay-3">
            Profesional con más de 4 años de experiencia en desarrollo y gestión
            de proyectos, con enfoque en optimización de procesos, mejora
            continua, análisis de datos, resolución de problemas y trabajo en
            equipo. Destaco por mi capacidad de adaptación a entornos ágiles,
            colaboración multidisciplinaria y orientación a resultados medibles
            que impulsan la eficiencia operativa y el crecimiento del negocio.
            Comprometido con la innovación y la transformación digital, busco
            aportar valor a través de soluciones escalables y estratégicas que
            generen impacto positivo en la organización.
          </p>

          <div className="pt-4 opacity-0 animate-fade-in-delay-4">
            <a href="#projects" className="cosmic-button">
              View My Work
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-muted-foreground mb-2"> Scroll </span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </section>
  );
};
