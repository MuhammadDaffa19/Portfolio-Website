import { useState } from "react";
import { useLanguage } from "../context/LanguageContext.jsx";

function About() {
  const [isProfilePhotoLocked, setIsProfilePhotoLocked] = useState(false);
  const [isProfilePhotoHovered, setIsProfilePhotoHovered] = useState(false);
  const [isProfilePhotoSuppressed, setIsProfilePhotoSuppressed] =
    useState(false);

  const { t } = useLanguage();

  const aboutStats = t("about.stats", []);
  const workingValues = t("about.values.items", []);
  const focusAreas = t("about.focus.items", []);
  const approachParagraphs = t("about.approach.paragraphs", []);
  const profileTags = t("about.profile.tags", []);

  const isProfilePhotoVisible =
    isProfilePhotoLocked || (isProfilePhotoHovered && !isProfilePhotoSuppressed);

  const handleProfileToggle = () => {
    if (isProfilePhotoVisible) {
      setIsProfilePhotoLocked(false);
      setIsProfilePhotoHovered(false);
      setIsProfilePhotoSuppressed(true);
      return;
    }

    setIsProfilePhotoLocked(true);
    setIsProfilePhotoSuppressed(false);
  };

  return (
    <section className="inner-page about-page">
      <div className="inner-page-container">
        <div className="about-hero">
          <div className="about-hero-copy">
            <p className="inner-eyebrow">{t("about.eyebrow")}</p>

            <h1 className="inner-title about-title">{t("about.title")}</h1>

            <p className="inner-description">{t("about.description")}</p>
          </div>

          <aside className="about-profile-card">
            <button
              type="button"
              className={`about-profile-orb ${
                isProfilePhotoVisible ? "is-photo-visible" : ""
              }`}
              onMouseEnter={() => setIsProfilePhotoHovered(true)}
              onMouseLeave={() => {
                setIsProfilePhotoHovered(false);
                setIsProfilePhotoSuppressed(false);
              }}
              onFocus={() => setIsProfilePhotoHovered(true)}
              onBlur={() => {
                setIsProfilePhotoHovered(false);
                setIsProfilePhotoSuppressed(false);
              }}
              onClick={handleProfileToggle}
              aria-label={t("about.profile.ariaLabel")}
              aria-pressed={isProfilePhotoVisible}
            >
              <span className="about-profile-photo-layer">
                <img
                  src="/images/profile-daffa.webp"
                  alt={t("about.profile.imageAlt")}
                />
              </span>

              <span className="about-profile-identity">
                <span className="about-profile-monogram">M.D.A.J</span>

                <span className="about-profile-name">
                  <span>{t("about.profile.tapTop")}</span>
                  <span>{t("about.profile.tapBottom")}</span>
                </span>
              </span>
            </button>

            <div className="about-profile-content">
              <p className="about-profile-label">{t("about.profile.label")}</p>
              <h2>{t("about.profile.title")}</h2>
              <p>{t("about.profile.role")}</p>

              <div className="about-profile-tags">
                {profileTags.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <div className="about-stats-grid">
          {aboutStats.map((item) => (
            <article className="about-stat-card" key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>

        <div className="about-content-grid">
          <article className="about-story-card">
            <p className="about-section-label">{t("about.approach.label")}</p>

            <h2>{t("about.approach.title")}</h2>

            {approachParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>

          <article className="about-values-card">
            <p className="about-section-label">{t("about.values.label")}</p>

            <h2>{t("about.values.title")}</h2>

            <ul>
              {workingValues.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>

        <div className="about-focus-section">
          <div className="about-section-head">
            <div>
              <p className="about-section-label">{t("about.focus.label")}</p>
              <h2>{t("about.focus.title")}</h2>
            </div>
          </div>

          <div className="about-focus-grid">
            {focusAreas.map((item) => (
              <article className="about-focus-card" key={item.number}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;