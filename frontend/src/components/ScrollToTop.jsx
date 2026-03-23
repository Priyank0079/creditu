import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll the main window to top immediately
    window.scrollTo(0, 0);

    // Use a small delay so the new page's DOM is ready before scrolling inner containers
    const timer = setTimeout(() => {
      // Scroll the admin panel's inner content area to top
      const adminContent = document.querySelector('.admin-content');
      if (adminContent) {
        adminContent.scrollTop = 0;
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
