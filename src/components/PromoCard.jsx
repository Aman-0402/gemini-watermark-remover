export default function PromoCard() {
  const converterUrl = 'https://ishara-madu.github.io/online-image-converter/';
  return (
    <div className="results-promo-banner">
      <div className="results-promo-badge-row">
        <span className="results-promo-tag">Recommended Free Tool</span>
        <span className="badge-featured">100% Free &amp; Fast</span>
      </div>
      <div className="results-promo-body">
        <div className="results-promo-icon-box">
          <img
            src={`${converterUrl}favicon.ico`}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'https://www.google.com/s2/favicons?domain=ishara-madu.github.io&sz=64';
            }}
            alt="Online Image Converter Favicon"
            className="tool-favicon-img"
            width="26"
            height="26"
            loading="lazy"
          />
        </div>
        <div className="results-promo-info">
          <h4 className="results-promo-title">Convert image formats with Online Image Converter</h4>
          <p className="results-promo-desc">
            Batch convert your cleaned files to WebP, PNG, JPG, AVIF, or GIF with lossless quality right in your browser.
          </p>
        </div>
        <a href={converterUrl} target="_blank" rel="noopener noreferrer" className="results-promo-btn">
          <span>Try Image Converter</span>
          <iconify-icon icon="ph:arrow-square-out-bold" width="16"></iconify-icon>
        </a>
      </div>
    </div>
  );
}
