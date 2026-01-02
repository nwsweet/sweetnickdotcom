import { useState } from "react";
import Header from './components/header';
import NavButton from './components/navButton'
import StickyCursor from './components/stickyCursor';
import Overlay from './components/overlay'

import Posts from './overlays/Posts'
import Photos from './overlays/Photos'
import About from './overlays/About'
import Contact from './overlays/Contact'

function App() {
  const [activeOverlay, setActiveOverlay] = useState(null);
  const [originRect, setOriginRect] = useState(null);

  const handleNavClick = (text, rect) => {
    setOriginRect(rect);
    setActiveOverlay(text);
  }

  const renderOverlay = () => {
    switch (activeOverlay) {
      case "posts":
        return <Posts />;
      case "photos":
        return <Photos />;
      case "about me":
        return <About />;
      case "contact":
        return <Contact />;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <Header text={"sweetnick.com"}/>

      <nav>
        <NavButton text={"posts"} onNavClick={handleNavClick}/>
        <NavButton text={"photos"} onNavClick={handleNavClick}/>
        <NavButton text={"about me"} onNavClick={handleNavClick}/>
        <NavButton text={"contact"} onNavClick={handleNavClick}/>
      </nav>

      {activeOverlay && (
        <Overlay originRect={originRect} onClose={() => setActiveOverlay(null)}>
          {renderOverlay()}
        </Overlay>
      )}

      <StickyCursor />
    </div>
  );
}

export default App;