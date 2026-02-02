import { Link, NavLink, Route, Routes } from "react-router-dom";
// import { AnimatePresence } from "motion/react";
import StickyCursor from "./components/stickyCursor/stickyCursor";
import Notes from "./components/notes/Notes";
import Info from "./components/info/Info";
import Contact from "./components/contact/Contact";
import MenuBlock from "./components/menuBlock/MenuBlock";

function App() {
  const Placeholder = ({ label }) => (
    <div className="placeholder">{label} coming soon</div>
  );

  return (
    <div className="App">
      <div className="left">
        <MenuBlock />
      </div>

      <div className="right">
        <Routes>
          <Route path="/contact" element={<Contact />} />
          <Route path="/info" element={<Info />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/posts" element={<Placeholder label="posts" />} />
          <Route path="/photos" element={<Placeholder label="photos" />} />
          <Route path="notes/post" element={<Placeholder label="leave a note" />} />
          
        </Routes>
      </div>

      <StickyCursor />
    </div>
  );
}

export default App;
