import { useLanguage } from "../context/LanguageContext.jsx";

function Certificates() {
  const { t } = useLanguage();

  const learningStats = t("learningPage.stats", []);
  const learningPaths = t("learningPage.learningPath.items", []);
  const academicFoundations = t("learningPage.foundation.items", []);
  const learningPrinciples = t("learningPage.principles.items", []);
  const overviewTags = t("learningPage.overview.tags", []);

  return (
    <section className="inner-page learning-page">
      <div className="inner-page-container">
        <div className="learning-hero">
          <div className="learning-hero-copy">
            <p className="inner-eyebrow">{t("learningPage.eyebrow")}</p>

            <h1 className="inner-title learning-title">
              {t("learningPage.title")}
            </h1>

            <p className="inner-description">
              {t("learningPage.description")}
            </p>
          </div>

          <aside className="learning-overview-card">
            <p className="learning-card-label">
              {t("learningPage.overview.label")}
            </p>

            <h2>{t("learningPage.overview.title")}</h2>

            <p>{t("learningPage.overview.description")}</p>

            <div className="learning-orbit-tags">
              {overviewTags.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </aside>
        </div>

        <div className="learning-stats-grid">
          {learningStats.map((item) => (
            <article className="learning-stat-card" key={item.label}>
              <strong>{item.value}</strong>
              <span>{item.label}</span>
            </article>
          ))}
        </div>

        <div className="learning-section-head">
          <p className="learning-card-label">
            {t("learningPage.learningPath.label")}
          </p>
          <h2>{t("learningPage.learningPath.title")}</h2>
        </div>

        <div className="learning-path-grid">
          {learningPaths.map((item) => (
            <article className="learning-path-card" key={item.number}>
              <div className="learning-path-head">
                <span>{item.number}</span>
                <p>{item.label}</p>
              </div>

              <h3>{item.title}</h3>

              <p>{item.description}</p>

              <div className="learning-topic-list">
                {item.topics.map((topic) => (
                  <span key={topic}>{topic}</span>
                ))}
              </div>

              <div className="learning-evidence">
                <strong>{t("learningPage.learningPath.evidenceLabel")}</strong>

                <div>
                  {item.evidence.map((project) => (
                    <span key={project}>{project}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="learning-content-grid">
          <article className="learning-foundation-card">
            <p className="learning-card-label">
              {t("learningPage.foundation.label")}
            </p>

            <h2>{t("learningPage.foundation.title")}</h2>

            <div className="learning-foundation-list">
              {academicFoundations.map((item) => (
                <section key={item.title}>
                  <span>{item.title}</span>
                  <p>{item.description}</p>
                </section>
              ))}
            </div>
          </article>

          <article className="learning-principle-card">
            <p className="learning-card-label">
              {t("learningPage.principles.label")}
            </p>

            <h2>{t("learningPage.principles.title")}</h2>

            <ul>
              {learningPrinciples.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

export default Certificates;