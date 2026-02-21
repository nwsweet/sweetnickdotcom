import { Link, NavLink, useLocation, useSearchParams } from "react-router-dom";
import './menuBlock.css';

export default function MenuBlock() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const onNotesPage = location.pathname.startsWith("/notes");
  const onNotesPostPage = location.pathname === "/notes/post";
  const showVisitorNotes = onNotesPage && searchParams.get("visitors") === "1";
  const visitorNotesLink = showVisitorNotes ? "/notes" : "/notes?visitors=1";
  const visitorNotesLabel = showVisitorNotes ? "hide visitor notes" : "show visitor notes";
  const notesSubmenuLink = onNotesPostPage ? "/notes?visitors=1" : visitorNotesLink;
  const notesSubmenuLabel = onNotesPostPage ? "show visitor notes" : visitorNotesLabel;

  return (
    <div className='menu-block'>
      <Link className="title-link" to="/">
        <h1 className="title">sweetnick.com</h1>
      </Link>
      <h4 className="subtitle">a website on the internet</h4>

      {/* TODO: Turn the nav menu into a component as well */}
      <nav>
        <ul>
          <li className="nav-item">
            <NavLink to="/posts">posts</NavLink>
            <ul className="nav-sublist">
              <li><NavLink to="/posts/first-post">gone fishing</NavLink></li>
              <li><NavLink to="/posts/second-post">dont throw away your fish</NavLink></li>
              <li><NavLink to="/posts/third-post">a twisted knot isnt always bad</NavLink></li>
              <li><NavLink to="/posts/fourth-post">a review of the yamaha r1</NavLink></li>
              <li><NavLink to="/posts/fifth-post">cancel your subscription</NavLink></li>
              <li><NavLink to="/posts/sixth-post">this is the first post</NavLink></li>
            </ul>
          </li>
          <li>
            <NavLink to="/photos">photos</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/notes">notes</NavLink>
            <ul className='nav-sublist'>
              <li><NavLink className='show-visitor-notes' to={notesSubmenuLink}>{notesSubmenuLabel}</NavLink></li>
              <li><NavLink to="/notes/post">leave a note</NavLink></li>
            </ul>
          </li>
          <li>
            <NavLink to="/info">info</NavLink>
          </li>
          <li>
            <NavLink to="/contact">contact</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
