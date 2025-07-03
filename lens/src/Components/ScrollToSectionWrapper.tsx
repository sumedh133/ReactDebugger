import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToSectionWrapper({
  children,
  scrollTo,
}: {
  children: React.ReactNode;
  scrollTo?: string;
}) {
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (scrollTo) {
        const el = document.getElementById(scrollTo);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Scroll to top if no scrollTo is provided (i.e., "/")
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    // Wait for next paint AND ensure DOM is ready
    const timeout = setTimeout(handleScroll, 150);

    return () => clearTimeout(timeout);
  }, [location.pathname, scrollTo]);

  return <>{children}</>;
}
