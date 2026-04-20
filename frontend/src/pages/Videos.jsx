// Add YouTube video IDs here as they become available
const VIDEOS = [
  { id: 'zNo6SDmoyCQ', title: 'Whetty - 25 (Official Visualizer)' },
  { id: 'jjKPCk7leiI', title: 'Whetty - Living (Official Audio)' },
  { id: 'zfaqa1SHseM', title: 'Whetty - Debt Free (Official Audio)' },
]

export default function Videos() {
  return (
    <section className="videos-section">
      <h2 className="section-title">Videos</h2>

      {VIDEOS.length === 0 ? (
        <div className="coming-soon-block">
          <svg viewBox="0 0 24 24" width="64" height="64">
            <path fill="currentColor" d="M10 16.5l6-4.5-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
          </svg>
          <h3>Videos Coming Soon</h3>
          <p>Music videos, visualizers, and behind-the-scenes content dropping soon.</p>
          <a
            href="https://www.youtube.com/@whetty88"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn primary"
          >
            Subscribe on YouTube
          </a>
        </div>
      ) : (
        <>
          {/* Featured video - first in list */}
          <div className="video-featured">
            <div className="video-embed">
              <iframe
                src={`https://www.youtube.com/embed/${VIDEOS[0].id}`}
                title={VIDEOS[0].title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <h3>{VIDEOS[0].title}</h3>
          </div>

          {/* Video grid */}
          {VIDEOS.length > 1 && (
            <div className="video-grid">
              {VIDEOS.slice(1).map((video) => (
                <div key={video.id} className="video-card">
                  <div className="video-embed">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <h4>{video.title}</h4>
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="watch-link"
                  >
                    Watch on YouTube →
                  </a>
                </div>
              ))}
            </div>
          )}

          <div className="youtube-cta">
            <a
              href="https://www.youtube.com/@whetty88"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn primary"
            >
              Subscribe on YouTube
            </a>
          </div>
        </>
      )}
    </section>
  )
}
