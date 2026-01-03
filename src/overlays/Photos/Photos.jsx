import { motion } from 'motion/react';
import { useState } from 'react';
import PhotoGrid from './PhotoGrid';
import PhotoDetail from './PhotoDetail';
import './photos.css';

export default function Photos() {
  // Load all photo thumbnails from the photos directory
  // TODO: Explore lazy loading (rather than eager loading)
  // TODO: Load full res photo upon selection
  const thumbsModules = import.meta.glob('/src/photos/thumbs/*.{jpg,jpeg,png}', { eager: true });
  const thumbs = Object.values(thumbsModules).map((module) => module.default);

  const fullResModules = import.meta.glob('/src/photos/full_res/*.{jpg,jpeg,png}', { eager: true });
  const fullRes = Object.values(fullResModules).map((module) => module.default);

  // Track selected photo
  const [activePhotoIndex, setActivePhotoIndex] = useState(null);
  // grid, detail, fullscreen
  const [view, setView] = useState('grid');

  function clearSelected() {
    setView('grid');
    setActivePhotoIndex(null);
  }

  return (
    <section className="photos">
      <motion.div 
        whileHover={{ scale: 1.1 }} 
        whileTap={{ scale: 0.9 }}
        style={{ transformOrigin: 'left' }}
      >
        <h2 className="photos-title" onClick={() => clearSelected()}>photos</h2>
      </motion.div>

      <div className="photos-window">
        <PhotoGrid
          photos={thumbs}
          isOpen={view === 'grid'}
          onSelect={(i) => {
            setActivePhotoIndex(i);
            setView('detail');
          }}
        />

        <PhotoDetail
          photo={fullRes[activePhotoIndex]}
          isOpen={view === 'detail'}
          onExpand={() => setView('fullscreen')}
          onClose={() => setView('grid')}
        />
      </div>

    </section>
  );
}