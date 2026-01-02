import { motion } from 'motion/react';
import { useRef } from 'react';

export default function NavButton({ text, onNavClick }) {
  // This is to pass buttom position to animate overlay expand/contract
  const buttonRef = useRef(null);

  const handleClick = () => {
    const rect = buttonRef.current.getBoundingClientRect();
    onNavClick(text, rect);
  }

  return (
    <div className="NavButton">
      <motion.div whileHover={{ scale: 1.4 }} whileTap={{ scale: 0.8 }}>
        <a ref={buttonRef} onClick={handleClick}>
          {text}
        </a>
      </motion.div>
    </div>
  );
}