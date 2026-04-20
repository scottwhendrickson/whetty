// Announcements will be loaded from DynamoDB via AppSync
// For now, using static placeholder posts
const PLACEHOLDER_POSTS = [
  {
    id: '1',
    title: 'POP¡ EP — Coming May 8th, 2026',
    date: 'April 20, 2026',
    preview: 'The new EP is almost here. Two tracks, one vibe. Pre-order now and be the first to hear it.',
    content: 'The new EP is almost here. Two tracks, one vibe. Pre-order now and be the first to hear it.',
  },
]

export default function Announcements() {
  return (
    <section className="announcements-section">
      <h2 className="section-title">Announcements</h2>

      <div className="posts-feed">
        {PLACEHOLDER_POSTS.map((post) => (
          <article key={post.id} className="post-card">
            <div className="post-header">
              <h3 className="post-title">{post.title}</h3>
              <span className="post-date">{post.date}</span>
            </div>
            <p className="post-preview">{post.preview}</p>
            <button className="read-more-btn">Read More →</button>
          </article>
        ))}
      </div>
    </section>
  )
}
