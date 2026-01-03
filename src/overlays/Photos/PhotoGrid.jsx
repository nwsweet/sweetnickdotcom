import { motion } from 'motion/react';
import './photos.css';

export default function PhotoGrid({ photos, isOpen, onSelect }) {
  if (!isOpen || !photos) return null;

  return (
    <div className="PhotoGrid">
      {photos.map((photo, i) => (
        <motion.div 
          key={i}
          // key={photo.id} <-- change to this once using metadata struct 
          photo={photo}
          index={i}
          className="photo-cell" 
          whileHover={{ scale: 1.15 }}
          onClick={() => onSelect(i)}
        >
          <img src={photo} alt={`Photo ${i + 1}`}/>
        </motion.div>
      ))}
    </div>
  );
}