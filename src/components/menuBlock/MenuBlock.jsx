import { Link, NavLink, useLocation, useSearchParams } from "react-router-dom";
import './menuBlock.css';

export default function MenuBlock() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const onNotesPage = location.pathname.startsWith("/notes");
  const showVisitorNotes = onNotesPage && searchParams.get("visitors") === "1";
  const visitorNotesLink = showVisitorNotes ? "/notes" : "/notes?visitors=1";
  const visitorNotesLabel = showVisitorNotes ? "hide visitor notes" : "show visitor notes";

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
            <NavLink to="/notes">notes</NavLink>
            <ul className='nav-sublist'>
              <li><NavLink to={visitorNotesLink}>{visitorNotesLabel}</NavLink></li>
              <li><NavLink to="/notes/post">leave a note</NavLink></li>
            </ul>
          </li>
          <li className="nav-item">
            <NavLink to="/posts">posts</NavLink>
            <ul className="nav-sublist">
              <li><NavLink to="/posts/first-post">first post</NavLink></li>
              <li><NavLink to="/posts/second-post">second post</NavLink></li>
              <li><NavLink to="/posts/third-post">third post</NavLink></li>
              <li><NavLink to="/posts/first-post">first post</NavLink></li>
              <li><NavLink to="/posts/second-post">second post</NavLink></li>
              <li><NavLink to="/posts/third-post">third post</NavLink></li>
            </ul>
          </li>
          <li>
            <NavLink to="/photos">photos</NavLink>
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
