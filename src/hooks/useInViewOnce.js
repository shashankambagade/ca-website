// hooks/useInViewOnce.js
import { useEffect, useRef } from 'react';

export default function useInViewOnce(options = { threshold: 0.25 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.classList.add('is-visible');
        io.unobserve(el);
      }
    }, options);

    io.observe(el);
    return () => io.disconnect();
  }, [options]);

  return ref;
}
