// hooks/useScrollLift.js
import { useEffect, useRef } from 'react';

export default function useScrollLift(startY = 0, opts = { enterStart: 0.9, enterEnd: 0.1 }) {
  const ref = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { enterStart, enterEnd } = opts; // viewport ratios (0..1)
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;

        const start = vh * enterStart; // e.g. 90% down the viewport
        const end = vh * enterEnd;     // e.g. 10% down the viewport

        // progress 0..1 as the element travels from start -> end
        let t = (start - rect.top) / (start - end);
        if (Number.isNaN(t)) t = 0;
        t = Math.max(0, Math.min(1, t));

        const y = startY * (1 - t); // lerp(startY -> 0)
        el.style.transform = `translate3d(0, ${y}px, 0)`;
        el.style.willChange = 'transform';
      });
    };

    onScroll(); // initial
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [startY, opts.enterStart, opts.enterEnd]);

  return ref;
}
