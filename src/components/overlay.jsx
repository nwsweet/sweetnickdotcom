import { motion } from "motion/react"
import './overlay.css'

export default function Overlay({ children, onClose, originRect }) {
  const originCenterX = originRect.left + originRect.width / 2;
  const originCenterY = originRect.top + originRect.height / 2;

  const originXScale = originCenterX / window.innerWidth;
  const originYScale = originCenterY / window.innerHeight;

  console.log("originXScale: ", originXScale);
  console.log("originYScale: ", originYScale);

  return (
    <div className="overlay-backdrop" onClick={onClose}>
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        style={{ originX: originXScale, originY: originYScale }}
        transition={{ ease: "easeOut", duration: 0.3 }}
        className="overlay-panel" 
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </motion.div>
    </div>
  );
}