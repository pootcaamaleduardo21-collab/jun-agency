'use client';
import { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────────────────
   JUN Hero — Digital Agency Premium Background
   Four-layer canvas in a single rAF loop:

   Layer 0: Warm sand gradient blobs (ambient depth)
   Layer 1: Perspective grid — converging to a vanishing point,
             shifts subtly with mouse (feels like a digital landscape)
   Layer 2: Data stream particles — glowing dots traveling along
             bezier curves upward, like metrics / data in motion
   Layer 3: Horizon pulse ring — subtle expanding ring at the VP

   CSS: grain texture overlay via SVG filter for editorial feel
   Mobile: animation runs; mouse tracking skipped for touch
──────────────────────────────────────────────────────────────────── */

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.4, tx: 0.5, ty: 0.4 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isTouch = 'ontouchstart' in window;

    // ── Resize ─────────────────────────────────────────────────────
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // ── Mouse / touch ───────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      if (isTouch) return;
      mouse.current.tx = e.clientX / window.innerWidth;
      mouse.current.ty = e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', onMove);

    // ── Ambient blobs ───────────────────────────────────────────────
    type Blob = { x: number; y: number; r: number; vx: number; vy: number; alpha: number };
    const blobs: Blob[] = [
      { x: 0.12, y: 0.55, r: 0.45, vx: 0.00007, vy: 0.00004, alpha: 0.08 },
      { x: 0.82, y: 0.3,  r: 0.35, vx:-0.00006, vy: 0.00006, alpha: 0.05 },
      { x: 0.5,  y: 0.85, r: 0.3,  vx: 0.00005, vy:-0.00005, alpha: 0.04 },
    ];

    // ── Data streams (bezier paths + traveling particles) ───────────
    type Stream = {
      // Control points as fractions of W/H
      x0: number; y0: number;
      cx: number; cy: number;
      x1: number; y1: number;
      particles: { t: number; speed: number; alpha: number; r: number }[];
    };

    const streams: Stream[] = [
      { x0:0.05, y0:1.05, cx:0.15, cy:0.5, x1:0.3,  y1:-0.05,
        particles:[{t:0.1,speed:0.0018,alpha:0.9,r:2},{t:0.55,speed:0.0014,alpha:0.6,r:1.5}] },
      { x0:0.18, y0:1.05, cx:0.38, cy:0.45, x1:0.55, y1:-0.05,
        particles:[{t:0.3,speed:0.0016,alpha:0.8,r:2.2},{t:0.72,speed:0.0012,alpha:0.5,r:1.2}] },
      { x0:0.4,  y0:1.05, cx:0.45, cy:0.4, x1:0.52,  y1:-0.05,
        particles:[{t:0.05,speed:0.002,alpha:1,r:2.5},{t:0.48,speed:0.0015,alpha:0.7,r:1.8},{t:0.8,speed:0.0011,alpha:0.4,r:1.2}] },
      { x0:0.58, y0:1.05, cx:0.68, cy:0.48, x1:0.75, y1:-0.05,
        particles:[{t:0.2,speed:0.0017,alpha:0.85,r:2},{t:0.65,speed:0.0013,alpha:0.55,r:1.5}] },
      { x0:0.78, y0:1.05, cx:0.82, cy:0.52, x1:0.88, y1:-0.05,
        particles:[{t:0.4,speed:0.0019,alpha:0.75,r:1.8},{t:0.85,speed:0.0014,alpha:0.45,r:1.2}] },
      { x0:0.92, y0:1.05, cx:0.88, cy:0.45, x1:0.7,  y1:-0.05,
        particles:[{t:0.15,speed:0.0015,alpha:0.7,r:1.5}] },
    ];

    // Bezier point at t
    const bPoint = (s: Stream, t: number, W: number, H: number) => {
      const mt = 1 - t;
      return {
        x: mt*mt*s.x0*W + 2*mt*t*s.cx*W + t*t*s.x1*W,
        y: mt*mt*s.y0*H + 2*mt*t*s.cy*H + t*t*s.y1*H,
      };
    };

    // Horizon pulse ring state
    let pulseR = 0;
    let pulseAlpha = 0;
    const PULSE_MAX_R = 120;
    const PULSE_SPEED = 0.4;

    let time = 0;

    // ── Draw loop ───────────────────────────────────────────────────
    const draw = () => {
      time += 1;
      const W = canvas.width;
      const H = canvas.height;

      // Smooth mouse lerp
      mouse.current.x = lerp(mouse.current.x, mouse.current.tx, 0.035);
      mouse.current.y = lerp(mouse.current.y, mouse.current.ty, 0.035);

      // Vanishing point — upper-center, shifts with mouse
      const vpx = W * (0.5 + (mouse.current.x - 0.5) * 0.12);
      const vpy = H * (0.28 + (mouse.current.y - 0.5) * 0.06);

      ctx.clearRect(0, 0, W, H);

      // ── Layer 0: Ambient blobs ──
      blobs.forEach((b) => {
        b.x += b.vx; b.y += b.vy;
        if (b.x < 0.05 || b.x > 0.95) b.vx *= -1;
        if (b.y < 0.05 || b.y > 0.95) b.vy *= -1;
        const bx = b.x * W, by = b.y * H, br = b.r * Math.min(W, H);
        const g = ctx.createRadialGradient(bx, by, 0, bx, by, br);
        g.addColorStop(0, `rgba(212,175,154,${b.alpha})`);
        g.addColorStop(0.5, `rgba(190,140,110,${b.alpha * 0.3})`);
        g.addColorStop(1, 'rgba(212,175,154,0)');
        ctx.beginPath();
        ctx.arc(bx, by, br, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      });

      // ── Layer 1: Perspective grid ──
      // Horizontal bands (decreasing spacing toward vanishing point)
      const BANDS = 14;
      for (let i = 0; i <= BANDS; i++) {
        const t = i / BANDS;
        // Ease-out: lines bunch near VP, spread near bottom
        const tEased = t * t;
        const y = vpy + (H * 1.1 - vpy) * tEased;
        // x range: wider at bottom, converges at VP
        const spread = tEased;
        const xLeft  = lerp(vpx, -W * 0.1, spread);
        const xRight = lerp(vpx,  W * 1.1, spread);
        const alpha = 0.055 * (1 - i / BANDS) + 0.008;
        ctx.beginPath();
        ctx.moveTo(xLeft, y);
        ctx.lineTo(xRight, y);
        ctx.strokeStyle = `rgba(212,175,154,${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // Vertical rays from vanishing point to bottom
      const RAYS = 20;
      for (let i = 0; i <= RAYS; i++) {
        const t = i / RAYS;
        // Spread across the bottom edge
        const bx = lerp(-W * 0.1, W * 1.1, t);
        const alpha = 0.04 + Math.sin(i * 0.6 + time * 0.008) * 0.015;
        ctx.beginPath();
        ctx.moveTo(vpx, vpy);
        ctx.lineTo(bx, H * 1.05);
        ctx.strokeStyle = `rgba(212,175,154,${Math.max(0, alpha)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }

      // ── Layer 2: Data stream particles ──
      streams.forEach((s) => {
        // Draw path faintly
        ctx.beginPath();
        ctx.moveTo(s.x0 * W, s.y0 * H);
        ctx.quadraticCurveTo(s.cx * W, s.cy * H, s.x1 * W, s.y1 * H);
        ctx.strokeStyle = 'rgba(212,175,154,0.04)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Advance and draw particles
        s.particles.forEach((p) => {
          p.t += p.speed;
          if (p.t > 1) p.t = p.t - 1;

          const pos = bPoint(s, p.t, W, H);

          // Glow: outer
          const glow = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, p.r * 6);
          glow.addColorStop(0, `rgba(232,207,193,${p.alpha * 0.8})`);
          glow.addColorStop(1, 'rgba(232,207,193,0)');
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, p.r * 6, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();

          // Core dot
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245,241,237,${p.alpha})`;
          ctx.fill();
        });
      });

      // ── Layer 3: Horizon pulse ring ──
      pulseR += PULSE_SPEED;
      if (pulseR > PULSE_MAX_R) {
        pulseR = 0;
        pulseAlpha = 0.18;
      }
      pulseAlpha = Math.max(0, pulseAlpha - 0.0018);
      if (pulseAlpha > 0.005) {
        ctx.beginPath();
        ctx.arc(vpx, vpy, pulseR, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(212,175,154,${pulseAlpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#080808]"
      aria-label="Sección principal"
    >
      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Grain texture overlay — editorial premium feel */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          opacity: 0.028,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Gradient overlays */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, rgba(8,8,8,0.55) 0%, transparent 35%, transparent 60%, rgba(8,8,8,0.95) 100%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to right, rgba(8,8,8,0.45) 0%, transparent 60%)' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-36 pb-28">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-10">
          <div className="h-px w-10" style={{ background: 'var(--sand)' }} aria-hidden="true" />
          <span
            className="text-xs tracking-[0.22em] uppercase"
            style={{ color: 'var(--sand)', fontWeight: 700 }}
          >
            Riviera Maya — Estrategia Digital
          </span>
        </div>

        {/* H1 */}
        <h1
          className="mb-8 max-w-5xl"
          style={{ fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 0.97 }}
        >
          Haz que tu proyecto sea la{' '}
          <span style={{ color: 'var(--sand)' }}>primera opción</span>{' '}
          en la Riviera Maya.
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl mb-4 max-w-2xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.58)' }}>
          Especialistas en crecimiento digital para real estate y turismo en la Riviera Maya.
        </p>

        {/* Support text */}
        <p className="text-base mb-14 max-w-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.38)' }}>
          Diseñamos una presencia digital con dirección, para proyectos y marcas que necesitan
          comunicar con claridad, diferenciarse y convertir con más intención.
        </p>

        {/* Bullets */}
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-14 max-w-3xl">
          {[
            'Estrategia enfocada en posicionamiento y conversión',
            'Contenido pensado para comunicar con más claridad',
            'Enfoque alineado al mercado de la Riviera Maya',
            'Soluciones visuales que elevan la percepción del proyecto',
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
              <svg
                className="w-4 h-4 flex-shrink-0 mt-0.5"
                style={{ color: 'var(--sand)' }}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#formulario"
            id="hero-cta-diagnostico"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg text-sm transition-all duration-300"
            style={{
              background: 'var(--cream)',
              color: '#080808',
              fontWeight: 700,
              fontFamily: 'Satoshi, sans-serif',
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--sand)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'var(--cream)'; }}
          >
            Solicita tu diagnóstico estratégico
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          <a
            href="#como-trabajamos"
            id="hero-cta-proceso"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg text-sm transition-all duration-300"
            style={{
              border: '1px solid rgba(255,255,255,0.18)',
              color: '#fff',
              fontWeight: 600,
              fontFamily: 'Satoshi, sans-serif',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = 'rgba(255,255,255,0.38)';
              el.style.background = 'rgba(255,255,255,0.04)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.borderColor = 'rgba(255,255,255,0.18)';
              el.style.background = 'transparent';
            }}
          >
            Descubre cómo trabajamos
          </a>
        </div>

        {/* Metric chips — visual anchoring, feels like real agency data */}
        <div className="flex flex-wrap items-center gap-6 mt-14">
          {[
            { value: 'Real estate', label: 'y turismo' },
            { value: 'Playa del Carmen', label: 'Riviera Maya' },
            { value: 'Estrategia', label: 'y conversión' },
          ].map((chip) => (
            <div key={chip.value} className="flex items-center gap-3">
              <div className="w-px h-6" style={{ background: 'rgba(212,175,154,0.25)' }} aria-hidden="true" />
              <div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.30)', fontWeight: 600, letterSpacing: '0.06em' }}>{chip.label}</div>
                <div className="text-sm" style={{ color: 'rgba(212,175,154,0.85)', fontWeight: 700 }}>{chip.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        aria-hidden="true"
      >
        <div
          className="w-px h-12 animate-pulse"
          style={{ background: 'linear-gradient(to bottom, rgba(212,175,154,0.5), transparent)' }}
        />
      </div>
    </section>
  );
}
