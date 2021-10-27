import React, { useEffect, useRef } from 'react';

export default function useDebounce(value: any, callback: (param?: any) => any, delay = 2000) {
  const timeoutRef = useRef(null);
  useEffect(() => {
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      callback();
    }, delay);
  }, [value]);
}
