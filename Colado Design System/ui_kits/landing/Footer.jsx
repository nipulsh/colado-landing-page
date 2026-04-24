/* global React */

function Footer() {
  return (
    <footer style={{borderTop:"1px solid var(--hairline)",background:"var(--bg)"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"80px 48px",display:"grid",gridTemplateColumns:"1.3fr 1fr 1fr",gap:48}}>
        <div>
          <a className="display" href="#" style={{fontSize:36,lineHeight:1,color:"var(--ink)",textDecoration:"none"}}>Colado</a>
          <p className="inst-sm" style={{marginTop:12}}>Smooth composure · one next move</p>
          <p style={{maxWidth:360,fontSize:15,lineHeight:1.55,color:"var(--ink-soft)",marginTop:24}}>
            The quiet second brain for founders and students: composed under load, one move at a time. Built with care, released in small waves.
          </p>
        </div>
        <div>
          <h4 className="inst">Contents</h4>
          <ul style={{listStyle:"none",margin:"20px 0 0",padding:0,display:"flex",flexDirection:"column",gap:12}}>
            <li><a href="#live" style={{fontSize:15,color:"var(--ink-soft)",textDecoration:"none"}}>Try it</a></li>
            <li><a href="#audience" style={{fontSize:15,color:"var(--ink-soft)",textDecoration:"none"}}>Audience</a></li>
            <li><a href="#fin" style={{fontSize:15,color:"var(--ink-soft)",textDecoration:"none"}}>Request access</a></li>
          </ul>
        </div>
        <div>
          <h4 className="inst">Correspondence</h4>
          <ul style={{listStyle:"none",margin:"20px 0 0",padding:0,display:"flex",flexDirection:"column",gap:12}}>
            <li><a href="mailto:hello@colado.in" style={{fontSize:15,color:"var(--ink-soft)",textDecoration:"none"}}>hello@colado.in</a></li>
            <li style={{display:"flex",gap:10,paddingTop:8}}>
              <a style={{width:32,height:32,borderRadius:"50%",border:"1px solid var(--hairline)",display:"inline-flex",alignItems:"center",justifyContent:"center",color:"var(--muted)"}}>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M17.5 3h2.9l-6.34 7.24L21.5 21h-5.85l-4.58-5.98L5.8 21H2.9l6.78-7.74L2.5 3h6l4.13 5.46L17.5 3zm-1.02 16h1.61L7.6 4.9H5.87L16.48 19z"/></svg>
              </a>
              <a style={{width:32,height:32,borderRadius:"50%",border:"1px solid var(--hairline)",display:"inline-flex",alignItems:"center",justifyContent:"center",color:"var(--muted)"}}>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.22 8h4.56v15H.22V8zm7.5 0h4.37v2.05h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 7v8.31h-4.56v-7.37c0-1.76-.03-4.02-2.45-4.02-2.45 0-2.83 1.91-2.83 3.89V23H7.72V8z"/></svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div style={{borderTop:"1px solid var(--hairline)"}}>
        <div style={{maxWidth:1280,margin:"0 auto",padding:"20px 48px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <p className="folio tnum" style={{margin:0}}>MMXXVI · Made with care · colado.in</p>
          <div style={{display:"flex",gap:24}}>
            <a className="inst-sm" href="#">Privacy</a>
            <a className="inst-sm" href="#">Terms</a>
            <a className="inst-sm" href="#hero">Return to top</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
window.Footer = Footer;
