import { asset } from '../lib/assetUrl';

export function HowItWorks() {
  return (
    <section id="how-it-works" className="how-it-works-section">
      <h2 className="section-title">How to Remove Gemini Watermark</h2>
      <div className="steps-grid">
        <div className="step-card">
          <div className="step-badge">1</div>
          <div className="step-icon">
            <iconify-icon icon="ph:upload-simple" width="26"></iconify-icon>
          </div>
          <h3 className="step-title">Upload Media</h3>
          <p className="step-desc">
            Select or drag &amp; drop your Google Gemini generated image or Veo 3 video into the remover.
          </p>
        </div>

        <div className="step-card">
          <div className="step-badge">2</div>
          <div className="step-icon">
            <iconify-icon icon="ph:sliders-horizontal" width="26"></iconify-icon>
          </div>
          <h3 className="step-title">Adjust &amp; Align</h3>
          <p className="step-desc">
            Fine-tune the size and position sliders. Use the dual zoomed preview corners for pixel-perfect logo alignment.
          </p>
        </div>

        <div className="step-card">
          <div className="step-badge">3</div>
          <div className="step-icon">
            <iconify-icon icon="ph:download-simple" width="26"></iconify-icon>
          </div>
          <h3 className="step-title">Export Clean Media</h3>
          <p className="step-desc">
            Click Remove &amp; Export to download your clean, watermark-free file locally with zero quality loss.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Comparison() {
  return (
    <section id="comparison" className="comparison-section">
      <div className="comparison-layout">
        <div className="comparison-content">
          <h2 className="comparison-title">Before &amp; After: Gemini Watermark &amp; Logo Remover</h2>
          <p className="comparison-subtitle">
            Instead of blurry AI inpainting, our <strong>Gemini logo remover</strong> uses <strong>exact mathematical alpha unblending</strong> to
            subtract the transparent Gemini watermark mask pixel-by-pixel—restoring 100% of your original image quality.
          </p>
        </div>

        <div className="comparison-media">
          <div className="comparison-card">
            <span className="comparison-badge badge-before">
              <iconify-icon icon="ph:x-circle" width="14"></iconify-icon> Before
            </span>
            <div className="comparison-img-wrapper checker">
              <img src={asset('/assets/before.webp')}
                alt="Google Gemini image with visible watermark logo before removal" width="400"
                height="400" loading="lazy" decoding="async" />
            </div>
          </div>

          <div className="comparison-card">
            <span className="comparison-badge badge-after">
              <iconify-icon icon="ph:check-circle" width="14"></iconify-icon> After
            </span>
            <div className="comparison-img-wrapper checker">
              <img src={asset('/assets/after.webp')}
                alt="Clean Google Gemini image after watermark and logo removal with zero quality loss"
                width="400" height="400" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
