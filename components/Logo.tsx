/* ─── Brand Logo SVG Component ──────────────────────────────────────────
   Faithfully reproduces the JUN wordmark:
   - "j" with rounded descender hook (leftward)
   - "ú" with open U arch + floating dot accent (Maya reference)
   - "n" with smooth rounded arch at top
   Props:
   - variant: 'cream' (for dark backgrounds) | 'dark' (for light bgs)
   - height: pixel height (width auto)
   ───────────────────────────────────────────────────────────────────── */

type Variant = 'cream' | 'dark' | 'sand';

interface LogoProps {
  variant?: Variant;
  height?: number;
  className?: string;
  'aria-hidden'?: boolean;
}

const COLORS: Record<Variant, string> = {
  cream: '#f5f1ed',
  dark:  '#2f2f2f',
  sand:  '#d4af9a',
};

export function Logo({ variant = 'cream', height = 32, className = '', 'aria-hidden': ariaHidden }: LogoProps) {
  const color = COLORS[variant];

  return (
    <svg
      viewBox="0 0 210 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      style={{ display: 'block', flexShrink: 0 }}
      role={ariaHidden ? undefined : 'img'}
      aria-label={ariaHidden ? undefined : 'JUN Agency'}
      aria-hidden={ariaHidden}
      className={className}
    >
      {/* ── Letter "j" ── */}
      {/* Vertical stroke + rounded left-hook descender */}
      <path
        d="M 42 14 L 42 70 Q 42 90 24 92"
        stroke={color}
        strokeWidth="15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* ── Letter "ú" ── */}
      {/* Open U arch: left leg → round bottom → right leg */}
      <path
        d="M 68 14 L 68 62 Q 68 86 88 87 Q 108 86 108 62 L 108 14"
        stroke={color}
        strokeWidth="15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Floating dot accent — Maya numeral "1st" (jún = primero) */}
      <circle cx="88" cy="2" r="8" fill={color} />

      {/* ── Letter "n" ── */}
      {/* Left leg + smooth arch top + right leg */}
      <path
        d="M 132 88 L 132 16 Q 132 -4 158 4 Q 180 12 180 32 L 180 88"
        stroke={color}
        strokeWidth="15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
