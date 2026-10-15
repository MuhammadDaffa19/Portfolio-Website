import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ArrowLeft, Download, Menu, X } from "lucide-react";
import { useLanguage } from "../context/useLanguage.js";
import { cvFeature } from "../config/siteFeatures.js";

const navItems = [
  { labelKey: "navbar.items.about", path: "/about" },
  { labelKey: "navbar.items.projects", path: "/projects" },
  { labelKey: "navbar.items.skills", path: "/skills" },
  { labelKey: "navbar.items.experience", path: "/experience" },
  { labelKey: "navbar.items.certificates", path: "/certificates" },
  { labelKey: "navbar.items.contact", path: "/contact" },
];

function NavbarContent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useLanguage();
  const headerRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleKeyDown = (event) => {
      if (event.key !== "Escape") return;
      setIsMobileMenuOpen(false);
      toggleRef.current?.focus();
    };

    const handlePointerDown = (event) => {
      if (!headerRef.current?.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const closeOnDesktop = (event) => {
      if (!event.matches) setIsMobileMenuOpen(false);
    };
    mobileQuery.addEventListener("change", closeOnDesktop);
    return () => mobileQuery.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <header ref={headerRef} className={`inner-navbar ${isMobileMenuOpen ? "is-menu-open" : ""} ${cvFeature.enabled ? "" : "is-cv-disabled"}`}>
      <NavLink
        to="/"
        onClick={() => setIsMobileMenuOpen(false)}
        className="navbar-brand"
        aria-label={t("navbar.backHome")}
      >
        <ArrowLeft size={18} strokeWidth={1.8} />
        <span>{t("navbar.brand")}</span>
      </NavLink>

      <nav
        id="portfolio-mobile-navigation"
        className={`navbar-links ${isMobileMenuOpen ? "is-open" : ""}`}
        aria-label={t("navbar.navigation")}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setIsMobileMenuOpen(false)}
            className={({ isActive }) =>
              `navbar-link ${isActive ? "is-active" : ""}`
            }
          >
            {t(item.labelKey)}
          </NavLink>
        ))}
      </nav>

      {cvFeature.enabled && (
        <div className="navbar-actions">
          <a href={cvFeature.href} className="navbar-cv" download>
            <Download size={16} strokeWidth={1.8} />
            <span>{t("navbar.cv")}</span>
          </a>
        </div>
      )}

      <button
        type="button"
        className="navbar-menu-toggle"
        ref={toggleRef}
        aria-controls="portfolio-mobile-navigation"
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

function Navbar() {
  const { pathname } = useLocation();
  return <NavbarContent key={pathname} />;
}

export default Navbar;