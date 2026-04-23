'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const phrases = [
  { text: 'O mundo te oferece identidades que duram uma temporada.', gold: false, size: 'md' },
  { text: 'A Igreja existe há 2000 anos.', gold: false, size: 'lg' },
  { text: 'São Miguel venceu batalhas cósmicas.', gold: false, size: 'md' },
  { text: 'Nossa Senhora nunca abandonou seus filhos.', gold: false, size: 'md' },
  { text: 'Jesus venceu a morte.', gold: false, size: 'lg' },
  { text: 'Você foi feito para mais.', gold: true, size: 'xl' },
];

export default function Manifesto() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const phraseRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapperRef.current,
        pin: stickyRef.current,
        pinSpacing: true,
        start: 'top top',
        end: '+=400%',
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // Progress bar
          if (progressBarRef.current) {
            progressBarRef.current.style.transform = `scaleX(${self.progress})`;
          }
        },
      },
    });

    // Each phrase: reveal in, then dim
    phraseRefs.current.forEach((el, i) => {
      if (!el) return;
      const isLast = i === phrases.length - 1;
      const words = el.querySelectorAll('.m-word');
      const step = 1 / phrases.length;
      const start = i * step;
      const mid = start + step * 0.4;
      const end = isLast ? 1 : start + step * 0.85;

      tl.to(words, {
        opacity: 1,
        y: 0,
        color: phrases[i].gold ? '#C9A84C' : '#F5F0E8',
        stagger: 0.015,
        ease: 'none',
        duration: step * 0.4,
      }, start);

      if (!isLast) {
        tl.to(words, {
          opacity: 0.1,
          ease: 'none',
          duration: step * 0.2,
        }, end);
      }
    });
  }, []);

  const sizeMap: Record<string, string> = {
    sm: 'clamp(0.9rem, 1.8vw, 1.4rem)',
    md: 'clamp(1.1rem, 2.5vw, 2rem)',
    lg: 'clamp(1.4rem, 3.5vw, 2.8rem)',
    xl: 'clamp(1.8rem, 5vw, 4rem)',
  };

  return (
    <div ref={wrapperRef} style={{ background: '#080808', borderTop: '1px solid rgba(201,168,76,0.07)' }}>
      <div
        ref={stickyRef}
        className="relative flex items-center justify-center overflow-hidden"
        style={{ height: '100vh' }}
      >
        {/* Radial glow background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)',
          }}
        />

        {/* Grain */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E")`,
            backgroundSize: '200px',
            opacity: 0.8,
          }}
        />

        {/* Vertical gold line — left */}
        <div
          className="absolute left-10 top-1/2 -translate-y-1/2 hidden lg:block"
          style={{ width: '1px', height: '160px', background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.3), transparent)' }}
        />
        <div
          className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block"
          style={{ width: '1px', height: '160px', background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.3), transparent)' }}
        />

        {/* Progress bar top */}
        <div
          className="absolute top-0 left-0 right-0 z-20"
          style={{ height: '1px', background: 'rgba(201,168,76,0.08)' }}
        >
          <div
            ref={progressBarRef}
            style={{
              height: '100%',
              background: 'rgba(201,168,76,0.5)',
              transformOrigin: 'left center',
              transform: 'scaleX(0)',
            }}
          />
        </div>

        {/* Eyebrow */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2">
          <p
            className="font-cinzel uppercase tracking-widest"
            style={{ fontSize: '0.6rem', color: 'rgba(201,168,76,0.5)', letterSpacing: '0.55em' }}
          >
            O Manifesto
          </p>
        </div>

        {/* Phrases stack */}
        <div className="relative z-10 text-center px-8 max-w-4xl mx-auto w-full">
          <div className="flex flex-col gap-6">
            {phrases.map((phrase, i) => (
              <p
                key={i}
                ref={(el) => { phraseRefs.current[i] = el; }}
                className="font-cinzel font-bold leading-tight"
                style={{
                  fontSize: sizeMap[phrase.size],
                  color: phrase.gold ? '#C9A84C' : '#F5F0E8',
                }}
              >
                {phrase.text.split(' ').map((w, j) => (
                  <span
                    key={j}
                    className="m-word"
                    style={{ opacity: 0.08, display: 'inline-block', marginRight: '0.3em', transform: 'translateY(8px)' }}
                  >
                    {w}
                  </span>
                ))}
              </p>
            ))}
          </div>
        </div>

        {/* Bottom Chi-Rho */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <span
            style={{
              color: 'rgba(201,168,76,0.3)',
              fontSize: '1.15rem',
              lineHeight: 1,
              textShadow: '0 0 14px rgba(201,168,76,0.25)',
            }}
          >
            ☧
          </span>
        </div>
      </div>
    </div>
  );
}
