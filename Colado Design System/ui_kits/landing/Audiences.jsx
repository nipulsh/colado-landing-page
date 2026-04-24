/* global React */

const AUDIENCES = [
  { letter:"A", title:"The founder", byline:"ships weekly · raises occasionally · sleeps rarely", cases:[
    { title:"Fundraising week", body:"Investor threads, deck revisions, warm intros — ranked by who's about to go cold." },
    { title:"Hiring sprint", body:"Candidate replies, scheduling, references — nothing drops between two people's inboxes." },
    { title:"Launch day", body:"The forty-item checklist, sorted by what breaks if you skip it." },
    { title:"Deep work", body:"Knows when to leave you alone. Reopens the loop when you come back." },
  ]},
  { letter:"B", title:"The student", byline:"syllabus · side projects · the rest of their life", cases:[
    { title:"Exam season", body:"Mocks, revision, office hours — ordered by impact on your transcript." },
    { title:"Internship hunt", body:"Applications, follow-ups, deadlines — in the sequence most likely to return." },
    { title:"The side project", body:"Keeps the thread warm between classes so you don't lose the week." },
    { title:"Life, actually", body:"Rent, fees, forms, parents — handled before they turn into emergencies." },
  ]},
];

function Audiences() {
  return (
    <section id="audience" style={{borderTop:"1px solid var(--hairline)"}}>
      <div style={{maxWidth:1280,margin:"0 auto",padding:"128px 48px"}}>
        <div style={{display:"flex",flexDirection:"column",gap:24}}>
          <p className="section-mark">§ 02 — Audience</p>
          <h2 className="display" style={{fontSize:88,lineHeight:1.03,margin:0,maxWidth:960}}>
            For people<br/><em>who make things.</em>
          </h2>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:64,marginTop:96}}>
          {AUDIENCES.map(a => (
            <div key={a.letter} style={{borderTop:"1px solid var(--hairline)",paddingTop:32,display:"flex",flexDirection:"column",gap:32}}>
              <header style={{display:"flex",flexDirection:"column",gap:6}}>
                <p style={{display:"flex",alignItems:"baseline",gap:16,margin:0}}>
                  <span className="display" style={{fontSize:72,lineHeight:1}}>{a.letter}.</span>
                  <span className="inst inst-ink" style={{fontSize:16}}>{a.title}</span>
                </p>
                <p className="inst-sm" style={{textTransform:"none",letterSpacing:".04em",margin:0}}>{a.byline}</p>
              </header>
              <ul style={{margin:0,padding:0,listStyle:"none"}}>
                {a.cases.map((c, i, arr) => (
                  <li key={c.title} style={{display:"grid",gridTemplateColumns:"28px 1fr",gap:16,padding:"20px 0",borderBottom: i===arr.length-1 ? "0" : "1px solid var(--hairline-soft)",alignItems:"start"}}>
                    <span className="folio tnum" style={{paddingTop:6}}>{String(i+1).padStart(2,"0")}</span>
                    <div>
                      <h3 className="display" style={{fontSize:28,lineHeight:1.1,margin:0}}>{c.title}</h3>
                      <p style={{fontSize:15.5,lineHeight:1.55,color:"var(--ink-soft)",margin:"6px 0 0"}}>{c.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{marginTop:96,paddingTop:48,borderTop:"1px solid var(--hairline)",display:"flex",flexDirection:"column",gap:12}}>
          <p style={{display:"flex",gap:8,alignItems:"center",margin:0}}>
            <span className="inst inst-ink">Two audiences</span>
            <span style={{color:"var(--mute-soft)"}}>·</span>
            <span className="inst">One instrument</span>
          </p>
          <p className="display" style={{fontSize:52,lineHeight:1.22,color:"var(--ink-soft)",margin:0,maxWidth:900}}>
            The rhythms differ. The through-line — <em>one clear next move</em> — holds steady.
          </p>
        </div>
      </div>
    </section>
  );
}
window.Audiences = Audiences;
