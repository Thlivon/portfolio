import { Link } from "react-router-dom";
import { useTranslations } from "@/i18n/LanguageProvider";
import { StarBackground } from "@/components/StarBackground";

export const NotFound = () => {
  const { messages } = useTranslations();
  const { notFound } = messages;

  return (
    <main className="relative min-h-svh flex flex-col items-center justify-center gap-4 text-center px-4 bg-background text-foreground">
      <StarBackground />
      <p className="relative text-7xl font-bold text-gradient">404</p>
      <h1 className="relative text-2xl font-semibold">{notFound.title}</h1>
      <p className="relative text-muted-foreground">{notFound.message}</p>
      <Link to="/" className="relative cosmic-button mt-2">
        {notFound.backHome}
      </Link>
    </main>
  );
};
