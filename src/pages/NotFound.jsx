import { Link } from "react-router-dom";
import { useTranslations } from "@/i18n/LanguageProvider";

export const NotFound = () => {
  const { messages } = useTranslations();
  const { notFound } = messages;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-xl font-semibold">{notFound.title}</p>
      <p className="text-muted-foreground">{notFound.message}</p>
      <Link to="/" className="cosmic-button">
        {notFound.backHome}
      </Link>
    </div>
  );
};
