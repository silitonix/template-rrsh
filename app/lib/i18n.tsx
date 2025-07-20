import i18n from "i18next";
import type { NavLinkProps, LinkProps, NavigateProps, To } from "react-router";
import { NavLink, Link, Navigate } from "react-router";
import { initReactI18next } from "react-i18next";
import { data, useParams } from "react-router";
import { StateError } from "~/lib/error";
import { useLocation } from "react-router";
import en from "~/localize/en";
import { useNavigate } from "react-router";
import { replace } from "react-router";
import { redirect } from "react-router";

/* add new languages to the resources */
const lng_res = { en };
const lng_key = "vite-lng";
const lng_default = "en";
const lng_supported = Object.keys(lng_res);

function iUseLocation(code?: string) {
  const { lng } = useParams();
  const loc = useLocation();
  if (lng === undefined) return loc;
  let pathname = loc.pathname;
  if (code && !Object.hasOwn(lng_res, code)) {
    throw new Error("Language does not exit");
  }
  pathname = pathname.replace(/^\/?[^\/]+$/, code ? `/${code}` : "/");

  return { ...loc, pathname };
}

function iTo(to: To): To {
  const { lng } = useParams();
  let newTo: To = to;
  if (lng === undefined || lng === lng_default) return to;
  if (typeof newTo === "string") {
    newTo = {
      pathname: newTo,
    };
  }
  if (newTo.pathname?.startsWith("/")) {
    newTo.pathname = `/${lng}${newTo.pathname}`;
    return newTo;
  }
  return to;
}

function ILink(props: LinkProps) {
  const to = iTo(props.to);
  return <Link {...props} to={to} />;
}
function INavigate(props: NavigateProps) {
  const to = iTo(props.to);
  return <Navigate {...props} to={to} />;
}
function INavLink(props: NavLinkProps) {
  const to = iTo(props.to);
  return <NavLink {...props} to={to} />;
}

export function initI18n() {
  const { lng } = useParams();
  if (lng == lng_default) {
    location.replace(iUseLocation().pathname);
  }
  if (typeof window == "undefined") return;
  if (typeof lng == "undefined") {
    i18n.changeLanguage(lng_default);
    localStorage.setItem(lng_key, lng_default);
    return;
  }

  const current = localStorage.getItem(lng_key);
  if (lng == current) return;
  if (!Object.hasOwn(lng_res, lng)) {
    throw new StateError(404);
  }
  localStorage.setItem(lng_key, lng);
  i18n.changeLanguage(lng);
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: lng_res,
    lng:
      typeof window == "undefined"
        ? lng_default
        : localStorage.getItem(lng_key) || lng_default,
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export {
  INavLink as NavLink,
  ILink as Link,
  INavigate as Navigate,
  iUseLocation as useLocation,
  lng_supported as i18nSupported,
};
