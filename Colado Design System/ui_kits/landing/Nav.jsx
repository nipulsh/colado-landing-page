/* global React */
const { useState } = React;

function Nav() {
  return (
    <header style={{position:"sticky",top:0,zIndex:50,borderBottom:"1px solid var(--hairline)",backdropFilter:"saturate(170%) blur(14px)",WebkitBackdropFilter:"saturate(170%) blur(14px)",background:"color-mix(in srgb, var(--bg) 78%, transparent)"}}>
      <nav style={{maxWidth:1280,margin:"0 auto",height:60,display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 48px"}}>
        <a href="#" style={{display:"flex",alignItems:"baseline",gap:16,textDecoration:"none",color:"var(--ink)"}}>
          <span className="display" style={{fontSize:24,lineHeight:1,letterSpacing:"-.02em"}}>Colado</span>
          <span className="inst-sm" style={{paddingLeft:4}}>Smooth composure · one next move</span>
        </a>
        <ul style={{display:"flex",gap:36,margin:0,padding:0,listStyle:"none"}}>
          <li><a href="#hero" style={{fontSize:13.5,color:"var(--muted)",textDecoration:"none"}}>Experience</a></li>
          <li><a href="#audience" style={{fontSize:13.5,color:"var(--muted)",textDecoration:"none"}}>Audience</a></li>
        </ul>
        <a href="#fin" style={{display:"inline-flex",alignItems:"center",height:36,padding:"0 18px",borderRadius:9999,background:"var(--ink)",color:"var(--paper)",fontSize:12.5,fontWeight:500,letterSpacing:".02em",textDecoration:"none"}}>Request access</a>
      </nav>
    </header>
  );
}
window.Nav = Nav;
