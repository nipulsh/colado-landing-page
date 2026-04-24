/* global React */
const { useState: useStateHero } = React;

function Hero() {
  return (
    <section id="hero" style={{position:"relative",overflow:"hidden"}}>
      <div className="hero-fog" aria-hidden style={{position:"absolute",inset:0,pointerEvents:"none"}} />
      <div style={{position:"relative",maxWidth:1280,margin:"0 auto",padding:"96px 48px 112px",display:"grid",gridTemplateColumns:"1.1fr 1fr",gap:64,alignItems:"center"}}>
        <div style={{display:"flex",flexDirection:"column",gap:28}}>
          <p style={{display:"flex",gap:8,alignItems:"center",margin:0}}>
            <span className="folio tnum">Fig. I</span>
            <span style={{color:"var(--mute-soft)"}}>—</span>
            <span className="inst-sm">An intelligent assistant for founders &amp; students</span>
          </p>
          <h1 className="display" style={{fontSize:80,lineHeight:1.02,margin:0}}>
            Stop planning. <em>Start doing.</em>
          </h1>
          <p style={{fontSize:19,lineHeight:1.55,color:"var(--ink-soft)",maxWidth:520,margin:0}}>
            When the list shouts, you stay smooth — one move at a time.
          </p>
          <div style={{display:"flex",gap:20,alignItems:"center",flexWrap:"wrap"}}>
            <a href="#fin" style={{display:"inline-flex",alignItems:"center",gap:8,height:48,padding:"0 24px",borderRadius:9999,background:"var(--ink)",color:"var(--paper)",fontSize:15,fontWeight:500,textDecoration:"none"}}>Get the app →</a>
            <a href="#live" style={{fontSize:15,color:"var(--ink-soft)",textDecoration:"none",display:"inline-flex",alignItems:"center",gap:6}}>
              <span style={{borderBottom:"1px solid rgba(42,43,39,.3)",paddingBottom:2}}>or try it below</span>↓
            </a>
          </div>
          <div style={{display:"flex",gap:16,alignItems:"center",paddingTop:12,borderTop:"1px solid var(--hairline)",marginTop:8}}>
            <span className="inst-sm">Used by</span>
            <span style={{fontSize:14,color:"var(--ink-soft)"}}>founders at early-stage startups <span style={{color:"var(--mute-soft)",margin:"0 6px"}}>·</span> students at IIT, BITS, Ashoka</span>
          </div>
        </div>
        <div style={{display:"flex",justifyContent:"flex-end"}}>
          <LiveDemo />
        </div>
      </div>
    </section>
  );
}
window.Hero = Hero;
