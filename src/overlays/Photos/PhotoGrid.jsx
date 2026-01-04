import { motion } from 'motion/react';
import './photos.css';

export default function PhotoGrid({ photos, isOpen, onSelect, isDetailOpen }) {
  if (!isOpen || !photos) return null;

  return (
    <motion.div
      className="photo-grid"
      animate={{ opacity: isDetailOpen ? 0 : 1 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
    >
      {photos.map((photo, i) => (
        <motion.div 
          key={i}
          // key={photo.id} <-- change to this once using metadata struct 
          photo={photo}
          index={i}
          className="photo-cell" 
          whileHover={{ scale: 1.1 }}
          onClick={() => onSelect(i)}
        >
          <motion.img src={photo} alt={`Photo ${i + 1}`} layoutId={`photo-${i}`}/>
        </motion.div>
      ))}
    </motion.div>
  );
}
