import { motion } from "motion/react";

function OrbitalCore({ isOpen, onActivate, onToggle }) {
  return (
    <motion.button
      type="button"
      className={`orbital-core ${isOpen ? "is-active" : ""}`}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onToggle}
      aria-label="Buka navigasi portfolio"
      aria-expanded={isOpen}
      initial={{
        opacity: 0,
        scale: 0.82,
        x: "-50%",
        y: "-50%",
      }}
      animate={{
        opacity: 1,
        scale: 1,
        x: "-50%",
        y: "-50%",
      }}
      transition={{
        duration: 0.85,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <span className="core-ring core-ring-one" />
      <span className="core-ring core-ring-two" />
      <span className="core-ring core-ring-three" />

      <span className="core-orb">
        <span className="core-glass" />

        <span className="core-photo-layer">
          <img
            src="/images/profile-daffa.webp"
            alt="Foto profil Muhammad Daffa Aulia Jowis"
            className="core-photo"
          />
        </span>

        <span className="core-identity">
          <span className="core-monogram">M.D.A.J</span>

          <span className="core-name">
            <span>MUHAMMAD DAFFA</span>
            <span>AULIA JOWIS</span>
          </span>
        </span>
      </span>

      <span className="core-dot core-dot-top" />
      <span className="core-dot core-dot-right" />
      <span className="core-dot core-dot-bottom" />
      <span className="core-dot core-dot-left" />
    </motion.button>
  );
}

export default OrbitalCore;