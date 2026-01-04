import { motion } from 'motion/react'
import { useEffect, useState } from 'react'

export default function PhotoDetail({ photo, thumb, isOpen, onExpand, onClose, activeIndex }) {
  if (!isOpen || !photo) return null;

  const [isFullResLoaded, setIsFullResLoaded] = useState(false);
  const [isLayoutComplete, setIsLayoutComplete] = useState(false);

  useEffect(() => {
    setIsFullResLoaded(false);
    setIsLayoutComplete(false);
  }, [photo]);

  return(
    <div className="photo-detail">
      <motion.div
        className="photo-detail-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      />

      <motion.img
        src={thumb}
        layoutId={`photo-${activeIndex}`}
        onLayoutAnimationComplete={() => setIsLayoutComplete(true)}
      />
      <motion.img
        className="photo-detail-fullres"
        src={photo}
        alt=""
        initial={{ opacity: 0 }}
        animate={{ opacity: isFullResLoaded && isLayoutComplete ? 1 : 0 }}
        exit={{ opacity: 0, transition: { duration: 0 } }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        onLoad={() => setIsFullResLoaded(true)}
      />

      <motion.div
        className='photo-caption'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      >
        <h4>Title</h4>
        <p>Location: Somewhere</p>
        <p>Camera: Probably an iPhone</p>
      </motion.div>

      <motion.h4 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        whileHover={{ scale: 1.1 }} 
        whileTap={{ scale: 0.9 }} 
        style={{ transformOrigin: 'right' }}
        onClick={onClose}
      >
        back to grid
      </motion.h4>

    </div>
  );
}
