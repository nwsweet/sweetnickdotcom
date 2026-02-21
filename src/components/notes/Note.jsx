import './notes.css';

export default function Note({ title, date, text, author }) {
  const isMe = author === "Nick";

  return (
    <div className={`note ${isMe ? "my-note" : "visitor-note"}`}>
      <h3 className='note-title'>{title}</h3>
      <h4 className='note-date'>{date}</h4>
      <p className='note-text'>{text}</p>
      {/* {!isMe && <p className='note-text'>- {author}</p>} */}
      <p className='note-text'>- {author}</p>
    </div>
  );
}
