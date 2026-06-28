import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  Award,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Code2,
  Mail,
  Sparkles,
  UserRound,
} from "lucide-react";

import OrbitalCore from "../components/OrbitalCore.jsx";
import OrbitButton from "../components/OrbitButton.jsx";

import { fadeUp } from "../animations/motionVariants.js";
import { orbitNavigation } from "../data/translations.js";
import { useLanguage } from "../context/LanguageContext.jsx";

const mobileIconMap = {
  user: UserRound,
  briefcase: BriefcaseBusiness,
  code: Code2,
  chart: ChartNoAxesCombined,
  award: Award,
  mail: Mail,
};

const mobileGridVariants = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.08,
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 1,
    transition: {
      staggerChildren: 0.045,
      staggerDirection: -1,
    },
  },
};

const mobileCardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.82,
    filter: "blur(7px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.86,
    filter: "blur(5px)",
    transition: {
      duration: 0.26,
      ease: [0.4, 0, 0.2, 1],
    },
  },
};

function Home() {
  const [isOrbitOpen, setIsOrbitOpen] = useState(false);
  const [activeOrbit, setActiveOrbit] = useState(null);
  const [selectedOrbit, setSelectedOrbit] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isMobileLayout, setIsMobileLayout] = useState(false);

  const navigate = useNavigate();
  const navigationTimer = useRef(null);

  const { language, t } = useLanguage();

  const content = useMemo(
    () => ({
      welcome: t("home.welcome"),
      title: t("home.title"),
      subtitle: t("home.subtitle"),
      role: t("home.role"),
      quote: t("home.quote"),
      idleHint: t("home.idleHint"),
      activeHint: t("home.activeHint"),
      opening: language === "en" ? "Opening page..." : "Membuka halaman...",
    }),
    [language, t]
  );

  const translatedOrbitNavigation = useMemo(
    () =>
      orbitNavigation.map((item) => ({
        ...item,
        label: t(item.labelKey, item.label),
        description: t(item.descriptionKey, item.description),
      })),
    [language, t]
  );

  const topMobileNavigation = translatedOrbitNavigation.slice(0, 3);
  const bottomMobileNavigation = translatedOrbitNavigation.slice(3);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 680px)");

    const handleMediaChange = () => {
      setIsMobileLayout(mediaQuery.matches);
    };

    handleMediaChange();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleMediaChange);
    } else {
      mediaQuery.addListener(handleMediaChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener("change", handleMediaChange);
      } else {
        mediaQuery.removeListener(handleMediaChange);
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (navigationTimer.current) {
        window.clearTimeout(navigationTimer.current);
      }
    };
  }, []);

  const handleActivate = () => {
    if (isNavigating) return;

    setIsOrbitOpen(true);
  };

  const handleToggle = () => {
    if (isNavigating) return;

    setIsOrbitOpen((current) => !current);
  };

  const handleStageLeave = () => {
    if (isNavigating) return;

    setIsOrbitOpen(false);
    setActiveOrbit(null);
  };

  const handleNavigate = (item) => {
    if (isNavigating) return;

    setIsOrbitOpen(true);
    setActiveOrbit(item.id);
    setSelectedOrbit(item.id);
    setIsNavigating(true);

    navigationTimer.current = window.setTimeout(() => {
      navigate(item.path);
    }, 720);
  };

  const renderMobileCard = (item) => {
    const Icon = mobileIconMap[item.icon] || UserRound;
    const isSelected = selectedOrbit === item.id;

    return (
      <motion.button
        key={item.id}
        type="button"
        className={`home-mobile-card ${isSelected ? "is-selected" : ""}`}
        variants={mobileCardVariants}
        whileTap={{
          scale: 0.97,
        }}
        onClick={() => handleNavigate(item)}
        disabled={isNavigating}
        aria-label={item.label}
      >
        <span className="home-mobile-card-icon">
          <Icon size={20} strokeWidth={1.8} />
        </span>

        <span className="home-mobile-card-copy">
          <span className="home-mobile-card-label">{item.label}</span>
          <span className="home-mobile-card-description">
            {item.description}
          </span>
        </span>
      </motion.button>
    );
  };

  return (
    <section
      className={`home-gateway ${
        isOrbitOpen || isNavigating ? "is-orbit-open" : ""
      } ${isNavigating ? "is-page-leaving" : ""}`}
    >
      <div className="home-overlay" />

      <div className="home-content">
        <motion.header
          className="home-header"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <p className="home-welcome">{content.welcome}</p>

          <h1 className="home-title">
            Daffa Project <span>Index</span>
          </h1>

          <p className="home-subtitle">{content.subtitle}</p>

          <div className="home-role-pill">
            <Sparkles size={18} strokeWidth={1.8} />
            <span>{content.role}</span>
          </div>
        </motion.header>

        {/* DESKTOP ORBIT */}
        <div
          className={`orbital-stage home-desktop-orbital-stage ${
            isOrbitOpen ? "is-open" : ""
          } ${activeOrbit ? "has-active-button" : ""} ${
            isNavigating ? "is-navigating" : ""
          }`}
          onMouseLeave={handleStageLeave}
        >
          <div className="orbit-line orbit-line-one" />
          <div className="orbit-line orbit-line-two" />
          <div className="orbit-line orbit-line-three" />

          <span className="navigation-flash" />

          <OrbitalCore
            isOpen={isOrbitOpen || isNavigating}
            onActivate={handleActivate}
            onToggle={handleToggle}
          />

          {translatedOrbitNavigation.map((item, index) => (
            <OrbitButton
              key={item.id}
              item={item}
              index={index}
              isOpen={isOrbitOpen || isNavigating}
              activeOrbit={activeOrbit}
              selectedOrbit={selectedOrbit}
              isNavigating={isNavigating}
              onActiveChange={setActiveOrbit}
              onNavigate={handleNavigate}
            />
          ))}
        </div>

        {/* MOBILE ORBIT */}
        {isMobileLayout && (
          <div
            className={`home-mobile-stage ${
              isOrbitOpen || isNavigating ? "is-open" : ""
            }`}
          >
            <AnimatePresence initial={false}>
              {(isOrbitOpen || isNavigating) && (
                <motion.div
                  key="mobile-top-menu"
                  className="home-mobile-card-grid home-mobile-card-grid-top"
                  variants={mobileGridVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {topMobileNavigation.map((item) => renderMobileCard(item))}
                </motion.div>
              )}
            </AnimatePresence>

            <div className="home-mobile-core-field">
              <div className="home-mobile-orbit-line home-mobile-orbit-line-one" />
              <div className="home-mobile-orbit-line home-mobile-orbit-line-two" />
              <div className="home-mobile-orbit-line home-mobile-orbit-line-three" />

              <OrbitalCore
                isOpen={isOrbitOpen || isNavigating}
                onActivate={() => {}}
                onToggle={handleToggle}
              />
            </div>

            <AnimatePresence initial={false}>
              {(isOrbitOpen || isNavigating) && (
                <motion.div
                  key="mobile-bottom-menu"
                  className="home-mobile-card-grid home-mobile-card-grid-bottom"
                  variants={mobileGridVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {bottomMobileNavigation.map((item) => renderMobileCard(item))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        <motion.div
          className="home-quote"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.15 }}
        >
          <span className="quote-mark">“</span>
          <p>{content.quote}</p>
          <span className="quote-mark">”</span>
        </motion.div>

        <p className="home-hint">
          <span />
          {isNavigating
            ? content.opening
            : isOrbitOpen
              ? content.activeHint
              : content.idleHint}
        </p>
      </div>
    </section>
  );
}

export default Home;