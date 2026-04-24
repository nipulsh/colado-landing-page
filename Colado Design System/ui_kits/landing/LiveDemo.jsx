/* global React */
const { useState: useDemoState } = React;

const DEFAULT_TASKS = [
  { id:1, text:"Reply to investor email", tag:"time-sensitive · 2 min · unblocks thread", label:"NOW" },
  { id:2, text:"Ship the pitch deck", tag:"deep focus · 90 min · high impact", label:"NEXT" },
  { id:3, text:"Call the design lead", tag:"can wait 24 hours", label:"THEN" },
  { id:4, text:"Book flight to Bangalore", tag:"admin · schedule this evening", label:"LATER" },
  { id:5, text:"Buy groceries", tag:"admin · this week", label:"ADMIN" },
];

function LiveDemo() {
  const [editing, setEditing] = useDemoState(false);
  const [input, setInput] = useDemoState("Reply to investor email, Ship the pitch deck, Call the design lead, Book flight to Bangalore, Buy groceries");
  const tasks = DEFAULT_TASKS;

  const pillStyle = (label) => {
    if (label === "NOW") return { background:"var(--signal-priority)", color:"#fff", border:"1px solid transparent" };
    const base = { background:"transparent", border:"1px solid var(--hairline)" };
    if (label === "NEXT") return { ...base, color:"var(--ink)" };
    if (label === "THEN") return { ...base, color:"var(--ink-soft)" };
    return { ...base, color:"var(--muted)" };
  };

  return (
    <figure style={{width:460,margin:0}} aria-label="Colado interactive demo">
      <div className="specimen-card demo-shadow" style={{overflow:"hidden"}}>
        {/* masthead */}
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"12px 20px",borderBottom:"1px solid var(--hairline)",background:"var(--bg-elevated)"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <span aria-hidden style={{display:"inline-block",width:6,height:6,borderRadius:"50%",background:"var(--signal-priority)"}} />
            <span className="inst-sm">What's on your mind</span>
          </div>
          <span className="folio tnum">Fig. I.a</span>
        </div>

        {editing && (
          <div style={{borderBottom:"1px solid var(--hairline)",padding:"14px 20px"}}>
            <textarea value={input} onChange={e => setInput(e.target.value)} rows={3}
              style={{width:"100%",resize:"none",border:0,background:"transparent",fontFamily:"var(--body)",fontSize:15,lineHeight:1.55,color:"var(--ink)",outline:"none"}} />
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:8,gap:12}}>
              <span className="inst-sm">Press Enter to rank</span>
              <button onClick={() => setEditing(false)}
                style={{display:"inline-flex",alignItems:"center",gap:6,height:32,padding:"0 14px",borderRadius:9999,background:"var(--accent)",color:"#fff",fontSize:12.5,fontWeight:500,border:0,cursor:"pointer"}}>
                Prioritize →
              </button>
            </div>
          </div>
        )}

        {/* list */}
        <div style={{background:"var(--bg-elevated)",padding:"4px 14px"}}>
          {tasks.map((t, i) => (
            <div key={t.id} style={{display:"grid",gridTemplateColumns:"28px 1fr auto",gap:12,padding:"12px 6px",borderBottom: i===tasks.length-1 ? "0" : "1px solid var(--hairline-soft)",alignItems:"start"}}>
              <span className="folio tnum" style={{paddingTop:4,color:"var(--mute-soft)"}}>{String(i+1).padStart(2,"0")}</span>
              <div style={{minWidth:0}}>
                <p style={{margin:0,fontSize:15.5,lineHeight:1.35,color:"var(--ink)",fontWeight: t.label==="NOW" ? 500 : 400}}>{t.text}</p>
                <p className="inst-sm" style={{margin:"4px 0 0",textTransform:"none",letterSpacing:".04em",color:"var(--muted)"}}>{t.tag}</p>
              </div>
              <span className="pill-label" style={{...pillStyle(t.label),display:"inline-flex",alignItems:"center",padding:"3px 10px",borderRadius:9999}}>{t.label}</span>
            </div>
          ))}
        </div>

        {/* footer */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"12px 20px",borderTop:"1px solid var(--hairline)",background:"var(--bg)"}}>
          <span className="inst-sm">Prioritized by Colado · <span className="tnum">14:32 IST</span></span>
          <div style={{display:"flex",gap:8}}>
            <button onClick={() => setEditing(true)} className="inst-sm" style={{display:"inline-flex",alignItems:"center",gap:6,height:28,padding:"0 12px",borderRadius:9999,border:"1px solid var(--hairline)",background:"transparent",cursor:"pointer"}}>✎ Rewrite</button>
            <button className="inst-sm" style={{display:"inline-flex",alignItems:"center",gap:6,height:28,padding:"0 12px",borderRadius:9999,border:"1px solid var(--hairline)",background:"transparent",cursor:"pointer"}}>↺ Reset</button>
          </div>
        </div>
      </div>
      <figcaption style={{display:"flex",justifyContent:"space-between",gap:16,padding:"12px 4px 0"}}>
        <span className="inst-sm">The instrument at rest</span>
        <span className="folio tnum">Fig. I.a</span>
      </figcaption>
    </figure>
  );
}
window.LiveDemo = LiveDemo;
