const STREAMING_PLATFORMS = {
  major: [
    { name: 'Spotify', url: 'https://open.spotify.com/artist/1Y6NGN7caDsNRGFjgXTcxg', color: '#1db954' },
    { name: 'Apple Music', url: 'https://music.apple.com/us/artist/whetty/1757994638', color: '#fc3c44' },
    { name: 'YouTube Music', url: 'https://www.youtube.com/@whetty88', color: '#ff0000' },
    { name: 'Amazon Music', url: 'https://music.amazon.com/artists/B0D9NFPZVQ/whetty', color: '#00a8e0' },
    { name: 'Tidal', url: 'https://tidal.com/artist/49172801', color: '#ffffff' },
    { name: 'Deezer', url: 'https://www.deezer.com/us/artist/274199381', color: '#a238ff' },
  ],
  additional: [
    { name: 'SoundCloud', url: 'https://soundcloud.com/wehtty', color: '#ff5500' },
    { name: 'iHeartRadio', url: 'https://www.iheart.com/artist/whetty-43569564/', color: '#c6002b' },
  ],
}

export default function Music() {
  return (
    <section className="music-section">
      <h2 className="section-title">Music</h2>

      {/* Spotify Embed */}
      <div className="spotify-container">
        <iframe
          style={{ borderRadius: '12px' }}
          src="https://open.spotify.com/embed/artist/1Y6NGN7caDsNRGFjgXTcxg?utm_source=generator&theme=0"
          width="100%"
          height="400"
          frameBorder="0"
          allowFullScreen=""
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>

      {/* Streaming Links */}
      <div className="streaming-section">
        <h3 className="streaming-title">Stream Everywhere</h3>

        <div className="platform-group">
          <h4 className="platform-group-label">Major Platforms</h4>
          <div className="platform-grid">
            {STREAMING_PLATFORMS.major.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`platform-btn ${p.url === '#' ? 'coming-soon' : ''}`}
                style={{ '--platform-color': p.color }}
              >
                {p.name}
                {p.url === '#' && <span className="soon-badge">Soon</span>}
              </a>
            ))}
          </div>
        </div>

        <div className="platform-group">
          <h4 className="platform-group-label">Additional Platforms</h4>
          <div className="platform-grid">
            {STREAMING_PLATFORMS.additional.map((p) => (
              <a
                key={p.name}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`platform-btn ${p.url === '#' ? 'coming-soon' : ''}`}
                style={{ '--platform-color': p.color }}
              >
                {p.name}
                {p.url === '#' && <span className="soon-badge">Soon</span>}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
