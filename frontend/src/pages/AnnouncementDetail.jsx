export default function AnnouncementDetail({ announcement, setActivePage }) {
  if (!announcement) {
    return (
      <section className="announcement-detail-section">
        <div className="announcement-not-found">
          <h2>Announcement not found</h2>
          <button className="cta-btn primary" onClick={() => setActivePage('announcements')}>
            Back to Announcements
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="announcement-detail-section">
      <button className="back-btn" onClick={() => setActivePage('announcements')}>
        ← Back to Announcements
      </button>

      <article className="announcement-detail">
        <header className="announcement-header">
          <h1 className="announcement-title">{announcement.title}</h1>
          <time className="announcement-date">{announcement.date}</time>
        </header>

        <div className="announcement-content">
          {announcement.fullContent ? (
            <div dangerouslySetInnerHTML={{ __html: announcement.fullContent }} />
          ) : (
            <p>{announcement.content}</p>
          )}
        </div>

        {announcement.ctaLink && (
          <div className="announcement-cta">
            <button 
              className="cta-btn primary" 
              onClick={() => {
                if (announcement.ctaLink.startsWith('/')) {
                  setActivePage(announcement.ctaLink.substring(1))
                } else {
                  window.open(announcement.ctaLink, '_blank', 'noopener,noreferrer')
                }
              }}
            >
              {announcement.ctaText || 'Learn More'}
            </button>
          </div>
        )}
      </article>
    </section>
  )
}
