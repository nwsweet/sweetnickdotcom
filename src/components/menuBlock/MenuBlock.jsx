import { Link, NavLink, useLocation, useSearchParams } from "react-router-dom";
import './menuBlock.css';

export default function MenuBlock() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const onNotesPage = location.pathname.startsWith("/notes");
  const onNotesPostPage = location.pathname === "/notes/post";
  const onPostsPage = location.pathname.startsWith("/posts");
  const showVisitorNotes = onNotesPage && searchParams.get("visitors") === "1";
  const visitorNotesLink = showVisitorNotes ? "/notes" : "/notes?visitors=1";
  const visitorNotesLabel = showVisitorNotes ? "hide visitor notes" : "show visitor notes";
  const notesSubmenuLink = onNotesPostPage ? "/notes?visitors=1" : visitorNotesLink;
  const notesSubmenuLabel = onNotesPostPage ? "show visitor notes" : visitorNotesLabel;


  return (
    <div className='menu-block'>
      <div className="title-block">
        <Link className="title-link" to="/">
          <h1 className="title">sweetnick.com</h1>
        </Link>
        <h4 className="subtitle">Nick Sweet's website on the internet</h4>
      </div>

      {/* TODO: Turn the nav menu into a component as well */}
      <nav>
        <ul>
          <li className="nav-item">
            <NavLink to="/posts">posts</NavLink>
            <div className="sublist-shell">
              <ul className="nav-sublist posts-sublist">
                <li><NavLink to="/posts/first-post"><span className="post-num">6.</span><span className="post-title">Gone Fishing</span></NavLink></li>
                <li><NavLink to="/posts/second-post"><span className="post-num">5.</span><span className="post-title">Don't Throw Away Your Fish</span></NavLink></li>
                <li><NavLink to="/posts/third-post"><span className="post-num">4.</span><span className="post-title">A Twisted Knot Isn't Always Bad</span></NavLink></li>
                <li><NavLink to="/posts/fourth-post"><span className="post-num">3.</span><span className="post-title">A Review of the Yamaha R1</span></NavLink></li>
                <li><NavLink to="/posts/fifth-post"><span className="post-num">2.</span><span className="post-title">cancel your subscription</span></NavLink></li>
                <li><NavLink to="/posts/sixth-post"><span className="post-num">1.</span><span className="post-title">this is the first post</span></NavLink></li>
              </ul>
            </div>
          </li>
          <li>
            <NavLink to="/photos">photos</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/notes">notes</NavLink>
            <div className="sublist-shell">
            <ul className='nav-sublist'>
              <li><NavLink className='show-visitor-notes' to={notesSubmenuLink}>{notesSubmenuLabel}</NavLink></li>
              <li><NavLink to="/notes/post">leave a note</NavLink></li>
            </ul>
            </div>
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
