export default function Hero({ onNavVideo }) {
  return (
    <>
      <div className="hero-section">
        <h1 className="hero-title">Free Gemini Watermark &amp; Logo Remover</h1>
        <p className="hero-description">
          The fastest way to <strong>remove Gemini watermark</strong> and erase Google AI logo sparkles from your{' '}
          <strong style={{ color: '#64748b' }}>images and Veo 3 videos</strong>. 100% free, secure, and processed completely inside
          your browser with <strong style={{ color: '#64748b' }}>zero quality loss</strong>.
        </p>
        <div className="hero-badges">
          <span className="hero-badge-pill"><iconify-icon icon="ph:image-square-bold" width="15" style={{ color: '#2563eb' }}></iconify-icon> Imagen 3 Images (PNG/JPG/WebP)</span>
          <a href="#panel-video" className="hero-badge-pill hero-badge-link" onClick={onNavVideo}><iconify-icon icon="ph:video-camera-bold" width="15" style={{ color: '#7c3aed' }}></iconify-icon> Veo 3 Videos (MP4/WebM/MOV)</a>
          <span className="hero-badge-pill"><iconify-icon icon="ph:sparkle-bold" width="15" style={{ color: '#059669' }}></iconify-icon> Exact Alpha Unblending (No Blur)</span>
          <span className="hero-badge-pill"><iconify-icon icon="ph:shield-check-bold" width="15" style={{ color: '#0d9488' }}></iconify-icon> 100% Free &amp; Private</span>
        </div>
      </div>

      <div className="hero-bg-frame-container left" aria-hidden="true">
        <div className="hero-bg-frame">
          <img src="/assets/bg1.webp" alt="Gemini watermark removal preview illustration" className="hero-bg-img" width="250"
            height="250" loading="lazy" decoding="async" fetchpriority="low" />
        </div>
      </div>

      <div className="hero-bg-frame-container right" aria-hidden="true">
        <div className="hero-bg-frame">
          <img src="/assets/bg2.webp" alt="Veo 3 AI video watermark removal preview illustration" className="hero-bg-img"
            width="350" height="350" loading="lazy" decoding="async" fetchpriority="low" />
        </div>
      </div>
    </>
  );
}
