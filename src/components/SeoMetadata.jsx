import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getSeoMetadata } from "../config/seo.js";
import { useLanguage } from "../context/useLanguage.js";

function setMeta(selector, content) {
  const element = document.querySelector(selector);
  if (element) element.setAttribute("content", content);
}

// Updates browser titles and client-side metadata on both route and language
// changes. Index.html remains the crawlable default for JS-free consumers.
function SeoMetadata() {
  const { pathname } = useLocation();
  const { language } = useLanguage();

  useEffect(() => {
    const { title, description } = getSeoMetadata(pathname, language);
    document.title = title;
    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', title);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:locale"]', language === "en" ? "en_US" : "id_ID");
    setMeta('meta[name="twitter:title"]', title);
    setMeta('meta[name="twitter:description"]', description);
  }, [pathname, language]);

  return null;
}

export default SeoMetadata;
