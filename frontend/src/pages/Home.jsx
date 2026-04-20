import SubscribeForm from '../components/SubscribeForm'

export default function Home({ setActivePage }) {
  return (
    <section className="home-section">
      {/* Hero */}
      <div className="hero">
        <div className="hero-content">
          <h1 className="hero-title">WHETTY</h1>
          <p className="hero-tagline">Makin Music</p>
          <div className="hero-ctas">
            <button className="cta-btn primary" onClick={() => setActivePage('music')}>
              Listen Now
            </button>
            <button className="cta-btn secondary" onClick={() => setActivePage('shop')}>
              New EP — May 8th
            </button>
          </div>
        </div>
      </div>

      {/* Featured Release */}
      <div className="featured-release">
        <h2 className="section-title">Featured Release</h2>
        <div className="release-card">
          <div className="release-artwork placeholder-art">
            <span>POP¡</span>
          </div>
          <div className="release-info">
            <h3>POP¡ EP</h3>
            <p className="release-date">New EP — May 8th, 2026</p>
            <ol className="track-list">
              <li>Character</li>
              <li>Distant Memory</li>
            </ol>
            <button className="cta-btn primary" onClick={() => setActivePage('shop')}>
              Pre-Order Now
            </button>
          </div>
        </div>
      </div>

      {/* Email Signup */}
      <div className="email-signup">
        <h2>Stay Updated</h2>
        <p>Get updates on new music, shows, and exclusive content</p>
        <SubscribeForm source="home" buttonText="Subscribe" />
      </div>

      {/* Social Links */}
      <div className="social-links">
        <a href="https://www.tiktok.com/@whetty88" target="_blank" rel="noopener noreferrer" className="social-btn tiktok">
          <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>
          TikTok
        </a>
        <a href="https://open.spotify.com/artist/1Y6NGN7caDsNRGFjgXTcxg" target="_blank" rel="noopener noreferrer" className="social-btn spotify">
          <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/></svg>
          Spotify
        </a>
        <a href="https://music.apple.com/us/artist/whetty/1757994638" target="_blank" rel="noopener noreferrer" className="social-btn apple-music">
          <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M23.994 6.124a9.23 9.23 0 0 0-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043C21.003.517 20.373.285 19.7.164c-.517-.093-1.038-.135-1.564-.15-.04-.003-.083-.01-.124-.013H5.988c-.152.01-.303.017-.455.026C4.786.07 4.043.15 3.34.428 2.004.958 1.04 1.88.475 3.208c-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03c.525 0 1.048-.034 1.57-.1.823-.106 1.597-.35 2.296-.81a5.28 5.28 0 0 0 1.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76 1.035-1.36 1.322-.63.302-1.29.455-1.99.468-.465.01-.915-.06-1.36-.21-.69-.232-1.217-.65-1.63-1.24-.402-.574-.624-1.206-.624-1.896 0-.767.25-1.445.78-2.014.58-.624 1.31-1.003 2.14-1.17.464-.093.934-.135 1.408-.15.278-.01.555.01.832.042V6.37c0-.128-.05-.21-.16-.26-.11-.052-.226-.088-.34-.125-1.187-.39-2.382-.78-3.576-1.17-.05-.017-.113-.03-.16-.06-.05-.03-.09-.095-.09-.148 0-1.616 0-3.23.002-4.846 0-.065.01-.118.06-.177.05-.06.11-.09.18-.09.06 0 .12.01.18.03 1.637.54 3.274 1.08 4.91 1.62.164.054.328.108.49.162.29.096.41.235.41.546v5.71z"/></svg>
          Apple Music
        </a>
        <a href="https://soundcloud.com/wehtty" target="_blank" rel="noopener noreferrer" className="social-btn soundcloud">
          <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c0-.057-.045-.1-.09-.1m-.899.828c-.06 0-.091.037-.104.094L0 14.479l.165 1.308c0 .055.045.094.09.094s.089-.045.104-.104l.21-1.319-.21-1.334c0-.061-.044-.09-.09-.09m1.83-1.229c-.061 0-.12.045-.12.104l-.21 2.563.225 2.458c0 .06.045.12.119.12.061 0 .105-.061.121-.12l.254-2.474-.254-2.548c-.016-.06-.061-.12-.121-.12m.945-.089c-.075 0-.135.06-.15.135l-.193 2.64.21 2.544c.016.077.075.138.149.138.075 0 .135-.061.15-.15l.24-2.532-.24-2.623c0-.075-.06-.135-.135-.135m.959-.166c-.09 0-.15.074-.165.148l-.195 2.883.209 2.714c.016.09.075.15.166.15.074 0 .149-.074.164-.165l.226-2.699-.226-2.883c-.015-.09-.075-.148-.149-.148m.971-.178c-.09 0-.166.074-.18.165l-.18 3.06.18 2.729c.014.09.09.165.18.165.104 0 .18-.074.194-.18l.209-2.714-.209-3.06c-.015-.09-.09-.165-.18-.165"/></svg>
          SoundCloud
        </a>
        <a href="https://www.youtube.com/@whetty88" target="_blank" rel="noopener noreferrer" className="social-btn youtube">
          <svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          YouTube
        </a>
      </div>
    </section>
  )
}
