import { useEffect } from 'react';
import { HowItWorks } from '../components/StaticSections';

export default function HowItWorksPage() {
  useEffect(() => {
    document.title = 'How to Remove Gemini Watermark – Step-by-Step Guide';
  }, []);

  return <HowItWorks />;
}
