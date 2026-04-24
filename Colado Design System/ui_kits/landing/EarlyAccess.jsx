/* global React */
const { useState: useEarlyState } = React;

function EarlyAccess() {
  const [role, setRole] = useEarlyState("founder");
  const [done, setDone] = useEarlyState(false);
  const [name, setName] = useEarlyState("");
  const [email, setEmail] = useEarlyState("");
  const [phone, setPhone] = useEarlyState("");

  const submit = (e) => { e.preventDefault(); setDone(true); };

  return (
    <section id="fin" style={{borderTop:"1px solid var(--hairline)"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"128px 48px",display:"grid",gridTemplateColumns:"1.1fr 1fr",gap:80}}>
        <div style={{display:"flex",flexDirection:"column",gap:24,position:"relative"}}>
          <p className="section-mark">Fin.</p>
          <h2 className="display" style={{fontSize:112,lineHeight:1.03,margin:0}}>
            Get the <em>app.</em>
          </h2>
          <p style={{fontSize:18,lineHeight:1.55,color:"var(--ink-soft)",maxWidth:460,margin:0}}>
            Private beta — we bring people on weekly, in order, with no performance.
          </p>
          <p className="inst-sm" style={{textTransform:"none",letterSpacing:".04em",marginTop:16}}>
            We'll write when a spot opens. No drip campaigns. No hustle emails.
          </p>
        </div>
        <div style={{borderTop:"1px solid var(--hairline)",paddingTop:40}}>
          {done ? (
            <div style={{display:"flex",alignItems:"flex-start",gap:12,padding:"20px",border:"1px solid var(--hairline)",background:"var(--bg-elevated)",borderRadius:10}}>
              <span style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:28,height:28,borderRadius:"50%",background:"var(--accent-soft)",color:"var(--accent)"}}>✓</span>
              <div style={{display:"flex",flexDirection:"column",gap:4}}>
                <p style={{fontSize:16,color:"var(--ink)",margin:0}}>You're on the list.</p>
                <p className="inst-sm" style={{textTransform:"none",letterSpacing:".04em",margin:0}}>We'll be in touch when a spot opens.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} style={{display:"flex",flexDirection:"column",gap:24}}>
              <Field label="Name" value={name} onChange={setName} placeholder="Your name" />
              <Field label="Email" value={email} onChange={setEmail} placeholder="you@somewhere.com" />
              <Field label="Phone" value={phone} onChange={setPhone} placeholder="+91 98765 43210" />
              <fieldset style={{border:0,borderTop:"1px solid var(--hairline-soft)",paddingTop:20,margin:0,display:"flex",flexDirection:"column",gap:12}}>
                <legend className="inst-sm" style={{padding:0,marginBottom:8}}>I am</legend>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  {["founder","student","other"].map(r => (
                    <label key={r} style={{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 16px",borderRadius:9999,border:"1px solid "+(role===r?"var(--ink)":"var(--hairline)"),background:role===r?"var(--ink)":"var(--bg-elevated)",color:role===r?"var(--paper)":"var(--ink-soft)",fontSize:14,cursor:"pointer"}}>
                      <input type="radio" name="role" checked={role===r} onChange={() => setRole(r)} style={{position:"absolute",opacity:0}} />
                      <span>{r==="founder"?"A founder":r==="student"?"A student":"Other"}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <button type="submit" style={{display:"inline-flex",alignItems:"center",justifyContent:"center",gap:8,height:48,padding:"0 24px",borderRadius:9999,background:"var(--ink)",color:"var(--paper)",fontSize:15,fontWeight:500,border:0,cursor:"pointer",alignSelf:"flex-start"}}>
                Request access →
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({label, value, onChange, placeholder}) {
  return (
    <div style={{display:"flex",flexDirection:"column",gap:8}}>
      <label className="inst-sm">{label}</label>
      <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
        style={{height:46,border:0,borderBottom:"1px solid var(--hairline)",background:"transparent",fontSize:16,color:"var(--ink)",outline:"none"}} />
    </div>
  );
}
window.EarlyAccess = EarlyAccess;
