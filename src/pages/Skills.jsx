import { useLanguage } from "../context/LanguageContext.jsx";

function Skills() {
  const { t } = useLanguage();

  const skillStats = t("skillsPage.stats", []);
  const skillGroups = t("skillsPage.groups", []);
  const coreCapabilities = t("skillsPage.capability.items", []);
  const learningFocus = t("skillsPage.currentFocus.items", []);
  const overviewTags = t("skillsPage.overview.tags", []);

  return (
    <section className="inner-page skills-page">
      <div className="inner-page-container">
        <div className="skills-hero">
          <div className="skills-hero-copy">
            <p className="inner-eyebrow">{t("skillsPage.eyebrow")}</p>

            <h1 className="inner-title skills-title">
              {t("skillsPage.title")}
            </h1>

            <p className="inner-description">
              {t("skillsPage.description")}
            </p>
          </div>

          <aside className="skills-overview-card">
            <p className="skills-card-label">
              {t("skillsPage.overview.label")}
            </p>

            <h2>{t("skillsPage.overview.title")}</h2>

            <p>{t("skillsPage.overview.description")}</p>

            <div className="skills-orbit-tags">
              {overviewTags.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </aside>
        </div>

        <div className="skills-stats-grid">
          {skillStats.map((item) => (
            <article className="skills-stat-card" key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>

        <div className="skills-section-head">
          <p className="skills-card-label">{t("skillsPage.skillMap.label")}</p>
          <h2>{t("skillsPage.skillMap.title")}</h2>
        </div>

        <div className="skills-group-grid">
          {skillGroups.map((group) => (
            <article className="skills-group-card" key={group.label}>
              <p className="skills-group-label">{group.label}</p>

              <h3>{group.title}</h3>

              <p>{group.description}</p>

              <div className="skills-chip-list">
                {group.skills.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>

              <div className="skills-used-in">
                <strong>{group.usedInLabel}</strong>

                <div>
                  {group.usedIn.map((project) => (
                    <span key={project}>{project}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="skills-content-grid">
          <article className="skills-capability-card">
            <p className="skills-card-label">
              {t("skillsPage.capability.label")}
            </p>

            <h2>{t("skillsPage.capability.title")}</h2>

            <div className="skills-capability-list">
              {coreCapabilities.map((item) => (
                <section key={item.title}>
                  <span>{item.title}</span>
                  <p>{item.description}</p>
                </section>
              ))}
            </div>
          </article>

          <article className="skills-learning-card">
            <p className="skills-card-label">
              {t("skillsPage.currentFocus.label")}
            </p>

            <h2>{t("skillsPage.currentFocus.title")}</h2>

            <ul>
              {learningFocus.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

export default Skills;