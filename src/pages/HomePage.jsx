import { useEffect } from 'react';
import Hero from '../components/Hero';
import ToolTabs from '../components/ToolTabs';
import ImageRemover from '../components/ImageRemover';
import { Comparison } from '../components/StaticSections';

export default function HomePage() {
  useEffect(() => {
    document.title = 'Gemini Watermark Remover – 100% Free Image Logo Remover (No Blur)';
  }, []);

  return (
    <>
      <Hero variant="image" />
      <ToolTabs />
      <ImageRemover />
      <Comparison />
    </>
  );
}
