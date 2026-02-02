import './info.css';

export default function Info() {
  return (
    <div className='info'>
      <p>
        <span className='heading'>Who am I?</span><br/>
        I am Nick Sweet. Professionally, I am an embedded software engineer working on microcontroller devices.
        More generally, I'm a guy who likes to make and design and build things living in Seattle, WA.
      </p>
      <p>
        <span className='heading'>What is this website?</span><br/>
        It's a place for me to write and share and document the things that I find interesting.
        It's fully self contained, hosted, and served from a computer in my home office. I built it to learn some web development,
        to have a place to share thoughts and projects, and as a way to organize my photos.
      </p>
      <p>
        <span className='heading'>What do I find interesting?</span><br/>
        Lots of stuff really, these days it's mostly working on or modifying my BMW wagon, building and riding bikes, 
        playing guitar, taking photos, being active and learning about the world. 
      </p>
      <p>
      Thanks for reading, <a className='link'>leave a note</a> letting me know you stopped by.
      </p>
    </div>
  );
  }