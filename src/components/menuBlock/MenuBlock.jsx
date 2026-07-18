import { useEffect, useRef, useState } from "react";
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

  const sublistRef = useRef(null);
  const [sublistAtTop, setSublistAtTop] = useState(true);
  const [sublistAtBottom, setSublistAtBottom] = useState(false);

  useEffect(() => {
    const listEl = sublistRef.current;
    if (!listEl) return;

    const updateEdges = () => {
      const { scrollTop, scrollHeight, clientHeight } = listEl;
      const maxScrollTop = scrollHeight - clientHeight;
      setSublistAtTop(scrollTop <= 1);
      setSublistAtBottom(scrollTop >= maxScrollTop - 1);
    };

    updateEdges();
    listEl.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);

    return () => {
      listEl.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [onPostsPage]);

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
              <div className="sublist-indicator" aria-hidden="true">
                {sublistAtTop ? "-" : <span className="sublist-arrow sublist-arrow--up">v</span>}
              </div>
              <ul className="nav-sublist" ref={sublistRef}>
                <li><NavLink to="/posts/first-post">6 - Gone Fishing</NavLink></li>
                <li><NavLink to="/posts/second-post">5 - Don't Throw Away Your Fish</NavLink></li>
                <li><NavLink to="/posts/third-post">4 - A Twisted Knot Isn't Always Bad</NavLink></li>
                <li><NavLink to="/posts/fourth-post">3 - A Review of the Yamaha R1</NavLink></li>
                <li><NavLink to="/posts/fifth-post">2 - cancel your subscription</NavLink></li>
                <li><NavLink to="/posts/sixth-post">1 - this is the first post</NavLink></li>
              </ul>
              <div className="sublist-indicator" aria-hidden="true">
                {sublistAtBottom ? "-" : <span className="sublist-arrow">v</span>}
              </div>
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
