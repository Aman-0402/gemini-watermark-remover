import { useEffect } from 'react';
import { Guide, VideoGuide } from '../components/StaticSections';

export default function GuidePage() {
  useEffect(() => {
    document.title = 'Remove Google Gemini Watermark & Logo – Full Guide';
  }, []);

  return (
    <>
      <Guide />
      <VideoGuide />
    </>
  );
}
