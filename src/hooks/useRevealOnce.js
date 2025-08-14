// hooks/useRevealOnce.js
import { useEffect, useRef } from 'react';

export default function useRevealOnce() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          el.classList.add('is-visible');
          io.unobserve(el);
        }
      },
      { threshold: 0.4 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return ref;
}
