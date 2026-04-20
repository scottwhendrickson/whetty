import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Music from './pages/Music'
import Videos from './pages/Videos'
import Announcements from './pages/Announcements'
import Shop from './pages/Shop'
import Tour from './pages/Tour'

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'music', label: 'Music' },
  { id: 'videos', label: 'Videos' },
  { id: 'announcements', label: 'Announcements' },
  { id: 'shop', label: 'Shop' },
  { id: 'tour', label: 'Tour' },
]

function App() {
  const [activePage, setActivePage] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNav = (page) => {
    setActivePage(page)
    setMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app">
      <header className="header">
        <div className="logo-container" onClick={() => handleNav('home')} style={{ cursor: 'pointer' }}>
          <img src="/whetty_logo.avif" alt="Whetty" className="logo" />
        </div>

        {/* Desktop Nav */}
        <nav className="nav">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`nav-btn ${activePage === item.id ? 'active' : ''}`}
              onClick={() => handleNav(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`mobile-nav-btn ${activePage === item.id ? 'active' : ''}`}
              onClick={() => handleNav(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}

      <main className="main-content">
        {activePage === 'home' && <Home setActivePage={handleNav} />}
        {activePage === 'music' && <Music />}
        {activePage === 'videos' && <Videos />}
        {activePage === 'announcements' && <Announcements />}
        {activePage === 'shop' && <Shop />}
        {activePage === 'tour' && <Tour />}
      </main>

      <footer className="footer">
        <p>&copy; 2026 Whetty. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
