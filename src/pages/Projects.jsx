import { useEffect, useMemo, useRef, useState } from "react";
import { useDialogFocus } from "../hooks/useDialogFocus.js";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

import ProjectCard from "../components/ProjectCard.jsx";
import { projects } from "../data/projects.js";
import { useLanguage } from "../context/useLanguage.js";

function Projects() {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const modalContentRef = useRef(null);
  const modalDialogRef = useRef(null);
  const modalCloseRef = useRef(null);
  const imageDialogRef = useRef(null);
  const imageCloseRef = useRef(null);
  const projectTriggerRef = useRef(null);
  const imageTriggerRef = useRef(null);

  const { t } = useLanguage();

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
    [t]
  );

  const selectedProject = useMemo(
    () =>
      translatedProjects.find((project) => project.id === selectedProjectId) ||
      null,
    [selectedProjectId, translatedProjects]
  );

  const openProjectDetail = (project) => {
    projectTriggerRef.current = document.activeElement;
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

    imageTriggerRef.current = event.currentTarget;
    setIsImageViewerOpen(true);
  };

  const closeImageViewer = (event) => {
    event?.stopPropagation();
    setIsImageViewerOpen(false);
  };

  // Keep background content out of keyboard and assistive-technology navigation.
  // The dialogs are portaled to document.body, outside #root.
  useEffect(() => {
    if (!selectedProjectId) return;

    const root = document.getElementById("root");
    const previouslyInert = root?.inert ?? false;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (root) root.inert = true;

    modalContentRef.current?.scrollTo({ top: 0, behavior: "instant" });

    return () => {
      if (root) root.inert = previouslyInert;
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedProjectId]);

  useDialogFocus({
    active: Boolean(selectedProjectId),
    suspended: isImageViewerOpen,
    dialogRef: modalDialogRef,
    initialFocusRef: modalCloseRef,
    restoreFocusRef: projectTriggerRef,
    onEscape: closeProjectDetail,
  });

  useDialogFocus({
    active: Boolean(selectedProjectId) && isImageViewerOpen,
    dialogRef: imageDialogRef,
    initialFocusRef: imageCloseRef,
    restoreFocusRef: imageTriggerRef,
    onEscape: () => setIsImageViewerOpen(false),
  });

  const modalContent =
    selectedProject &&
    createPortal(
      <>
        <div className="study-modal-overlay" onClick={closeProjectDetail}>
          <article
            className="study-modal-card"
            ref={modalDialogRef}
            inert={isImageViewerOpen}
            role="dialog"
            aria-modal="true"
            aria-labelledby="study-modal-title"
            aria-describedby="study-modal-description"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="study-modal-close"
              ref={modalCloseRef}
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

              <p id="study-modal-description" className="study-modal-description">
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
          <div
            className="study-image-viewer"
            ref={imageDialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${t("projectsPage.modal.largeImagePreview")} ${selectedProject.title}`}
            onClick={closeImageViewer}
          >
            <button
              type="button"
              className="study-image-viewer-close"
              ref={imageCloseRef}
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