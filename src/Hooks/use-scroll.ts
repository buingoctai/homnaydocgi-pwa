import { useState, useEffect, useCallback, useRef } from 'react';

const useScrollDirection = () => {
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      // Clear our timeout throughout the scroll
      setIsScrolling(true);
      clearTimeout(scrollTimeoutRef.current);

      // Set a timeout to run after scrolling ends
      scrollTimeoutRef.current = setTimeout(function () {
        // Run the callback
        setIsScrolling(false);
      }, 500);
    };

    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, []);

  return [isScrolling];
};

export default useScrollDirection;
