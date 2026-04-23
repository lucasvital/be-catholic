'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import SacredCorner from '@/components/SacredCorner';

gsap.registerPlugin(ScrollTrigger);

export default function Verse() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const refTextRef = useRef<HTMLParagraphElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) { video.preload = 'auto'; video.load(); }
  }, []);

  useGSAP(() => {
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

    // Scrub video with scroll — pin the section for the duration
    ScrollTrigger.create({
      trigger: wrapper,
      pin: sectionRef.current,
      pinSpacing: true,
      start: 'top top',
      end: '+=200%',
      scrub: 1.2,
      invalidateOnRefresh: true,
      onUpdate: (self) => {
        if (!videoReady || !video.duration) return;
        const target = self.progress * video.duration;
        if (Math.abs(target - lastSetTime) >= minDelta) {
          video.currentTime = target;
          lastSetTime = target;
        }
      },
    });

    // Content animations fire when the section enters
    const trigger = { trigger: sectionRef.current, start: 'top 65%' };

    gsap.from(eyebrowRef.current, {
      opacity: 0, y: 16, duration: 0.7, ease: 'power2.out', scrollTrigger: trigger,
    });

    gsap.from([line1Ref.current, line2Ref.current], {
      scaleX: 0, transformOrigin: 'left center', duration: 1.4, ease: 'power3.inOut',
      stagger: 0.15, scrollTrigger: trigger,
    });

    gsap.from(quoteRef.current, {
      clipPath: 'inset(0 100% 0 0)', duration: 1.5, ease: 'power3.inOut', delay: 0.1,
      scrollTrigger: trigger,
    });

    gsap.from(refTextRef.current, {
      opacity: 0, y: 16, duration: 0.8, ease: 'power2.out', delay: 1,
      scrollTrigger: trigger,
    });
  }, []);

  return (
    <div ref={wrapperRef} style={{ borderTop: '1px solid rgba(201,168,76,0.07)' }}>
      <section
        ref={sectionRef}
        className="relative flex items-center justify-center"
        style={{ height: '100vh', overflow: 'hidden' }}
      >
        {/* Video background */}
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
          <source src="/verse-video.mp4" type="video/mp4" />
        </video>

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(10,10,10,0.5) 0%, rgba(10,10,10,0.65) 50%, rgba(10,10,10,0.85) 100%)' }}
        />

        {/* Sacred corners */}
        <SacredCorner pos="tl" size={72} opacity={0.45} offset="2rem" />
        <SacredCorner pos="tr" size={72} opacity={0.45} offset="2rem" />
        <SacredCorner pos="bl" size={72} opacity={0.45} offset="2rem" />
        <SacredCorner pos="br" size={72} opacity={0.45} offset="2rem" />

        {/* Content */}
        <div className="relative z-10 w-full" style={{ maxWidth: '860px', margin: '0 auto', padding: '8rem 2rem' }}>

          <p
            ref={eyebrowRef}
            className="font-cinzel uppercase"
            style={{ fontSize: '0.6rem', color: '#C9A84C', letterSpacing: '0.55em', textAlign: 'center', marginBottom: '3rem' }}
          >
            Palavra de Deus
          </p>

          <div ref={line1Ref} style={{ height: '1px', background: 'rgba(201,168,76,0.45)', marginBottom: '3rem' }} />

          <div ref={quoteRef} style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p
              className="font-cinzel-deco font-bold"
              style={{
                fontSize: 'clamp(1.6rem, 4.5vw, 3.8rem)',
                color: '#F5F0E8',
                lineHeight: 1.25,
                textShadow: '0 4px 60px rgba(201,168,76,0.12)',
              }}
            >
              <span
                style={{
                  fontSize: '1.6em',
                  color: '#C9A84C',
                  lineHeight: 0.9,
                  display: 'inline-block',
                  verticalAlign: 'text-top',
                  textShadow: '0 0 40px rgba(201,168,76,0.5), 0 4px 30px rgba(0,0,0,0.6)',
                  marginRight: '0.04em',
                }}
              >
                &ldquo;A
              </span>s portas do inferno<br />não prevalecerão.&rdquo;
            </p>
          </div>

          <div ref={line2Ref} style={{ height: '1px', background: 'rgba(201,168,76,0.45)', marginBottom: '2.5rem' }} />

          <p
            ref={refTextRef}
            className="font-cinzel uppercase"
            style={{ fontSize: '0.65rem', color: '#C9A84C', letterSpacing: '0.55em', textAlign: 'center' }}
          >
            Mateus 16, 18
          </p>
        </div>
      </section>
    </div>
  );
}
