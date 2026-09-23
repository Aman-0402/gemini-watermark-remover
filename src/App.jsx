import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import VideoPage from './pages/VideoPage';
import HowItWorksPage from './pages/HowItWorksPage';
import GuidePage from './pages/GuidePage';
import FeaturesPage from './pages/FeaturesPage';
import FaqPage from './pages/FaqPage';

export default function App() {
  return (
    <BrowserRouter basename="/gemini-watermark-remover">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/video" element={<VideoPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/guide" element={<GuidePage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
