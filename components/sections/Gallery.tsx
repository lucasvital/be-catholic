'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const kvs = [
  { file: 'KV01_cavaleiro_ajoelhado.jpg', theme: 'Devoção', headline: 'Ajoelhe para o único que merece.' },
  { file: 'KV02_ressureicao.jpg', theme: 'Ressurreição', headline: 'A maior virada da história foi no terceiro dia.' },
  { file: 'KV03_nossa_senhora_guadalupe.jpg', theme: 'Nossa Senhora', headline: 'Ela nunca parou de rezar por você.' },
  { file: 'KV04_brasao_vaticano.jpg', theme: 'A Igreja', headline: '2000 anos. Uma só fé.' },
  { file: 'KV05_guardiao_jerusalem.jpg', theme: 'Missão', headline: 'Toda geração tem sua cruzada. E a sua?' },
  { file: 'KV06_eucaristia_ostensorio.jpg', theme: 'Eucaristia', headline: 'O céu desceu à terra. Todo. Santo. Dia.' },
  { file: 'KV07_cruzado_trono.jpg', theme: 'Identidade', headline: 'Você foi batizado para reinar, não para assistir.' },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    const totalScroll = track.scrollWidth - window.innerWidth;

    gsap.to(track, {
      x: -totalScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${totalScroll * 1.1}`,
        invalidateOnRefresh: true,
      },
    });

    // Card entrance
    gsap.from('.kv-card', {
      opacity: 0,
      scale: 0.92,
      stagger: 0.08,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
      },
    });
  }, []);


  return (
    <div ref={sectionRef} className="gallery-section relative overflow-hidden" style={{ background: '#0A0A0A', borderTop: '1px solid rgba(201,168,76,0.07)' }}>

      {/* Eyebrow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 text-center z-10 pointer-events-none"
        style={{ whiteSpace: 'nowrap', top: '2rem' }}
      >
        <p
          className="font-cinzel uppercase tracking-widest"
          style={{ fontSize: '0.65rem', color: '#C9A84C', letterSpacing: '0.5em' }}
        >
          As imagens da nossa fé
        </p>
      </div>

      {/* Horizontal track */}
      <div className="flex items-center" style={{ height: '100vh', paddingLeft: '8vw' }}>
        <div ref={trackRef} className="flex gap-6 will-change-transform" style={{ paddingRight: '8vw' }}>
          {kvs.map((kv, i) => (
            <div
              key={i}
              className="kv-card group relative flex-shrink-0 overflow-hidden rounded"
              style={{ width: '280px', height: '500px', border: '1px solid rgba(201,168,76,0.12)' }}
            >
              <Image
                src={`/KVs/${kv.file}`}
                alt={kv.theme}
                fill
                className="object-cover"
                sizes="280px"
              />

              {/* Hover overlay */}
              <div
                className="absolute inset-0 flex flex-col justify-end p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.96) 0%, rgba(10,10,10,0.7) 60%, transparent 100%)' }}
              >
                <p
                  className="font-cinzel uppercase tracking-widest mb-2"
                  style={{ fontSize: '0.6rem', color: '#C9A84C', letterSpacing: '0.4em' }}
                >
                  {kv.theme}
                </p>
                <p
                  className="font-cinzel font-bold leading-snug"
                  style={{ fontSize: '1rem', color: '#F5F0E8' }}
                >
                  {kv.headline}
                </p>
              </div>

              {/* Bottom label (always visible) */}
              <div
                className="absolute bottom-0 left-0 right-0 p-3 group-hover:opacity-0 transition-opacity duration-300"
                style={{ background: 'linear-gradient(to top, rgba(10,10,10,0.8), transparent)' }}
              >
                <p
                  className="font-cinzel uppercase tracking-wider text-center"
                  style={{ fontSize: '0.6rem', color: '#A8A8B0', letterSpacing: '0.3em' }}
                >
                  {kv.theme}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
