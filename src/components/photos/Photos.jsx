import './photos.css';

export default function Photos() {
  const photoModules = import.meta.glob(
    '../../photos/full_res/Mexico/*.jpg',
    { eager: true, import: 'default' }
  );
  const photos = Object.entries(photoModules)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, src]) => src);

  return (
    <div className='photos'>
      <div className='photos-grid'>
        {photos.map((src) => (
          <div className='photo-item' key={src}>
            <img src={src} alt='Mexico travel photo' loading='lazy' />
          </div>
        ))}
      </div>
    </div>
  );
}
