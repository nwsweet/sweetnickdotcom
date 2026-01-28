import { motion } from 'motion/react'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

export default function PhotoDetail({
  photo,
  thumb,
  isOpen,
  onExpand,
  onClose,
  activeIndex,
  layoutIdPrefix = 'photo',
  onPrev,
  onNext,
}) {
  if (!isOpen || !photo) return null;

  const [isFullResLoaded, setIsFullResLoaded] = useState(false);
  const [isLayoutComplete, setIsLayoutComplete] = useState(false);
  const detailRef = useRef(null);
  const thumbRef = useRef(null);
  const fullResRef = useRef(null);

  const updateImageOffsets = () => {
    const container = detailRef.current;
    const fullRes = fullResRef.current;
    const thumbImg = thumbRef.current;
    const img = fullRes?.naturalWidth ? fullRes : thumbImg;

    if (!container || !img) return;

    const rect = img.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;
    if (!naturalWidth || !naturalHeight) return;

    const scale = Math.min(rect.width / naturalWidth, rect.height / naturalHeight);
    const contentHeight = naturalHeight * scale;
    const offsetY = (rect.height - contentHeight) / 2;

    container.style.setProperty('--photo-image-top', `${offsetY}px`);
    container.style.setProperty('--photo-image-bottom', `${offsetY}px`);
  };

  useEffect(() => {
    setIsFullResLoaded(false);
    setIsLayoutComplete(false);
  }, [photo]);

  useLayoutEffect(() => {
    updateImageOffsets();
  }, [photo, isFullResLoaded, isLayoutComplete]);

  useEffect(() => {
    const container = detailRef.current;
    const fullRes = fullResRef.current;
    const thumbImg = thumbRef.current;
    if (!container || (!fullRes && !thumbImg)) return;

    const observer = new ResizeObserver(() => updateImageOffsets());
    observer.observe(container);
    if (fullRes) observer.observe(fullRes);
    if (thumbImg) observer.observe(thumbImg);

    window.addEventListener('resize', updateImageOffsets);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateImageOffsets);
    };
  }, [photo, isFullResLoaded, isLayoutComplete]);

  return(
    <div className="photo-detail" ref={detailRef}>
      <motion.div
        className="photo-detail-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      />
      <div className='photo-carousel'>
        <motion.button
          className='photo-carousel-button photo-carousel-button-prev'
          type="button"
          onClick={onPrev}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
        >
          &#8249;
        </motion.button>
        <div className="photo-carousel-media">
          <motion.img
            className='photo-detail-thumbres'
            src={thumb}
            layoutId={`${layoutIdPrefix}-${activeIndex}`}
            ref={thumbRef}
            onLayoutAnimationComplete={() => setIsLayoutComplete(true)}
          />
          <motion.img
            className="photo-detail-fullres"
            src={photo}
            alt=""
            ref={fullResRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: isFullResLoaded && isLayoutComplete ? 1 : 0 }}
            exit={{ opacity: 0, transition: { duration: 0 } }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            onLoad={() => setIsFullResLoaded(true)}
          />
        </div>
        <motion.button
          className='photo-carousel-button photo-carousel-button-next'
          type="button"
          onClick={onNext}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
        >
          &#8250;
        </motion.button>
      </div>
      <motion.div
        className='photo-caption'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
      >
        <h3>Photo-1.jpg</h3>
        <p>location .... Patzcuaro, MX<br/>
           camera ............. iPhone<br/><br/>
           maybe a small blurb about<br/>
           where this photo was taken<br/>
           or anything of note</p>
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
