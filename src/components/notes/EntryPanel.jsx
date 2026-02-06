import './notes.css';

export default function EntryPanel() {
  return (
    <div className='entry-panel'>
      <p className='entry-panel-text'>
        add to my list of notes, or just say hi 
        <br/>
        your note will show up publicly along with those left by other visitors
      </p>

      <p className='entry-panel-text'>
        I don't publicize this site, so I think it will be interesting 
        <br/>
        to see who comes through and what they have to share
      </p>

      <div className='input-block'>
        <p>subject:</p>
        <input type='text' className='small-input' />
      </div>

      <div className='input-block'>
        <p>note:</p>
        <textarea className='large-input' />
      </div>

      <div className='input-block'>
        <p>author:</p>
        <input type='text' className='small-input' />
      </div>

      <p className='post-button'>post</p>
    </div>
  );
}
