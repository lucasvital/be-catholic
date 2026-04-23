'use client';

import { useEffect, useRef } from 'react';

export default function ScrollThread() {
  const fillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const fill = fillRef.current;
      if (!fill) return;
      const scrollY = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(Math.max(scrollY / max, 0), 1) : 0;
      fill.style.transform = `scaleY(${progress})`;
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="fixed pointer-events-none z-40 hidden md:block"
      style={{
        left: '1.75rem',
        top: '2rem',
        bottom: '5.5rem',
        width: '1px',
        background: 'rgba(201,168,76,0.07)',
      }}
    >
      <div
        ref={fillRef}
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(to bottom, #C9A84C 0%, rgba(201,168,76,0.35) 100%)',
          transformOrigin: 'top center',
          transform: 'scaleY(0)',
          boxShadow: '0 0 10px rgba(201,168,76,0.35)',
        }}
      />
    </div>
  );
}
