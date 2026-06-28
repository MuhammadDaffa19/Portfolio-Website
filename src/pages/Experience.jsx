import { useLanguage } from "../context/LanguageContext.jsx";

function Experience() {
  const { t } = useLanguage();

  const experienceStats = t("experiencePage.stats", []);
  const timelineItems = t("experiencePage.timeline.items", []);
  const workProcess = t("experiencePage.workflow.items", []);
  const experienceValues = t("experiencePage.values.items", []);
  const overviewTags = t("experiencePage.overview.tags", []);

  return (
    <section className="inner-page experience-page">
      <div className="inner-page-container">
        <div className="experience-hero">
          <div className="experience-hero-copy">
            <p className="inner-eyebrow">{t("experiencePage.eyebrow")}</p>

            <h1 className="inner-title experience-title">
              {t("experiencePage.title")}
            </h1>

            <p className="inner-description">
              {t("experiencePage.description")}
            </p>
          </div>

          <aside className="experience-overview-card">
            <p className="experience-card-label">
              {t("experiencePage.overview.label")}
            </p>

            <h2>{t("experiencePage.overview.title")}</h2>

            <p>{t("experiencePage.overview.description")}</p>

            <div className="experience-orbit-tags">
              {overviewTags.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </aside>
        </div>

        <div className="experience-stats-grid">
          {experienceStats.map((item) => (
            <article className="experience-stat-card" key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>

        <div className="experience-section-head">
          <p className="experience-card-label">
            {t("experiencePage.timeline.label")}
          </p>
          <h2>{t("experiencePage.timeline.title")}</h2>
        </div>

        <div className="experience-timeline">
          {timelineItems.map((item, index) => (
            <article className="experience-timeline-item" key={item.title}>
              <div className="experience-timeline-marker">
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>

              <div className="experience-timeline-card">
                <div className="experience-timeline-meta">
                  <span>{item.period}</span>
                  <span>{item.type}</span>
                  <span>{item.role}</span>
                </div>

                <h3>{item.title}</h3>

                <p>{item.description}</p>

                <div className="experience-stack-list">
                  {item.stack.map((stack) => (
                    <span key={stack}>{stack}</span>
                  ))}
                </div>

                <ul>
                  {item.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="experience-content-grid">
          <article className="experience-process-card">
            <p className="experience-card-label">
              {t("experiencePage.workflow.label")}
            </p>

            <h2>{t("experiencePage.workflow.title")}</h2>

            <div className="experience-process-grid">
              {workProcess.map((item) => (
                <section key={item.number}>
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </section>
              ))}
            </div>
          </article>

          <article className="experience-values-card">
            <p className="experience-card-label">
              {t("experiencePage.values.label")}
            </p>

            <h2>{t("experiencePage.values.title")}</h2>

            <ul>
              {experienceValues.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

export default Experience;