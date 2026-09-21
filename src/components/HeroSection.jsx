import { ArrowDown } from "lucide-react";
import { useTranslations } from "@/i18n/LanguageProvider";

export const HeroSection = () => {
  const { messages } = useTranslations();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4"
    >
      <div className="container max-w-4xl mx-auto text-center z-10">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            <span className="opacity-0 animate-fade-in"> {messages.hero.greeting}</span>
            <span className="text-primary opacity-0 animate-fade-in-delay-1">
              {" "}
              {messages.hero.firstName}
            </span>
            <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-2">
              {" "}
              {messages.hero.lastName}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-delay-3">
            {messages.hero.description}
          </p>

          <div className="pt-4 opacity-0 animate-fade-in-delay-4">
            <a href="#projects" className="cosmic-button">
              {messages.hero.cta}
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
        <span className="text-sm text-muted-foreground mb-2"> {messages.hero.scroll} </span>
        <ArrowDown className="h-5 w-5 text-primary" />
      </div>
    </section>
  );
};
