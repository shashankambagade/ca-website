'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import '@/styles/theme-scroll.css';

export default function ThemeScrollController() {
  const pathname = usePathname();
  const observerRef = useRef(null);
  const mutationRef = useRef(null);

  useEffect(() => {
    const apply = (theme) => {
      const b = document.body;
      if (theme === 'dark') {
        b.classList.add('theme-dark');
        b.classList.remove('theme-light');
      } else {
        b.classList.add('theme-light');
        b.classList.remove('theme-dark');
      }
    };

    const cleanup = () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
      mutationRef.current?.disconnect();
      mutationRef.current = null;
    };

    const setup = () => {
      const sections = Array.from(
        document.querySelectorAll('[data-theme="dark"], [data-theme="light"]')
      );

      if (!sections.length) return false;

      let active = null;
      const io = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

          if (visible.length) {
            const el = visible[0].target;
            const next = el.getAttribute('data-theme');
            if (next && next !== active) {
              active = next;
              apply(next);
            }
          }
        },
        {
          root: null,
          threshold: Array.from({ length: 11 }, (_, i) => i / 10),
          rootMargin: '-20% 0px -20% 0px',
        }
      );

      sections.forEach((s) => io.observe(s));
      const first = sections[0]?.getAttribute('data-theme');
      if (first) apply(first);

      observerRef.current = io;
      return true;
    };

    cleanup();

    // Defer setup to the next frame to ensure new page DOM is in place
    let raf = requestAnimationFrame(() => {
      if (setup()) return;

      // If sections are not yet present, observe DOM briefly and setup once they appear
      const mo = new MutationObserver(() => {
        if (setup()) {
          mutationRef.current?.disconnect();
        }
      });
      mo.observe(document.body, { childList: true, subtree: true });
      mutationRef.current = mo;
    });

    return () => {
      cleanup();
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return null;
}
