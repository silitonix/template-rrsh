import { initI18n } from "~/localization/i18n";
import type { Route } from "./+types/($lang)._index";
import { t } from "i18next";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New app" },
    { name: "description", content: "Welcome new app!" },
  ];
}

export default function _index() {
  return <div>{t("hello")}</div>;
}
