import { motion } from 'motion/react';
import './photos.css';

export default function PhotoCollectionStack({ title, thumbnails, onOpen, layoutIdPrefix = 'photo' }) {
  if (!thumbnails?.length) return null;

  const stackThumbs = thumbnails
    .slice(0, 4)
    .map((src, index) => ({ src, index }))
    .reverse();

  return (
    <button className="photo-collection-stack" type="button" onClick={onOpen}>
      <div className="photo-collection-stack-preview" aria-hidden="true">
        {stackThumbs.map((thumb, index) => (
          <motion.img
            key={`${title}-${thumb.index}`}
            src={thumb.src}
            alt=""
            style={{ '--stack-index': index, zIndex: index }}
            className="photo-collection-stack-thumb"
            layoutId={`${layoutIdPrefix}-${thumb.index}`}
          />
        ))}
      </div>
      <div className="photo-collection-stack-meta">
        <h3>{title}</h3>
      </div>
    </button>
  );
}
