import { useEffect } from 'react';
import { Features } from '../components/StaticSections';

export default function FeaturesPage() {
  useEffect(() => {
    document.title = 'Features – Gemini Watermark Remover';
  }, []);

  return <Features />;
}
