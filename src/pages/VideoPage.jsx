import { useEffect } from 'react';
import Hero from '../components/Hero';
import ToolTabs from '../components/ToolTabs';
import VideoRemover from '../components/VideoRemover';

export default function VideoPage() {
  useEffect(() => {
    document.title = 'Gemini Veo 3 Video Watermark Remover – 100% Free (No Blur)';
  }, []);

  return (
    <>
      <Hero variant="video" />
      <ToolTabs />
      <VideoRemover />
    </>
  );
}
