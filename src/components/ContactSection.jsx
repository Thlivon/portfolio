import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  Twitch,
  Twitter,
  Github,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useTranslations } from "@/i18n/LanguageProvider";

export const ContactSection = () => {
  const { messages } = useTranslations();
  const { contact } = messages;
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    setTimeout(() => {
      toast({
        title: "¡Mensaje enviado!",
        description: "Gracias por tu mensaje. Te responderé a la brevedad.",
      });
      setIsSubmitting(false);
    }, 1500);
  };
  return (
    <section id="contact" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {contact.heading}
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          {contact.subtitle}
        </p>

        {/*<div className="grid grid-cols-1 md:grid-cols-2 gap-12">*/}
        <div className="grid grid-cols-1 gap-12 justify-items-center">
          <div className="space-y-8 w-full max-w-md text-left">
            <h3 className="text-2xl font-semibold mb-6"> {contact.infoTitle}</h3>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Mail className="h-6 w-6 text-primary" />{" "}
                </div>
                <div>
                  <h4 className="font-medium"> {contact.emailLabel}</h4>
                  <a
                    href="mailto:thlivon@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    thlivon@gmail.com
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Phone className="h-6 w-6 text-primary" />{" "}
                </div>
                <div>
                  <h4 className="font-medium"> {contact.phoneLabel}</h4>
                  <a
                    href="tel:+541163654186"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +54 11 6365-4186
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <MapPin className="h-6 w-6 text-primary" />{" "}
                </div>
                <div>
                  <h4 className="font-medium"> {contact.locationLabel}</h4>
                  <p className="text-muted-foreground">{contact.location}</p>
                </div>
              </div>
            </div>

            <div className="pt-8">
              <h4 className="font-medium mb-4">{contact.usefulLinksTitle}</h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/in/thomas-livon-852b84203/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Linkedin"
                >
                  <Linkedin />
                </a>
                <a
                  href="https://github.com/Thlivon"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Github"
                >
                  <Github />
                </a>
                {/*
                <a
                  href="#"
                  target="_blank"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Twitter />
                </a>
                <a
                  href="#"
                  target="_blank"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Instagram />
                </a>
                <a
                  href="#"
                  target="_blank"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Twitch />
                </a>
                */}
              </div>
            </div>
          </div>
          {/*
          <div
            className="bg-card p-8 rounded-lg shadow-xs"
            onSubmit={handleSubmit}
          >
            <h3 className="text-2xl font-semibold mb-6"> Envíame un Mensaje</h3>

            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
                  {" "}
                  Tu Nombre
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden foucs:ring-2 focus:ring-primary"
                  placeholder="Matías Lopez..."
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  {" "}
                  Tu Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden foucs:ring-2 focus:ring-primary"
                  placeholder="matiaslopez@gmail.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2"
                >
                  {" "}
                  Tu Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden foucs:ring-2 focus:ring-primary resize-none"
                  placeholder="Hola, me gustaría conversar sobre..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={cn(
                  "cosmic-button w-full flex items-center justify-center gap-2"
                )}
              >
                {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                <Send size={16} />
              </button>
            </form>
          </div>
          */}
        </div>
      </div>
    </section>
  );
};
