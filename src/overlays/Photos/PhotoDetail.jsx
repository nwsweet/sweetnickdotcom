import { motion } from 'motion/react'

export default function PhotoDetail({ photo, isOpen, onExpand, onClose }) {
  if (!isOpen || !photo) return null;

  return(
    <div className="photo-detail">
      <img src={photo}/>
      <div className='photo-caption'>
        <h4>Title</h4>
        <p>Location: Somewhere</p>
        <p>Camera: Probably an iPhone</p>
      </div>
      <motion.h4 
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