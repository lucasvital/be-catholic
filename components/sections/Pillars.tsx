'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    image: 'KV01_cavaleiro_ajoelhado.jpg',
    icon: '⚔',
    headline: 'Quis ut Deus?',
    subline: 'Quem como Deus? O guerreiro que venceu o impossível.',
    label: 'São Miguel Arcanjo',
  },
  {
    image: 'KV02_ressureicao.jpg',
    icon: '✝',
    headline: 'Ele ressuscitou.',
    subline: 'A morte perdeu. Uma vez. Para sempre.',
    label: 'Jesus Cristo',
  },
  {
    image: 'KV03_nossa_senhora_guadalupe.jpg',
    icon: '✦',
    headline: 'Ela é sua mãe.',
    subline: 'Antes de você existir, ela já rezava por você.',
    label: 'Nossa Senhora',
  },
  {
    image: 'KV04_brasao_vaticano.jpg',
    icon: '🔑',
    headline: '2000 anos de pé.',
    subline: 'Impérios caíram. A Igreja permanece.',
    label: 'A Santa Igreja',
  },
];

function PillarCard({ pillar }: { pillar: typeof pillars[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(card, { rotationY: x * 10, rotationX: -y * 10, transformPerspective: 900, ease: 'power2.out', duration: 0.35 });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, { rotationY: 0, rotationX: 0, duration: 0.7, ease: 'elastic.out(1, 0.5)' });
  };

  return (
    <div
      ref={cardRef}
      className="pillar-card group relative overflow-hidden"
      style={{
        background: '#111111',
        border: '1px solid rgba(201,168,76,0.1)',
        transformStyle: 'preserve-3d',
        transition: 'box-shadow 0.4s',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: '260px' }}>
        <Image
          src={`/KVs/${pillar.image}`}
          alt={pillar.label}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 30%, #111111 100%)' }} />

        {/* Icon badge */}
        <div
          className="absolute top-5 left-5 flex items-center justify-center"
          style={{
            width: '36px', height: '36px',
            background: 'rgba(10,10,10,0.7)',
            border: '1px solid rgba(201,168,76,0.35)',
            fontSize: '0.95rem',
            backdropFilter: 'blur(8px)',
          }}
        >
          {pillar.icon}
        </div>
      </div>

      {/* Text */}
      <div style={{ padding: '1.75rem 2rem 2rem' }}>
        <p
          className="font-cinzel uppercase"
          style={{ fontSize: '0.58rem', color: '#C9A84C', letterSpacing: '0.45em', marginBottom: '0.6rem' }}
        >
          {pillar.label}
        </p>
        <h3
          className="font-cinzel-deco font-bold"
          style={{ fontSize: '1.4rem', color: '#F5F0E8', marginBottom: '0.75rem', lineHeight: 1.2 }}
        >
          {pillar.headline}
        </h3>
        <div style={{ width: '24px', height: '1px', background: 'rgba(201,168,76,0.35)', marginBottom: '0.75rem' }} />
        <p style={{ fontSize: '0.875rem', color: '#A8A8B0', lineHeight: 1.7 }}>
          {pillar.subline}
        </p>
      </div>

      {/* Hover glow border */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-400"
        style={{ boxShadow: 'inset 0 0 0 1px rgba(201,168,76,0.3)', background: 'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.04) 0%, transparent 60%)' }}
      />
    </div>
  );
}

export default function Pillars() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from('.pillar-card', {
      opacity: 0, y: 50, stagger: 0.12, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
    });
  }, []);

  return (
    <section ref={sectionRef} style={{ background: '#0A0A0A', borderTop: '1px solid rgba(201,168,76,0.07)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '7rem 2rem' }}>

        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <p className="font-cinzel uppercase" style={{ fontSize: '0.6rem', color: '#C9A84C', letterSpacing: '0.55em', marginBottom: '1.25rem' }}>
            Os Pilares
          </p>
          <h2 className="font-cinzel-deco font-bold" style={{ fontSize: 'clamp(1.9rem, 4vw, 3rem)', color: '#F5F0E8', lineHeight: 1.15 }}>
            Em quem você acredita?
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.85rem', marginTop: '1.5rem' }}>
            <div style={{ width: '32px', height: '1px', background: 'rgba(201,168,76,0.4)' }} />
            <span style={{ color: '#C9A84C', fontSize: '0.95rem', lineHeight: 1, opacity: 0.75 }}>☧</span>
            <div style={{ width: '32px', height: '1px', background: 'rgba(201,168,76,0.4)' }} />
          </div>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5px', background: 'rgba(201,168,76,0.07)' }}>
          {pillars.map((p, i) => (
            <div key={i} style={{ background: '#0A0A0A' }}>
              <PillarCard pillar={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
