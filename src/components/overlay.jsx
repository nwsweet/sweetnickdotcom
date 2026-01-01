import './overlay.css'

export default function Overlay({ children, onClose }) {
    return (
      <div className="overlay-backdrop" onClick={onClose}>
        <div className="overlay-panel" onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    );
  }