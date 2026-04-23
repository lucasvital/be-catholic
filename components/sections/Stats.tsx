'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { roman: 'I',   display: '1,4 Bilhão', countTo: null,  suffix: '',  label: 'de católicos no mundo' },
  { roman: 'II',  display: '2.000',      countTo: 2000,  suffix: '+', label: 'anos de história contínua' },
  { roman: 'III', display: '266',        countTo: 266,   suffix: '',  label: 'papas desde São Pedro' },
  { roman: 'IV',  display: '10.000',     countTo: 10000, suffix: '+', label: 'santos canonizados' },
];

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const lineRefs   = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    const st = { trigger: sectionRef.current, start: 'top 72%' };

    // Header fade
    gsap.from('.stats-header', {
      opacity: 0, y: 24, duration: 0.8, ease: 'power3.out', scrollTrigger: st,
    });

    // Rows cascade in
    gsap.from('.stat-row', {
      opacity: 0, y: 36, stagger: 0.13, duration: 0.9, ease: 'power3.out',
      scrollTrigger: st,
    });

    // Lines expand
    lineRefs.current.forEach((line, i) => {
      if (!line) return;
      gsap.from(line, {
        scaleX: 0, transformOrigin: 'left center',
        duration: 1.4, delay: i * 0.13 + 0.25, ease: 'expo.inOut',
        scrollTrigger: st,
      });
    });

    // Counters
    stats.forEach((stat, i) => {
      if (!stat.countTo) return;
      const el = numberRefs.current[i];
      if (!el) return;
      const obj = { val: 0 };
      gsap.to(obj, {
        val: stat.countTo,
        duration: 2.8, ease: 'power2.out',
        scrollTrigger: { ...st, once: true },
        onUpdate: () => {
          const v = Math.round(obj.val);
          el.textContent = v >= 1000
            ? v.toLocaleString('pt-BR').replace(',', '.') + stat.suffix
            : v + stat.suffix;
        },
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ background: '#0A0A0A', borderTop: '1px solid rgba(201,168,76,0.07)', padding: '7rem 2rem' }}
    >
      {/* Watermark cross */}
      <div
        aria-hidden
        className="absolute pointer-events-none select-none"
        style={{
          top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: 'clamp(18rem, 45vw, 38rem)',
          color: 'rgba(201,168,76,0.016)',
          lineHeight: 1,
          fontFamily: 'serif',
        }}
      >✝</div>

      {/* Flanking vertical lines */}
      <div className="absolute left-6 top-0 bottom-0 hidden xl:block" style={{ width: '1px', background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.1) 25%, rgba(201,168,76,0.1) 75%, transparent)' }} />
      <div className="absolute right-6 top-0 bottom-0 hidden xl:block" style={{ width: '1px', background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.1) 25%, rgba(201,168,76,0.1) 75%, transparent)' }} />

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div className="stats-header" style={{ marginBottom: '4.5rem' }}>
          <p className="font-cinzel uppercase" style={{ fontSize: '0.6rem', color: '#C9A84C', letterSpacing: '0.55em', marginBottom: '1.25rem', textAlign: 'center' }}>
            A maior instituição da história
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.25))' }} />
            <span style={{ color: 'rgba(201,168,76,0.6)', fontSize: '0.9rem', lineHeight: 1 }}>✠</span>
            <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.25))' }} />
          </div>
        </div>

        {/* Stat rows */}
        <div>
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stat-row"
              style={{
                display: 'grid',
                gridTemplateColumns: '2.5rem 1fr auto',
                alignItems: 'center',
                gap: '0 2rem',
                padding: '2.75rem 0',
                borderBottom: i < stats.length - 1 ? '1px solid rgba(201,168,76,0.06)' : 'none',
              }}
            >
              {/* Roman numeral */}
              <span
                className="font-cinzel"
                style={{ fontSize: '0.55rem', color: 'rgba(201,168,76,0.35)', letterSpacing: '0.25em', alignSelf: 'center' }}
              >
                {stat.roman}
              </span>

              {/* Number + expanding line */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', minWidth: 0 }}>
                <span
                  ref={(el) => { numberRefs.current[i] = el; }}
                  className="font-cinzel-deco font-bold"
                  style={{
                    fontSize: 'clamp(2.8rem, 5.5vw, 5rem)',
                    color: '#C9A84C',
                    lineHeight: 1,
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    textShadow: '0 0 80px rgba(201,168,76,0.15)',
                  }}
                >
                  {stat.display}
                </span>
                <div
                  ref={(el) => { lineRefs.current[i] = el; }}
                  style={{
                    flex: 1,
                    height: '1px',
                    background: `linear-gradient(to right, rgba(201,168,76,0.5), rgba(201,168,76,0.08))`,
                    minWidth: '40px',
                  }}
                />
              </div>

              {/* Label */}
              <p
                className="font-cinzel uppercase"
                style={{
                  fontSize: '0.6rem',
                  color: '#A8A8B0',
                  letterSpacing: '0.35em',
                  lineHeight: 1.6,
                  textAlign: 'right',
                  whiteSpace: 'nowrap',
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
