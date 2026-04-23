'use client';

import { ReactNode } from 'react';

type Glyph = 'chi-rho' | 'cross-pattee' | 'fleur-de-lis' | 'ihs' | 'fleuron' | 'alpha-omega' | 'cross' | 'pax';

interface Props {
  glyph?: Glyph;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  lineOpacity?: number;
  padding?: string;
  background?: string;
}

function renderGlyph(glyph: Glyph): ReactNode {
  switch (glyph) {
    case 'chi-rho':      return <span style={{ fontSize: '1.4em', lineHeight: 1 }}>☧</span>;
    case 'cross-pattee': return <span style={{ fontSize: '1.05em', lineHeight: 1 }}>✠</span>;
    case 'fleur-de-lis': return <span style={{ fontSize: '1.1em', lineHeight: 1 }}>⚜</span>;
    case 'fleuron':      return <span style={{ fontSize: '1em', lineHeight: 1 }}>❦</span>;
    case 'cross':        return <span style={{ fontSize: '1em', lineHeight: 1 }}>✝</span>;
    case 'pax':          return <span style={{ fontSize: '1.15em', lineHeight: 1 }}>☩</span>;
    case 'ihs':          return <span style={{ fontSize: '0.7em', letterSpacing: '0.18em', lineHeight: 1, paddingLeft: '0.18em', fontWeight: 700 }}>IHS</span>;
    case 'alpha-omega':  return <span style={{ fontSize: '0.7em', letterSpacing: '0.25em', lineHeight: 1, paddingLeft: '0.25em', fontWeight: 700 }}>Α · Ω</span>;
  }
}

export default function SacredDivider({
  glyph = 'chi-rho',
  size = 'md',
  color = '#C9A84C',
  lineOpacity = 0.3,
  padding = '3.5rem 2rem',
  background = 'transparent',
}: Props) {
  const dims = {
    sm: { lineWidth: '55px',  fontSize: '0.85rem', gap: '0.85rem' },
    md: { lineWidth: '110px', fontSize: '1.1rem',  gap: '1.25rem' },
    lg: { lineWidth: '180px', fontSize: '1.5rem',  gap: '1.75rem' },
  }[size];

  return (
    <div
      aria-hidden
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding,
        background,
        gap: dims.gap,
      }}
    >
      <div
        style={{
          width: dims.lineWidth,
          maxWidth: '28vw',
          height: '1px',
          background: `linear-gradient(to right, transparent, rgba(201,168,76,${lineOpacity}))`,
        }}
      />
      <span
        className="font-cinzel-deco"
        style={{
          color,
          fontSize: dims.fontSize,
          opacity: 0.8,
          lineHeight: 1,
          textShadow: `0 0 24px rgba(201,168,76,0.25)`,
        }}
      >
        {renderGlyph(glyph)}
      </span>
      <div
        style={{
          width: dims.lineWidth,
          maxWidth: '28vw',
          height: '1px',
          background: `linear-gradient(to left, transparent, rgba(201,168,76,${lineOpacity}))`,
        }}
      />
    </div>
  );
}
