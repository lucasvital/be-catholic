'use client';

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SacredCorner from '@/components/SacredCorner';

gsap.registerPlugin(ScrollTrigger);

const prayerLines = [
  'São Miguel Arcanjo,',
  'defendei-nos no combate,',
  'sede o nosso refúgio',
  'contra a perversidade e as ciladas do demônio.',
  '',
  'Que Deus sobre ele impere,',
  'humildemente o pedimos.',
  '',
  'E vós, Príncipe da Milícia Celestial,',
  'pelo poder divino, precipitai no inferno',
  'Satanás e os outros espíritos malignos',
  'que andam pelo mundo para perder as almas.',
  '',
  'Ámen.',
];

const prayerText = prayerLines.join('\n');
const visibleIndices = prayerLines
  .map((line, i) => (line ? i : -1))
  .filter((i) => i !== -1);

export default function Prayer() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoWrapRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (v) { v.preload = 'auto'; v.load(); }
  }, []);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 768px)', () => {
      const video = videoRef.current;
      const wrapper = wrapperRef.current;
      if (!video || !wrapper) return;

      video.pause();

      let lastSetTime = -1;
      const minDelta = 1 / 24;
      let videoReady = false;
      const onReady = () => { videoReady = true; };
      video.addEventListener('loadedmetadata', onReady);
      video.addEventListener('canplay', onReady);
      if (video.readyState >= 1) videoReady = true;

      ScrollTrigger.create({
        trigger: wrapper,
        pin: stickyRef.current,
        pinSpacing: true,
        start: 'top top',
        end: '+=350%',
        scrub: 1.2,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;

          // Effect 1 — video scrubs with scroll (throttled)
          if (videoReady && video.duration) {
            const target = p * video.duration;
            if (Math.abs(target - lastSetTime) >= minDelta) {
              video.currentTime = target;
              lastSetTime = target;
            }
          }

          // Subtle parallax on video container
          if (videoWrapRef.current) {
            videoWrapRef.current.style.transform = `scale(${1.08 - p * 0.08}) translateY(${(p - 0.5) * 30}px)`;
          }

          // Effect 2 — prayer lines reveal progressively
          if (progressFillRef.current) {
            progressFillRef.current.style.transform = `scaleY(${p})`;
          }

          const startP = 0.08;
          const endP = 0.92;
          const range = endP - startP;
          const step = range / visibleIndices.length;

          visibleIndices.forEach((idx, i) => {
            const el = lineRefs.current[idx];
            if (!el) return;
            const lineStart = startP + i * step;
            const lineEnd = lineStart + step * 1.2;
            const t = gsap.utils.clamp(0, 1, (p - lineStart) / (lineEnd - lineStart));
            el.style.opacity = String(0.08 + t * 0.92);
            el.style.transform = `translateY(${(1 - t) * 14}px)`;
          });
        },
      });

      // Intro fade for eyebrow + title + copy button
      gsap.from('.prayer-intro', {
        opacity: 0, y: 20, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: wrapper, start: 'top 65%' },
      });
    });

    mm.add('(max-width: 767px)', () => {
      // Mobile fallback: no pinning, autoplay loop, reveal-on-enter per line
      const video = videoRef.current;
      if (video) {
        video.loop = true;
        video.muted = true;
        const tryPlay = () => video.play().catch(() => {});
        tryPlay();
      }

      lineRefs.current.forEach((el) => {
        if (el) { el.style.opacity = '1'; el.style.transform = 'none'; }
      });

      gsap.from('.prayer-intro', {
        opacity: 0, y: 20, stagger: 0.1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: wrapperRef.current, start: 'top 70%' },
      });
    });
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prayerText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div ref={wrapperRef} style={{ borderTop: '1px solid rgba(201,168,76,0.07)' }}>
      <div
        ref={stickyRef}
        className="relative overflow-hidden"
        style={{ height: '100vh', background: '#080808' }}
      >
        {/* Video — full bleed background */}
        <div
          ref={videoWrapRef}
          className="absolute inset-0 will-change-transform"
          style={{ transform: 'scale(1.08)' }}
        >
          <video
            ref={videoRef}
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            disableRemotePlayback
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          >
            <source src="/prayer-video.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Darkening gradient — transparent left, dark right */}
        <div
          className="absolute inset-0 pointer-events-none hidden md:block"
          style={{
            background:
              'linear-gradient(to right, rgba(8,8,8,0.35) 0%, rgba(8,8,8,0.25) 30%, rgba(8,8,8,0.75) 55%, rgba(8,8,8,0.95) 80%)',
          }}
        />
        {/* Mobile: full darken */}
        <div
          className="absolute inset-0 pointer-events-none md:hidden"
          style={{ background: 'linear-gradient(to bottom, rgba(8,8,8,0.4) 0%, rgba(8,8,8,0.9) 100%)' }}
        />

        {/* Grain */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay',
          }}
        />

        {/* Sacred corners */}
        <SacredCorner pos="tl" size={68} opacity={0.4} offset="1.75rem" />
        <SacredCorner pos="tr" size={68} opacity={0.4} offset="1.75rem" />
        <SacredCorner pos="bl" size={68} opacity={0.4} offset="1.75rem" />
        <SacredCorner pos="br" size={68} opacity={0.4} offset="1.75rem" />

        {/* Content grid */}
        <div
          className="relative z-10 h-full grid"
          style={{
            gridTemplateColumns: '1fr',
          }}
        >
          <div
            className="relative h-full flex items-center justify-end"
          >
            <div
              style={{
                width: '100%',
                maxWidth: '520px',
                padding: 'clamp(3rem, 6vh, 5rem) clamp(2rem, 5vw, 4rem)',
                marginLeft: 'auto',
                marginRight: 'clamp(1rem, 6vw, 6rem)',
                position: 'relative',
              }}
            >
              {/* Vertical progress rail */}
              <div
                className="absolute"
                style={{
                  left: 'clamp(1rem, 2vw, 1.5rem)',
                  top: 'clamp(3rem, 6vh, 5rem)',
                  bottom: 'clamp(3rem, 6vh, 5rem)',
                  width: '1px',
                  background: 'rgba(201,168,76,0.08)',
                }}
              >
                <div
                  ref={progressFillRef}
                  style={{
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom, #C9A84C, rgba(201,168,76,0.4))',
                    transformOrigin: 'top center',
                    transform: 'scaleY(0)',
                    boxShadow: '0 0 8px rgba(201,168,76,0.3)',
                  }}
                />
              </div>

              <div style={{ paddingLeft: 'clamp(1.75rem, 3vw, 2.5rem)' }}>
                {/* Eyebrow */}
                <p
                  className="prayer-intro font-cinzel uppercase"
                  style={{
                    fontSize: '0.6rem',
                    color: '#C9A84C',
                    letterSpacing: '0.55em',
                    marginBottom: '1.25rem',
                  }}
                >
                  Reze com a gente
                </p>

                {/* Title */}
                <h2
                  className="prayer-intro font-cinzel-deco font-bold"
                  style={{
                    fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)',
                    color: '#F5F0E8',
                    lineHeight: 1.1,
                    marginBottom: '2rem',
                  }}
                >
                  Oração a<br />
                  <span style={{ color: '#C9A84C' }}>São Miguel</span>
                </h2>

                {/* Divider — Chi-Rho ornament */}
                <div
                  className="prayer-intro"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '2rem' }}
                >
                  <div style={{ width: '20px', height: '1px', background: 'rgba(201,168,76,0.4)' }} />
                  <span style={{ color: '#C9A84C', fontSize: '0.85rem', lineHeight: 1, opacity: 0.75 }}>☧</span>
                  <div style={{ width: '36px', height: '1px', background: 'rgba(201,168,76,0.4)' }} />
                </div>

                {/* Prayer lines */}
                <div>
                  {prayerLines.map((line, i) =>
                    line === '' ? (
                      <div key={i} style={{ height: '0.7rem' }} />
                    ) : (
                      <p
                        key={i}
                        ref={(el) => { lineRefs.current[i] = el; }}
                        className="font-cinzel italic"
                        style={{
                          fontSize: 'clamp(0.82rem, 1vw, 0.95rem)',
                          color: line === 'Ámen.' ? '#C9A84C' : '#F5F0E8',
                          lineHeight: 1.8,
                          fontWeight: line === 'Ámen.' ? 700 : 400,
                          opacity: 0.08,
                          transform: 'translateY(14px)',
                          willChange: 'opacity, transform',
                        }}
                      >
                        {line}
                      </p>
                    )
                  )}
                </div>

                {/* Copy button */}
                <div className="prayer-intro" style={{ marginTop: '2.25rem' }}>
                  <button
                    onClick={handleCopy}
                    className="font-cinzel uppercase transition-all duration-300"
                    style={{
                      fontSize: '0.62rem',
                      letterSpacing: '0.4em',
                      color: copied ? '#0A0A0A' : '#C9A84C',
                      background: copied ? '#C9A84C' : 'transparent',
                      border: '1px solid rgba(201,168,76,0.5)',
                      padding: '0.75rem 1.75rem',
                      cursor: 'none',
                    }}
                  >
                    {copied ? '✓ Copiada' : 'Copiar oração'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
