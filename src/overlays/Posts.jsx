import './posts.css';

export default function Posts() {
  const posts = [
    { id: 1, title: "Post One" },
    { id: 2, title: "Post Two" },
    { id: 3, title: "Post Three" },
    { id: 4, title: "Post Four" },
    { id: 5, title: "Post One" },
    { id: 6, title: "Post Two" },
    { id: 7, title: "Post Three" },
    { id: 8, title: "Post Four" },
  ];
  
  return (
    <section className="posts">
      <h2 className="posts-title">posts</h2>
      <div className="posts-window">
        <ul className="posts-list">
          {posts.map((post) => (
            <li key={post.id} className="posts-row">
              <div className="posts-thumb" />
              <div className="posts-content" />
            </li>
          ))}
          <li>
            <p className="posts-footer">That's all for now.</p>
          </li>
        </ul>
      </div>
    </section>
  );
}