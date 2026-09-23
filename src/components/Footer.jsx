import { useRef } from 'react';

export default function Footer() {
  const privacyRef = useRef(null);
  const termsRef = useRef(null);

  return (
    <>
      <footer className="app-footer">
        <div className="footer-content">
          <p className="footer-credit">
            Designed &amp; Developed by <a href="https://github.com/Aman-0402" target="_blank" rel="noopener noreferrer"
              className="footer-author-link"><strong>Aman</strong></a>
          </p>

          <div className="footer-links">
            <button type="button" className="footer-link-btn" onClick={() => privacyRef.current?.showModal()}>Privacy Policy</button>
            <span className="footer-dot">•</span>
            <button type="button" className="footer-link-btn" onClick={() => termsRef.current?.showModal()}>Terms of Service</button>
            <span className="footer-dot">•</span>
            <a href="https://github.com/Aman-0402/gemini-watermark-remover" target="_blank" rel="noopener noreferrer"
              className="footer-link">
              <iconify-icon icon="ph:github-logo-bold" width="14"></iconify-icon> GitHub
            </a>
          </div>

          <p className="footer-sub">
            100% Free &amp; Private • All media processed locally in your browser
          </p>
        </div>
      </footer>

      <dialog ref={privacyRef} className="app-modal">
        <div className="modal-box">
          <h3 className="modal-title">Privacy Policy</h3>
          <p className="modal-text mb-2">
            Gemini Watermark Remover values your privacy above all else. This application runs <strong>100%
              locally</strong> in your web browser using HTML5 Canvas and WebCodecs technologies.
          </p>
          <p className="modal-text mb-4">
            • <strong>Zero Server Uploads:</strong> None of your uploaded images or videos are transmitted to external
            servers.<br />
            • <strong>No Data Collection:</strong> We do not track personal data, store cookies, or monitor media
            processing.<br />
            • <strong>Session Storage:</strong> Active tab preferences are stored locally on your device only for session
            duration.
          </p>
          <button type="button" className="btn btn-secondary text-xs" onClick={() => privacyRef.current?.close()}>Close</button>
        </div>
      </dialog>

      <dialog ref={termsRef} className="app-modal">
        <div className="modal-box">
          <h3 className="modal-title">Terms of Service</h3>
          <p className="modal-text mb-2">
            Gemini Watermark Remover is provided as a free utility for personal media editing and research.
          </p>
          <p className="modal-text mb-4">
            • <strong>User Responsibility:</strong> Users are solely responsible for ensuring their media editing complies
            with Google's Terms of Service and applicable copyright laws.<br />
            • <strong>No Warranty:</strong> This software is provided "as is" without warranty of any kind, express or
            implied.
          </p>
          <button type="button" className="btn btn-secondary text-xs" onClick={() => termsRef.current?.close()}>Close</button>
        </div>
      </dialog>
    </>
  );
}
