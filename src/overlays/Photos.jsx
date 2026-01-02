import { motion } from 'motion/react';
import { useState } from 'react';
import './photos.css';

export default function Photos() {
  // Load all photo thumbnails from the photos directory
  // TODO: Explore lazy loading (rather than eager loading)
  // TODO: Load full res photo upon selection
  const photoModules = import.meta.glob('/src/photos/*.{jpg,jpeg,png,gif,webp,svg}', { eager: true });
  const photos = Object.values(photoModules).map((module) => module.default);

  // Track selected photo
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null);
  const renderPhotoWindow = () => {
    if (selectedPhotoIndex !== null) {
      return (
        <div className="selected-photo">
          <img src={photos[selectedPhotoIndex]}/>
        </div>
      );
    } else {
      return (
        <div className="photos-grid">
          {photos.map((src, index) => (
            <motion.div 
              key={index} 
              className="photo-cell" 
              whileHover={{ scale: 1.15 }}
              onClick={() => setSelectedPhotoIndex(index)}
            >
              <img src={src} alt={`Photo ${index + 1}`}/>
            </motion.div>
          ))}
        </div>
      );
    }
  };

  return (
    <section className="photos">
      <h2 className="photos-title" onClick={() => setSelectedPhotoIndex(null)}>photos</h2>
      <div className="photos-window">
        { renderPhotoWindow() }
      </div>
    </section>
  );
}