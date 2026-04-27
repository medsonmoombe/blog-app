import { useState, useEffect } from 'react';
import { HiArrowUp } from 'react-icons/hi';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-full shadow-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 animate-fade-up"
          aria-label="Scroll to top"
        >
          <HiArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
}
