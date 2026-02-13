import { Link } from 'react-router-dom';
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
        It's fully self developed, hosted, and served from a computer in my home office. I built it to learn some web development,
        to have a place to share thoughts, projects, and photos and as an escape from social media owned by big tech. Learn more about
        how I built it <a className='link'>here</a>.
      </p>
      <p>
        <span className='heading'>What things do I find interesting?</span><br/>
        Lots of stuff really. These days it's mostly working on or modifying my BMW wagon, building and riding bikes, 
        playing guitar, taking photos, being active and learning about the world. I have gotten a lot of motivation and
        inspiration over the years from seeing what other people create and how they document their process. This is my contribution to the
        learning and doing community.
      </p>
      <p>
      Thanks for reading, <Link className='link' to="/notes/post">leave a note</Link> letting me know you stopped by.
      </p>
    </div>
  );
  }
