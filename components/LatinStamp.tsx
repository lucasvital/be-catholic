'use client';

import { useEffect, useState } from 'react';

export default function LatinStamp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 3.5);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="fixed z-40 pointer-events-none hidden md:flex items-center"
      style={{
        left: '1.55rem',
        bottom: '1.8rem',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.6s ease',
        gap: '0.6rem',
      }}
    >
      <span
        style={{
          color: 'rgba(201,168,76,0.55)',
          fontSize: '0.78rem',
          lineHeight: 1,
          textShadow: '0 0 10px rgba(201,168,76,0.3)',
        }}
      >
        ☧
      </span>
      <span
        className="font-cinzel uppercase"
        style={{
          fontSize: '0.5rem',
          color: 'rgba(201,168,76,0.5)',
          letterSpacing: '0.45em',
          whiteSpace: 'nowrap',
          paddingLeft: '0.45em',
        }}
      >
        Soli Deo Gloria
      </span>
    </div>
  );
}
