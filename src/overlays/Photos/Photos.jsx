import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
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

  // Track selected photo, and view state
  const [activeIndex, setActiveIndex] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  // const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // function clearSelected() {
  //   setView('grid');
  //   setActiveIndex(null);
  // }

  const openDetail = (i) => {
    setActiveIndex(i);
    setIsDetailOpen(true);
  };

  const closeDetail = () => {
    // keep activeIndex while detail exits so it can animate back
    // use onExitComplete in AnimatePresence instead
    setIsDetailOpen(false);
  };

  return (
    <section className="photos">

      {/* Title */}
      <motion.div 
        whileHover={{ scale: 1.1 }} 
        whileTap={{ scale: 0.9 }}
        style={{ transformOrigin: 'left' }}
      >
        <h2 className="photos-title" onClick={closeDetail}>photos</h2>
      </motion.div>

      {/* Photos Window */}
      <div className="photos-window-viewport">
        <LayoutGroup>

          {/* Grid */}
          <motion.div key="grid">
            <PhotoGrid
              photos={thumbs}
              isOpen={true} // TODO: this is no longer necessary, grid is always mounted
              isDetailOpen={isDetailOpen}
              onSelect={openDetail}
            />
          </motion.div>

          {/* Detail */}
          <AnimatePresence initial={false} mode="popLayout" onExitComplete={() => setActiveIndex(null)}>
            {isDetailOpen && activeIndex !== null && (
              <motion.div key="detail">
                <PhotoDetail
                  photo={fullRes[activeIndex]}
                  thumb={thumbs[activeIndex]}
                  activeIndex={activeIndex}
                  isOpen={true} // TODO: remove this too
                  onExpand={() => setView('fullscreen')}
                  onClose={closeDetail}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>

    </section>
  );
}
