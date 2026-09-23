import { useEffect } from 'react';
import { Faq } from '../components/StaticSections';

export default function FaqPage() {
  useEffect(() => {
    document.title = 'FAQ – Gemini Watermark Remover';
  }, []);

  return <Faq />;
}
