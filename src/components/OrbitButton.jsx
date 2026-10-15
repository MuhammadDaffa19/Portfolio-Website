import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "motion/react";
import {
  Award,
  BriefcaseBusiness,
  ChartNoAxesCombined,
  Code2,
  Mail,
  UserRound,
} from "lucide-react";

import { orbitButtonVariants } from "../animations/motionVariants.js";

const iconMap = {
  user: UserRound,
  briefcase: BriefcaseBusiness,
  code: Code2,
  chart: ChartNoAxesCombined,
  award: Award,
  mail: Mail,
};

const positionMap = {
  "top-left": "orbit-top-left",
  "top-right": "orbit-top-right",
  "middle-left": "orbit-middle-left",
  "middle-right": "orbit-middle-right",
  "bottom-left": "orbit-bottom-left",
  "bottom-right": "orbit-bottom-right",
};

function OrbitButton({
  item,
  index,
  isOpen,
  activeOrbit,
  selectedOrbit,
  isNavigating,
  onActiveChange,
  onNavigate,
}) {
  const reduceMotion = useReducedMotion();
  const Icon = iconMap[item.icon] || UserRound;
  const isActive = activeOrbit === item.id;
  const isSelected = selectedOrbit === item.id;
  const isDimmed = isNavigating && !isSelected;

  const handleClick = (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    onNavigate(item);
  };

  return (
    <motion.div
      className={`orbit-button ${positionMap[item.position]} ${
        isOpen ? "is-visible" : ""
      } ${isActive ? "is-active" : ""} ${
        isSelected ? "is-selected" : ""
      } ${isDimmed ? "is-dimmed" : ""}`}
      aria-hidden={!isOpen}
      custom={index}
      variants={reduceMotion ? {
        hidden: { opacity: 0, scale: 1, filter: "none" },
        visible: { opacity: 1, scale: 1, filter: "none", transition: { duration: 0 } },
      } : orbitButtonVariants}
      initial="hidden"
      animate={isOpen ? "visible" : "hidden"}
      onMouseEnter={() => {
        if (!isNavigating) onActiveChange(item.id);
      }}
      onFocus={() => {
        if (!isNavigating) onActiveChange(item.id);
      }}
    >
      <Link
        to={item.path}
        className="orbit-button-link"
        tabIndex={isOpen ? 0 : -1}
        aria-label={item.label}
        onClick={handleClick}
      >
        <span className="orbit-icon-wrap">
          <Icon size={30} strokeWidth={1.8} />
        </span>

        <span className="orbit-copy">
          <span className="orbit-label">{item.label}</span>
          <span className="orbit-description">{item.description}</span>
        </span>
      </Link>
    </motion.div>
  );
}

export default OrbitButton;