import { useEffect, useRef, useState } from "react";
import { Check, Copy, Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "@/i18n/LanguageProvider";
import { SectionHeading } from "@/components/SectionHeading";
import { PROFILE } from "@/lib/profile";
import { SocialLinks } from "@/components/SocialLinks";

export const ContactSection = ({ number }) => {
  const { messages } = useTranslations();
  const { contact, nav } = messages;
  const [copied, setCopied] = useState(false);
  const timer = useRef();

  useEffect(() => () => clearTimeout(timer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  return (
    <section id="contact" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <SectionHeading number={number} eyebrow={nav.contact} title={contact.title} />

        <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-card p-8 md:p-12 text-center shadow-lg">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-0 bg-linear-to-br from-primary/15 via-transparent to-transparent pointer-events-none"
          />
          <div className="relative">
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">{contact.subtitle}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={`mailto:${PROFILE.email}`} className="cosmic-button">
                <Mail size={16} aria-hidden="true" /> {contact.emailCta}
              </a>
              <button type="button" onClick={copyEmail} className="outline-button" aria-live="polite">
                {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                {copied ? contact.copied : contact.copyEmail}
              </button>
            </div>

            <ul className="mt-10 flex flex-col md:flex-row justify-center gap-4 md:gap-10 text-sm text-muted-foreground">
              <li className="flex items-center justify-center gap-2">
                <Mail className="h-4 w-4 text-primary" aria-hidden="true" />
                <span className="sr-only">{contact.emailLabel}: </span>
                <a href={`mailto:${PROFILE.email}`} className="hover:text-primary transition-colors">
                  {PROFILE.email}
                </a>
              </li>
              <li className="flex items-center justify-center gap-2">
                <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
                <span className="sr-only">{contact.phoneLabel}: </span>
                <a href={PROFILE.phoneHref} className="hover:text-primary transition-colors">
                  {PROFILE.phone}
                </a>
              </li>
              <li className="flex items-center justify-center gap-2">
                <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                <span className="sr-only">{contact.locationLabel}: </span>
                {contact.location}
              </li>
            </ul>

            <div className="mt-8">
              <h3 className="text-sm font-medium mb-3">{contact.socialTitle}</h3>
              <SocialLinks
                className="justify-center gap-3"
                linkClassName="p-3 rounded-full bg-primary/10 text-primary hover:bg-primary/20"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
