import me from '../photos/me.jpeg';
import './about.css';

export default function About() {
    return (
      <div className="About">
        <h2>info</h2>
        <div className="about-body">
          <img className="about-photo" src={me} alt="Nick" />
          <p className="about-text">
            <strong>Who am I?</strong><br/> I am Nick Sweet. That's why this website is called <strong><em>sweetnick.com</em></strong>. Professionally, I am an embedded software engineer working on microcontroller devices.
            More generally, I'm a guy who likes to make and design and build things living in Seattle, WA.
            <br/><br/>
            <strong>What is this website?</strong><br/> It's a place for me to write and share and document the things that I find interesting.
            It's fully self contained, hosted, and served from a PC in my home office. I built it to learn some web development,
            to have a place to share thoughts and projects, and as a way to organize my photos.
            <br/><br/>
            <strong>What do I find interesting?</strong><br/> Lots of stuff really, these days it's mostly working on or modifying my BMW wagon, tinkering with bikes, 
            playing guitar, taking photos, being active and learning about the world. 
            <br/><br/>
            Thanks for reading, be sure to <strong><em>leave a post it note</em></strong> letting me know you stopped by.
          </p>
        </div>
      </div>
    );
  }
