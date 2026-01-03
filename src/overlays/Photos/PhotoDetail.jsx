import { motion } from 'motion/react'

export default function PhotoDetail({ photo, isOpen, onExpand, onClose }) {
  if (!isOpen || !photo) return null;

  return(
    <div className="photo-detail">
      <img src={photo}/>
      <motion.h4 whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onClose}>back to grid</motion.h4>
    </div>
  );
}