'use client';

import { useEffect, useState } from 'react';

const sections = [
  { id: 'sec-principium', roman: 'I',    latin: 'Principium' },
  { id: 'sec-manifestum', roman: 'II',   latin: 'Manifestum' },
  { id: 'sec-imagines',   roman: 'III',  latin: 'Imagines' },
  { id: 'sec-columnae',   roman: 'IV',   latin: 'Columnae' },
  { id: 'sec-verbum',     roman: 'V',    latin: 'Verbum' },
  { id: 'sec-historia',   roman: 'VI',   latin: 'Historia' },
  { id: 'sec-oratio',     roman: 'VII',  latin: 'Oratio' },
  { id: 'sec-vocatio',    roman: 'VIII', latin: 'Vocatio' },
];

export default function SectionIndicator() {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const heroEnd = window.innerHeight * 3.5;
      setVisible(window.scrollY > heroEnd);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = sections.findIndex((s) => s.id === entry.target.id);
            if (idx !== -1) setActive(idx);
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav
      aria-label="Índice"
      className="fixed z-40 hidden lg:flex flex-col"
      style={{
        right: '1.75rem',
        top: '50%',
        transform: 'translateY(-50%)',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.6s ease',
        gap: '0.35rem',
      }}
    >
      {sections.map((s, i) => {
        const isActive = i === active;
        return (
          <button
            key={s.id}
            onClick={() => handleClick(s.id)}
            aria-label={`${s.roman} · ${s.latin}`}
            style={{
              cursor: 'none',
              background: 'transparent',
              border: 'none',
              padding: '0.3rem 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: '0.85rem',
            }}
          >
            <span
              className="font-cinzel uppercase"
              style={{
                fontSize: '0.5rem',
                letterSpacing: '0.4em',
                color: '#C9A84C',
                opacity: isActive ? 1 : 0,
                transform: isActive ? 'translateX(0)' : 'translateX(8px)',
                transition: 'opacity 0.45s ease, transform 0.45s ease',
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
              }}
            >
              {s.latin}
            </span>

            <span
              className="font-cinzel-deco"
              style={{
                fontSize: '0.68rem',
                letterSpacing: '0.12em',
                color: isActive ? '#C9A84C' : 'rgba(201,168,76,0.32)',
                transition: 'color 0.4s ease',
                minWidth: '2.4ch',
                textAlign: 'right',
                pointerEvents: 'none',
              }}
            >
              {s.roman}
            </span>

            <span
              style={{
                width: isActive ? '22px' : '8px',
                height: '1px',
                background: isActive ? '#C9A84C' : 'rgba(201,168,76,0.25)',
                transition: 'width 0.45s ease, background 0.4s ease',
                flexShrink: 0,
                pointerEvents: 'none',
              }}
            />
          </button>
        );
      })}
    </nav>
  );
}
