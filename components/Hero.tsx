'use client';
import { useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────────────────────
   JUN Hero V3 — Maximum mouse responsiveness + visual density

   CURSOR: Two tracking layers:
     - cursor.*  = instant (0 lag) — used for spotlight and field glow
     - smooth.*  = lerped 0.09    — used for grid/particle parallax

   LAYERS:
     0. Cursor spotlight   — radial glow exactly at mouse, instant
     1. Ambient halos      — slow drifting warm blobs
     2. Perspective grid   — vanishing point shifts strongly with smooth mouse
     3. Data streams       — bezier particle streams, 8 paths × 3 particles
     4. Horizon pulse ring — periodic expanding ring at vanishing point
     5. Cursor orbit dots  — 3 tiny dots orbit at mouse position slowly

   PARALLAX multipliers are 4x stronger than v2 for dramatic response.
──────────────────────────────────────────────────────────────────────── */

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

interface Blob { x: number; y: number; r: number; vx: number; vy: number; alpha: number }
interface Particle { t: number; speed: number; alpha: number; r: number }
interface Stream {
  x0: number; y0: number; cx: number; cy: number; x1: number; y1: number;
  particles: Particle[];
}
interface OrbitDot { angle: number; speed: number; radius: number; alpha: number }

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useRef({
    cursorX: 0.5, cursorY: 0.45,
    smoothX: 0.5, smoothY: 0.45,
    isTouch: false,
  });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const s = state.current;

    s.isTouch = 'ontouchstart' in window;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = (e: MouseEvent) => {
      if (s.isTouch) return;
      s.cursorX = e.clientX / window.innerWidth;
      s.cursorY = e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', onMove);

    // ── Blobs ───────────────────────────────────────────────────────
    const blobs: Blob[] = [
      { x:0.1,  y:0.5,  r:0.5,  vx:0.00008, vy:0.00005, alpha:0.09 },
      { x:0.85, y:0.28, r:0.38, vx:-0.00007,vy:0.00007, alpha:0.06 },
      { x:0.5,  y:0.82, r:0.32, vx:0.00006, vy:-0.00006,alpha:0.045},
    ];

    // ── Particle streams ────────────────────────────────────────────
    const streams: Stream[] = [
      { x0:0.04,y0:1.05,cx:0.12,cy:0.45,x1:0.28, y1:-0.05, particles:[{t:0.1,speed:0.0019,alpha:0.95,r:2.2},{t:0.52,speed:0.0014,alpha:0.6,r:1.5},{t:0.78,speed:0.001,alpha:0.35,r:1}] },
      { x0:0.15,y0:1.05,cx:0.32,cy:0.42,x1:0.5,  y1:-0.05, particles:[{t:0.25,speed:0.0017,alpha:0.85,r:2},{t:0.6,speed:0.0013,alpha:0.55,r:1.4},{t:0.88,speed:0.0009,alpha:0.3,r:0.9}] },
      { x0:0.32,y0:1.05,cx:0.42,cy:0.38,x1:0.52, y1:-0.05, particles:[{t:0.05,speed:0.002,alpha:1,r:2.5},{t:0.42,speed:0.0016,alpha:0.7,r:1.8},{t:0.72,speed:0.0011,alpha:0.4,r:1.1}] },
      { x0:0.48,y0:1.05,cx:0.5, cy:0.35,x1:0.54, y1:-0.05, particles:[{t:0.35,speed:0.0018,alpha:0.9,r:2.2},{t:0.67,speed:0.0013,alpha:0.6,r:1.5},{t:0.9,speed:0.001,alpha:0.35,r:1}] },
      { x0:0.6, y0:1.05,cx:0.68,cy:0.45,x1:0.76, y1:-0.05, particles:[{t:0.18,speed:0.0016,alpha:0.85,r:2},{t:0.58,speed:0.0012,alpha:0.55,r:1.3}] },
      { x0:0.72,y0:1.05,cx:0.78,cy:0.5, x1:0.85, y1:-0.05, particles:[{t:0.4,speed:0.0019,alpha:0.8,r:1.9},{t:0.75,speed:0.0014,alpha:0.5,r:1.2}] },
      { x0:0.85,y0:1.05,cx:0.88,cy:0.4, x1:0.72, y1:-0.05, particles:[{t:0.08,speed:0.0015,alpha:0.75,r:1.7}] },
      { x0:0.94,y0:1.05,cx:0.92,cy:0.48,x1:0.62, y1:-0.05, particles:[{t:0.55,speed:0.0013,alpha:0.65,r:1.5}] },
    ];

    const bPoint = (s: Stream, t: number, W: number, H: number) => {
      const m = 1 - t;
      return { x: m*m*s.x0*W + 2*m*t*s.cx*W + t*t*s.x1*W, y: m*m*s.y0*H + 2*m*t*s.cy*H + t*t*s.y1*H };
    };

    // ── Cursor orbit dots ───────────────────────────────────────────
    const orbitDots: OrbitDot[] = [
      { angle: 0,          speed: 0.018, radius: 55, alpha: 0.35 },
      { angle: Math.PI*2/3,speed: 0.013, radius: 80, alpha: 0.22 },
      { angle: Math.PI*4/3,speed: 0.010, radius: 110,alpha: 0.14 },
    ];

    // ── Pulse ring ──────────────────────────────────────────────────
    let pulseR = 0, pulseAlpha = 0;

    let time = 0;

    const draw = () => {
      time += 1;
      const W = canvas.width, H = canvas.height;
      const s = state.current;

      // Smooth mouse lerp (fast: 0.09)
      s.smoothX = lerp(s.smoothX, s.cursorX, 0.09);
      s.smoothY = lerp(s.smoothY, s.cursorY, 0.09);

      // Parallax deltas (normalized -0.5 → 0.5, scaled to px)
      const pxX = (s.smoothX - 0.5) * W * 0.28;  // ↑ 4x stronger
      const pxY = (s.smoothY - 0.5) * H * 0.20;

      // Cursor absolute pixel coords (instant)
      const cxPx = s.cursorX * W;
      const cyPx = s.cursorY * H;

      // Vanishing point (follows smooth mouse)
      const vpx = W * (0.5 + (s.smoothX - 0.5) * 0.18);
      const vpy = H * (0.26 + (s.smoothY - 0.5) * 0.08);

      ctx.clearRect(0, 0, W, H);

      // ── Layer 0: Cursor spotlight (instant, no lerp) ──
      const spotR = Math.min(W, H) * 0.35;
      const spot = ctx.createRadialGradient(cxPx, cyPx, 0, cxPx, cyPx, spotR);
      spot.addColorStop(0, 'rgba(212,175,154,0.055)');
      spot.addColorStop(0.4, 'rgba(200,160,130,0.022)');
      spot.addColorStop(1, 'rgba(212,175,154,0)');
      ctx.beginPath();
      ctx.arc(cxPx, cyPx, spotR, 0, Math.PI*2);
      ctx.fillStyle = spot;
      ctx.fill();

      // ── Layer 1: Ambient blobs ──
      blobs.forEach(b => {
        b.x += b.vx; b.y += b.vy;
        if (b.x < 0.05 || b.x > 0.95) b.vx *= -1;
        if (b.y < 0.05 || b.y > 0.95) b.vy *= -1;
        const bx = b.x*W + pxX*0.5, by = b.y*H + pxY*0.5, br = b.r*Math.min(W,H);
        const g = ctx.createRadialGradient(bx,by,0,bx,by,br);
        g.addColorStop(0, `rgba(212,175,154,${b.alpha})`);
        g.addColorStop(0.5, `rgba(190,140,110,${b.alpha*0.3})`);
        g.addColorStop(1, 'rgba(212,175,154,0)');
        ctx.beginPath(); ctx.arc(bx,by,br,0,Math.PI*2);
        ctx.fillStyle = g; ctx.fill();
      });

      // ── Layer 2: Perspective grid ──
      const BANDS = 16, RAYS = 22;
      for (let i = 0; i <= BANDS; i++) {
        const t = i/BANDS, te = t*t;
        const y = vpy + (H*1.15 - vpy) * te;
        const spread = te;
        const xL = lerp(vpx, -W*0.15, spread), xR = lerp(vpx, W*1.15, spread);
        const a = 0.07*(1 - i/BANDS) + 0.008;
        ctx.beginPath(); ctx.moveTo(xL,y); ctx.lineTo(xR,y);
        ctx.strokeStyle = `rgba(212,175,154,${a})`; ctx.lineWidth=0.6; ctx.stroke();
      }
      for (let i = 0; i <= RAYS; i++) {
        const t = i/RAYS;
        const bx = lerp(-W*0.15, W*1.15, t);
        const a = 0.045 + Math.sin(i*0.55 + time*0.007)*0.018;
        ctx.beginPath(); ctx.moveTo(vpx, vpy); ctx.lineTo(bx, H*1.06);
        ctx.strokeStyle = `rgba(212,175,154,${Math.max(0,a)})`; ctx.lineWidth=0.5; ctx.stroke();
      }
      // Horizon accent line
      ctx.beginPath(); ctx.moveTo(0, vpy); ctx.lineTo(W, vpy);
      ctx.strokeStyle = 'rgba(212,175,154,0.06)'; ctx.lineWidth=1; ctx.stroke();

      // ── Layer 3: Data stream particles ──
      streams.forEach(s => {
        ctx.beginPath();
        ctx.moveTo(s.x0*W + pxX*0.4, s.y0*H + pxY*0.4);
        ctx.quadraticCurveTo(s.cx*W + pxX*0.4, s.cy*H + pxY*0.4, s.x1*W + pxX*0.4, s.y1*H + pxY*0.4);
        ctx.strokeStyle='rgba(212,175,154,0.04)'; ctx.lineWidth=1; ctx.stroke();

        s.particles.forEach(p => {
          p.t += p.speed;
          if (p.t > 1) p.t -= 1;
          const pos = bPoint(s, p.t, W, H);
          const px2 = pos.x + pxX*0.4, py2 = pos.y + pxY*0.4;
          const glow = ctx.createRadialGradient(px2,py2,0,px2,py2,p.r*7);
          glow.addColorStop(0, `rgba(232,207,193,${p.alpha*0.85})`);
          glow.addColorStop(1, 'rgba(232,207,193,0)');
          ctx.beginPath(); ctx.arc(px2,py2,p.r*7,0,Math.PI*2); ctx.fillStyle=glow; ctx.fill();
          ctx.beginPath(); ctx.arc(px2,py2,p.r,0,Math.PI*2);
          ctx.fillStyle=`rgba(245,241,237,${p.alpha})`; ctx.fill();
        });
      });

      // ── Layer 4: Horizon pulse ──
      pulseR += 0.5;
      if (pulseR > 140) { pulseR=0; pulseAlpha=0.22; }
      pulseAlpha = Math.max(0, pulseAlpha - 0.0022);
      if (pulseAlpha > 0.004) {
        ctx.beginPath(); ctx.arc(vpx,vpy,pulseR,0,Math.PI*2);
        ctx.strokeStyle=`rgba(212,175,154,${pulseAlpha})`; ctx.lineWidth=1; ctx.stroke();
      }

      // ── Layer 5: Cursor orbit dots ──
      orbitDots.forEach(od => {
        od.angle += od.speed;
        const ox = cxPx + Math.cos(od.angle) * od.radius;
        const oy = cyPx + Math.sin(od.angle) * od.radius;
        const og = ctx.createRadialGradient(ox,oy,0,ox,oy,5);
        og.addColorStop(0, `rgba(212,175,154,${od.alpha})`);
        og.addColorStop(1, 'rgba(212,175,154,0)');
        ctx.beginPath(); ctx.arc(ox,oy,5,0,Math.PI*2); ctx.fillStyle=og; ctx.fill();
        ctx.beginPath(); ctx.arc(ox,oy,1.2,0,Math.PI*2);
        ctx.fillStyle=`rgba(245,241,237,${od.alpha*1.4})`; ctx.fill();
      });

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
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Grain overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize:'200px 200px',
          opacity:0.03,
          mixBlendMode:'overlay',
        }}
      />

      {/* Gradient vignette */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{background:'linear-gradient(to bottom,rgba(8,8,8,0.6) 0%,transparent 30%,transparent 55%,rgba(8,8,8,0.97) 100%)'}} />
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{background:'linear-gradient(to right,rgba(8,8,8,0.5) 0%,transparent 65%)'}} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-36 pb-28">

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-10">
          <div className="h-px w-10" style={{background:'var(--sand)'}} aria-hidden="true" />
          <span className="text-xs tracking-[0.22em] uppercase" style={{color:'var(--sand)',fontWeight:700}}>
            Riviera Maya — Estrategia Digital
          </span>
        </div>

        {/* H1 */}
        <h1 className="mb-8 max-w-5xl" style={{fontWeight:700,letterSpacing:'-0.03em',lineHeight:0.97}}>
          Haz que tu proyecto sea la{' '}
          <span style={{color:'var(--sand)'}}>primera opción</span>{' '}
          en la Riviera Maya.
        </h1>

        {/* Sub */}
        <p className="text-xl md:text-2xl mb-4 max-w-2xl leading-relaxed" style={{color:'rgba(255,255,255,0.75)'}}>
          Especialistas en crecimiento digital para real estate y turismo en la Riviera Maya.
        </p>
        <p className="text-base mb-14 max-w-xl leading-relaxed" style={{color:'rgba(255,255,255,0.55)'}}>
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
            <li key={item} className="flex items-start gap-3 text-sm" style={{color:'rgba(255,255,255,0.72)'}}>
              <svg className="w-4 h-4 flex-shrink-0 mt-0.5" style={{color:'var(--sand)'}} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {item}
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mb-14">
          <a
            href="#formulario"
            id="hero-cta-diagnostico"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg text-sm transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            style={{background:'var(--cream)',color:'#080808',fontWeight:700,fontFamily:'Satoshi,sans-serif',boxShadow:'0 0 0 0 rgba(212,175,154,0)'}}
            onMouseEnter={(e)=>{ const el = e.currentTarget; el.style.background='var(--sand)'; el.style.boxShadow='0 8px 30px rgba(212,175,154,0.25)'; }}
            onMouseLeave={(e)=>{ const el = e.currentTarget; el.style.background='var(--cream)'; el.style.boxShadow='0 0 0 0 rgba(212,175,154,0)'; }}
          >
            Solicita tu diagnóstico estratégico
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
          <a
            href="#como-trabajamos"
            id="hero-cta-proceso"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-lg text-sm transition-all duration-300 hover:scale-[1.01]"
            style={{border:'1px solid rgba(255,255,255,0.22)',color:'#fff',fontWeight:600,fontFamily:'Satoshi,sans-serif'}}
            onMouseEnter={(e)=>{ const el=e.currentTarget; el.style.borderColor='rgba(255,255,255,0.45)'; el.style.background='rgba(255,255,255,0.05)'; }}
            onMouseLeave={(e)=>{ const el=e.currentTarget; el.style.borderColor='rgba(255,255,255,0.22)'; el.style.background='transparent'; }}
          >
            Descubre cómo trabajamos
          </a>
        </div>

        {/* Anchor chips */}
        <div className="flex flex-wrap items-center gap-6">
          {[
            {value:'Real estate',label:'y turismo'},
            {value:'Playa del Carmen',label:'Riviera Maya'},
            {value:'Estrategia',label:'y conversión'},
          ].map((chip) => (
            <div key={chip.value} className="flex items-center gap-3">
              <div className="w-px h-6" style={{background:'rgba(212,175,154,0.3)'}} aria-hidden="true" />
              <div>
                <div className="text-xs" style={{color:'rgba(255,255,255,0.38)',fontWeight:600,letterSpacing:'0.06em'}}>{chip.label}</div>
                <div className="text-sm" style={{color:'rgba(212,175,154,0.9)',fontWeight:700}}>{chip.value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10" aria-hidden="true">
        <div className="w-px h-12 animate-pulse" style={{background:'linear-gradient(to bottom,rgba(212,175,154,0.55),transparent)'}} />
      </div>

    </section>
  );
}
