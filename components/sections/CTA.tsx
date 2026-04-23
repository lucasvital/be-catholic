'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';
import SacredCorner from '@/components/SacredCorner';

gsap.registerPlugin(ScrollTrigger, SplitText);

const socials = [
  {
    label: 'Instagram',
    path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z',
  },
  {
    label: 'TikTok',
    path: 'M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.27 8.27 0 004.84 1.55V6.79a4.85 4.85 0 01-1.07-.1z',
  },
];

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 70%',
      once: true,
      onEnter: () => {
        if (glowRef.current) {
          gsap.fromTo(glowRef.current,
            { opacity: 0, scale: 0.4 },
            { opacity: 1, scale: 1, duration: 2.5, ease: 'power3.out' }
          );
        }

        if (titleRef.current) {
          const split = new SplitText(titleRef.current, { type: 'chars' });
          gsap.from(split.chars, {
            opacity: 0, y: -50, rotation: -5, stagger: 0.03,
            duration: 0.7, ease: 'back.out(1.4)', delay: 0.15,
            onComplete: () => split.revert(),
          });
        }

        gsap.from(['.cta-eyebrow', '.cta-ornament', '.cta-divider', '.cta-subline', '.cta-form', '.cta-sep', '.cta-footer'], {
          opacity: 0, y: 20, stagger: 0.1, duration: 0.65, ease: 'power3.out', delay: 0.65,
        });
      },
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        minHeight: '100vh',
        background: '#080808',
        borderTop: '1px solid rgba(201,168,76,0.07)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Ambient radial glow — contained circle, not inset-0 */}
      <div
        ref={glowRef}
        className="absolute pointer-events-none"
        style={{
          width: '80vmin',
          height: '80vmin',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(ellipse, rgba(201,168,76,0.13) 0%, rgba(201,168,76,0.04) 40%, transparent 70%)',
          borderRadius: '50%',
        }}
      />

      {/* Sacred corner frames */}
      <SacredCorner pos="tl" size={82} opacity={0.5} offset="1.75rem" />
      <SacredCorner pos="tr" size={82} opacity={0.5} offset="1.75rem" />
      <SacredCorner pos="bl" size={82} opacity={0.5} offset="1.75rem" />
      <SacredCorner pos="br" size={82} opacity={0.5} offset="1.75rem" />

      {/* Top gradient line */}
      <div style={{ position: 'absolute', top: 0, left: '12%', right: '12%', height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.4), transparent)' }} />

      {/* Main content */}
      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '8rem 2rem', textAlign: 'center', width: '100%', position: 'relative', zIndex: 10 }}>

        {/* Eyebrow */}
        <p
          className="cta-eyebrow font-cinzel uppercase"
          style={{ fontSize: '0.6rem', color: '#C9A84C', letterSpacing: '0.55em', marginBottom: '2rem' }}
        >
          O Chamado
        </p>

        {/* Ornament — Chi-Rho */}
        <div
          className="cta-ornament"
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}
        >
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.35))' }} />
          <span
            style={{
              color: '#C9A84C',
              fontSize: '1.4rem',
              opacity: 0.75,
              lineHeight: 1,
              textShadow: '0 0 28px rgba(201,168,76,0.4)',
            }}
          >
            ☧
          </span>
          <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.35))' }} />
        </div>

        {/* Title — one word per line, never breaks mid-word */}
        <h2
          ref={titleRef}
          className="font-cinzel-deco font-bold"
          style={{
            fontSize: 'clamp(3.5rem, 10vw, 8rem)',
            color: '#F5F0E8',
            lineHeight: 0.95,
            marginBottom: '2.5rem',
            whiteSpace: 'nowrap',
          }}
        >
          <span style={{ display: 'block' }}>Seja</span>
          <span style={{ display: 'block' }}>Católico.</span>
          <span style={{ display: 'block', color: '#C9A84C' }}>Agora.</span>
        </h2>

        {/* Divider */}
        <div
          className="cta-divider"
          style={{ width: '36px', height: '1px', background: '#C9A84C', margin: '0 auto 2rem', opacity: 0.45 }}
        />

        {/* Subline */}
        <p
          className="cta-subline font-cinzel"
          style={{ fontSize: '0.85rem', color: '#A8A8B0', letterSpacing: '0.05em', lineHeight: 1.85, marginBottom: '3rem' }}
        >
          Receba orações, conteúdo e inspiração<br />direto no seu e-mail.
        </p>

        {/* Form */}
        <div className="cta-form" style={{ marginBottom: '4rem' }}>
          {!submitted ? (
            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', maxWidth: '440px', margin: '0 auto' }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="font-cinzel"
                style={{
                  width: '100%',
                  padding: '0.95rem 1.25rem',
                  fontSize: '0.78rem',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(201,168,76,0.2)',
                  color: '#F5F0E8',
                  outline: 'none',
                  letterSpacing: '0.04em',
                  textAlign: 'center',
                }}
              />
              <button
                type="submit"
                className="btn-shimmer font-cinzel-deco font-bold"
                style={{
                  width: '100%',
                  padding: '0.95rem',
                  background: '#C9A84C',
                  color: '#080808',
                  fontSize: '0.72rem',
                  letterSpacing: '0.3em',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                Entrar na Milícia
              </button>
            </form>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ color: '#C9A84C', fontSize: '1.6rem' }}>✝</span>
              <p className="font-cinzel" style={{ fontSize: '0.9rem', color: '#C9A84C', letterSpacing: '0.15em' }}>
                Bem-vindo à milícia.
              </p>
            </div>
          )}
        </div>

        {/* Footer separator — Cross Pattée */}
        <div
          className="cta-sep"
          style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '2.5rem' }}
        >
          <div style={{ flex: 1, height: '1px', background: 'rgba(201,168,76,0.1)' }} />
          <span style={{ color: 'rgba(201,168,76,0.55)', fontSize: '0.85rem', lineHeight: 1 }}>✠</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(201,168,76,0.1)' }} />
        </div>

        {/* Footer */}
        <div className="cta-footer">
          <p
            className="font-cinzel-deco"
            style={{ fontSize: '1.05rem', color: '#C9A84C', letterSpacing: '0.3em', marginBottom: '0.5rem' }}
          >
            BE CATHOLIC
          </p>
          <p
            className="font-cinzel uppercase"
            style={{ fontSize: '0.52rem', color: 'rgba(201,168,76,0.35)', letterSpacing: '0.45em', marginBottom: '2rem' }}
          >
            Católico · Apostólico · Romano
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem' }}>
            {socials.map(({ label, path }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                style={{ color: 'rgba(201,168,76,0.35)', transition: 'color 0.3s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A84C')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(201,168,76,0.35)')}
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                  <path d={path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div style={{ position: 'absolute', bottom: 0, left: '12%', right: '12%', height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.2), transparent)' }} />
    </section>
  );
}
