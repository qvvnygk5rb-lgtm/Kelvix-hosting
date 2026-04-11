import { useState, useEffect, useRef } from "react";

const PAGES = ["etusivu","palvelut","hinnat","meista","yhteystiedot"];

/* ── ICONS ── */
const KeyIcon=({size=24})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>;
const HomeIcon=({size=24})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>;
const StarIcon=({size=24})=><svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;
const CheckIcon=({size=20})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20,6 9,17 4,12"/></svg>;
const PhoneIcon=({size=20})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const MailIcon=({size=20})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const ArrowIcon=({size=16})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>;
const ClockIcon=({size=24})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>;
const ShieldIcon=({size=24})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const TrendIcon=({size=24})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/><polyline points="17,6 23,6 23,12"/></svg>;
const MapIcon=({size=20})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const SparkleIcon=({size=24})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v1m0 16v1m-7.07-2.93l.7-.7m12.73-12.73l.7-.7M3 12h1m16 0h1m-2.93 7.07l-.7-.7M5.64 5.64l-.7-.7"/><circle cx="12" cy="12" r="4"/></svg>;
const HeartIcon=({size=24})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
const CameraIcon=({size=24})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>;
const GlobeIcon=({size=24})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;

/* ── COLORS (trustworthy, professional) ── */
const C = { primary:"#1B3A4B", accent:"#C17F3E", light:"#F7F5F2", card:"#FFFFFF", muted:"#8A9BAE", dark:"#0D1F2D", soft:"rgba(27,58,75,0.06)" };

export default function KelvixHosting() {
  const [page, setPage] = useState("etusivu");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({name:"",email:"",phone:"",message:"",service:"",address:""});
  const [formSent, setFormSent] = useState(false);
  const [vis, setVis] = useState({});
  const ref = useRef(null);

  useEffect(()=>{
    const h=()=>{if(ref.current) setScrollY(ref.current.scrollTop);};
    const el=ref.current; if(el) el.addEventListener("scroll",h);
    return()=>el&&el.removeEventListener("scroll",h);
  },[page]);

  useEffect(()=>{
    const obs=new IntersectionObserver(entries=>{
      entries.forEach(e=>{if(e.isIntersecting) setVis(p=>({...p,[e.target.dataset.s]:true}));});
    },{threshold:0.1});
    setTimeout(()=>{document.querySelectorAll("[data-s]").forEach(el=>obs.observe(el));},100);
    return()=>obs.disconnect();
  },[page]);

  const go=(p)=>{setPage(p);setMenuOpen(false);setVis({});if(ref.current) ref.current.scrollTop=0;};
  const fade=(id,d=0)=>({opacity:vis[id]?1:0,transform:vis[id]?"translateY(0)":"translateY(32px)",transition:`opacity 0.75s cubic-bezier(0.25,0.46,0.45,0.94) ${d}s, transform 0.75s cubic-bezier(0.25,0.46,0.45,0.94) ${d}s`});

  const W={maxWidth:1100,margin:"0 auto",padding:"0 clamp(16px,4vw,48px)"};
  const isMob=typeof window!=='undefined'&&window.innerWidth<768;

  const Chip=({children,light})=><span style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"3.5px",color:light?C.accent:C.accent,marginBottom:16,display:"inline-block"}}>{children}</span>;
  const H2=({children,style:s})=><h2 style={{fontSize:"clamp(28px,4vw,42px)",fontWeight:700,lineHeight:1.12,letterSpacing:"-1px",marginBottom:14,color:C.primary,...(s||{})}}>{children}</h2>;
  const Sub=({children})=><p style={{fontSize:16,lineHeight:1.75,color:C.muted,maxWidth:560,marginBottom:12}}>{children}</p>;
  const Btn=({children,onClick,style:s})=><button onClick={onClick} style={{display:"inline-flex",alignItems:"center",gap:9,background:C.primary,color:"#fff",padding:"15px 34px",borderRadius:50,fontSize:14.5,fontWeight:600,cursor:"pointer",border:"none",letterSpacing:"0.3px",transition:"transform 0.2s, box-shadow 0.3s",...(s||{})}}>{children}</button>;
  const BtnA=({children,onClick,style:s})=><button onClick={onClick} style={{display:"inline-flex",alignItems:"center",gap:9,background:C.accent,color:"#fff",padding:"15px 34px",borderRadius:50,fontSize:14.5,fontWeight:600,cursor:"pointer",border:"none",letterSpacing:"0.3px",...(s||{})}}>{children}</button>;
  const BtnO=({children,onClick})=><button onClick={onClick} style={{background:"transparent",color:C.primary,border:`2px solid ${C.primary}`,borderRadius:50,padding:"13px 28px",fontSize:14,fontWeight:600,cursor:"pointer",transition:"all 0.2s"}}>{children}</button>;
  const Li=({children})=><li style={{display:"flex",alignItems:"flex-start",gap:9,fontSize:13.5,lineHeight:1.65,color:"#555",marginBottom:10}}><span style={{color:C.accent,flexShrink:0,marginTop:2}}><CheckIcon size={14}/></span><span>{children}</span></li>;

  const inputStyle={width:"100%",padding:"14px 18px",border:`1px solid ${C.soft}`,borderRadius:12,fontSize:14.5,fontFamily:"inherit",background:"#fff",outline:"none",boxSizing:"border-box",marginBottom:16,transition:"border-color 0.2s"};

  /* ═══════════ ETUSIVU ═══════════ */
  const Etusivu=()=>(
    <>
      {/* HERO */}
      <section style={{display:"flex",flexDirection:"column",justifyContent:"center",position:"relative",...W,paddingTop:"clamp(40px,6vw,80px)",paddingBottom:32}} aria-label="Hero">
        <div style={{position:"absolute",width:700,height:700,borderRadius:"50%",background:`radial-gradient(circle,rgba(193,127,62,0.06) 0%,transparent 70%)`,top:-180,right:-250,pointerEvents:"none"}}/>
        <div style={{position:"absolute",width:400,height:400,borderRadius:"50%",background:`radial-gradient(circle,rgba(27,58,75,0.04) 0%,transparent 70%)`,bottom:-100,left:-150,pointerEvents:"none"}}/>
        <div style={{position:"relative",zIndex:1}}>
          <Chip>Airbnb &amp; Booking.com hosting &middot; Oulu</Chip>
          <h1 style={{fontSize:"clamp(32px,5.5vw,64px)",fontWeight:700,lineHeight:1.06,letterSpacing:"-2px",maxWidth:780,marginBottom:24,color:C.dark}}>
            Tuottaako{!isMob&&<br/>} omistamasi kiinteistö{!isMob&&<br/>} päänvaivaa<span style={{color:C.accent}}>?</span>
          </h1>
          <p style={{fontSize:"clamp(16px,2vw,19px)",lineHeight:1.75,color:C.muted,maxWidth:540,marginBottom:28}}>
            Lopeta stressaaminen. Anna meidän hoitaa kaikki – avainten luovutuksesta siivoukseen ja vierasviestintään. Sinun ainoa tehtäväsi on nauttia tuotoista tililtäsi.
          </p>
          <div style={{display:"flex",gap:14,flexWrap:"wrap"}}>
            <Btn onClick={()=>go("yhteystiedot")}>Pyydä ilmainen tuottoarvio <ArrowIcon/></Btn>
            <BtnO onClick={()=>go("palvelut")}>Katso palvelut</BtnO>
          </div>
        </div>
        <div style={{display:"flex",gap:"clamp(20px,4vw,56px)",marginTop:40,flexWrap:"wrap",position:"relative",zIndex:1}}>
          {[{v:"Oulu 2026",l:"Kulttuuripääkaupunki"},{v:"+33 %",l:"Majoituskysyntä kasvussa"},{v:"24/7",l:"Vieraspalvelu"}].map((s,i)=>(
            <div key={i}>
              <div style={{fontSize:"clamp(26px,3.5vw,40px)",fontWeight:700,color:C.accent,letterSpacing:"-1px"}}>{s.v}</div>
              <div style={{fontSize:12,color:C.muted,textTransform:"uppercase",letterSpacing:"1.5px",marginTop:3}}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* KIPUPISTEET */}
      <section data-s="pain" style={{...W,paddingTop:20,paddingBottom:56}} aria-label="Kipupisteet">
        <div style={fade("pain")}><Chip>Tunnistatko tämän?</Chip><H2>Vuokraus vie aikasi –<br/>vaikka tuottoa pitäisi tulla.</H2></div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,310px),1fr))",gap:22,marginTop:40}}>
          {[
            {icon:<KeyIcon size={26}/>,t:"Avaimet edestakaisin",txt:"Juokset luovuttamassa avaimia illalla, viikonloppuna ja lomallasi. Se vie tuntikausia joka viikko – ja silti tulee päällekkäisyyksiä ja myöhästymisiä."},
            {icon:<ClockIcon size={26}/>,t:"Viestit keskellä yötä",txt:"\"Mikä on WiFi-salasana?\" klo 23. \"Miten sauna toimii?\" klo 7 aamulla. Puhelimesi ei saa olla ikinä äänettömällä – tai arvostelut kärsivät."},
            {icon:<ShieldIcon size={26}/>,t:"Siivous, lakanat, huolto",txt:"Siivoojien koordinointi, liinavaatteiden pyykki, saippuat loppu, hana vuotaa, lamppu palanut – kaikki pitäisi hoitaa ennen seuraavaa vierasta."},
          ].map((p,i)=>(
            <div key={i} style={fade("pain",0.1+i*0.13)}>
              <div style={{background:C.card,borderRadius:16,padding:"32px 28px",border:`1px solid ${C.soft}`,height:"100%",transition:"box-shadow 0.3s, transform 0.3s"}}>
                <div style={{width:48,height:48,borderRadius:14,background:`rgba(193,127,62,0.08)`,color:C.accent,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16}}>{p.icon}</div>
                <div style={{fontSize:19,fontWeight:700,marginBottom:8,color:C.primary}}>{p.t}</div>
                <p style={{fontSize:14.5,lineHeight:1.7,color:"#666",margin:0}}>{p.txt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RATKAISU */}
      <section data-s="sol" style={{...W,paddingBottom:48}} aria-label="Ratkaisu">
        <div style={{...fade("sol"),background:`linear-gradient(135deg,${C.dark} 0%,${C.primary} 100%)`,borderRadius:24,padding:"clamp(32px,5vw,60px)",color:"#fff",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",width:300,height:300,borderRadius:"50%",background:"rgba(193,127,62,0.08)",top:-80,right:-80,pointerEvents:"none"}}/>
          <Chip light>Ratkaisu</Chip>
          <H2 style={{color:"#fff",maxWidth:600}}>Sinä nautit tuotoista.<br/>Me hoidamme kaiken muun.</H2>
          <p style={{fontSize:16,lineHeight:1.75,color:"rgba(255,255,255,0.6)",maxWidth:520,marginBottom:40}}>
            Kelvix Hosting on Oulun ensimmäinen ammattimainen lyhytvuokrauksen hosting-palvelu. Ulkoista meille niin paljon tai vähän kuin haluat – aloita vaikka pelkällä avainpalvelulla ja laajenna myöhemmin.
          </p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,200px),1fr))",gap:28}}>
            {[{v:"25 %",l:"Komissiota – maksat vain tuloksista"},{v:"+80 %",l:"Enemmän tuottoa kuin pitkävuokra"},{v:"0 h",l:"Sinun aikaasi – me hoidamme kaiken"}].map((s,i)=>(
              <div key={i} style={fade("sol",0.2+i*0.12)}>
                <div style={{fontSize:38,fontWeight:700,color:C.accent,letterSpacing:"-1px"}}>{s.v}</div>
                <div style={{fontSize:13,color:"rgba(255,255,255,0.4)",marginTop:6}}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MIKSI KELVIX */}
      <section data-s="why" style={{...W,paddingBottom:48}} aria-label="Miksi Kelvix">
        <div style={fade("why")}>
          <Chip>Miksi Kelvix?</Chip>
          <H2>Rakennettu Oululle.<br/>Pyöritetään Oulussa.</H2>
          <Sub>Emme ole etäfirma Helsingistä. Olemme täällä, tunnemme kaupungin ja reagoimme samana päivänä. Kiinteistösi on meille yhtä tärkeä kuin omamme.</Sub>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,240px),1fr))",gap:20,marginTop:40}}>
          {[
            {icon:<MapIcon size={22}/>,t:"Paikallinen ja nopea",txt:"Reagoimme ongelmatilanteisiin tuntien – emme päivien – sisällä. Tunnemme Oulun alueet, palvelut ja tapahtumakalenterin läpikotaisin."},
            {icon:<TrendIcon size={22}/>,t:"AI-pohjainen hinnoittelu",txt:"Algoritmimme seuraa Oulun kysyntää, kilpailijoiden hintoja ja tulevia tapahtumia reaaliajassa. Yöhintasi on aina optimaalinen."},
            {icon:<StarIcon size={22}/>,t:"Oulu2026-valmius",txt:"Kulttuuripääkaupunkivuosi tuo ennätysmäärän kansainvälisiä matkailijoita. Olemme valmiina maksimoimaan kohteesi tuoton koko vuoden ajan."},
            {icon:<ShieldIcon size={22}/>,t:"Nolla riskiä sinulle",txt:"Komissiomalli tarkoittaa, ettei sinulle tule kiinteitä kuluja. Jos emme tuota tulosta, emme veloita senttiäkään. Riski on meillä."},
          ].map((c,i)=>(
            <div key={i} style={{...fade("why",0.1+i*0.1),padding:"28px 0"}}>
              <div style={{width:48,height:48,borderRadius:14,background:C.soft,color:C.primary,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16}}>{c.icon}</div>
              <div style={{fontSize:17,fontWeight:700,marginBottom:8,color:C.primary}}>{c.t}</div>
              <p style={{fontSize:14,lineHeight:1.7,color:"#666",margin:0}}>{c.txt}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{...W,paddingBottom:56}} aria-label="CTA">
        <div style={{background:C.dark,borderRadius:24,padding:"clamp(32px,5vw,60px)",textAlign:"center",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",width:200,height:200,borderRadius:"50%",background:"rgba(193,127,62,0.06)",bottom:-60,left:-60,pointerEvents:"none"}}/>
          <h2 style={{fontSize:"clamp(22px,3.5vw,34px)",fontWeight:700,color:"#fff",marginBottom:14,letterSpacing:"-0.5px",position:"relative"}}>Lopeta päänvaiva. Aloita tuottaminen.</h2>
          <p style={{fontSize:15,color:"rgba(255,255,255,0.45)",maxWidth:460,margin:"0 auto 30px",position:"relative"}}>Kerro kohteestasi – saat ilmaisen tuottoarvion 24 tunnin sisällä. Ei sitoumuksia.</p>
          <BtnA onClick={()=>go("yhteystiedot")} style={{position:"relative"}}>Pyydä tuottoarvio</BtnA>
        </div>
      </section>
    </>
  );

  /* ═══════════ PALVELUT ═══════════ */
  const Palvelut=()=>(
    <section style={{...W,paddingTop:80,paddingBottom:40}} aria-label="Palvelut">
      <Chip>Palvelut</Chip>
      <H2>Valitse sinulle sopiva taso</H2>
      <Sub>Aloita vaikka pelkällä avainpalvelulla – tai anna meidän hoitaa kaikki. Sinun tarvitsee vain seurata tuottoja ja nauttia vapaa-ajastasi.</Sub>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,320px),1fr))",gap:22,marginTop:48,marginBottom:56}}>
        {/* AVAINPALVELU */}
        <div style={{background:C.card,borderRadius:18,padding:"36px 28px",border:`1px solid ${C.soft}`,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:0,right:20,background:C.primary,color:"#fff",fontSize:9,fontWeight:700,padding:"5px 14px",borderRadius:"0 0 8px 8px",textTransform:"uppercase",letterSpacing:"1.5px"}}>Helppo aloitus</div>
          <div style={{width:52,height:52,borderRadius:14,background:"rgba(193,127,62,0.08)",color:C.accent,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16,marginTop:8}}><KeyIcon size={28}/></div>
          <div style={{fontSize:21,fontWeight:700,marginBottom:6,color:C.primary}}>Avainpalvelu</div>
          <div style={{fontSize:15,fontWeight:600,color:C.accent,marginBottom:16}}>alk. 29 €/vaihto</div>
          <p style={{fontSize:14,lineHeight:1.7,color:"#666",marginTop:0,marginBottom:20}}>
            Se alkuperäinen kipupiste ratkaistuna. Ei enää avainten juoksupoikana toimimista – me hoidamme jokaisen vaihdon puolestasi, hymyssä suin.
          </p>
          <ul style={{listStyle:"none",padding:0,margin:0}}>
            <Li>Avainten luovutus vieraalle sovittuna aikana – ystävällisesti ja ammattimaisesti</Li>
            <Li>Vieraan henkilökohtainen vastaanotto ja opastus asuntoon: laitteiden käyttö, talon säännöt ja paikalliset vinkit</Li>
            <Li>Avainten vastaanotto check-outissa ja asunnon kunnon tarkistus</Li>
            <Li>Valokuvaraportti asunnon tilasta joka vaihdon jälkeen – näet heti, onko kaikki kunnossa</Li>
            <Li>Kuukausipaketti: 249 €/kk sisältäen 10 vaihtoa – lisävaihdot 22 €/kpl</Li>
          </ul>
        </div>

        {/* TÄYSI HALLINTA */}
        <div style={{background:C.card,borderRadius:18,padding:"36px 28px",border:`2px solid ${C.accent}`,position:"relative",overflow:"hidden",boxShadow:`0 8px 40px rgba(193,127,62,0.10)`}}>
          <div style={{position:"absolute",top:0,right:20,background:C.accent,color:"#fff",fontSize:9,fontWeight:700,padding:"5px 14px",borderRadius:"0 0 8px 8px",textTransform:"uppercase",letterSpacing:"1.5px"}}>Suosituin</div>
          <div style={{width:52,height:52,borderRadius:14,background:"rgba(193,127,62,0.08)",color:C.accent,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16,marginTop:8}}><HomeIcon size={28}/></div>
          <div style={{fontSize:21,fontWeight:700,marginBottom:6,color:C.primary}}>Täysi hallinta</div>
          <div style={{fontSize:15,fontWeight:600,color:C.accent,marginBottom:16}}>25 % komissiolla</div>
          <p style={{fontSize:14,lineHeight:1.7,color:"#666",marginTop:0,marginBottom:20}}>
            Avaimet käteen – kirjaimellisesti. Me hoidamme kaiken alusta loppuun. Sinun ainoa tehtäväsi on katsoa kuukausiraporttia ja nauttia tuotoista.
          </p>
          <ul style={{listStyle:"none",padding:0,margin:0}}>
            <Li>Ilmoitusten luonti, jatkuva optimointi ja näkyvyyden maksimointi Airbnb:ssä ja Booking.comissa</Li>
            <Li>Ammattimainen valokuvaus – laadukkaat kuvat, jotka erottuvat hakutuloksissa</Li>
            <Li>AI-pohjainen dynaaminen hinnoittelu – hinta optimoituu automaattisesti kysynnän, tapahtumien ja kilpailijoiden mukaan</Li>
            <Li>Vierasviestintä 24/7 suomeksi, englanniksi ja saksaksi: vastaamme jokaiseen kyselyyn nopeasti, hoidamme check-in-ohjeet, vastaamme kysymyksiin oleskelun aikana ja keräämme palautteen jälkikäteen</Li>
            <Li>Ystävällinen ja ammattimainen vieraiden vastaanotto – teemme vieraiden ensivaikutelmasta erinomaisen</Li>
            <Li>Ammattimainen ja yksityiskohtainen siivous jokaisen vieraan jälkeen: keittiö, kylpyhuone, makuuhuone, yleiset tilat, pinnat, lattiat – kaikki kiiltää</Li>
            <Li>Puhtaat liinavaatteet, pyyhkeet ja perustarvikkeet (saippua, shampoo, kahvi, WC-paperi) aina valmiina</Li>
            <Li>Huoltokoordinointi: jos jokin menee rikki, hoidamme korjauksen puolestasi</Li>
            <Li>Arvostelujen hallinta – vastaamme arvosteluihin ammattimaisesti ja nostamme näkyvyyttäsi</Li>
            <Li>Selkeä kuukausittainen tuottoraportti: näet tulot, kulut, käyttöasteen ja vertailun edellisvuoteen</Li>
            <Li>Oulu2026-tapahtumahinnoittelu: nostamme hintoja automaattisesti suurten tapahtumien aikaan</Li>
          </ul>
        </div>

        {/* KEVYT HALLINTA */}
        <div style={{background:C.card,borderRadius:18,padding:"36px 28px",border:`1px solid ${C.soft}`,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:0,right:20,background:C.primary,color:"#fff",fontSize:9,fontWeight:700,padding:"5px 14px",borderRadius:"0 0 8px 8px",textTransform:"uppercase",letterSpacing:"1.5px"}}>Itse tekeville</div>
          <div style={{width:52,height:52,borderRadius:14,background:C.soft,color:C.primary,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:16,marginTop:8}}><StarIcon size={28}/></div>
          <div style={{fontSize:21,fontWeight:700,marginBottom:6,color:C.primary}}>Kevyt hallinta</div>
          <div style={{fontSize:15,fontWeight:600,color:C.accent,marginBottom:16}}>15 % komissiolla</div>
          <p style={{fontSize:14,lineHeight:1.7,color:"#666",marginTop:0,marginBottom:20}}>
            Sinä hoidat fyysisen puolen – avaimet ja siivous. Me hoidamme kaiken digitaalisen: ilmoitukset, hinnoittelun, viestinnän ja arvostelut automaatilla.
          </p>
          <ul style={{listStyle:"none",padding:0,margin:0}}>
            <Li>Ilmoitusten luonti, hallinta ja jatkuva optimointi kaikilla alustoilla</Li>
            <Li>Dynaaminen hinnoittelu – yöhintasi mukautuu automaattisesti kysyntään</Li>
            <Li>Vierasviestintä 24/7: vastaamme kaikkiin viesteihin puolestasi, hoidamme check-in-ohjeet ja kysymykset oleskelun aikana</Li>
            <Li>Arvostelujen hallinta ja ammattimainen vastaaminen</Li>
            <Li>Kuukausittainen tuottoraportti</Li>
            <Li>Omistaja hoitaa itse siivouksen, avaimet ja tarvikkeet</Li>
          </ul>
        </div>
      </div>

      {/* LISÄPALVELUT */}
      <h3 style={{fontSize:22,fontWeight:700,marginBottom:24,color:C.primary}}>Lisäpalvelut</h3>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,320px),1fr))",gap:18,marginBottom:80}}>
        <div style={{background:C.card,borderRadius:14,padding:"28px 24px",border:`1px solid ${C.soft}`}}>
          <div style={{color:C.accent,marginBottom:12}}><CameraIcon size={24}/></div>
          <div style={{fontSize:16,fontWeight:700,marginBottom:4,color:C.primary}}>Ammattimainen valokuvaus</div>
          <div style={{fontSize:14,color:C.accent,marginBottom:10}}>250 €</div>
          <p style={{fontSize:13.5,lineHeight:1.65,color:"#666",margin:0}}>Laadukkaat, valoisan ja houkuttelevat kuvat kohteestasi. Kuvaamme jokaisen huoneen parhaasta kulmasta luonnonvalossa. Sisältää kuvien jälkikäsittelyn ja optimoinnin Airbnb:n ja Booking.comin vaatimuksiin. Hyvillä kuvilla varausprosessi voi nousta jopa 40 %.</p>
        </div>
        <div style={{background:C.card,borderRadius:14,padding:"28px 24px",border:`1px solid ${C.soft}`}}>
          <div style={{color:C.accent,marginBottom:12}}><GlobeIcon size={24}/></div>
          <div style={{fontSize:16,fontWeight:700,marginBottom:4,color:C.primary}}>Monikielinen ilmoitusoptimointi</div>
          <div style={{fontSize:14,color:C.accent,marginBottom:10}}>150 €/ilmoitus</div>
          <p style={{fontSize:13.5,lineHeight:1.65,color:"#666",margin:0}}>Kirjoitamme ilmoituksesi suomeksi, englanniksi ja saksaksi – ammattitasoisesti ja houkuttelevasti. Huomioimme jokaisen kielen hakusanat ja kulttuuriset erot, jotta kohteesi näkyy mahdollisimman laajalle yleisölle. Erityisen tärkeää Oulu2026-vuonna, kun kansainväliset matkailijat etsivät majoitusta.</p>
        </div>
      </div>
    </section>
  );

  /* ═══════════ HINNAT ═══════════ */
  const Hinnat=()=>(
    <section style={{...W,paddingTop:80,paddingBottom:40}} aria-label="Hinnat">
      <Chip>Hinnoittelu</Chip>
      <H2>Läpinäkyvä hinnoittelu.<br/>Ei yllätyksiä.</H2>
      <Sub>Komissiomalli: tienaamme vain silloin kun sinä tienaat. Riski on meillä – tuotot sinulla.</Sub>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,260px),1fr))",gap:18,marginTop:48,marginBottom:56}}>
        {[
          {f:false,lab:"Avainpalvelu",nm:"Perusvaihto",pr:"29 €",un:"per vaihto",ft:["Avainten luovutus ja vastaanotto","Ystävällinen vieraan opastus","Asunnon kunnon tarkistus","Valokuvaraportti omistajalle"]},
          {f:false,lab:"Avainpalvelu",nm:"Kuukausipaketti",pr:"249 €",un:"per kuukausi · sis. 10 vaihtoa",ft:["Kaikki perusvaihdon palvelut","10 vaihtoa kuukaudessa","Lisävaihdot vain 22 €/kpl","Ensisijainen palvelu"]},
          {f:true,lab:"Hosting",nm:"Täysi hallinta",pr:"25 %",un:"komissiota bruttovuokratulosta",ft:["Koko prosessi A:sta Ö:hön","Ilmoitukset, hinnoittelu, viestintä 24/7","Ammattimainen siivous ja liinavaatteet","Huoltokoordinointi ja ongelmanratkaisu","Arvostelujen hallinta","AI-tapahtumahinnoittelu"]},
          {f:false,lab:"Hosting",nm:"Kevyt hallinta",pr:"15 %",un:"komissiota bruttovuokratulosta",ft:["Ilmoitusten hallinta ja optimointi","Dynaaminen hinnoittelu","Vierasviestintä 24/7","Arvostelujen hallinta","Omistaja hoitaa fyysisen puolen"]},
        ].map((p,i)=>(
          <div key={i} style={{background:p.f?C.dark:C.card,color:p.f?"#fff":C.primary,borderRadius:20,padding:"36px 26px",border:p.f?"none":`1px solid ${C.soft}`,display:"flex",flexDirection:"column",position:"relative",boxShadow:p.f?"0 16px 50px rgba(0,0,0,0.15)":"0 1px 8px rgba(0,0,0,0.02)"}}>
            {p.f&&<div style={{position:"absolute",top:-1,left:"50%",transform:"translateX(-50%)",background:C.accent,color:"#fff",fontSize:9,fontWeight:700,padding:"5px 16px",borderRadius:"0 0 9px 9px",textTransform:"uppercase",letterSpacing:"1.5px"}}>Suosituin</div>}
            <div style={{fontSize:12,fontWeight:600,textTransform:"uppercase",letterSpacing:"2px",color:p.f?C.accent:C.muted,marginBottom:10}}>{p.lab}</div>
            <div style={{fontSize:22,fontWeight:700,marginBottom:6}}>{p.nm}</div>
            <div style={{fontSize:38,fontWeight:700,color:C.accent,letterSpacing:"-1px",marginBottom:2}}>{p.pr}</div>
            <div style={{fontSize:13,color:p.f?"rgba(255,255,255,0.4)":C.muted,marginBottom:24}}>{p.un}</div>
            {p.ft.map((ft,j)=><div key={j} style={{display:"flex",alignItems:"flex-start",gap:9,fontSize:13,lineHeight:1.6,color:p.f?"rgba(255,255,255,0.7)":"#555",marginBottom:9}}><span style={{color:C.accent,flexShrink:0}}><CheckIcon size={13}/></span>{ft}</div>)}
            <button style={{marginTop:"auto",paddingTop:22,background:p.f?C.accent:"transparent",color:p.f?"#fff":C.primary,border:p.f?"none":`2px solid ${C.primary}`,borderRadius:50,padding:"13px 22px",fontSize:13.5,fontWeight:600,cursor:"pointer",textAlign:"center",width:"100%",transition:"all 0.2s"}} onClick={()=>go("yhteystiedot")}>{p.f?"Pyydä tuottoarvio":"Ota yhteyttä"}</button>
          </div>
        ))}
      </div>

      {/* ESIMERKKILASKELMA */}
      <div data-s="calc" style={{...fade("calc"),background:C.card,borderRadius:20,padding:"clamp(24px,4vw,44px)",border:`1px solid ${C.soft}`,marginBottom:80}}>
        <h3 style={{fontSize:21,fontWeight:700,marginBottom:6,color:C.primary}}>Esimerkki: yksiö Oulun keskustassa</h3>
        <p style={{fontSize:13.5,color:C.muted,marginBottom:28}}>Yöhinta 85 €, käyttöaste 65 % – lyhytvuokra verrattuna pitkävuokraan</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,150px),1fr))",gap:14}}>
          {[{l:"Bruttotulo/kk",v:"~1 660 €"},{l:"Kelvix (25 %)",v:"~415 €"},{l:"Sinulle jää/kk",v:"~1 245 €",a:true},{l:"Pitkävuokra tuottaisi",v:"~650 €"},{l:"Lisätuottosi",v:"+91 %",a:true}].map((d,i)=>(
            <div key={i} style={{textAlign:"center",padding:14}}>
              <div style={{fontSize:11,color:C.muted,textTransform:"uppercase",letterSpacing:"1px",marginBottom:6}}>{d.l}</div>
              <div style={{fontSize:d.a?30:24,fontWeight:700,color:d.a?C.accent:C.primary}}>{d.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  /* ═══════════ MEISTÄ ═══════════ */
  const Meista=()=>(
    <section style={{...W,paddingTop:80,paddingBottom:40}} aria-label="Meistä">
      <Chip>Meistä</Chip>
      <H2>Emme ole ketjufirma.<br/>Olemme oululaisia.</H2>
      <Sub>Kelvix Hosting syntyi kun eräs asunnonomistaja totesi: "Oulussa ei ole ketään, joka hoitaisi tämän puolestani." Me päätimme olla se joku. Nyt sinun ei tarvitse tehdä muuta kuin nauttia tuotoista – me hoidamme kaiken muun.</Sub>

      <div data-s="steps" style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,240px),1fr))",gap:20,marginTop:48,marginBottom:56}}>
        {[
          {n:"01",t:"Kerro kohteestasi",txt:"Ota yhteyttä ja kerro asunnostasi. Teemme ilmaisen tuottoarvion – ei sitoumuksia, ei velvoitteita. Ei pientä pränttiä."},
          {n:"02",t:"Me valmistelemme kaiken",txt:"Valokuvaamme kohteen, luomme optimoidut ilmoitukset ja valmistelemme asunnon ensimmäisiä vieraita varten. Sinun ei tarvitse tehdä mitään."},
          {n:"03",t:"Varaukset alkavat tulla",txt:"Hoidamme kaiken viestinnän, avainten luovutuksen, siivouksen ja huollon. Sinä voit unohtaa koko homman – se on meidän työmme."},
          {n:"04",t:"Sinä nautit tuotoista",txt:"Rahat tilillesi, selkeä kuukausiraportti ja mielenrauha siitä, että asuntosi on hyvissä käsissä. Sinä vain nautit."},
        ].map((s,i)=>(
          <div key={i} style={{...fade("steps",0.05+i*0.12),padding:"24px 0"}}>
            <div style={{fontSize:56,fontWeight:700,color:`rgba(27,58,75,0.08)`,lineHeight:1,marginBottom:16,fontFamily:"'Georgia',serif"}}>{s.n}</div>
            <div style={{fontSize:17,fontWeight:700,marginBottom:8,color:C.primary}}>{s.t}</div>
            <p style={{fontSize:14,lineHeight:1.7,color:"#666",margin:0}}>{s.txt}</p>
          </div>
        ))}
      </div>

      <div style={{background:C.dark,borderRadius:24,padding:"clamp(32px,5vw,60px)",textAlign:"center",marginBottom:80,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",width:250,height:250,borderRadius:"50%",background:"rgba(193,127,62,0.06)",top:-80,right:-80,pointerEvents:"none"}}/>
        <h2 style={{fontSize:"clamp(22px,3.5vw,32px)",fontWeight:700,color:"#fff",marginBottom:14,letterSpacing:"-0.5px",position:"relative"}}>Asuntosi ansaitsee parempaa<br/>kuin tyhjää seisomista.</h2>
        <p style={{fontSize:15,color:"rgba(255,255,255,0.45)",maxWidth:480,margin:"0 auto 28px",position:"relative"}}>Aloita vaikka pelkällä avainpalvelulla – tai anna meidän hoitaa kaikki.</p>
        <BtnA onClick={()=>go("yhteystiedot")} style={{position:"relative"}}>Ota yhteyttä</BtnA>
      </div>
    </section>
  );

  /* ═══════════ YHTEYSTIEDOT ═══════════ */
  const Yhteystiedot=()=>(
    <section style={{...W,paddingTop:80,paddingBottom:40}} aria-label="Yhteystiedot">
      <Chip>Ota yhteyttä</Chip>
      <H2>Kerro kohteestasi</H2>
      <Sub>Vastaamme jokaiseen yhteydenottoon 24 tunnin sisällä ilmaisella tuottoarviolla. Ei sido sinua mihinkään.</Sub>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,300px),1fr))",gap:40,marginTop:44,marginBottom:80}}>
        <div>
          {formSent?(
            <div style={{background:`rgba(193,127,62,0.05)`,borderRadius:18,padding:44,textAlign:"center"}}>
              <div style={{fontSize:52,marginBottom:16,color:C.accent}}>&#10003;</div>
              <div style={{fontSize:22,fontWeight:700,marginBottom:8,color:C.primary}}>Kiitos yhteydenotostasi!</div>
              <p style={{color:"#666",fontSize:15}}>Palaamme asiaan 24 tunnin sisällä tuottoarviolla.</p>
            </div>
          ):(
            <>
              <input style={inputStyle} placeholder="Nimesi *" value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})}/>
              <input style={inputStyle} placeholder="Sähköposti *" type="email" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})}/>
              <input style={inputStyle} placeholder="Puhelinnumero" value={formData.phone} onChange={e=>setFormData({...formData,phone:e.target.value})}/>
              <input style={inputStyle} placeholder="Kohteen osoite (jos tiedossa)" value={formData.address} onChange={e=>setFormData({...formData,address:e.target.value})}/>
              <select style={{...inputStyle,appearance:"auto"}} value={formData.service} onChange={e=>setFormData({...formData,service:e.target.value})}>
                <option value="">Mikä palvelu kiinnostaa?</option>
                <option value="avainpalvelu">Avainpalvelu (alk. 29 €/vaihto)</option>
                <option value="taysi">Täysi hallinta (25 % komissio)</option>
                <option value="kevyt">Kevyt hallinta (15 % komissio)</option>
                <option value="en-tieda">En tiedä vielä – haluan tuottoarvion</option>
              </select>
              <textarea style={{...inputStyle,minHeight:120,resize:"vertical"}} placeholder="Kerro kohteestasi – missä päin Oulua, millainen asunto, mikä tilanne nyt..." value={formData.message} onChange={e=>setFormData({...formData,message:e.target.value})}/>
              <Btn onClick={()=>{if(formData.name&&formData.email) setFormSent(true);}} style={{width:"100%",justifyContent:"center"}}>Lähetä ja pyydä tuottoarvio</Btn>
            </>
          )}
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:22}}>
          <div style={{fontSize:20,fontWeight:700,color:C.primary}}>Kelvix Hosting</div>
          <p style={{fontSize:14.5,color:"#666",lineHeight:1.7,margin:0}}>Oulun ensimmäinen ammattimainen lyhytvuokrauksen hosting-palvelu. Sinä nautit tuotoista – me hoidamme kaiken muun.</p>
          {[{ic:<MailIcon/>,t:"info@kelvixhosting.fi"},{ic:<PhoneIcon/>,t:"+358 XX XXX XXXX"},{ic:<MapIcon/>,t:"Oulu ja lähialueet"}].map((c,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:13}}>
              <div style={{width:44,height:44,borderRadius:12,background:C.soft,color:C.primary,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{c.ic}</div>
              <span style={{fontSize:14.5,color:"#555"}}>{c.t}</span>
            </div>
          ))}
          <div style={{marginTop:8,padding:"20px 22px",background:`rgba(27,58,75,0.03)`,borderRadius:14,border:`1px solid ${C.soft}`}}>
            <div style={{fontSize:13,fontWeight:700,marginBottom:6,color:C.primary}}>Ilmainen tuottoarvio 24h sisällä</div>
            <p style={{fontSize:13,color:"#777",margin:0,lineHeight:1.6}}>Jokainen yhteydenotto saa henkilökohtaisen vastauksen tuottoarviolla. Ei sido sinua mihinkään – ei riskiä, ei velvoitteita.</p>
          </div>
        </div>
      </div>
    </section>
  );

  /* ═══════════ LAYOUT ═══════════ */
  return (
    <div style={{width:"100%",height:"100vh",display:"flex",flexDirection:"column",fontFamily:"'DM Sans','Helvetica Neue',sans-serif",background:C.light,color:C.primary,overflow:"hidden"}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700&display=swap" rel="stylesheet"/>
      <style>{`
        [data-s]{will-change:transform,opacity}
        button:hover{transform:translateY(-1px);box-shadow:0 4px 20px rgba(0,0,0,0.08)}
        button:active{transform:translateY(0)}
        input:focus,select:focus,textarea:focus{border-color:${C.accent}!important;box-shadow:0 0 0 3px rgba(193,127,62,0.08)}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        nav span[role="link"]:hover{color:${C.accent}!important}
      `}</style>

      <nav style={{position:"sticky",top:0,zIndex:100,background:scrollY>40?"rgba(247,245,242,0.97)":"transparent",backdropFilter:scrollY>40?"blur(24px)":"none",borderBottom:scrollY>40?`1px solid ${C.soft}`:"1px solid transparent",transition:"all 0.35s",padding:"0 clamp(16px,4vw,48px)"}} role="navigation" aria-label="Päänavigaatio">
        <div style={{maxWidth:1100,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:68}}>
          <div style={{fontSize:21,fontWeight:700,letterSpacing:"-0.5px",cursor:"pointer",display:"flex",alignItems:"center",gap:9,color:C.primary}} onClick={()=>go("etusivu")}>
            <span style={{color:C.accent}}><KeyIcon size={20}/></span>Kelvix<span style={{color:C.accent}}>Hosting</span>
          </div>
          {!isMob&&<div style={{display:"flex",gap:28,alignItems:"center"}}>{PAGES.map(p=><span key={p} role="link" tabIndex={0} style={{fontSize:13,fontWeight:page===p?600:400,cursor:"pointer",color:page===p?C.accent:C.muted,textTransform:"uppercase",letterSpacing:"1.5px",borderBottom:page===p?`2px solid ${C.accent}`:"2px solid transparent",paddingBottom:3,transition:"all 0.2s"}} onClick={()=>go(p)} onKeyDown={e=>e.key==='Enter'&&go(p)}>{p==="meista"?"Meistä":p.charAt(0).toUpperCase()+p.slice(1)}</span>)}</div>}
          {isMob&&<button style={{cursor:"pointer",background:"none",border:"none",padding:6}} onClick={()=>setMenuOpen(true)} aria-label="Avaa valikko"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={C.primary} strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg></button>}
        </div>
      </nav>

      {menuOpen&&<div style={{position:"fixed",inset:0,background:"rgba(247,245,242,0.98)",zIndex:200,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:30,animation:"fadeUp 0.3s ease"}} role="dialog">
        <button style={{position:"absolute",top:20,right:20,background:"none",border:"none",fontSize:32,cursor:"pointer",color:C.primary}} onClick={()=>setMenuOpen(false)}>&times;</button>
        {PAGES.map(p=><span key={p} role="link" tabIndex={0} style={{fontSize:22,fontWeight:600,cursor:"pointer",textTransform:"uppercase",letterSpacing:"3px",color:page===p?C.accent:C.primary}} onClick={()=>go(p)}>{p==="meista"?"Meistä":p.charAt(0).toUpperCase()+p.slice(1)}</span>)}
      </div>}

      <main ref={ref} style={{flex:1,overflowY:"auto",overflowX:"hidden"}}>
        {page==="etusivu"&&<Etusivu/>}
        {page==="palvelut"&&<Palvelut/>}
        {page==="hinnat"&&<Hinnat/>}
        {page==="meista"&&<Meista/>}
        {page==="yhteystiedot"&&<Yhteystiedot/>}

        <footer style={{borderTop:`1px solid ${C.soft}`,padding:"40px clamp(16px,4vw,48px)",textAlign:"center",fontSize:12,color:C.muted}}>
          <div style={{maxWidth:1100,margin:"0 auto"}}>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center",gap:7,marginBottom:12}}>
              <span style={{color:C.accent}}><KeyIcon size={15}/></span>
              <span style={{fontWeight:600,fontSize:13,color:C.primary}}>Kelvix Hosting</span>
            </div>
            <div>Kelvix Oy &middot; Oulu, Suomi &middot; Y-tunnus: XXXXXXX-X &middot; &copy; 2026</div>
            <nav style={{marginTop:10,fontSize:11,color:C.muted}} aria-label="Avainsanat">
              Airbnb-hallinnointi Oulu &middot; Booking.com-hallinnointi Oulu &middot; Lyhytaikainen vuokraus Oulu &middot; Avainpalvelu Oulu &middot; Airbnb hosting Oulu &middot; Vuokra-asunnon hallinta Oulu &middot; Oulu 2026 majoitus &middot; Kiinteistön hallinnointi Oulu
            </nav>
          </div>
        </footer>
      </main>
    </div>
  );
}
