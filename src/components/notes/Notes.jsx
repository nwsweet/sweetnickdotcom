import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Note from "./Note";
import './notes.css';

export default function Notes() {
  const [searchParams] = useSearchParams();
  const listRef = useRef(null);
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(false);
  const [notes, setNotes] = useState([]);
  const showVisitorNotes = searchParams.get("visitors") === "1";

  const visibleNotes = showVisitorNotes
    ? notes
    : notes.filter((note) => note.author === "me");

  useEffect(() => {
    let isMounted = true;

    fetch("/notes/notes.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load notes: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (isMounted && Array.isArray(data)) {
          setNotes([...data].reverse());
        }
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

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
