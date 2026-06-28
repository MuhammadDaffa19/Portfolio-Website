export const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const orbitButtonVariants = {
  hidden: {
    opacity: 0,
    scale: 0.72,
    filter: "blur(8px)",
  },
  visible: (index) => ({
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      delay: index * 0.08,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  exit: {
    opacity: 0,
    scale: 0.72,
    filter: "blur(8px)",
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
};