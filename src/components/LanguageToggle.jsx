import { Languages } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";

function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div
      className="language-toggle-floating"
      aria-label={t("language.ariaLabel")}
    >
      <div className="language-toggle-shell">
        <Languages size={15} strokeWidth={1.8} className="language-toggle-icon" />

        <div className="language-toggle-options">
          <button
            type="button"
            className={language === "id" ? "is-active" : ""}
            onClick={() => setLanguage("id")}
            aria-label={t("language.switchToIndonesian")}
          >
            IND
          </button>

          <span aria-hidden="true" />

          <button
            type="button"
            className={language === "en" ? "is-active" : ""}
            onClick={() => setLanguage("en")}
            aria-label={t("language.switchToEnglish")}
          >
            ENG
          </button>
        </div>
      </div>
    </div>
  );
}

export default LanguageToggle;