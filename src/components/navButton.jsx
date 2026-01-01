import { motion } from 'motion/react';

export default function NavButton({ text, onNavClick }) {
  return (
    <div className="NavButton">
      <motion.div whileHover={{ scale: 1.4 }} whileTap={{ scale: 0.8 }}>
        <a onClick={() => onNavClick(text)}>
          {text}
        </a>
      </motion.div>
    </div>
  );
}