// scenes/01-collapse.jsx — 7.5 to 14s
// The exhale. Everything dims. The title "Stop planning. Start doing." types in.

function SceneCollapse({ start = 7.5, end = 14 }) {
  return (
    <Sprite start={start} end={end}>
      <SceneCollapseBody />
    </Sprite>
  );
}

function SceneCollapseBody() {
  const { localTime, duration } = useSprite();

  // Fade out the exiting "background" of prior anxiety — just keep clean paper
  const outT = clamp((localTime - (duration - 0.6)) / 0.6, 0, 1);
  const outOp = 1 - Easing.easeInCubic(outT);

  // RHYTHM PASS:
  // "Stop" lands DECISIVELY — snappy easeOutExpo, short entry
  const stopT = clamp((localTime - 0.3) / 0.55, 0, 1);
  const stopY = (1 - Easing.easeOutExpo(stopT)) * 28;
  // "Start doing." BREATHES — slow easeOutQuart, longer entry
  const startT = clamp((localTime - 1.5) / 1.3, 0, 1);
  const startY = (1 - Easing.easeOutQuart(startT)) * 20;

  const annT = clamp((localTime - 0.0) / 0.7, 0, 1);
  const annOut = clamp((localTime - 2.8) / 0.7, 0, 1);
  const annOp = Easing.easeOutSine(annT) * (1 - Easing.easeInCubic(annOut));

  // Strike-through: SHARP snap (easeOutExpo) — it's a decision, not a drift
  const sweepT = clamp((localTime - 2.0) / 0.55, 0, 1);
  const sweepW = Easing.easeOutExpo(sweepT) * 680;

  // Subline settles quietly — easeOutSine, longest of all
  const subT = clamp((localTime - 2.8) / 1.4, 0, 1);
  const subOp = Easing.easeOutSine(subT);

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: COLADO.paper,
      overflow: 'hidden',
      opacity: outOp,
    }}>
      <PaperGrain opacity={0.28} />
      <HeroFog opacity={1} />
      <Masthead leftSub="An instrument for the next move" right="Specimen I" rightSub="Hero" />

      <div style={{
        position: 'absolute',
        left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1440,
        display: 'flex', flexDirection: 'column',
        gap: 48,
      }}>
        {/* Fig marker + annotation */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: annOp }}>
          <Inst size={13} color={COLADO.muteSoft} style={{ letterSpacing: '0.18em', textTransform: 'uppercase' }}>Fig. I</Inst>
          <span style={{ color: COLADO.muteSoft }}>—</span>
          <Inst size={13}>An intelligent assistant for founders & students</Inst>
        </div>

        {/* Headline — two independent blocks in natural flow.
            Each is a plain div with real line-height; they can never collide.
            The entry transform is applied only to opacity (not translate) so
            layout flow is never fought. A subtle translate is added via a
            NESTED span so the block's reserved height is stable. */}
        <div style={{
          fontFamily: FONTS.display,
          fontSize: 148,
          lineHeight: 1.12,
          color: COLADO.ink,
          letterSpacing: '-0.018em',
          fontWeight: 400,
        }}>
          {/* Line 1 */}
          <div style={{
            display: 'block',
            position: 'relative',
            opacity: stopT,
            willChange: 'opacity',
          }}>
            <span style={{
              display: 'inline-block',
              transform: `translateY(${stopY}px)`,
              willChange: 'transform',
              position: 'relative',
            }}>
              Stop planning.
              {/* terracotta strike-through */}
              <span style={{
                position: 'absolute',
                left: 6, top: '54%',
                width: sweepW, height: 4,
                background: COLADO.signal,
                display: 'block',
                pointerEvents: 'none',
              }}/>
            </span>
          </div>
          {/* Line 2 — natural block flow, italic */}
          <div style={{
            display: 'block',
            fontStyle: 'italic',
            opacity: startT,
            willChange: 'opacity',
          }}>
            <span style={{
              display: 'inline-block',
              transform: `translateY(${startY}px)`,
              willChange: 'transform',
            }}>
              Start doing.
            </span>
          </div>
        </div>

        {/* Subline */}
        <div style={{
          opacity: subOp,
          fontFamily: FONTS.body,
          fontSize: 26,
          lineHeight: 1.45,
          color: COLADO.inkSoft,
          maxWidth: 760,
          fontWeight: 400,
          marginTop: 8,
        }}>
          Dump everything on your mind. Colado reads the context —
          deadlines, energy, what you actually have to finish — and hands back
          the single next move.
        </div>
      </div>

      <Folio coord="Colado / Landing / Hero · Coordinate I.A" idx="01" total="06" />
    </div>
  );
}

Object.assign(window, { SceneCollapse });
