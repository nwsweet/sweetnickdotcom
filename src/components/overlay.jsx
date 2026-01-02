import { motion } from "motion/react"
import './overlay.css'

export default function Overlay({ children, onClose, originRect }) {
  // Get the center of where this overlay will originate from (navButton)
  const originCenterX = originRect.left + originRect.width / 2;
  const originCenterY = originRect.top + originRect.height / 2;

  // Convert it to a ratio of it's position in the window
  const originXScale = originCenterX / window.innerWidth;
  const originYScale = originCenterY / window.innerHeight;

  return (
    <motion.div 
      className="overlay-backdrop" 
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        style={{ originX: originXScale, originY: originYScale }}
        transition={{ ease: "easeOut", duration: 0.3 }}
        className="overlay-panel" 
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}