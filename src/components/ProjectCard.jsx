import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

function ProjectCard({ project, index, onOpenDetail }) {
  const [imageError, setImageError] = useState(false);

  const projectNumber = String(index + 1).padStart(2, "0");
  const hasStack = Array.isArray(project.stack) && project.stack.length > 0;
  const hasHighlights =
    Array.isArray(project.highlights) && project.highlights.length > 0;

  const handleOpenDetail = () => {
    if (typeof onOpenDetail === "function") {
      onOpenDetail(project);
    }
  };

  return (
    <article className="project-card">
      <div className={`project-card-visual ${imageError ? "is-empty" : ""}`}>
        <div className="project-card-placeholder">
          <span>{project.title}</span>
        </div>

        {!imageError && project.image && (
          <img
            src={project.image}
            alt={`Preview ${project.title}`}
            loading="lazy"
            onError={() => setImageError(true)}
          />
        )}

        <div className="project-card-status">{project.status}</div>
      </div>

      <div className="project-card-content">
        <div className="project-card-meta">
          <span>{projectNumber}</span>
          <span>{project.category}</span>
          <span>{project.year}</span>
          <span>{project.role}</span>
        </div>

        <h2>{project.title}</h2>

        <p>{project.description}</p>

        {hasStack && (
          <div className="project-stack">
            {project.stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        )}

        {hasHighlights && (
          <ul className="project-highlights">
            {project.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}

        <button
          type="button"
          className="project-detail-button"
          onClick={handleOpenDetail}
        >
          <span>Lihat studi kasus</span>
          <ArrowUpRight size={17} strokeWidth={1.8} />
        </button>
      </div>
    </article>
  );
}

export default ProjectCard;