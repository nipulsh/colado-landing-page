// scenes/shared.jsx — shared primitives for all Colado scenes
// Quiet Instruments palette, reusable specimen chrome, typing helper.

const COLADO = {
  paper: '#f7f5f0',
  paperSoft: '#efece4',
  paperElev: '#ffffff',
  ink: '#0e0f0c',
  inkSoft: '#2a2b27',
  muted: '#6b6c66',
  muteSoft: '#8a8b84',
  hairline: '#e5e1d6',
  hairlineSoft: '#efeae0',
  accent: '#2d5f3f',
  accentSoft: '#e8f0ea',
  signal: '#c9502e',
  signalSoft: '#f4e6e0',
  signalDone: '#6b8e5a',
};

const FONTS = {
  display: "'Instrument Serif', ui-serif, Georgia, serif",
  body: "'Geist', ui-sans-serif, system-ui, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, 'SF Mono', Menlo, monospace",
};

// Masthead (top strip): brand · subtitle · specimen · section
function Masthead({ left = 'Colado', leftSub = 'An instrument for the next move', right = 'Specimen', rightSub = '' }) {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0,
      padding: '28px 72px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      borderBottom: `1px solid ${COLADO.hairlineSoft}`,
      fontFamily: FONTS.mono,
      fontSize: 13,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      color: COLADO.muted,
      zIndex: 10,
    }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <span style={{ color: COLADO.inkSoft, fontWeight: 500 }}>{left}</span>
        <span style={{ color: COLADO.muteSoft, letterSpacing: 0 }}>·</span>
        <span>{leftSub}</span>
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <span style={{ color: COLADO.inkSoft, fontWeight: 500 }}>{right}</span>
        {rightSub && <>
          <span style={{ color: COLADO.muteSoft, letterSpacing: 0 }}>·</span>
          <span>{rightSub}</span>
        </>}
      </div>
    </div>
  );
}

// Folio (bottom strip): coordinate · 0X/06
function Folio({ coord = 'Colado / Landing / Fig.', idx = '01', total = '06' }) {
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      padding: '24px 72px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      borderTop: `1px solid ${COLADO.hairlineSoft}`,
      fontFamily: FONTS.mono,
      fontSize: 12,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: COLADO.muteSoft,
      fontVariantNumeric: 'tabular-nums',
      zIndex: 10,
    }}>
      <span>{coord}</span>
      <span>{idx} / {total}</span>
    </div>
  );
}

// Paper grain overlay
function PaperGrain({ opacity = 0.32 }) {
  return (
    <div aria-hidden style={{
      position: 'absolute', inset: 0,
      backgroundImage: `radial-gradient(circle at 1px 1px, rgba(20,20,15,0.06) 0.6px, transparent 1.4px)`,
      backgroundSize: '6px 6px',
      opacity,
      pointerEvents: 'none',
      zIndex: 5,
    }}/>
  );
}

// Soft hero fog — atmospheric warmth
function HeroFog({ opacity = 1 }) {
  return (
    <div aria-hidden style={{
      position: 'absolute', inset: 0,
      background: `
        radial-gradient(72% 58% at 82% 16%, rgba(42,77,51,0.08) 0%, transparent 62%),
        radial-gradient(58% 44% at 12% 88%, rgba(178,74,40,0.06) 0%, transparent 58%)
      `,
      opacity,
      pointerEvents: 'none',
      zIndex: 1,
    }}/>
  );
}

// Typewriter: reveals `text` char-by-char between [start,end] of sprite
function Typewriter({ text, start = 0, end = 1, cursor = true, ...rest }) {
  const { localTime } = useSprite();
  const t = clamp((localTime - start) / (end - start), 0, 1);
  const n = Math.floor(t * text.length);
  const shown = text.slice(0, n);
  const blinking = localTime % 1 < 0.55;
  return (
    <span {...rest}>
      {shown}
      {cursor && t < 1 && <span style={{ opacity: blinking ? 1 : 0 }}>▍</span>}
      {cursor && t >= 1 && <span style={{ opacity: blinking ? 1 : 0 }}>▍</span>}
    </span>
  );
}

// Small mono label / inst-sm style text
function Inst({ children, size = 12, color, style = {}, caps = true }) {
  return (
    <span style={{
      fontFamily: FONTS.mono,
      fontSize: size,
      letterSpacing: caps ? '0.22em' : '0.04em',
      textTransform: caps ? 'uppercase' : 'none',
      color: color || COLADO.muted,
      fontWeight: 500,
      ...style,
    }}>
      {children}
    </span>
  );
}

// Hairline rule
function Hairline({ style = {} }) {
  return <div style={{ height: 1, background: COLADO.hairline, ...style }}/>;
}

// Fade wrapper that uses sprite localTime for entry/exit
function Fade({ children, entryDur = 0.45, exitDur = 0.35, dy = 12, style = {} }) {
  const { localTime, duration } = useSprite();
  const exitStart = Math.max(0, duration - exitDur);
  let opacity = 1, ty = 0;
  if (localTime < entryDur) {
    const t = Easing.easeOutCubic(clamp(localTime / entryDur, 0, 1));
    opacity = t; ty = (1 - t) * dy;
  } else if (localTime > exitStart) {
    const t = Easing.easeInCubic(clamp((localTime - exitStart) / exitDur, 0, 1));
    opacity = 1 - t; ty = -t * dy * 0.6;
  }
  return <div style={{ opacity, transform: `translateY(${ty}px)`, willChange: 'transform, opacity', ...style }}>{children}</div>;
}

Object.assign(window, { COLADO, FONTS, Masthead, Folio, PaperGrain, HeroFog, Typewriter, Inst, Hairline, Fade });
