import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Note from "./Note";
import './notes.css';

export default function Notes() {
  const [searchParams] = useSearchParams();
  const listRef = useRef(null);
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(false);
  const showVisitorNotes = searchParams.get("visitors") === "1";
  const notes = [
    { id: 1, title: "overheard on the bus", date: "january 28, 2026", text: "\"don't eat my apple, we just met\"", author: "me"},
    { id: 2, title: "heres a thought", date: "february 1, 2026", text: "second test note", author: "me"},
    { id: 3, title: "tiny victory", date: "february 2, 2026", text: "found my keys in the couch.", author: "Timmy"},
    { id: 4, title: "long walk", date: "january 30, 2026", text: "took the long way home and it felt like a small vacation. the clouds looked like folded paper.", author: "me"},
    { id: 5, title: "grocery list remix", date: "january 27, 2026", text: "eggs, oats, and something spicy. remember to buy limes if they look good.", author: "uncle jim"},
    { id: 6, title: "idea: pocket guide", date: "february 2, 2026", text: "a tiny guide to the city with only one thing per neighborhood. force choices. make it fit on a postcard.", author: "me"},
    { id: 7, title: "late night thought", date: "january 31, 2026", text: "why do we keep defaulting to the fastest route when the scenic one teaches us more?", author: "me"},
    { id: 8, title: "weather note", date: "january 26, 2026", text: "rain started at noon, stopped at three, then came back as a mist. smelled like wet cedar.", author: "brad"},
    { id: 9, title: "short poem", date: "february 1, 2026", text: "streetlights blink / a quiet chorus / winter keeps time", author: "Tom from Kansas"},
    { id: 10, title: "project spark", date: "january 29, 2026", text: "a notes app that hides the timestamp until you hover. make time feel optional.", author: "me"},
    { id: 11, title: "sound check", date: "february 2, 2026", text: "the fridge hum is almost a bassline if you listen long enough.", author: "An old friend"},
    { id: 12, title: "coffee shop scene", date: "january 25, 2026", text: "barista with a sun tattoo on her wrist. someone doodling on a napkin. the doorbell keeps ringing.", author: "me"},
  ];

  const visibleNotes = showVisitorNotes
    ? notes
    : notes.filter((note) => note.author === "me");

  useEffect(() => {
    const listEl = listRef.current;
    if (!listEl) return;

    const updateEdges = () => {
      const { scrollTop, scrollHeight, clientHeight } = listEl;
      const maxScrollTop = scrollHeight - clientHeight;
      setAtTop(scrollTop <= 1);
      setAtBottom(scrollTop >= maxScrollTop - 1);
    };

    updateEdges();
    listEl.addEventListener("scroll", updateEdges, { passive: true });
    window.addEventListener("resize", updateEdges);

    return () => {
      listEl.removeEventListener("scroll", updateEdges);
      window.removeEventListener("resize", updateEdges);
    };
  }, [visibleNotes.length]);

  return (
    <div className="notes-shell">
      <div className="notes-indicator" aria-hidden="true">
        {atTop ? "-" : <span className="notes-arrow notes-arrow--up">v</span>}
      </div>
      <div className='notes' ref={listRef}>
        {/* <div className="placeholder">notes coming soon</div> */}

        {visibleNotes.map((note) => (
          <Note key={note.id} title= {note.title} date={note.date} text={note.text} author={note.author}/>
        ))}
      </div>
      <div className="notes-indicator" aria-hidden="true">
        {atBottom ? "-" : <span className="notes-arrow">v</span>}
      </div>
    </div>
  );
}
