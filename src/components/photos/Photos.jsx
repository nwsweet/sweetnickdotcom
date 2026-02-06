import './photos.css';

export default function Photos() {
  const photoModules = import.meta.glob(
    '../../photos/mexico/*.jpg',
    { eager: true, import: 'default' }
  );
  const photos = Object.entries(photoModules)
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, src]) => src);
  const columnCount = 3;
  const columns = Array.from({ length: columnCount }, () => []);
  photos.forEach((src, index) => {
    columns[index % columnCount].push(src);
  });

  return (
    <div className='photos'>
      <div className='photos-grid'>
        {columns.map((column, columnIndex) => (
          <div className='photos-column' key={`col-${columnIndex}`}>
            {column.map((src) => (
              <div className='photo-item' key={src}>
                <img src={src} alt='Mexico travel photo' loading='lazy' />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
