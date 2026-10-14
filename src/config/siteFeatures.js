/**
 * Public-facing feature availability.
 *
 * Keep CV disabled until the updated PDF has been approved for publication.
 * This module is shared by React and the Node.js asset quality gate to avoid
 * the UI and deployment validation drifting apart.
 */
export const cvFeature = Object.freeze({
  enabled: false,
  href: "/cv/daffa-cv.pdf",
});
