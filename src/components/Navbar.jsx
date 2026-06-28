import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ArrowLeft, Download, Menu, X } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";

const navItems = [
  { labelKey: "navbar.items.about", path: "/about" },
  { labelKey: "navbar.items.projects", path: "/projects" },
  { labelKey: "navbar.items.skills", path: "/skills" },
  { labelKey: "navbar.items.experience", path: "/experience" },
  { labelKey: "navbar.items.certificates", path: "/certificates" },
  { labelKey: "navbar.items.contact", path: "/contact" },
];

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className={`inner-navbar ${isMobileMenuOpen ? "is-menu-open" : ""}`}>
      <NavLink
        to="/"
        className="navbar-brand"
        aria-label={t("navbar.backHome")}
      >
        <ArrowLeft size={18} strokeWidth={1.8} />
        <span>{t("navbar.brand")}</span>
      </NavLink>

      <nav
        className={`navbar-links ${isMobileMenuOpen ? "is-open" : ""}`}
        aria-label={t("navbar.navigation")}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `navbar-link ${isActive ? "is-active" : ""}`
            }
          >
            {t(item.labelKey)}
          </NavLink>
        ))}
      </nav>

      <div className="navbar-actions">
        <a href="/cv/daffa-cv.pdf" className="navbar-cv">
          <Download size={16} strokeWidth={1.8} />
          <span>{t("navbar.cv")}</span>
        </a>
      </div>

      <button
        type="button"
        className="navbar-menu-toggle"
        onClick={() => setIsMobileMenuOpen((current) => !current)}
        aria-label={
          isMobileMenuOpen ? t("navbar.menuClose") : t("navbar.menuOpen")
        }
        aria-expanded={isMobileMenuOpen}
      >
        {isMobileMenuOpen ? (
          <X size={17} strokeWidth={2} />
        ) : (
          <Menu size={17} strokeWidth={2} />
        )}
      </button>
    </header>
  );
}

export default Navbar;