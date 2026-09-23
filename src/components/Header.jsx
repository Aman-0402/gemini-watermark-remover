import { useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [stars, setStars] = useState('--');
  const headerActionsRef = useRef(null);
  const menuBtnRef = useRef(null);
  const toolsDropdownRef = useRef(null);

  useEffect(() => {
    fetch('https://api.github.com/repos/ishara-madu/gemini-watermark-remover')
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
      if (toolsDropdownRef.current && !toolsDropdownRef.current.contains(e.target)) {
        setToolsOpen(false);
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
          <img src="/assets/logo.webp" alt="Gemini Watermark Remover Logo" width="42" height="42" decoding="async"
            fetchpriority="high" style={{ objectFit: 'cover' }} />
          <div className="brand-text">
            <span className="brand-title">Gemini Watermark Remover</span>
          </div>
        </Link>

        <nav className="nav-menu" aria-label="Main Navigation">
          <NavLink to="/video" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Video Remover</NavLink>
          <NavLink to="/how-it-works" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>How it Works</NavLink>
          <NavLink to="/guide" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Settings vs Tool</NavLink>
          <Link to="/#comparison" className="nav-link">Comparison</Link>
          <NavLink to="/features" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>Features</NavLink>
          <NavLink to="/faq" className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}>FAQ</NavLink>

          <div className={`nav-dropdown${toolsOpen ? ' open' : ''}`} ref={toolsDropdownRef}>
            <button type="button" className="nav-link nav-dropdown-btn" aria-expanded={toolsOpen} aria-haspopup="true"
              onClick={(e) => { e.stopPropagation(); setToolsOpen((v) => !v); }}>
              <span>Tools</span>
              <iconify-icon icon="ph:caret-down-bold" className="dropdown-arrow" width="12"></iconify-icon>
            </button>
            <div className="dropdown-menu">
              <a href="https://ishara-madu.github.io/online-image-converter/" target="_blank" rel="noopener noreferrer"
                className="dropdown-item promo-item">
                <div className="dropdown-item-icon promo-icon">
                  <img src="https://ishara-madu.github.io/online-image-converter/favicon.ico"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://www.google.com/s2/favicons?domain=ishara-madu.github.io&sz=64'; }}
                    alt="Online Image Converter Favicon" className="tool-favicon-img" width="22" height="22" loading="lazy" />
                </div>
                <div className="dropdown-item-content">
                  <div className="dropdown-item-title-row">
                    <span className="dropdown-item-title">Online Image Converter</span>
                    <span className="badge-featured">Free &amp; Fast</span>
                  </div>
                  <p className="dropdown-item-desc">Convert WebP, PNG, JPG, AVIF, GIF with zero quality loss.</p>
                </div>
                <iconify-icon icon="ph:arrow-square-out-bold" width="16" className="dropdown-ext-icon"></iconify-icon>
              </a>

              <div className="dropdown-divider"></div>

              <Link to="/" className="dropdown-item active-tool">
                <div className="dropdown-item-icon active-icon">
                  <img src="/assets/favicon-96x96.png" alt="Gemini Watermark Remover Favicon" className="tool-favicon-img"
                    width="22" height="22" loading="lazy" />
                </div>
                <div className="dropdown-item-content">
                  <div className="dropdown-item-title-row">
                    <span className="dropdown-item-title">Gemini Watermark Remover</span>
                    <span className="badge-current">Current</span>
                  </div>
                  <p className="dropdown-item-desc">Remove Gemini &amp; Veo 3 watermarks mathematically.</p>
                </div>
              </Link>
            </div>
          </div>
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
            <Link to="/guide" className="mobile-nav-link" onClick={closeMobile}>
              <iconify-icon icon="ph:book-open-bold" width="18"></iconify-icon>
              <span>Settings vs Tool</span>
            </Link>
            <Link to="/#comparison" className="mobile-nav-link" onClick={closeMobile}>
              <iconify-icon icon="ph:git-diff-bold" width="18"></iconify-icon>
              <span>Comparison</span>
            </Link>
            <Link to="/features" className="mobile-nav-link" onClick={closeMobile}>
              <iconify-icon icon="ph:shield-check-bold" width="18"></iconify-icon>
              <span>Features</span>
            </Link>
            <Link to="/faq" className="mobile-nav-link" onClick={closeMobile}>
              <iconify-icon icon="ph:question-bold" width="18"></iconify-icon>
              <span>FAQ</span>
            </Link>

            <div className="mobile-promo-card">
              <div className="mobile-promo-header">
                <span className="mobile-promo-label">Recommended Tool</span>
                <span className="badge-featured">Free &amp; Fast</span>
              </div>
              <a href="https://ishara-madu.github.io/online-image-converter/" target="_blank" rel="noopener noreferrer"
                className="mobile-promo-link" onClick={closeMobile}>
                <div className="dropdown-item-icon promo-icon">
                  <img src="https://ishara-madu.github.io/online-image-converter/favicon.ico"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://www.google.com/s2/favicons?domain=ishara-madu.github.io&sz=64'; }}
                    alt="Online Image Converter Favicon" className="tool-favicon-img" width="22" height="22" loading="lazy" />
                </div>
                <div className="mobile-promo-info">
                  <strong>Online Image Converter</strong>
                  <p>Convert WebP, PNG, JPG, AVIF in browser</p>
                </div>
                <iconify-icon icon="ph:arrow-square-out-bold" width="16" className="mobile-promo-ext"></iconify-icon>
              </a>
            </div>
          </div>

          <div className="header-action-buttons">
            <a href="https://github.com/ishara-madu/gemini-watermark-remover" target="_blank" rel="noopener noreferrer"
              className="btn-github" title="Star on GitHub">
              <iconify-icon icon="ph:github-logo" width="18"></iconify-icon>
              <iconify-icon icon="ph:star-fill" width="14" style={{ color: '#eab308' }}></iconify-icon>
              <span>{stars}</span>
              <span className="btn-github-label">Stars</span>
            </a>
            <a href="https://buymeacoffee.com/ishara.madu" target="_blank" rel="noopener noreferrer" className="btn-donate"
              title="Support the project">
              <iconify-icon icon="ph:heart-fill" width="16" style={{ color: '#f43f5e' }}></iconify-icon>
              <span>Donate</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
