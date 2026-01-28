import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';
import PhotoCollectionStack from './PhotoCollectionStack';
import PhotoGrid from './PhotoGrid';
import PhotoDetail from './PhotoDetail';
import './photos.css';

export default function Photos() {
  // Load all photo thumbnails from the photos directory
  // TODO: Explore lazy loading (rather than eager loading)
  // TODO: Load full res photo upon selection
  const thumbsModules = import.meta.glob('/src/photos/thumbs/*/*.{jpg,jpeg,png}', { eager: true });
  const fullResModules = import.meta.glob('/src/photos/full_res/*/*.{jpg,jpeg,png}', { eager: true });

  const collections = useMemo(() => {
    const groupByFolder = (modules) => {
      const grouped = {};
      Object.entries(modules).forEach(([path, module]) => {
        const parts = path.split('/');
        const folder = parts[parts.length - 2];
        const filename = parts[parts.length - 1];
        if (!grouped[folder]) grouped[folder] = [];
        grouped[folder].push({ src: module.default, filename });
      });

      Object.values(grouped).forEach((entries) => {
        entries.sort((a, b) => a.filename.localeCompare(b.filename));
      });

      return grouped;
    };

    const thumbsByFolder = groupByFolder(thumbsModules);
    const fullResByFolder = groupByFolder(fullResModules);

    return Object.keys(thumbsByFolder)
      .sort((a, b) => a.localeCompare(b))
      .map((name) => ({
        name,
        thumbs: (thumbsByFolder[name] ?? []).map((item) => item.src),
        fullRes: (fullResByFolder[name] ?? []).map((item) => item.src),
      }));
  }, [thumbsModules, fullResModules]);

  // Track selected photo, and view state
  const [activeIndex, setActiveIndex] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [activeCollection, setActiveCollection] = useState(null);
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

  const goPrev = () => {
    if (!activeThumbs.length) return;
    setActiveIndex((prev) => {
      if (prev === null) return 0;
      return (prev - 1 + activeThumbs.length) % activeThumbs.length;
    });
  };

  const goNext = () => {
    if (!activeThumbs.length) return;
    setActiveIndex((prev) => {
      if (prev === null) return 0;
      return (prev + 1) % activeThumbs.length;
    });
  };

  useEffect(() => {
    if (!isDetailOpen && !activeCollection) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        if (isDetailOpen) {
          closeDetail();
        } else if (activeCollection) {
          closeCollection();
        }
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        if (isDetailOpen) goPrev();
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        if (isDetailOpen) goNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDetailOpen, activeCollection, goPrev, goNext]);

  const openCollection = (name) => {
    setActiveCollection(name);
    setActiveIndex(null);
    setIsDetailOpen(false);
  };

  const closeCollection = () => {
    setActiveCollection(null);
    setActiveIndex(null);
    setIsDetailOpen(false);
  };

  const activeCollectionData = collections.find((collection) => collection.name === activeCollection);
  const activeThumbs = activeCollectionData?.thumbs ?? [];
  const activeFullRes = activeCollectionData?.fullRes ?? [];
  const layoutIdPrefix = activeCollection ? `photo-${activeCollection}` : 'photo';

  return (
    <section className="photos">

      {/* Title */}
      <motion.div 
        whileHover={{ scale: 1.1 }} 
        whileTap={{ scale: 0.9 }}
        style={{ transformOrigin: 'left' }}
      >
        <h2 className="photos-title" onClick={() => { closeDetail(); closeCollection(); }}>
          {activeCollection ?? 'photos'}
        </h2>
      </motion.div>

      {/* Photos Window */}
      <div className="photos-window-viewport">
        <LayoutGroup>

          <AnimatePresence initial={false} mode="popLayout">
            {!activeCollection && (
              <motion.div
                key="collections"
                className="photo-collections-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {collections.map((collection) => (
                  <PhotoCollectionStack
                    key={collection.name}
                    title={collection.name}
                    thumbnails={collection.thumbs}
                    onOpen={() => openCollection(collection.name)}
                    layoutIdPrefix={`photo-${collection.name}`}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence initial={false} mode="popLayout">
            {activeCollection && (
              <motion.div
                key="grid"
                className="photo-collection-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <PhotoGrid
                  photos={activeThumbs}
                  isOpen={true}
                  isDetailOpen={isDetailOpen}
                  onSelect={openDetail}
                  layoutIdPrefix={layoutIdPrefix}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Detail */}
          <AnimatePresence initial={false} mode="popLayout" onExitComplete={() => setActiveIndex(null)}>
            {isDetailOpen && activeIndex !== null && (
              <motion.div key="detail">
                <PhotoDetail
                  photo={activeFullRes[activeIndex]}
                  thumb={activeThumbs[activeIndex]}
                  activeIndex={activeIndex}
                  isOpen={true} // TODO: remove this too
                  onExpand={() => setView('fullscreen')}
                  onClose={closeDetail}
                  layoutIdPrefix={layoutIdPrefix}
                  onPrev={goPrev}
                  onNext={goNext}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>

    </section>
  );
}
