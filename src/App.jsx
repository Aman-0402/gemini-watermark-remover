import { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ImageRemover from './components/ImageRemover';
import VideoRemover from './components/VideoRemover';
import { HowItWorks, Comparison, Guide, VideoGuide, Features, Faq } from './components/StaticSections';
import Footer from './components/Footer';
import { smoothScrollTo } from './lib/mediaUtils';

function initialTab() {
  try {
    if (window.location.hash.toLowerCase().includes('video')) return 'video';
    const stored = sessionStorage.getItem('activeTab');
    if (stored === 'video' || stored === 'image') return stored;
  } catch {}
  return 'image';
}

export default function App() {
  const [tab, setTab] = useState(initialTab);

  useEffect(() => {
    try { sessionStorage.setItem('activeTab', tab); } catch {}
  }, [tab]);

  const goToVideo = (e) => {
    e?.preventDefault();
    setTab('video');
    try { history.replaceState(null, '', window.location.pathname + window.location.search + '#video'); } catch {}
    smoothScrollTo(document.getElementById('panel-video'));
  };

  const goToImage = (e) => {
    e?.preventDefault();
    setTab('image');
    try { history.replaceState(null, '', window.location.pathname + window.location.search); } catch {}
    smoothScrollTo(document.getElementById('panel-image'));
  };

  return (
    <main className="container">
      <Header onNavVideo={goToVideo} />
      <Hero onNavVideo={goToVideo} />

      <div className="tab-container">
        <button id="tab-image" className={`tab-btn${tab === 'image' ? ' active' : ''}`} onClick={goToImage}>
          <iconify-icon icon="ph:image-bold" width="18"></iconify-icon>
          <span>Image Remover</span>
        </button>
        <button id="tab-video" className={`tab-btn${tab === 'video' ? ' active' : ''}`} onClick={goToVideo}>
          <iconify-icon icon="ph:video-bold" width="18"></iconify-icon>
          <span>Video Remover</span>
        </button>
      </div>

      <div style={{ display: tab === 'image' ? 'block' : 'none' }}>
        <ImageRemover />
      </div>
      <div style={{ display: tab === 'video' ? 'block' : 'none' }}>
        <VideoRemover />
      </div>

      <HowItWorks />
      <Comparison />
      <Guide onNavImage={goToImage} />
      <VideoGuide onNavVideo={goToVideo} />
      <Features />
      <Faq />
      <Footer />
    </main>
  );
}
