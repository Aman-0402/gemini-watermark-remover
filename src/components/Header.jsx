import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { asset } from '../lib/assetUrl';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [stars, setStars] = useState('--');
  const headerActionsRef = useRef(null);
  const menuBtnRef = useRef(null);

  useEffect(() => {
    fetch('https://api.github.com/repos/Aman-0402/gemini-watermark-remover')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data.stargazers_count === 'number') setStars(data.stargazers_count);
      })
      .catch((e) => console.warn('Could not fetch GitHub star count:', e));
  }, []);

  useEffect(() => {
    const onDocClick = (e) => {
      if (
        headerActionsRef.current && !headerActionsRef.current.contains(e.target) &&
        menuBtnRef.current && !menuBtnRef.current.contains(e.target)
      ) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="app-header">
      <div className="header-container">
        <Link to="/" className="brand" title="Gemini Watermark Remover">
          <img src={asset('/assets/logo.webp')} alt="Gemini Watermark Remover Logo" width="42" height="42" decoding="async"
            fetchpriority="high" style={{ objectFit: 'cover' }} />
          <div className="brand-text">
            <span className="brand-title">Gemini Watermark Remover</span>
          </div>
        </Link>

        <nav className="nav-menu" aria-label="Main Navigation">
          <NavLink to="/video" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Video Remover</NavLink>
          <NavLink to="/how-it-works" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>How it Works</NavLink>
          <Link to="/#comparison" className="nav-link">Comparison</Link>
        </nav>

        <button type="button" ref={menuBtnRef} className={`mobile-menu-toggle${mobileOpen ? ' active' : ''}`}
          aria-label="Toggle navigation menu" aria-expanded={mobileOpen}
          onClick={(e) => { e.stopPropagation(); setMobileOpen((v) => !v); }}>
          <iconify-icon icon="ph:list-bold" className={`icon-hamburger${mobileOpen ? ' hidden' : ''}`} width="22"></iconify-icon>
          <iconify-icon icon="ph:x-bold" className={`icon-close${mobileOpen ? '' : ' hidden'}`} width="22"></iconify-icon>
        </button>

        <div id="header-actions" ref={headerActionsRef} className={`header-actions${mobileOpen ? ' open' : ''}`}>
          <div className="mobile-nav-links">
            <Link to="/video" className="mobile-nav-link" onClick={closeMobile}>
              <iconify-icon icon="ph:video-bold" width="18"></iconify-icon>
              <span>Video Remover</span>
            </Link>
            <Link to="/how-it-works" className="mobile-nav-link" onClick={closeMobile}>
              <iconify-icon icon="ph:info-bold" width="18"></iconify-icon>
              <span>How it Works</span>
            </Link>
            <Link to="/#comparison" className="mobile-nav-link" onClick={closeMobile}>
              <iconify-icon icon="ph:git-diff-bold" width="18"></iconify-icon>
              <span>Comparison</span>
            </Link>
          </div>

          <div className="header-action-buttons">
            <a href="https://github.com/Aman-0402/gemini-watermark-remover" target="_blank" rel="noopener noreferrer"
              className="btn-github" title="Star on GitHub">
              <iconify-icon icon="ph:github-logo" width="18"></iconify-icon>
              <iconify-icon icon="ph:star-fill" width="14" style={{ color: '#eab308' }}></iconify-icon>
              <span>{stars}</span>
              <span className="btn-github-label">Stars</span>
            </a>
            <a href="https://www.youtube.com/@AkaRJLive" target="_blank" rel="noopener noreferrer"
              className="btn-subscribe" title="Subscribe on YouTube">
              <iconify-icon icon="ph:youtube-logo-bold" width="18"></iconify-icon>
              <span>Subscribe</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
