// hooks/useScrollLiftPair.js
import { useEffect, useRef } from 'react';

/**
 * Returns { measureRef, animateRef }:
 * - measureRef -> attach to a STATIC wrapper (no transforms)
 * - animateRef -> the element we move with translateY
 *
 * startY: initial offset in px (0, 80, 160)
 * enterStart/enterEnd: viewport ratios mapping progress (default 0.9 -> 0.1)
 */
export default function useScrollLiftPair(
  startY = 0,
  { enterStart = 0.9, enterEnd = 0.1 } = {}
) {
  const measureRef = useRef(null);
  const animateRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const measureEl = measureRef.current;
    const animEl = animateRef.current;
    if (!measureEl || !animEl) return;

    // initial state
    animEl.style.transform = `translate3d(0, ${startY}px, 0)`;
    animEl.style.willChange = 'transform';

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;

        const rect = measureEl.getBoundingClientRect(); // static
        const vh = window.innerHeight || 1;

        const start = vh * enterStart;
        const end = vh * enterEnd;

        let t = (start - rect.top) / (start - end); // 0..1
        if (Number.isNaN(t)) t = 0;
        t = Math.max(0, Math.min(1, t));

        const y = startY * (1 - t); // lerp: startY -> 0
        animEl.style.transform = `translate3d(0, ${y}px, 0)`;
      });
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [startY, enterStart, enterEnd]);

  return { measureRef, animateRef };
}
