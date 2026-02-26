import { useEffect, useState } from 'react';

const DURATION_MS = 800;
const EASING = (t: number) => 1 - Math.pow(1 - t, 3);

function usePrefersReducedMotion(): boolean {
  const [prefers, setPrefers] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefers(mql.matches);
    const fn = () => setPrefers(mql.matches);
    mql.addEventListener('change', fn);
    return () => mql.removeEventListener('change', fn);
  }, []);
  return prefers;
}

export function useCountUp(end: number, durationMs: number = DURATION_MS): number {
  const [value, setValue] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) {
      setValue(end);
      return;
    }
    let start: number;
    let raf: number;
    const step = (now: number) => {
      if (start == null) start = now;
      const elapsed = now - start;
      const t = Math.min(elapsed / durationMs, 1);
      setValue(Math.round(EASING(t) * end));
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [end, durationMs, reduced]);

  return reduced ? end : value;
}
