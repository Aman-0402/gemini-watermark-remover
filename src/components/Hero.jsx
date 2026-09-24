import { Link } from 'react-router-dom';
import { asset } from '../lib/assetUrl';

export default function Hero({ variant = 'image' }) {
  const isVideo = variant === 'video';
  return (
    <>
      <div className="hero-section">
        <h1 className="hero-title">
          {isVideo ? 'Free Veo 3 AI Video Watermark Remover' : 'Free Gemini Watermark & Logo Remover'}
        </h1>
        <p className="hero-description">
          {isVideo ? (
            <>
              The fastest way to <strong>remove the Gemini watermark from Veo 3 videos</strong> — mathematical alpha
              unblending frame-by-frame, with{' '}
              <strong style={{ color: 'var(--text-main)' }}>full audio preservation</strong>. 100% free, secure, and processed
              completely inside your browser with <strong style={{ color: 'var(--text-main)' }}>zero quality loss</strong>.
            </>
          ) : (
            <>
              The fastest way to <strong>remove Gemini watermark</strong> and erase Google AI logo sparkles from your{' '}
              <strong style={{ color: 'var(--text-main)' }}>images and Veo 3 videos</strong>. 100% free, secure, and processed completely inside
              your browser with <strong style={{ color: 'var(--text-main)' }}>zero quality loss</strong>.
            </>
          )}
        </p>
        <div className="hero-badges">
          <span className="hero-badge-pill"><iconify-icon icon="ph:image-square-bold" width="15" style={{ color: '#2563eb' }}></iconify-icon> Imagen 3 Images (PNG/JPG/WebP)</span>
          <Link to="/video" className="hero-badge-pill hero-badge-link"><iconify-icon icon="ph:video-camera-bold" width="15" style={{ color: '#7c3aed' }}></iconify-icon> Veo 3 Videos (MP4/WebM/MOV)</Link>
          <span className="hero-badge-pill"><iconify-icon icon="ph:sparkle-bold" width="15" style={{ color: '#059669' }}></iconify-icon> Exact Alpha Unblending (No Blur)</span>
          <span className="hero-badge-pill"><iconify-icon icon="ph:shield-check-bold" width="15" style={{ color: '#0d9488' }}></iconify-icon> 100% Free &amp; Private</span>
        </div>
      </div>

      <div className={`hero-bg-frame-container ${isVideo ? 'right' : 'left'}`} aria-hidden="true">
        <div className="hero-bg-frame">
          <img src={asset('/assets/bg1.webp')} alt="Gemini watermark removal preview illustration" className="hero-bg-img" width="250"
            height="250" loading="lazy" decoding="async" fetchpriority="low" />
        </div>
      </div>

      <div className={`hero-bg-frame-container ${isVideo ? 'left' : 'right'}`} aria-hidden="true">
        <div className="hero-bg-frame">
          <img src={asset('/assets/bg2.webp')} alt="Veo 3 AI video watermark removal preview illustration" className="hero-bg-img"
            width="350" height="350" loading="lazy" decoding="async" fetchpriority="low" />
        </div>
      </div>
    </>
  );
}
