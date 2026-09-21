export const SUPPORTED_LANGUAGES = ["es", "en"];
export const DEFAULT_LANGUAGE = "es";

export function isSupportedLanguage(lang) {
  return SUPPORTED_LANGUAGES.includes(lang);
}

export function detectBrowserLanguage() {
  if (typeof navigator === "undefined") return DEFAULT_LANGUAGE;
  const preferred = navigator.languages?.[0] || navigator.language || DEFAULT_LANGUAGE;
  return preferred.toLowerCase().startsWith("en") ? "en" : DEFAULT_LANGUAGE;
}
