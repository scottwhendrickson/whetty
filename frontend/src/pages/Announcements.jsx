// Announcements will be loaded from DynamoDB via AppSync
// For now, using static placeholder posts
const PLACEHOLDER_POSTS = [
  {
    id: '1',
    title: 'POP¡ EP — Coming May 8th, 2026',
    date: 'April 20, 2026',
    preview: 'The new EP is almost here. Two tracks, one vibe. Pre-order now and be the first to hear it.',
    content: `The new EP is almost here. Two tracks, one vibe. Pre-order now and be the first to hear it.

After months of work, I'm excited to announce that POP¡ EP will be released on May 8th, 2026. This two-track EP represents a new direction in my sound, blending elements of pop, electronic, and experimental music.

The EP features:
• Character - An introspective journey through self-discovery
• Distant Memory - A nostalgic reflection on moments that shaped us

Pre-orders are now available, and everyone who pre-orders will get instant access to exclusive behind-the-scenes content and early streaming access 24 hours before the official release.

Thank you for your continued support. This music wouldn't exist without you.

- Whetty`,
    fullContent: `<p>The new EP is almost here. Two tracks, one vibe. Pre-order now and be the first to hear it.</p>

<p>After months of work, I'm excited to announce that <strong>POP¡ EP</strong> will be released on <strong>May 8th, 2026</strong>. This two-track EP represents a new direction in my sound, blending elements of pop, electronic, and experimental music.</p>

<h3>The EP features:</h3>
<ul>
  <li><strong>Character</strong> - An introspective journey through self-discovery</li>
  <li><strong>Distant Memory</strong> - A nostalgic reflection on moments that shaped us</li>
</ul>

<p>Pre-orders are now available, and everyone who pre-orders will get instant access to exclusive behind-the-scenes content and early streaming access 24 hours before the official release.</p>

<p>Thank you for your continued support. This music wouldn't exist without you.</p>

<p style="text-align: right; margin-top: 2rem;"><em>- Whetty</em></p>`,
    ctaLink: '/shop',
    ctaText: 'Pre-Order Now',
  },
]

export default function Announcements({ setActivePage, setSelectedAnnouncement }) {
  const handleAnnouncementClick = (post) => {
    setSelectedAnnouncement(post)
    setActivePage('announcement-detail')
  }

  return (
    <section className="announcements-section">
      <h2 className="section-title">Announcements</h2>

      <div className="posts-feed">
        {PLACEHOLDER_POSTS.map((post) => (
          <article 
            key={post.id} 
            className="post-card clickable"
            onClick={() => handleAnnouncementClick(post)}
          >
            <div className="post-header">
              <h3 className="post-title">{post.title}</h3>
              <span className="post-date">{post.date}</span>
            </div>
            <p className="post-preview">{post.preview}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
