// scenes/03-movements.jsx — 25 to 42s
// Triptych: three movements (Capture · Prioritize · Act).
// Starts as wide triptych spread, then camera pans across each column in focus.

const MOVEMENTS = [
  {
    roman: 'I', label: 'Capture',
    title: ['Say it.', 'Like a friend.'],
    body: 'Type, voice, fragments — Colado catches everything without judgment. Unfinished thoughts welcome.',
    annotA: 'Input accepts natural language.',
    annotB: 'No tags. No projects. No trees.',
  },
  {
    roman: 'II', label: 'Prioritize',
    title: ['We read.', 'You trust.'],
    body: 'Deadlines, energy, context — weighed against each other. Not a scoring game. An honest answer.',
    annotA: 'Reasoning surfaced for every rank.',
    annotB: 'You can always ask why.',
  },
  {
    roman: 'III', label: 'Act',
    title: ['One move.', 'Then the next.'],
    body: 'The rest of the list dims. The top move sharpens. Finish it. Come back. Another answer waits.',
    annotA: 'Single-task focus is the feature.',
    annotB: 'The queue is invisible until done.',
  },
];

function SceneMovements({ start = 25, end = 42 }) {
  return (
    <Sprite start={start} end={end}>
      <SceneMovementsBody />
    </Sprite>
  );
}

function SceneMovementsBody() {
  const { localTime, duration } = useSprite();

  // Phases:
  // 0 – 2.0: title "Three movements, one quiet instrument"
  // 2.0 – 5.5: movement I in focus (camera on column 1)
  // 5.5 – 9.5: movement II (column 2)
  // 9.5 – 13.5: movement III (column 3)
  // 13.5 – end: pull back wide
  const titleOp = interpolate([0, 0.4, 1.8, 2.4], [0, 1, 1, 0], Easing.easeInOutCubic)(localTime);

  // Camera x-position (centered on each column in turn)
  // columns centered at x = 320, 960, 1600 in 1920 canvas
  const camX = interpolate(
    [2.0, 2.6, 5.5, 6.0, 9.5, 10.0, 13.5, 14.2],
    [960, 320, 320, 960, 960, 1600, 1600, 960],
    Easing.easeInOutCubic
  )(localTime);
  const camScale = interpolate(
    [1.8, 2.6, 5.5, 6.0, 9.5, 10.0, 13.5, 14.2],
    [1.0, 1.35, 1.35, 1.35, 1.35, 1.35, 1.35, 1.0],
    Easing.easeInOutCubic
  )(localTime);

  // Translate so (camX, 540) becomes center of a 1920x1080 frame at given scale
  const tx = (960 - camX) * camScale;
  const ty = 0;

  // Outer exit fade
  const outT = clamp((localTime - (duration - 0.7)) / 0.7, 0, 1);
  const outOp = 1 - Easing.easeInCubic(outT);

  // Determine which column is "focused" at the current time
  let focusIdx = -1;
  if (localTime >= 2.6 && localTime < 5.8) focusIdx = 0;
  else if (localTime >= 6.0 && localTime < 9.7) focusIdx = 1;
  else if (localTime >= 10.0 && localTime < 13.7) focusIdx = 2;

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: COLADO.paper,
      overflow: 'hidden',
      opacity: outOp,
    }}>
      <PaperGrain opacity={0.28} />
      <Masthead leftSub="Three movements, one quiet instrument" right="Specimen III" rightSub="Method Triptych" />

      {/* Title */}
      <div style={{
        position: 'absolute',
        left: 120, top: 160,
        opacity: titleOp,
        zIndex: 6,
      }}>
        <Inst size={13}>§ 03 — Method</Inst>
        <h2 style={{
          margin: '16px 0 0 0',
          fontFamily: FONTS.display,
          fontSize: 132, lineHeight: 1.02,
          color: COLADO.ink, letterSpacing: '-0.018em',
          fontWeight: 400,
        }}>
          Three movements,<br/>
          <em>one quiet instrument.</em>
        </h2>
      </div>

      {/* Triptych canvas — camera is a scaled+translated layer */}
      <div style={{
        position: 'absolute',
        left: 0, top: 0,
        width: 1920, height: 1080,
        transform: `translate(${tx}px, ${ty}px) scale(${camScale})`,
        transformOrigin: 'center center',
        willChange: 'transform',
      }}>
        <div style={{
          position: 'absolute',
          left: 80, right: 80, top: 420,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 72,
        }}>
          {MOVEMENTS.map((m, i) => (
            <MovementCard key={m.roman} m={m} focused={focusIdx === i} index={i} localTime={localTime} />
          ))}
        </div>
      </div>

      {/* Bottom quote — only after wide pullback */}
      <BottomQuote localTime={localTime} />

      <Folio coord="Colado / Landing / Method Triptych III.A – C" idx="03" total="06" />
    </div>
  );
}

function MovementCard({ m, focused, index, localTime }) {
  // Entry stagger once the camera begins its tour
  const entryStart = 2.0 + index * 0.2;
  const entryT = clamp((localTime - entryStart) / 0.6, 0, 1);
  const eased = Easing.easeOutCubic(entryT);

  return (
    <article style={{
      display: 'flex', flexDirection: 'column', gap: 22,
      borderTop: `1px solid ${COLADO.hairline}`,
      paddingTop: 28,
      opacity: eased,
      transform: `translateY(${(1 - eased) * 24}px)`,
      willChange: 'transform, opacity',
      filter: focused ? 'none' : (focused === false && localTime > 2.6 ? 'opacity(1)' : 'none'),
    }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{
          fontFamily: FONTS.display,
          fontSize: 72, lineHeight: 1, color: COLADO.ink,
          fontWeight: 400,
        }}>{m.roman}</span>
        <Inst size={13} color={COLADO.inkSoft}>{m.label}</Inst>
      </header>

      <h3 style={{
        margin: 0,
        fontFamily: FONTS.display,
        fontSize: 52, lineHeight: 1.05,
        color: COLADO.ink, letterSpacing: '-0.01em',
        fontWeight: 400,
      }}>
        {m.title[0]}<br/>
        <em>{m.title[1]}</em>
      </h3>

      <p style={{
        margin: 0,
        fontFamily: FONTS.body, fontSize: 20, lineHeight: 1.5,
        color: COLADO.inkSoft, fontWeight: 400,
      }}>{m.body}</p>

      <footer style={{
        borderTop: `1px solid ${COLADO.hairlineSoft}`,
        paddingTop: 14, display: 'flex', flexDirection: 'column', gap: 4,
      }}>
        <span style={{ fontFamily: FONTS.mono, fontSize: 12, color: COLADO.inkSoft, letterSpacing: '0.04em' }}>{m.annotA}</span>
        <span style={{ fontFamily: FONTS.mono, fontSize: 12, color: COLADO.muted, letterSpacing: '0.04em' }}>{m.annotB}</span>
      </footer>
    </article>
  );
}

function BottomQuote({ localTime }) {
  const op = clamp((localTime - 13.8) / 1.2, 0, 1);
  if (op <= 0) return null;
  return (
    <div style={{
      position: 'absolute',
      left: 120, bottom: 120,
      opacity: op, transform: `translateY(${(1 - op) * 16}px)`,
      width: 1080,
      borderTop: `1px solid ${COLADO.hairline}`,
      paddingTop: 24,
    }}>
      <p style={{
        margin: 0,
        fontFamily: FONTS.display,
        fontSize: 54, lineHeight: 1.25,
        color: COLADO.inkSoft, fontWeight: 400,
      }}>
        The whole point is that you <em>stop choosing.</em>
      </p>
      <p style={{ marginTop: 16, fontFamily: FONTS.mono, fontSize: 12, letterSpacing: '0.22em', textTransform: 'uppercase', color: COLADO.muted }}>
        — design principle · internal memo, March 2026
      </p>
    </div>
  );
}

Object.assign(window, { SceneMovements });
