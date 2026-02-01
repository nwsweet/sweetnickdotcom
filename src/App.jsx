import { Link, NavLink, Route, Routes } from "react-router-dom";
// import { AnimatePresence } from "motion/react";
import StickyCursor from './components/stickyCursor/stickyCursor';
import Info from './components/info/Info'
import Contact from './components/contact/Contact'

function App() {
  const Placeholder = ({ label }) => (
    <div className="placeholder">{label} coming soon</div>
  );

  return (
    <div className="App">
      <div className="left">
        {/* TODO: Refactor the menu-block into a react component */}
        <div className="menu-block">
          <Link className="title-link" to="/">
            <h1 className="title">sweetnick.com</h1>
          </Link>
          <h4 className="subtitle">a website on the internet</h4>

          {/* TODO: Turn the nav menu into a component as well */}
          <nav>
            <ul>
              <li>
                <NavLink to="/notes">notes</NavLink>
              </li>
              <li className="posts-item">
                <NavLink to="/posts">posts</NavLink>
                <ul className="posts-sublist">
                  <li>
                    <NavLink to="/posts/first-post">first post</NavLink>
                  </li>
                  <li>
                    <NavLink to="/posts/second-post">second post</NavLink>
                  </li>
                  <li>
                    <NavLink to="/posts/third-post">third post</NavLink>
                  </li>
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
      </div>

      <div className="right">
        <Routes>
          <Route path="/contact" element={<Contact />} />
          <Route path="/info" element={<Info />} />
          <Route path="/notes" element={<Placeholder label="notes" />} />
          <Route path="/posts" element={<Placeholder label="posts" />} />
          <Route path="/photos" element={<Placeholder label="photos" />} />
        </Routes>
      </div>

      <StickyCursor />
    </div>
  );
}

export default App;
