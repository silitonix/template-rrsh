import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en";
import { data, useParams } from "react-router";

/* add new languages to the resources */
const resources = { en };
const lang_key = "vite-lang";
const lang_default = "en";

export function useLang() {
  const { lang } = useParams();
  if (typeof window == "undefined") return;
  if (typeof lang === "undefined") {
    localStorage.setItem(lang_key, lang_default);
    return true;
  }

  const current = localStorage.getItem("vite");
  if (lang == current) return true;
  if (!Object.hasOwn(resources, lang)) {
    throw data("Record Not Found", { status: 404 });
  }
  localStorage.setItem(lang_key, lang);
  i18n.changeLanguage(lang);
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng:
      typeof window == "undefined"
        ? lang_default
        : localStorage.getItem(lang_key) || lang_default,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
