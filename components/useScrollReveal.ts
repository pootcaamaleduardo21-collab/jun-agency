'use client';
import { useEffect } from 'react';

/**
 * useScrollReveal
 * Adds the `visible` class to a container element's children
 * that carry the `reveal` class as they enter the viewport.
 *
 * NOTE: class name is `visible` (to match `.reveal.visible` in globals.css)
 */
export function useScrollReveal(containerRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targets = container.querySelectorAll<HTMLElement>('.reveal');
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: '0px 0px 60px 0px' }
    );

    // Immediately show elements already in the viewport on mount
    targets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('visible');
      } else {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [containerRef]);
}
