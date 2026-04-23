'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    ScrollTrigger.create({
      start: 0,
      end: 99999,
      onUpdate: (self) => {
        const nav = navRef.current;
        if (!nav) return;
        const scrollY = self.scroll();
        const heroEnd = window.innerHeight * 4.3;

        if (scrollY < heroEnd) {
          nav.style.opacity = '0';
          nav.style.pointerEvents = 'none';
          nav.style.transform = 'translateY(-12px)';
        } else {
          nav.style.opacity = '1';
          nav.style.pointerEvents = 'auto';
          nav.style.transform = 'translateY(0)';
        }
      },
    });
  }, []);

  const goTop = () => {
    document.getElementById('sec-principium')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        opacity: 0,
        transform: 'translateY(-12px)',
        background: 'rgba(8,8,8,0.85)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '1px solid rgba(201,168,76,0.12)',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
    >
      {/* Top hairline gradient */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.5), transparent)',
        }}
      />

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0.85rem clamp(1.25rem, 4vw, 3rem)',
          width: '100%',
          position: 'relative',
          minHeight: '48px',
        }}
      >
        {/* Left — wordmark (cross + divider + name) */}
        <button
          onClick={goTop}
          aria-label="Ir para o topo"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: 'transparent',
            border: 'none',
            cursor: 'none',
            padding: 0,
          }}
        >
          <span
            style={{
              color: '#C9A84C',
              fontSize: '0.95rem',
              lineHeight: 1,
              textShadow: '0 0 12px rgba(201,168,76,0.4)',
            }}
          >
            ✝
          </span>
          <div
            style={{
              width: '1px',
              height: '14px',
              background: 'rgba(201,168,76,0.3)',
            }}
          />
          <span
            className="font-cinzel-deco"
            style={{
              color: '#E8D08A',
              letterSpacing: '0.32em',
              fontSize: '0.72rem',
              fontWeight: 700,
              paddingLeft: '0.32em',
              lineHeight: 1,
            }}
          >
            BE CATHOLIC
          </span>
        </button>

        {/* Center — latin motto, absolute centered to viewport */}
        <div
          className="hidden lg:flex items-center"
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            gap: '0.7rem',
            pointerEvents: 'none',
          }}
        >
          <div style={{ width: '22px', height: '1px', background: 'rgba(201,168,76,0.25)' }} />
          <span
            className="font-cinzel uppercase"
            style={{
              color: 'rgba(201,168,76,0.5)',
              letterSpacing: '0.55em',
              fontSize: '0.5rem',
              paddingLeft: '0.55em',
              lineHeight: 1,
              whiteSpace: 'nowrap',
            }}
          >
            Ad Majorem Dei Gloriam
          </span>
          <div style={{ width: '22px', height: '1px', background: 'rgba(201,168,76,0.25)' }} />
        </div>

        {/* Right — latin year stamp */}
        <div
          className="hidden md:flex items-center"
          style={{
            marginLeft: 'auto',
            gap: '0.6rem',
            pointerEvents: 'none',
          }}
        >
          <span
            className="font-cinzel uppercase"
            style={{
              color: 'rgba(201,168,76,0.4)',
              letterSpacing: '0.5em',
              fontSize: '0.48rem',
              paddingLeft: '0.5em',
              lineHeight: 1,
            }}
          >
            Anno Domini
          </span>
          <div style={{ width: '1px', height: '12px', background: 'rgba(201,168,76,0.25)' }} />
          <span
            className="font-cinzel-deco"
            style={{
              color: '#C9A84C',
              letterSpacing: '0.22em',
              fontSize: '0.68rem',
              fontWeight: 700,
              lineHeight: 1,
              paddingLeft: '0.22em',
            }}
          >
            MMXXVI
          </span>
        </div>
      </div>
    </nav>
  );
}
