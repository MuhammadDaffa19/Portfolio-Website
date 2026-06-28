import { ArrowUpRight, Mail, Sparkles } from "lucide-react";
import { useLanguage } from "../context/LanguageContext.jsx";

function Contact() {
  const { t } = useLanguage();

  const contactChannels = t("contactPage.channels", []);
  const collaborationTypes = t("contactPage.collaboration.items", []);
  const contactNotes = t("contactPage.notes.items", []);
  const overviewTags = t("contactPage.overview.tags", []);

  return (
    <section className="inner-page contact-page">
      <div className="inner-page-container">
        <div className="contact-hero">
          <div className="contact-hero-copy">
            <p className="inner-eyebrow">{t("contactPage.eyebrow")}</p>

            <h1 className="inner-title contact-title">
              {t("contactPage.title")}
            </h1>

            <p className="inner-description">
              {t("contactPage.description")}
            </p>
          </div>

          <aside className="contact-overview-card">
            <p className="contact-card-label">
              {t("contactPage.overview.label")}
            </p>

            <h2>{t("contactPage.overview.title")}</h2>

            <p>{t("contactPage.overview.description")}</p>

            <div className="contact-orbit-tags">
              {overviewTags.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </aside>
        </div>

        <div className="contact-channel-grid">
          {contactChannels.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className={`contact-channel-card ${
                item.isPrimary ? "is-primary" : ""
              }`}
            >
              <div className="contact-channel-icon">
                {item.type === "icon" ? (
                  <Mail size={22} strokeWidth={1.8} />
                ) : (
                  <span>{item.iconText}</span>
                )}
              </div>

              <div className="contact-channel-content">
                <p>{item.label}</p>
                <h2>{item.title}</h2>
                <span>{item.value}</span>
                <small>{item.description}</small>
              </div>

              <ArrowUpRight
                className="contact-channel-arrow"
                size={20}
                strokeWidth={1.8}
              />
            </a>
          ))}
        </div>

        <div className="contact-content-grid">
          <article className="contact-collaboration-card">
            <p className="contact-card-label">
              {t("contactPage.collaboration.label")}
            </p>

            <h2>{t("contactPage.collaboration.title")}</h2>

            <div className="contact-collaboration-grid">
              {collaborationTypes.map((item) => (
                <section key={item.number}>
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </section>
              ))}
            </div>
          </article>

          <article className="contact-note-card">
            <p className="contact-card-label">
              {t("contactPage.notes.label")}
            </p>

            <h2>{t("contactPage.notes.title")}</h2>

            <ul>
              {contactNotes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </div>

        <div className="contact-closing-card">
          <div>
            <p className="contact-card-label">
              {t("contactPage.closing.label")}
            </p>

            <h2>{t("contactPage.closing.title")}</h2>

            <p>{t("contactPage.closing.description")}</p>
          </div>

          <a
            href={t("contactPage.closing.href")}
            className="contact-closing-button"
          >
            <Mail size={18} strokeWidth={1.8} />
            <span>{t("contactPage.closing.button")}</span>
          </a>

          <Sparkles
            className="contact-closing-spark"
            size={110}
            strokeWidth={1}
          />
        </div>
      </div>
    </section>
  );
}

export default Contact;