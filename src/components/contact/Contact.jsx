import { Link } from 'react-router-dom';
import './contact.css'

export default function Contact() {
    return (
      <div className="contact">
        <p>Send me an email at nicksweet [at] sweetnick [dot] com</p>
        <p>Or <Link className="link" to="/notes/post">leave a note</Link></p>
      </div>
    );
  }
