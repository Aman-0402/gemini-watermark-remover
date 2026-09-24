import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { smoothScrollTo } from '../lib/mediaUtils';

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1));
      if (el) {
        smoothScrollTo(el);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  const isVideoPage = location.pathname.startsWith('/video');

  return (
    <main className={`container${isVideoPage ? ' page-video' : ''}`}>
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
}
