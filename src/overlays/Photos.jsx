import { motion } from 'motion/react';
import './photos.css';

export default function Photos() {
  // Load all photos from the photos directory
  // TODO: Explore lazy loading (rather than eager loading)
  const photoModules = import.meta.glob('/src/photos/*.{jpg,jpeg,png,gif,webp,svg}', { eager: true });
  const photos = Object.values(photoModules).map((module) => module.default);

  return (
    <section className="photos">
      <h2 className="photos-title">photos</h2>
      <div className="photos-window">
        <div className="photos-grid">
          {photos.map((src, index) => (
            <motion.div key={index} className="photo-cell" whileHover={{ scale: 1.1 }}>
              <img src={src} alt={`Photo ${index + 1}`}/>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}