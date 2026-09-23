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
              <img src="/assets/before.webp"
                alt="Google Gemini image with visible watermark logo before removal" width="400"
                height="400" loading="lazy" decoding="async" />
            </div>
          </div>

          <div className="comparison-card">
            <span className="comparison-badge badge-after">
              <iconify-icon icon="ph:check-circle" width="14"></iconify-icon> After
            </span>
            <div className="comparison-img-wrapper checker">
              <img src="/assets/after.webp"
                alt="Clean Google Gemini image after watermark and logo removal with zero quality loss"
                width="400" height="400" loading="lazy" decoding="async" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Guide({ onNavImage }) {
  return (
    <section id="guide" className="guide-section">
      <div className="guide-header">
        <h2 className="section-title">How to Remove Google Gemini Watermark &amp; Logo</h2>
        <p className="guide-subtitle">
          Learn how to remove Gemini watermarks from existing media using our instant online tool or turn off watermarks for future AI creations.
        </p>
      </div>

      <div className="methods-grid">
        <div className="method-card featured-method">
          <div className="method-badge tool-badge">
            <iconify-icon icon="ph:eraser-bold" width="14"></iconify-icon>
            Method 1: Instant Online Tool (Recommended)
          </div>
          <h3 className="method-title">Remove Gemini Watermark from Existing Images &amp; Veo Videos</h3>
          <p className="method-desc">
            For existing Google Gemini (Imagen 3) photos or Veo 3 AI videos, use this free client-side tool
            to remove Gemini watermark and logo sparkles mathematically with zero blur.
          </p>

          <ol className="method-steps">
            <li className="method-step-item">
              <span className="step-num-pill">1</span>
              <div className="step-text">
                <strong>Upload Media:</strong> Drag &amp; drop your Gemini image (PNG, JPG, WebP) or Veo 3 video (MP4,
                MOV) into the remover above.
              </div>
            </li>
            <li className="method-step-item">
              <span className="step-num-pill">2</span>
              <div className="step-text">
                <strong>Mathematical Unblending:</strong> Our engine applies the reverse formula to unblend watermark
                alpha without blurry AI inpainting.
              </div>
            </li>
            <li className="method-step-item">
              <span className="step-num-pill">3</span>
              <div className="step-text">
                <strong>Export Clean File:</strong> Click Remove &amp; Export for a 100% original quality download
                processed entirely in your browser.
              </div>
            </li>
          </ol>

          <div className="method-action">
            <a href="#panel-image" className="btn btn-primary method-btn" onClick={onNavImage}>
              <iconify-icon icon="ph:arrow-up-bold" width="16"></iconify-icon>
              <span>Use Free Gemini Watermark Remover</span>
            </a>
          </div>
        </div>

        <div className="method-card">
          <div className="method-badge official-badge">
            <iconify-icon icon="ph:gear-six-bold" width="14"></iconify-icon>
            Method 2: Gemini Account Settings
          </div>
          <h3 className="method-title">Turn Off Watermarks for Future AI Generations</h3>
          <p className="method-desc">
            If you generate new images inside Google Gemini on the web, you can disable the visible
            watermark toggle in your Google account settings.
          </p>

          <ol className="method-steps">
            <li className="method-step-item">
              <span className="step-num-pill">1</span>
              <div className="step-text">
                <strong>Go to Gemini Web:</strong> Open <a href="https://gemini.google.com" target="_blank"
                  rel="nofollow noopener noreferrer" className="text-link">gemini.google.com</a> and sign in.
              </div>
            </li>
            <li className="method-step-item">
              <span className="step-num-pill">2</span>
              <div className="step-text">
                <strong>Open Settings:</strong> Click on the <strong>Settings</strong> gear icon (<iconify-icon
                  icon="ph:gear-bold" width="14" style={{ verticalAlign: '-1px' }}></iconify-icon>) in the menu or sidebar.
              </div>
            </li>
            <li className="method-step-item">
              <span className="step-num-pill">3</span>
              <div className="step-text">
                <strong>Toggle Off:</strong> Under <strong>Media watermark</strong>, switch the visible
                watermark option to <strong>Off</strong>.
              </div>
            </li>
          </ol>

          <div className="method-note">
            <iconify-icon icon="ph:info-bold" width="16" className="note-icon"></iconify-icon>
            <span><strong>Note:</strong> This only prevents watermarks on future image creations. It
              cannot remove watermarks from already saved files or Veo videos.</span>
          </div>
        </div>
      </div>

      <div className="synthid-card">
        <div className="synthid-header">
          <div>
            <h4 className="synthid-title">Visible Gemini Logo vs SynthID Digital Watermark</h4>
            <p className="synthid-sub">Understanding Google's two-layer AI protection mechanism</p>
          </div>
        </div>
        <div className="synthid-grid">
          <div className="synthid-col">
            <strong className="synthid-col-title"><iconify-icon icon="ph:eye-bold" width="16"></iconify-icon> 1. Visible
              Gemini Logo</strong>
            <p>The semi-transparent white 4-point sparkle logo rendered in the corner of images and Veo videos. This is what our
              Gemini watermark remover cleans mathematically with zero quality loss.</p>
          </div>
          <div className="synthid-col">
            <strong className="synthid-col-title"><iconify-icon icon="ph:fingerprint-bold" width="16"></iconify-icon> 2.
              SynthID (Imperceptible Metadata)</strong>
            <p>An invisible cryptographic watermark developed by Google DeepMind embedded directly into image pixel
              noise and audio tracks for AI detection. It does not affect visible image aesthetics.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function VideoGuide({ onNavVideo }) {
  return (
    <section id="video-guide" className="video-guide-section">
      <div className="video-guide-card">
        <div className="video-guide-header">
          <div className="method-badge tool-badge">
            <iconify-icon icon="ph:video-camera-bold" width="14"></iconify-icon>
            Gemini Video Watermark Remover
          </div>
          <h2 className="video-guide-title">How to Remove Gemini Watermark from Video (Veo 3 AI)</h2>
          <p className="video-guide-desc">
            Looking for a fast, free <strong>Gemini video watermark remover</strong>? Our browser-based engine applies mathematical alpha unblending to Google Veo 3 AI videos frame-by-frame with full audio track preservation and zero blur.
          </p>
        </div>

        <div className="video-guide-steps-grid">
          <div className="video-guide-step">
            <span className="step-num-pill">1</span>
            <div className="video-guide-step-content">
              <strong>Select Video Mode</strong>
              <p>Switch to the <strong>Video Remover</strong> tab above or click the button below to activate the video canvas.</p>
            </div>
          </div>

          <div className="video-guide-step">
            <span className="step-num-pill">2</span>
            <div className="video-guide-step-content">
              <strong>Upload Veo Video</strong>
              <p>Drag and drop your Google Gemini Veo 3 generated video (supports MP4, WebM, and MOV formats).</p>
            </div>
          </div>

          <div className="video-guide-step">
            <span className="step-num-pill">3</span>
            <div className="video-guide-step-content">
              <strong>Frame-by-Frame Unblending</strong>
              <p>Hardware-accelerated WebCodecs decodes each frame, removing the watermark mask while keeping the original audio track intact.</p>
            </div>
          </div>

          <div className="video-guide-step">
            <span className="step-num-pill">4</span>
            <div className="video-guide-step-content">
              <strong>Download Clean MP4</strong>
              <p>Export your crystal-clear, watermark-free video directly to your device with zero cloud uploads.</p>
            </div>
          </div>
        </div>

        <div className="video-guide-cta">
          <a href="#panel-video" className="btn btn-primary method-btn" onClick={onNavVideo}>
            <iconify-icon icon="ph:video-camera-bold" width="16"></iconify-icon>
            <span>Open Gemini Video Watermark Remover</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function Features() {
  const items = [
    { icon: 'ph:shield-check', title: '100% Private & Local', desc: 'All media is processed completely inside your browser using HTML5 Canvas and WebCodecs. Your photos and videos never get uploaded to any external server.' },
    { icon: 'ph:cube-transparent', title: 'Zero Blur Mathematical Precision', desc: "Reverses Google Gemini's exact transparent alpha blending formula instead of blurry AI inpainting, restoring 100% of your original pixel clarity." },
    { icon: 'ph:video', title: 'Gemini Veo 3 Video Remover', desc: 'Easily remove Gemini watermark from Veo 3 MP4 videos with fast frame-by-frame processing and original audio track preservation.' },
    { icon: 'ph:sliders-horizontal', title: 'Live Tuner & Dual Preview', desc: 'Adjust strength, scale, and offset in real-time. Use the side-by-side zoomed original and cleaned preview windows for exact logo alignment.' },
    { icon: 'ph:file-image', title: 'Multi-Format Support', desc: 'Works effortlessly with PNG, JPG, WebP images, as well as MP4, WebM, and MOV video formats with instant browser downloads.' },
    { icon: 'ph:lightning', title: 'Free & Unlimited', desc: 'No signup required, no subscription fees, no file count limits, and no secondary watermarks added to your cleaned output files.' },
  ];
  return (
    <section id="features" className="features-section">
      <h2 className="section-title">Why Choose Our Gemini Logo &amp; Watermark Remover?</h2>
      <div className="features-grid">
        {items.map((item) => (
          <div className="feature-card" key={item.title}>
            <iconify-icon icon={item.icon} className="feature-icon" width="24"></iconify-icon>
            <div className="feature-card-body">
              <h3 className="feature-card-title">{item.title}</h3>
              <p className="feature-card-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

const FAQ_ITEMS = [
  { q: 'How to remove Gemini watermark from images and videos?', a: 'To remove Gemini watermark, simply upload your Google Imagen 3 image or Veo 3 video into our free online tool above. Our tool mathematically unblends the transparent Gemini logo pixel-by-pixel, restoring 100% of your original media clarity without any blurry AI smudge.' },
  { q: 'How does this Gemini logo remover work?', a: <>Google Gemini embeds a transparent logo mask into generated images and Veo videos using alpha blending. Instead of guessing pixels like AI object removers, our Gemini logo remover applies the exact reverse mathematical formula <code>Original = (Watermarked - Logo * Alpha) / (1 - Alpha)</code> to unblend the watermark pixel-by-pixel with zero quality loss.</> },
  { q: 'Is this Gemini watermark remover completely free to use?', a: 'Yes, it is 100% free with no limits! There are no hidden subscription fees, no user registration required, no file count limits, and no secondary watermarks added to your exported files.' },
  { q: 'Can I remove Gemini watermark from Veo 3 videos and Imagen 3 photos?', a: 'Yes! Our tool fully supports Google Gemini Imagen 3 images (PNG, JPG, WebP) and Gemini Veo 3 AI videos (MP4, WebM, MOV) with full audio preservation and GPU-accelerated WebCodecs.' },
  { q: 'Can I turn off watermarks directly in Google Gemini settings?', a: 'Yes! On Gemini web (gemini.google.com), you can go to Settings > Media watermark and turn visible watermarks Off. However, this only applies to future image generations and cannot remove watermarks from previously saved images or Veo videos, which is why you can use our free tool.' },
  { q: 'What is the difference between visual Gemini logo and SynthID?', a: 'Visual watermarks are the transparent 4-point sparkle logos seen in the corner of images and videos, which our tool removes cleanly. SynthID is an imperceptible cryptographic watermark embedded directly into pixel noise by Google DeepMind for AI detection that does not affect visual appearance.' },
  { q: 'Why is mathematical watermark removal better than AI inpainting?', a: 'AI inpainting tools guess what lies beneath the watermark by blurring or smudging pixels, causing loss of detail. Mathematical alpha unblending subtracts the exact transparency values of the Gemini logo, revealing the actual sharp original pixels underneath.' },
  { q: 'Are my images and videos kept private and secure?', a: 'Absolutely. All image and video processing is executed 100% locally inside your web browser using HTML5 Canvas and WebCodecs APIs. Your files are never uploaded, stored, or transmitted to any external server.' },
  { q: 'What image and video file formats are supported?', a: 'We support all major formats: Images (PNG, JPG, WebP) and Videos (MP4, WebM, MOV) with instant browser downloads.' },
  { q: 'Can I use this Gemini watermark remover on mobile phones and tablets?', a: 'Yes! The website is fully mobile-responsive and works seamlessly on smartphones and tablets across iOS (Safari) and Android (Chrome/Edge/Firefox).' },
];

export function Faq() {
  return (
    <section id="faq" className="faq-section">
      <div className="faq-layout">
        <div className="faq-header-col">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-subtitle">
            Everything you need to know about our free online Gemini watermark and logo removal tool.
          </p>
        </div>

        <div className="faq-list-col">
          <div className="faq-container">
            {FAQ_ITEMS.map((item, i) => (
              <details className="faq-item" key={item.q}>
                <summary className="faq-question">
                  <div className="faq-q-left">
                    <span className="faq-num">{String(i + 1).padStart(2, '0')}</span>
                    <span>{item.q}</span>
                  </div>
                  <iconify-icon icon="ph:caret-down-bold" className="faq-icon" width="16"></iconify-icon>
                </summary>
                <div className="faq-answer">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
