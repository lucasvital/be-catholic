'use client';

interface Props {
  pos: 'tl' | 'tr' | 'bl' | 'br';
  size?: number;
  color?: string;
  opacity?: number;
  offset?: number | string;
}

export default function SacredCorner({
  pos,
  size = 78,
  color = '#C9A84C',
  opacity = 0.4,
  offset = '1.5rem',
}: Props) {
  const isRight = pos === 'tr' || pos === 'br';
  const isBottom = pos === 'bl' || pos === 'br';
  const scaleX = isRight ? -1 : 1;
  const scaleY = isBottom ? -1 : 1;

  return (
    <div
      className="absolute pointer-events-none z-10"
      aria-hidden
      style={{
        top: isBottom ? undefined : offset,
        bottom: isBottom ? offset : undefined,
        left: isRight ? undefined : offset,
        right: isRight ? offset : undefined,
        width: size,
        height: size,
        opacity,
        transform: `scale(${scaleX}, ${scaleY})`,
        transformOrigin: 'center',
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="-6 -6 90 90"
        fill="none"
        style={{ overflow: 'visible' }}
      >
        {/* Outer L */}
        <path d="M 0 78 L 0 0 L 78 0" stroke={color} strokeWidth="1" fill="none" />
        {/* Inner parallel L */}
        <path d="M 8 78 L 8 8 L 78 8" stroke={color} strokeWidth="0.6" opacity="0.55" fill="none" />
        {/* Corner diamond */}
        <rect x="-3" y="-3" width="6" height="6" fill={color} transform="rotate(45 0 0)" />
        {/* Inner small diamond */}
        <rect x="14" y="14" width="4" height="4" fill={color} opacity="0.6" transform="rotate(45 16 16)" />
        {/* Midpoint ticks */}
        <line x1="0" y1="38" x2="-5" y2="38" stroke={color} strokeWidth="1" />
        <line x1="38" y1="0" x2="38" y2="-5" stroke={color} strokeWidth="1" />
        {/* End dots */}
        <circle cx="74" cy="0" r="1.6" fill={color} />
        <circle cx="0" cy="74" r="1.6" fill={color} />
        {/* Short flourish branches */}
        <path d="M 8 26 L 2 26" stroke={color} strokeWidth="0.8" opacity="0.65" />
        <path d="M 26 8 L 26 2" stroke={color} strokeWidth="0.8" opacity="0.65" />
        <path d="M 8 56 L 4 56" stroke={color} strokeWidth="0.6" opacity="0.5" />
        <path d="M 56 8 L 56 4" stroke={color} strokeWidth="0.6" opacity="0.5" />
      </svg>
    </div>
  );
}
