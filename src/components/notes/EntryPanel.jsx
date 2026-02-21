import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './notes.css';

export default function EntryPanel() {
  const navigate = useNavigate();
  const proofPhrase = 'sweetnick';
  const [formData, setFormData] = useState({
    title: '',
    text: '',
    author: '',
  });
  const [proofRequired, setProofRequired] = useState(false);
  const [proofText, setProofText] = useState('');
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (status.type !== 'success') return;

    const timeoutId = setTimeout(() => {
      navigate('/notes?visitors=1');
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [navigate, status.type]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'author' && value.trim().toLowerCase() !== 'nick') {
      setProofRequired(false);
      setProofText('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    const payload = {
      title: formData.title.trim(),
      text: formData.text.trim(),
      author: formData.author.trim(),
    };

    if (!payload.title || !payload.text) {
      setStatus({
        type: 'error',
        message: 'Please add a subject and a note before posting.',
      });
      return;
    }

    const isNick = payload.author.toLowerCase() === 'nick';
    if (isNick && !proofRequired) {
      setProofRequired(true);
      setStatus({
        type: 'error',
        message: 'prove it to post as nick.',
      });
      return;
    }

    if (isNick && proofText.trim().toLowerCase() !== proofPhrase.toLowerCase()) {
      setStatus({
        type: 'error',
        message: 'prove it failed. try again.',
      });
      return;
    }

    if (isNick) {
      payload.author = 'Nick';
    }

    setIsSubmitting(true);
    setStatus({ type: 'submitting', message: 'Posting your note...' });

    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorMessage = 'unable to post your note right now';
        try {
          const data = await response.json();
          if (data?.error) errorMessage = data.error;
        } catch {
          // ignore parse errors
        }
        throw new Error(errorMessage);
      }

      setFormData({ title: '', text: '', author: '' });
      setProofRequired(false);
      setProofText('');
      setStatus({
        type: 'success',
        message: 'thanks!',
      });
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'unable to post your note right now',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className='entry-panel' onSubmit={handleSubmit}>
      {status.type === 'success' ? (
        <p className='entry-panel-text entry-panel-text--success' aria-live='polite'>
          {status.message}
        </p>
      ) : null}

      {status.type !== 'success' ? (
        <>
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
        <input
          type='text'
          name='title'
          className='small-input'
          value={formData.title}
          onChange={handleChange}
          autoComplete='off'
        />
      </div>

      <div className='input-block'>
        <p>note:</p>
        <textarea
          name='text'
          className='large-input'
          value={formData.text}
          onChange={handleChange}
        />
      </div>

      <div className='input-block'>
        <p>author:</p>
        <input
          type='text'
          name='author'
          className='small-input'
          value={formData.author}
          onChange={handleChange}
          autoComplete='off'
        />
      </div>

      {proofRequired ? (
        <div className='input-block'>
          <p>prove it:</p>
          <input
            type='text'
            name='proof'
            className='small-input'
            value={proofText}
            onChange={(event) => setProofText(event.target.value)}
            autoComplete='off'
          />
        </div>
      ) : null}

      <button className='post-button' type='submit' disabled={isSubmitting}>
        {isSubmitting ? 'posting...' : 'post'}
      </button>
      {status.message && status.type !== 'success' ? (
        <p className={`entry-panel-status entry-panel-status--${status.type}`} aria-live='polite'>
          {status.message}
        </p>
      ) : null}
        </>
      ) : null}
    </form>
  );
}
