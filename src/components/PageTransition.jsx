import { motion, useReducedMotion } from "motion/react";

function PageTransition({ children }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="page-transition"
      initial={reduceMotion ? false : { opacity: 0, y: 14, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: reduceMotion ? 0 : 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;