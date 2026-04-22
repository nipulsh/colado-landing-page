// scenes/00-intro.jsx — 0 to 7.5s
// The chaos — NOT a tidy list. Fragments, corrections, strikethroughs,
// mid-word deletions, time jumps. A mind leaking onto paper.

function SceneIntro({ start = 0, end = 7.5 }) {
  // Each entry is a "beat". text can include tokens:
  //   [DEL n]    -- delete last n chars (backspace animation)
  //   [STRIKE]   -- mark the entire previous-line as struck through
  //   text continues after DEL
  // lineOp: 'type' (default) or 'strike' (retroactive strike on row index)
  const beats = [
    // row 0 — starts confident, then trails off
    { row: 0, t: 0.25, text: 'reply to investor — the one from tuesday', time: '14:32:04' },
    { row: 0, t: 1.10, action: 'delete', chars: 14 },
    { row: 0, t: 1.40, text: 'before she cools off' },

    // row 1 — fragment
    { row: 1, t: 1.55, text: 'pitch deck v7 (or 8??)', time: '14:32:18' },

    // row 2 — struck through
    { row: 2, t: 2.10, text: 'call design lead re: onboarding', time: '14:32:25' },
    { row: 2, t: 3.30, action: 'strike' },

    // row 3 — question
    { row: 3, t: 2.65, text: 'flight to bangalore — monday? tuesday?', time: '14:32:31' },

    // row 4 — decisive fragment
    { row: 4, t: 3.20, text: 'hiring doc. three candidates.', time: '14:32:44' },

    // row 5 — chaos creeps in
    { row: 5, t: 3.85, text: 'groceries', time: '14:32:52' },
    { row: 5, t: 4.35, text: '. somehow.' },

    // row 6 — correction mid-flight
    { row: 6, t: 4.20, text: 'follow-up with the enterpise', time: '14:33:01' },
    { row: 6, t: 4.80, action: 'delete', chars: 9 },
    { row: 6, t: 5.00, text: 'enterprise lead' },

    // row 7 — personal, raw
    { row: 7, t: 5.10, text: 'parents. rent. the form. the thing.', time: '14:33:12' },

    // row 8 — struck through (abandoned)
    { row: 8, t: 5.70, text: 'essay. the one.', time: '14:33:20' },
    { row: 8, t: 6.60, action: 'strike' },

    // row 9 — resignation
    { row: 9, t: 6.10, text: 'sleep?', time: '14:33:29' },
  ];

  return (
    <Sprite start={start} end={end}>
      <SceneIntroBody beats={beats} />
    </Sprite>
  );
}

// Given beats, compute the state of each row at localTime.
// Each row is built by replaying its beats in order, maintaining a committed
// string (fully-done prior beats) plus a partial for any in-progress beat.
function computeRowStates(beats, localTime, numRows = 10) {
  const rows = Array.from({ length: numRows }, () => ({
    committed: '', text: '', active: false, struck: false, time: '',
  }));

  // Group beats by row, sort by t
  const byRow = Array.from({ length: numRows }, () => []);
  for (const b of beats) byRow[b.row].push(b);
  for (const list of byRow) list.sort((a, b) => a.t - b.t);

  for (let i = 0; i < numRows; i++) {
    const r = rows[i];
    for (const beat of byRow[i]) {
      if (beat.t > localTime) break;
      if (beat.time && !r.time) r.time = beat.time;

      if (beat.action === 'strike') {
        r.struck = true;
        continue;
      }

      if (beat.action === 'delete') {
        const dur = Math.max(0.25, beat.chars * 0.03);
        const t = clamp((localTime - beat.t) / dur, 0, 1);
        const removed = Math.floor(beat.chars * t);
        if (t >= 1) {
          r.committed = r.committed.slice(0, Math.max(0, r.committed.length - beat.chars));
          r.active = false;
        } else {
          // In-progress deletion: show committed minus `removed` chars
          r.active = true;
          // Keep committed untouched; display is committed with tail trimmed
          r._pendingDelete = removed;
        }
        continue;
      }

      // type action
      const dur = Math.max(0.35, beat.text.length * 0.042);
      const t = clamp((localTime - beat.t) / dur, 0, 1);
      const n = Math.floor(beat.text.length * t);
      if (t >= 1) {
        r.committed = r.committed + beat.text;
        r.active = false;
      } else {
        r.active = true;
        r._pendingType = beat.text.slice(0, n);
      }
    }

    // Build display text
    let display = r.committed;
    if (r._pendingDelete) display = display.slice(0, Math.max(0, display.length - r._pendingDelete));
    if (r._pendingType) display = display + r._pendingType;
    r.text = display;
    delete r._pendingDelete;
    delete r._pendingType;
  }

  return rows;
}

function SceneIntroBody({ beats }) {
  const { localTime, duration } = useSprite();

  // Slow camera compression — zoom in while tension builds
  const zoom = interpolate([0, duration], [1.0, 1.055], Easing.easeInOutCubic)(localTime);

  // Exit fade-out
  const exitT = clamp((localTime - (duration - 0.6)) / 0.6, 0, 1);
  const outOpacity = 1 - Easing.easeInCubic(exitT);

  // Camera subtly shakes as more rows pile up (0 → 1.5px) — feels anxious
  const anxiety = clamp((localTime - 3) / 3, 0, 1);
  const shakeX = Math.sin(localTime * 11.3) * anxiety * 1.4;
  const shakeY = Math.cos(localTime * 9.7) * anxiety * 1.0;

  const rowStates = computeRowStates(beats, localTime, 10);

  // Count of rows that have committed text — determines spacing
  const totalRows = rowStates.filter(r => r.text.length > 0 || r.active).length;

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: COLADO.paper,
      overflow: 'hidden',
      opacity: outOpacity,
    }}>
      <PaperGrain opacity={0.3} />
      <HeroFog opacity={0.6} />
      <Masthead leftSub="What is on your mind — Tuesday, 14:32" rightSub="Capture" />

      <div style={{
        position: 'absolute',
        left: '50%', top: '50%',
        transform: `translate(calc(-50% + ${shakeX}px), calc(-50% + ${shakeY}px)) scale(${zoom})`,
        transformOrigin: 'center',
        width: 1280,
      }}>
        {/* Specimen header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
            <Inst size={14} color={COLADO.muteSoft} style={{ letterSpacing: '0.18em', textTransform: 'uppercase' }}>Fig. 0</Inst>
            <span style={{ color: COLADO.muteSoft }}>—</span>
            <Inst size={14}>Unfiltered capture · {totalRows.toString().padStart(2, '0')} entries</Inst>
          </div>
          <Inst size={13} color={COLADO.muteSoft} style={{ fontVariantNumeric: 'tabular-nums' }}>14:32 IST</Inst>
        </div>
        <Hairline />

        {/* Rows */}
        <div style={{ marginTop: 10 }}>
          {rowStates.map((r, i) => {
            if (!r.text && !r.active) return null;
            const isCurrent = r.active;
            const blink = Math.floor(localTime * 2.3) % 2 === 0;

            // Slight irregular indent for fragments — gives the list a "hand" feel
            const indent = (i === 1 || i === 4 || i === 7) ? 14 : 0;

            return (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '44px 110px 1fr',
                alignItems: 'baseline',
                padding: '13px 0',
                borderBottom: `1px solid ${COLADO.hairlineSoft}`,
                opacity: r.struck ? 0.48 : (isCurrent ? 1 : 0.78),
                transition: 'opacity 300ms',
                paddingLeft: indent,
              }}>
                <Inst size={11} color={COLADO.muteSoft} style={{ letterSpacing: '0.18em' }}>
                  {String(i + 1).padStart(2, '0')}
                </Inst>
                <Inst size={11} color={COLADO.muteSoft} caps={false} style={{
                  fontVariantNumeric: 'tabular-nums', letterSpacing: '0.08em',
                }}>
                  {r.time}
                </Inst>
                <span style={{
                  fontFamily: FONTS.body,
                  fontSize: 26, lineHeight: 1.35,
                  color: r.struck ? COLADO.muted : COLADO.ink,
                  fontWeight: 400,
                  position: 'relative',
                  display: 'inline-block',
                }}>
                  {r.text}
                  {isCurrent && (
                    <span style={{
                      display: 'inline-block',
                      width: 2, height: 26,
                      background: COLADO.signal,
                      marginLeft: 3,
                      verticalAlign: '-4px',
                      opacity: blink ? 1 : 0.15,
                    }}/>
                  )}
                  {/* Strike-through overlay */}
                  {r.struck && (
                    <span style={{
                      position: 'absolute',
                      left: 0, right: 0, top: '54%',
                      height: 1.5,
                      background: COLADO.signal,
                      opacity: 0.7,
                    }}/>
                  )}
                </span>
              </div>
            );
          })}
        </div>

        {/* Margin note — appears late, terracotta annotation */}
        <MarginNote localTime={localTime} />
      </div>

      <Folio coord="Colado / Landing / Capture · Coordinate 0.A" idx="00" total="06" />
    </div>
  );
}

function MarginNote({ localTime }) {
  const op = clamp((localTime - 5.5) / 0.8, 0, 1) * (1 - clamp((localTime - 7.0) / 0.4, 0, 1));
  if (op <= 0) return null;
  return (
    <div style={{
      position: 'absolute',
      right: -240, top: 320, width: 200,
      opacity: op,
      transform: `rotate(-2deg) translateY(${(1 - op) * 10}px)`,
      transformOrigin: 'left top',
    }}>
      <span style={{
        fontFamily: FONTS.mono, fontSize: 12, color: COLADO.signal,
        letterSpacing: '0.22em', textTransform: 'uppercase', fontWeight: 600,
      }}>§ — too much</span>
      <div style={{
        marginTop: 6, fontFamily: FONTS.display, fontStyle: 'italic',
        fontSize: 18, color: COLADO.inkSoft, lineHeight: 1.3,
      }}>
        which one do you do next?
      </div>
    </div>
  );
}

Object.assign(window, { SceneIntro });
