import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import ProjectCard from "../components/ProjectCard.jsx";
import { projects } from "../data/projects.js";
import { useLanguage } from "../context/LanguageContext.jsx";

function Projects() {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const modalContentRef = useRef(null);

  const { language, t } = useLanguage();

  const translatedProjects = useMemo(
    () =>
      projects.map((project) => {
        const projectKey = `projectItems.${project.id}`;
        const translatedFeatures = t(`${projectKey}.features`, project.features);

        return {
          ...project,
          title: t(`${projectKey}.title`, project.title),
          status: t(`${projectKey}.status`, project.status),
          category: t(`${projectKey}.category`, project.category),
          role: t(`${projectKey}.role`, project.role),
          description: t(`${projectKey}.description`, project.description),
          problem: t(`${projectKey}.problem`, project.problem),
          solution: t(`${projectKey}.solution`, project.solution),
          impact: t(`${projectKey}.impact`, project.impact),
          features: Array.isArray(translatedFeatures)
            ? translatedFeatures
            : project.features,
        };
      }),
    [language, t]
  );

  const selectedProject = useMemo(
    () =>
      translatedProjects.find((project) => project.id === selectedProjectId) ||
      null,
    [selectedProjectId, translatedProjects]
  );

  const openProjectDetail = (project) => {
    setSelectedProjectId(project.id);
    setIsImageViewerOpen(false);
  };

  const closeProjectDetail = () => {
    setSelectedProjectId(null);
    setIsImageViewerOpen(false);
  };

  const openImageViewer = (event) => {
    event.stopPropagation();

    if (!selectedProject?.image) return;

    setIsImageViewerOpen(true);
  };

  const closeImageViewer = (event) => {
    event?.stopPropagation();
    setIsImageViewerOpen(false);
  };

  useEffect(() => {
    if (!selectedProject) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    modalContentRef.current?.scrollTo({
      top: 0,
      behavior: "instant",
    });

    const handleKeyDown = (event) => {
      if (event.key !== "Escape") return;

      if (isImageViewerOpen) {
        setIsImageViewerOpen(false);
        return;
      }

      closeProjectDetail();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProject, isImageViewerOpen]);

  const modalContent =
    selectedProject &&
    createPortal(
      <>
        <div className="study-modal-overlay" onClick={closeProjectDetail}>
          <article
            className="study-modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="study-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="study-modal-close"
              onClick={closeProjectDetail}
              aria-label={t("projectsPage.modal.closeDetail")}
            >
              <X size={20} strokeWidth={1.8} />
            </button>

            <aside className="study-modal-preview">
              <button
                type="button"
                className="study-modal-image-button"
                onClick={openImageViewer}
                aria-label={`${t("projectsPage.modal.enlargePreview")} ${
                  selectedProject.title
                }`}
              >
                {selectedProject.image ? (
                  <>
                    <img
                      src={selectedProject.image}
                      alt={`${t("projectsPage.modal.imagePreview")} ${
                        selectedProject.title
                      }`}
                    />
                    <span>{t("projectsPage.modal.clickToZoom")}</span>
                  </>
                ) : (
                  <strong>{selectedProject.title}</strong>
                )}
              </button>

              <div className="study-modal-badges">
                <span>{selectedProject.status}</span>
                <span>{selectedProject.category}</span>
                <span>{selectedProject.year}</span>
              </div>
            </aside>

            <div className="study-modal-content" ref={modalContentRef}>
              <div className="study-modal-meta">
                <span>{selectedProject.category}</span>
                <span>{selectedProject.year}</span>
                <span>{selectedProject.role}</span>
              </div>

              <h2 id="study-modal-title">{selectedProject.title}</h2>

              <p className="study-modal-description">
                {selectedProject.description}
              </p>

              <div className="study-modal-stack">
                {selectedProject.stack?.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>

              <div className="study-modal-grid">
                <section>
                  <span>{t("projectsPage.modal.problem")}</span>
                  <p>{selectedProject.problem}</p>
                </section>

                <section>
                  <span>{t("projectsPage.modal.solution")}</span>
                  <p>{selectedProject.solution}</p>
                </section>

                <section>
                  <span>{t("projectsPage.modal.impact")}</span>
                  <p>{selectedProject.impact}</p>
                </section>

                <section>
                  <span>{t("projectsPage.modal.keyFeatures")}</span>

                  <ul>
                    {selectedProject.features?.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </section>
              </div>
            </div>
          </article>
        </div>

        {isImageViewerOpen && (
          <div className="study-image-viewer" onClick={closeImageViewer}>
            <button
              type="button"
              className="study-image-viewer-close"
              onClick={closeImageViewer}
              aria-label={t("projectsPage.modal.closeImagePreview")}
            >
              ×
            </button>

            <img
              src={selectedProject.image}
              alt={`${t("projectsPage.modal.largeImagePreview")} ${
                selectedProject.title
              }`}
              onClick={(event) => event.stopPropagation()}
            />
          </div>
        )}
      </>,
      document.body
    );

  return (
    <section className="inner-page project-archive-page">
      <div className="inner-page-container">
        <div className="project-archive-head">
          <div>
            <p className="inner-eyebrow">{t("projectsPage.eyebrow")}</p>

            <h1 className="inner-title">{t("projectsPage.title")}</h1>

            <p className="inner-description">
              {t("projectsPage.description")}
            </p>
          </div>

          <div className="project-archive-summary">
            <span>{translatedProjects.length}</span>
            <p>{t("projectsPage.summaryLabel")}</p>
          </div>
        </div>

        <div className="project-grid">
          {translatedProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpenDetail={openProjectDetail}
            />
          ))}
        </div>
      </div>

      {modalContent}
    </section>
  );
}

export default Projects;