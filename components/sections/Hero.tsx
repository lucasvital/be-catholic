'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger, SplitText);

// The 3 phases of the hero narrative, timed to scroll progress
const phases = [
  { text: '"Destruam este templo."', threshold: 0, exitAt: 0.32 },
  { text: '"Em três dias o reconstruirei."', threshold: 0.33, exitAt: 0.65 },
  { text: '— João 2, 19', threshold: 0.66, exitAt: 1.0, sub: '2000 anos depois, ainda de pé.' },
];

export default function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Phase refs
  const phase1Ref = useRef<HTMLDivElement>(null);
  const phase2Ref = useRef<HTMLDivElement>(null);
  const phase3Ref = useRef<HTMLDivElement>(null);
  const phaseRefs = [phase1Ref, phase2Ref, phase3Ref];

  // Navbar wordmark ref
  const wordmarkRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const video = videoRef.current;
    const wrapper = wrapperRef.current;
    if (!video || !wrapper) return;

    // Ensure video is paused — we control time manually
    video.pause();

    // Entrance: wordmark fades in
    if (wordmarkRef.current) {
      gsap.from(wordmarkRef.current, {
        opacity: 0,
        y: -20,
        duration: 1.2,
        ease: 'power3.out',
        delay: 0.4,
      });
    }

    // Entrance: first phase text
    if (phase1Ref.current) {
      const split = new SplitText(phase1Ref.current.querySelector('.phase-text')!, { type: 'words' });
      gsap.from(split.words, {
        opacity: 0,
        y: 30,
        stagger: 0.08,
        duration: 0.9,
        ease: 'power3.out',
        delay: 0.8,
        onComplete: () => split.revert(),
      });
    }

    // Throttle state — avoid redundant seeks
    let lastSetTime = -1;
    const minDelta = 1 / 24; // ~24fps source
    let videoReady = false;
    const onReady = () => { videoReady = true; };
    video.addEventListener('loadedmetadata', onReady);
    video.addEventListener('canplay', onReady);
    if (video.readyState >= 1) videoReady = true;

    // Scroll scrub — pin the sticky div and drive video currentTime
    ScrollTrigger.create({
      trigger: wrapper,
      pin: stickyRef.current,
      pinSpacing: true,
      start: 'top top',
      end: '+=350%',
      scrub: 1.2,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        if (videoReady && video.duration) {
          const target = self.progress * video.duration;
          if (Math.abs(target - lastSetTime) >= minDelta) {
            video.currentTime = target;
            lastSetTime = target;
          }
        }

        // Overlay darkens toward the end for transition
        if (overlayRef.current) {
          const endOpacity = self.progress > 0.85 ? 0.5 + (self.progress - 0.85) * 2 : 0.45;
          overlayRef.current.style.opacity = String(Math.min(endOpacity, 0.9));
        }

        // Show / hide phase copy based on progress
        phaseRefs.forEach((ref, i) => {
          if (!ref.current) return;
          const phase = phases[i];
          const visible = self.progress >= phase.threshold && self.progress < phase.exitAt;
          gsap.to(ref.current, {
            opacity: visible ? 1 : 0,
            y: visible ? 0 : (self.progress < phase.threshold ? 30 : -30),
            duration: 0.35,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        });
      },
    });
  }, []);

  // Preload video
  useEffect(() => {
    const video = videoRef.current;
    if (video) { video.preload = 'auto'; video.load(); }
  }, []);

  return (
    <div ref={wrapperRef} style={{ height: '450vh' }}>
      <div
        ref={stickyRef}
        className="relative w-full overflow-hidden"
        style={{ height: '100vh' }}
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
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>

        {/* Grain texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
            backgroundSize: '256px 256px',
            mixBlendMode: 'overlay',
            opacity: 0.6,
          }}
        />

        {/* Gradient overlay */}
        <div
          ref={overlayRef}
          className="absolute inset-0 transition-none"
          style={{
            opacity: 0.45,
            background: 'linear-gradient(to bottom, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.5) 50%, rgba(10,10,10,0.9) 100%)',
          }}
        />

        {/* Top vignette for wordmark legibility */}
        <div
          className="absolute top-0 left-0 right-0 pointer-events-none"
          style={{
            height: '240px',
            background: 'linear-gradient(to bottom, rgba(6,6,6,0.85) 0%, rgba(6,6,6,0.3) 60%, transparent 100%)',
            zIndex: 5,
          }}
        />

        {/* Wordmark — emblematic, with flanking hairlines + cross + latin date */}
        <div
          ref={wordmarkRef}
          className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center z-10"
          style={{ top: '2.5rem' }}
        >
          <span
            style={{
              color: '#C9A84C',
              fontSize: '1.35rem',
              marginBottom: '0.55rem',
              textShadow: '0 0 22px rgba(201,168,76,0.5)',
              lineHeight: 1,
            }}
          >
            ✝
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1.15rem' }}>
            <div style={{ width: '44px', height: '1px', background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.6))' }} />
            <span
              className="font-cinzel-deco"
              style={{
                fontSize: '1.05rem',
                color: '#E8D08A',
                letterSpacing: '0.48em',
                fontWeight: 700,
                textShadow: '0 2px 30px rgba(0,0,0,0.9), 0 0 18px rgba(201,168,76,0.2)',
                paddingLeft: '0.48em',
              }}
            >
              BE CATHOLIC
            </span>
            <div style={{ width: '44px', height: '1px', background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.6))' }} />
          </div>

          <span
            className="font-cinzel uppercase"
            style={{
              fontSize: '0.48rem',
              color: 'rgba(201,168,76,0.55)',
              letterSpacing: '0.6em',
              marginTop: '0.75rem',
              paddingLeft: '0.6em',
              textShadow: '0 2px 12px rgba(0,0,0,0.8)',
            }}
          >
            A · D · MMXXVI
          </span>
        </div>

        {/* Phase 1 */}
        <div
          ref={phase1Ref}
          className="absolute inset-0 flex items-center justify-center text-center px-8 z-10"
          style={{ opacity: 1 }}
        >
          <div>
            <p
              className="phase-text font-cinzel-deco font-bold leading-tight"
              style={{
                fontSize: 'clamp(1.6rem, 4.5vw, 4rem)',
                color: '#F5F0E8',
                textShadow: '0 2px 60px rgba(0,0,0,0.6)',
                maxWidth: '700px',
              }}
            >
              &ldquo;Destruam este templo.&rdquo;
            </p>
          </div>
        </div>

        {/* Phase 2 */}
        <div
          ref={phase2Ref}
          className="absolute inset-0 flex items-center justify-center text-center px-8 z-10"
          style={{ opacity: 0 }}
        >
          <div>
            <p
              className="font-cinzel-deco font-bold leading-tight"
              style={{
                fontSize: 'clamp(1.6rem, 4.5vw, 4rem)',
                color: '#F5F0E8',
                textShadow: '0 2px 60px rgba(0,0,0,0.6)',
                maxWidth: '700px',
              }}
            >
              &ldquo;Em três dias o reconstruirei.&rdquo;
            </p>
          </div>
        </div>

        {/* Phase 3 */}
        <div
          ref={phase3Ref}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-8 z-10 gap-5"
          style={{ opacity: 0 }}
        >
          <p
            className="font-cinzel uppercase tracking-widest"
            style={{
              fontSize: 'clamp(0.7rem, 1.5vw, 1rem)',
              color: '#C9A84C',
              letterSpacing: '0.45em',
            }}
          >
            — João 2, 19
          </p>
          <div style={{ width: '48px', height: '1px', background: 'rgba(201,168,76,0.5)' }} />
          <p
            className="font-cinzel font-bold"
            style={{
              fontSize: 'clamp(1.8rem, 5vw, 4.5rem)',
              color: '#F5F0E8',
              textShadow: '0 0 80px rgba(201,168,76,0.15)',
              letterSpacing: '0.02em',
            }}
          >
            2000 anos depois,
            <br />
            <span style={{ color: '#C9A84C' }}>ainda de pé.</span>
          </p>
        </div>

        {/* Scroll indicator — phase 1 only */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pulse-cross z-10"
        >
          <span style={{ color: '#C9A84C', fontSize: '1.3rem' }}>✝</span>
          <div style={{ width: '1px', height: '28px', background: 'linear-gradient(to bottom, #C9A84C80, transparent)' }} />
          <p
            className="font-cinzel uppercase tracking-widest"
            style={{ fontSize: '0.5rem', color: '#C9A84C60', letterSpacing: '0.4em' }}
          >
            scroll
          </p>
        </div>

        {/* Vignette edges */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 120px rgba(10,10,10,0.7)',
          }}
        />
      </div>
    </div>
  );
}
