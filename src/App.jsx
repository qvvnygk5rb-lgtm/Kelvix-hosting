import { useState, useEffect, useRef } from "react";
import { useForm } from "@formspree/react";
import {
  motion, AnimatePresence,
  useScroll, useTransform, useInView,
} from "framer-motion";
import "./App.css";

/* ── Constants ── */
const EMAIL = "ville@kelvixhosting.com";
const PHONE = "040 965 6825";
const PAGES = ["etusivu","palvelut","hinnat","meista","yhteystiedot","tietosuoja"];
const LABELS = { etusivu:"Etusivu", palvelut:"Palvelut", hinnat:"Hinnat", meista:"Meistä", yhteystiedot:"Yhteystiedot", tietosuoja:"Tietosuoja" };

const OULU_IMAGES = [
  "https://upload.wikimedia.org/wikipedia/commons/a/a7/Oulu_Skyline_20120128.JPG",
  "https://upload.wikimedia.org/wikipedia/commons/0/0a/Kaijonharju_elokuussa_2019.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/0/00/Kuusisaari_Oulu_20120115.JPG",
  "https://upload.wikimedia.org/wikipedia/commons/7/78/Kiviniemi_harbour.JPG",
];

const PARALLAX_IMG_1 = "https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=1920&q=80";
const PARALLAX_IMG_2 = "https://upload.wikimedia.org/wikipedia/commons/7/78/Kiviniemi_harbour.JPG";

/* ── Icons ── */
const KeyIcon = ({s=22,c="currentColor"}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>;
const Arrow = ({s=16}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>;
const Check = ({s=14}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20,6 9,17 4,12"/></svg>;
const Phone = ({s=20}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const Mail = ({s=20}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const MapPin = ({s=20}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const TrendUp = ({s=22}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/><polyline points="17,6 23,6 23,12"/></svg>;
const Star = ({s=22}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;
const Shield = ({s=22}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const Clock = ({s=22}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>;
const Home = ({s=24}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>;
const Camera = ({s=24}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>;
const Globe = ({s=24}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;
const Plus = ({s=16}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const Sparkle = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.35 8.65L23 11l-8.65 2.35L12 22l-2.35-8.65L1 11l8.65-2.35L12 0z"/></svg>;
const MsgSquare = ({s=22}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
const Handshake = ({s=22}) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;

/* ── Animated counter ── */
function AnimNum({ value, prefix = "", suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf;
    const dur = 1600, t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / dur, 1);
      const e = 1 - Math.pow(1 - p, 3);
      setN(Math.round(e * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return <span ref={ref}>{prefix}{n}{suffix}</span>;
}

/* ── Parallax image section ── */
function ParallaxImg({ src, height = "58vh", overlay = true, children }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);
  return (
    <div ref={ref} style={{ overflow: "hidden", height, position: "relative" }}>
      <motion.div style={{ y, position: "absolute", inset: "-18%", backgroundImage: `url(${src})`, backgroundSize: "cover", backgroundPosition: "center" }} />
      {overlay && <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(3,7,16,0.45) 0%,rgba(3,7,16,0.25) 50%,rgba(3,7,16,0.5) 100%)" }} />}
      {children && <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1 }}>{children}</div>}
    </div>
  );
}

/* ── Reveal wrapper ── */
const R = ({ children, delay = 0, y = 40, style: s }) => (
  <motion.div initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-70px" }} transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay }} style={s}>
    {children}
  </motion.div>
);

/* ── Stagger container ── */
const Stagger = ({ children, stagger = 0.1, style: s }) => (
  <motion.div variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }} style={s}>
    {children}
  </motion.div>
);
const StaggerItem = ({ children, style: s }) => (
  <motion.div variants={{ hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } }} style={s}>
    {children}
  </motion.div>
);

/* ── Main component ── */
export default function KelvixHosting() {
  const [page, setPage] = useState("etusivu");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [faqOpen, setFaqOpen] = useState(null);
  const spotRef = useRef(null);
  const { scrollY } = useScroll();

  useEffect(() => scrollY.on("change", v => setScrolled(v > 50)), [scrollY]);

  const go = (p) => { setPage(p); setMenuOpen(false); setFaqOpen(null); window.scrollTo({ top: 0, behavior: "instant" }); };

  const W = { maxWidth: 1280, margin: "0 auto", padding: "0 clamp(20px,5vw,64px)" };

  /* ── Shared UI ── */
  const Chip = ({ children, dark }) => (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 20, padding: "6px 14px", borderRadius: 999, background: dark ? "rgba(255,255,255,0.07)" : "rgba(224,107,0,0.1)", border: dark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(206,136,64,0.2)" }}>
      <span style={{ color: "#E06B00" }}><Sparkle /></span>
      <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "2.2px", color: "#E06B00" }}>{children}</span>
    </div>
  );

  const H2 = ({ children, light, style: s }) => (
    <h2 style={{ fontSize: "clamp(30px,4.8vw,56px)", fontWeight: 700, lineHeight: 1.06, letterSpacing: "-1.6px", margin: "0 0 20px", color: light ? "#fff" : "#0C2340", ...(s || {}) }}>
      {children}
    </h2>
  );

  const BtnOrange = ({ children, onClick, full, style: s }) => (
    <motion.button className="kx-shine" whileHover={{ scale: 1.025, y: -2 }} whileTap={{ scale: 0.97 }} onClick={onClick}
      style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "#E06B00", color: "#fff", padding: "16px 32px", borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: "pointer", border: "none", letterSpacing: "0.1px", width: full ? "100%" : undefined, justifyContent: full ? "center" : undefined, ...(s || {}) }}>
      {children}
    </motion.button>
  );

  const BtnDark = ({ children, onClick, style: s }) => (
    <motion.button className="kx-shine" whileHover={{ scale: 1.025, y: -2 }} whileTap={{ scale: 0.97 }} onClick={onClick}
      style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "#0C2340", color: "#fff", padding: "16px 32px", borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: "pointer", border: "none", letterSpacing: "0.1px", ...(s || {}) }}>
      {children}
    </motion.button>
  );

  const BtnOutline = ({ children, onClick }) => (
    <motion.button whileHover={{ background: "#0C2340", color: "#fff", y: -1, boxShadow: "0 10px 28px rgba(15,42,61,0.18)" }} onClick={onClick}
      style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "transparent", color: "#0C2340", border: "1.5px solid rgba(15,42,61,0.28)", borderRadius: 999, padding: "15px 30px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
      {children}
    </motion.button>
  );

  const Li = ({ children }) => (
    <li style={{ display: "flex", alignItems: "flex-start", gap: 9, fontSize: 13.5, lineHeight: 1.65, color: "#555", marginBottom: 10 }}>
      <span style={{ color: "#E06B00", flexShrink: 0, marginTop: 2 }}><Check /></span>
      <span>{children}</span>
    </li>
  );

  const inp = { width: "100%", padding: "14px 18px", border: "1px solid rgba(12,35,64,0.14)", borderRadius: 12, fontSize: 15, background: "#fff", marginBottom: 14, display: "block", fontFamily: "'DM Sans',sans-serif" };

  /* ══════════════════════════════════════
     ETUSIVU
  ══════════════════════════════════════ */
  const Etusivu = () => (
    <>
      {/* ── HERO ── */}
      <section
        style={{ position: "relative", overflow: "hidden", minHeight: "94vh", display: "flex", flexDirection: "column", background: "linear-gradient(180deg,#030710 0%,#0C2340 55%,#14305A 100%)" }}
        onMouseMove={(e) => { if (!spotRef.current) return; const r = e.currentTarget.getBoundingClientRect(); const x = ((e.clientX-r.left)/r.width*100).toFixed(1)+"%"; const y = ((e.clientY-r.top)/r.height*100).toFixed(1)+"%"; spotRef.current.style.background = `radial-gradient(560px circle at ${x} ${y}, rgba(206,136,64,0.18) 0%, transparent 55%)`; }}
      >
        <div className="kx-orb kx-orb-1" />
        <div className="kx-orb kx-orb-2" />
        <div className="kx-orb kx-orb-3" />

        {/* Oulu slideshow */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
          {OULU_IMAGES.map((src, i) => (
            <div key={i} className="kx-hero-slide" style={{ backgroundImage: `url(${src})`, animationDelay: `${i*7}s` }} />
          ))}
        </div>

        {/* Overlays — NOTE: spotlight z-index 1 is BELOW text (z-index 3), so text never disappears */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(5,15,28,0.58) 0%,rgba(5,15,28,0.32) 45%,rgba(5,15,28,0.72) 100%)", zIndex: 1, pointerEvents: "none" }} />
        <div ref={spotRef} style={{ position: "absolute", inset: 0, background: "radial-gradient(560px circle at 60% 35%, rgba(206,136,64,0.18) 0%, transparent 55%)", zIndex: 1, pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.06 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")", opacity: 1, mixBlendMode: "overlay", zIndex: 2, pointerEvents: "none" }} />

        {/* Hero content — z-index 3 ensures it's always above overlays */}
        <div style={{ ...W, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", zIndex: 3, paddingTop: "clamp(72px,10vw,140px)", paddingBottom: "clamp(40px,6vw,72px)" }}>
          <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center", width: "100%" }}>

            <div style={{ animation: "kxHeroIn 0.75s cubic-bezier(0.16,1,0.3,1) 0.05s both" }}>
              <Chip dark>Airbnb &amp; Booking.com · Oulu 2026</Chip>
            </div>

            <h1 style={{ fontSize: "clamp(42px,7.5vw,100px)", fontWeight: 700, lineHeight: 1.0, letterSpacing: "clamp(-2px,-0.03em,-3px)", margin: "0 0 28px", color: "#fff", textShadow: "0 6px 40px rgba(0,0,0,0.3)" }}>
              <span className="kx-word" style={{ animationDelay: ".14s" }}>Tuottaako</span>{" "}
              <span className="kx-word" style={{ animationDelay: ".22s" }}>kiinteistösi</span>
              <br />
              <span className="kx-word" style={{ animationDelay: ".31s", color: "#F08820", fontStyle: "italic" }}>päänvaivaa</span>
              <span className="kx-word" style={{ animationDelay: ".38s" }}>?</span>
            </h1>

            <div style={{ animation: "kxHeroIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.52s both" }}>
              <p style={{ fontSize: "clamp(15px,1.65vw,19px)", lineHeight: 1.75, color: "rgba(255,255,255,0.8)", maxWidth: 620, margin: "0 auto 24px", textShadow: "0 2px 20px rgba(0,0,0,0.25)" }}>
                Kelvix Hosting hoitaa kaiken – avainten luovutuksesta AI-hinnoitteluun ja 24/7 vieraspalveluun. Oululainen premium-isännöinti lyhytvuokraajille, jotka haluavat tuoton ilman päänvaivaa.
              </p>
            </div>

            <div style={{ animation: "kxHeroIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.68s both", display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 8 }}>
              <BtnOrange onClick={() => go("yhteystiedot")}>Pyydä tarjousta <Arrow /></BtnOrange>
              <motion.button whileHover={{ background: "rgba(255,255,255,0.12)", borderColor: "rgba(255,255,255,0.38)" }} onClick={() => go("palvelut")}
                style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(16px)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.2)", borderRadius: 999, padding: "15px 30px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                Katso palvelut
              </motion.button>
            </div>

            <div style={{ animation: "kxHeroIn 0.8s cubic-bezier(0.16,1,0.3,1) 0.84s both", display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginTop: 36 }}>
              {["Ei kiinteitä kuluja","24 h vastausaika","Nolla riskiä"].map((t, i) => (
                <div key={i} className="kx-pill" style={{ animationDelay: `${1+i*0.14}s` }}>
                  <span style={{ color: "#F08820" }}><Check s={12} /></span>{t}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ ...W, position: "relative", zIndex: 3, width: "100%", paddingBottom: "clamp(28px,4vw,56px)" }}>
          <div style={{ animation: "kxHeroIn 0.7s cubic-bezier(0.16,1,0.3,1) 1s both", borderTop: "1px solid rgba(255,255,255,0.13)", borderBottom: "1px solid rgba(255,255,255,0.13)", padding: "30px 0", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: 20 }}>
            {[
              { pre: "", val: 25, suf: " %", l: "Komissio – vain tuloksista" },
              { pre: "+", val: 80, suf: " %", l: "Enemmän kuin pitkävuokra" },
              { pre: "", val: 0, suf: "", extra: "24/7", l: "Vieraspalvelu 3 kielellä" },
              { pre: "", val: 0, suf: " €", l: "Kiinteitä kuluja sinulle" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 700, color: "#F08820", letterSpacing: "-1px", lineHeight: 1 }}>
                  {s.extra || <AnimNum value={s.val} prefix={s.pre} suffix={s.suf} />}
                </div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "1.5px", marginTop: 8 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM "Tunnistatko tämän?" ── */}
      <section style={{ ...W, paddingTop: "clamp(72px,9vw,120px)", paddingBottom: "clamp(56px,7vw,96px)" }}>
        <R style={{ textAlign: "center", marginBottom: 52 }}>
          <Chip>Tunnistatko tämän?</Chip>
          <H2>Vuokraus vie aikaasi –<br /><em style={{ color: "#E06B00", fontStyle: "italic" }}>vaikka tuottoa pitäisi tulla</em>.</H2>
        </R>
        <Stagger style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: 18 }}>
          {[
            { icon: <KeyIcon s={24} />, t: "Avaimet edestakaisin", txt: "Juokset luovuttamassa avaimia illalla, viikonloppuna ja lomallasi. Se vie tuntikausia joka viikko – ja silti tulee päällekkäisyyksiä ja stressiä." },
            { icon: <Clock s={24} />, t: "Viestit keskellä yötä", txt: "\"Mikä on WiFi-salasana?\" klo 23. \"Miten sauna toimii?\" klo 7 aamulla. Puhelimesi ei saa olla ikinä äänettömällä." },
            { icon: <Shield s={24} />, t: "Siivous, lakanat, huolto", txt: "Siivoojien koordinointi, liinavaatteiden pyykki, saippuat loppu, hana vuotaa – kaikki pitäisi hoitaa ennen seuraavaa vierasta." },
          ].map((p, i) => (
            <StaggerItem key={i}>
              <motion.div className="kx-card-hover" whileHover={{ borderColor: "rgba(206,136,64,0.3)" }} style={{ background: "#fff", borderRadius: 20, padding: "clamp(28px,4vw,44px)", border: "1px solid rgba(12,35,64,0.09)", height: "100%" }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(224,107,0,0.1)", color: "#E06B00", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>{p.icon}</div>
                <div style={{ fontSize: 19, fontWeight: 700, marginBottom: 12, color: "#0C2340", letterSpacing: "-0.3px" }}>{p.t}</div>
                <p style={{ fontSize: 14.5, lineHeight: 1.78, color: "#666", margin: 0 }}>{p.txt}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ── SOLUTION (dark, animated numbers) ── */}
      <section style={{ ...W, paddingBottom: "clamp(56px,7vw,88px)" }}>
        <R>
          <div style={{ background: "linear-gradient(135deg,#030710 0%,#0C2340 58%,#14305A 100%)", borderRadius: 24, padding: "clamp(48px,7vw,88px)", position: "relative", overflow: "hidden" }}>
            <div className="kx-grain" />
            <div style={{ position: "absolute", width: 440, height: 440, borderRadius: "50%", background: "radial-gradient(circle,rgba(206,136,64,0.18),transparent 70%)", top: -140, right: -100, pointerEvents: "none", animation: "kxBlob1 13s ease-in-out infinite" }} />
            <div style={{ position: "absolute", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle,rgba(206,136,64,0.08),transparent 70%)", bottom: -100, left: -60, pointerEvents: "none", animation: "kxBlob2 16s ease-in-out infinite" }} />
            <div style={{ position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
              <Chip dark>Ratkaisu</Chip>
              <H2 light>Sinä nautit tuotoista.<br /><em style={{ color: "#F08820", fontStyle: "italic" }}>Me hoidamme kaiken muun</em>.</H2>
              <p style={{ fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,255,0.62)", maxWidth: 500, margin: "0 auto 52px" }}>
                Ulkoista meille niin paljon tai vähän kuin haluat – aloita vaikka pelkällä avainpalvelulla ja laajenna myöhemmin.
              </p>
              <Stagger style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 32, marginBottom: 44 }}>
                {[
                  { pre: "", val: 25, suf: " %", l: "Komissiota – vain tuloksista" },
                  { pre: "+", val: 80, suf: " %", l: "Enemmän kuin pitkävuokra" },
                  { pre: "", val: 0, suf: " h", l: "Sinun aikaasi" },
                ].map((s, i) => (
                  <StaggerItem key={i}>
                    <div style={{ fontSize: "clamp(36px,5vw,60px)", fontWeight: 700, color: "#F08820", letterSpacing: "-2px", lineHeight: 1 }}>
                      <AnimNum value={s.val} prefix={s.pre} suffix={s.suf} />
                    </div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", marginTop: 8, textTransform: "uppercase", letterSpacing: "1.4px" }}>{s.l}</div>
                  </StaggerItem>
                ))}
              </Stagger>
              <BtnOrange onClick={() => go("palvelut")}>Tutustu palveluihin <Arrow /></BtnOrange>
            </div>
          </div>
        </R>
      </section>

      {/* ── PARALLAX IMAGE 1 ── */}
      <ParallaxImg src={PARALLAX_IMG_1} height="55vh">
        <R>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: "clamp(18px,2.5vw,28px)", fontWeight: 700, color: "#fff", letterSpacing: "-0.5px", textShadow: "0 2px 20px rgba(0,0,0,0.5)", marginBottom: 20 }}>
              Oululainen palvelu, oululainen osaaminen
            </p>
            <BtnOrange onClick={() => go("yhteystiedot")} style={{ padding: "14px 28px", fontSize: 14 }}>Pyydä tarjousta <Arrow /></BtnOrange>
          </div>
        </R>
      </ParallaxImg>

      {/* ── WHY KELVIX ── */}
      <section style={{ ...W, paddingTop: "clamp(72px,9vw,120px)", paddingBottom: "clamp(56px,7vw,96px)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 560, height: 560, borderRadius: "50%", background: "radial-gradient(circle,rgba(206,136,64,0.04),transparent 70%)", top: 60, right: -200, pointerEvents: "none", animation: "kxBlob1 14s ease-in-out infinite" }} />
        <R style={{ textAlign: "center", marginBottom: 56 }}>
          <Chip>Miksi Kelvix?</Chip>
          <H2>Rakennettu Oululle.<br /><em style={{ color: "#E06B00", fontStyle: "italic" }}>Pyöritetään Oulussa</em>.</H2>
          <p style={{ fontSize: "clamp(15px,1.6vw,18px)", lineHeight: 1.78, color: "#5A7088", maxWidth: 520, margin: "0 auto" }}>Emme ole etäfirma Helsingistä. Olemme täällä, tunnemme kaupungin ja reagoimme samana päivänä.</p>
        </R>
        <Stagger style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))", gap: 40 }}>
          {[
            { icon: <MapPin s={22} />, t: "Paikallinen ja nopea", txt: "Reagoimme ongelmatilanteisiin tuntien – emme päivien – sisällä. Tunnemme Oulun alueet, palvelut ja tapahtumakalenterin läpikotaisin." },
            { icon: <TrendUp s={22} />, t: "AI-pohjainen hinnoittelu", txt: "Algoritmimme seuraa kysyntää, kilpailijoiden hintoja ja tulevia tapahtumia reaaliajassa. Yöhintasi on aina optimaalinen." },
            { icon: <Star s={22} />, t: "Oulu2026-valmius", txt: "Kulttuuripääkaupunkivuosi tuo ennätysmäärän kansainvälisiä matkailijoita. Maksimoimme tuottosi koko vuoden." },
            { icon: <Shield s={22} />, t: "Nolla riskiä sinulle", txt: "Komissiomalli: ei kiinteitä kuluja. Jos emme tuota tulosta, emme veloita senttiäkään. Riski on meillä." },
            { icon: <MsgSquare s={22} />, t: "24/7 vierasviestintä", txt: "Vastaamme jokaiseen viestiä, kysymykseen ja hätätilanteeseen – suomeksi, englanniksi ja saksaksi." },
            { icon: <TrendUp s={22} />, t: "Läpinäkyvä raportointi", txt: "Kuukausittainen selkeä raportti: tulot, käyttöaste, arvostelut ja vertailu edellisiin kuukausiin." },
          ].map((c, i) => (
            <StaggerItem key={i}>
              <div className="kx-feat">
                <div className="kx-feat-icon">{c.icon}</div>
                <div style={{ width: 32, height: 2, background: "#E06B00", marginBottom: 14, borderRadius: 2 }} />
                <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, color: "#0C2340", letterSpacing: "-0.2px" }}>{c.t}</div>
                <p style={{ fontSize: 14, lineHeight: 1.74, color: "#666", margin: 0 }}>{c.txt}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ── PROCESS ── */}
      <section style={{ ...W, paddingBottom: "clamp(56px,7vw,96px)", borderTop: "1px solid rgba(12,35,64,0.09)", paddingTop: "clamp(72px,9vw,120px)" }}>
        <R style={{ textAlign: "center", marginBottom: 56 }}>
          <Chip>Näin aloitat tuottamisen</Chip>
          <H2>Neljä askelta <em style={{ color: "#E06B00", fontStyle: "italic" }}>vaivattomaan</em> tuottoon.</H2>
        </R>
        <Stagger style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))", gap: 32 }}>
          {[
            { n: "01", t: "Pyydä tarjous (1 min)", txt: "Täytä lomake tai soita. Saat räätälöidyn tuottoarvion kohteestasi 24 tunnin sisällä – ilmaiseksi ja sitoumuksetta." },
            { n: "02", t: "Tutustumme kohteeseesi (24h)", txt: "Käymme kohteessa, arvioimme sen potentiaalin ja käymme kaikki yksityiskohdat läpi henkilökohtaisesti." },
            { n: "03", t: "Allekirjoitamme sopimuksen", txt: "Selkeä yhteistyösopimus ilman piilokuluja. Komissio vain toteutuneista tuloista – ei kiinteitä maksuja." },
            { n: "04", t: "Ensimmäinen varaus muutamassa päivässä", txt: "Kuvaamme, luomme ilmoitukset ja käynnistämme. Tyypillisesti ensimmäiset varaukset 5–10 päivässä aloituksesta." },
          ].map((s, i) => (
            <StaggerItem key={i}>
              <div className="kx-proc-step" style={{ paddingTop: 8 }}>
                <div className="kx-proc-num">{s.n}</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: "#0C2340", letterSpacing: "-0.3px", marginBottom: 10 }}>{s.t}</div>
                <p style={{ fontSize: 14, lineHeight: 1.74, color: "#666", margin: 0 }}>{s.txt}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ── MARQUEE ── */}
      <section style={{ padding: "38px 0", background: "#F7F9FC", borderTop: "1px solid rgba(12,35,64,0.09)", borderBottom: "1px solid rgba(12,35,64,0.09)", overflow: "hidden" }}>
        <div style={{ ...W, display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap" }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "2.2px", color: "#5A7088", flexShrink: 0 }}>Kohteesi löytyy täältä</div>
          <div className="kx-marquee" style={{ flex: 1, minWidth: 0 }}>
            <div className="kx-track">
              {[...["Airbnb","Booking.com","VRBO","Expedia","Tripadvisor","Hotels.com","Agoda"],...["Airbnb","Booking.com","VRBO","Expedia","Tripadvisor","Hotels.com","Agoda"]].map((name, i) => (
                <div key={i} style={{ fontSize: 19, fontWeight: 700, color: "#0C2340", opacity: 0.45, whiteSpace: "nowrap", paddingRight: 60, letterSpacing: "-0.3px" }}>{name}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PARALLAX IMAGE 2 ── */}
      <ParallaxImg src={PARALLAX_IMG_2} height="48vh" />

      {/* ── PRICING PREVIEW ── */}
      <section style={{ ...W, paddingTop: "clamp(72px,9vw,120px)", paddingBottom: "clamp(56px,7vw,96px)" }}>
        <R style={{ textAlign: "center", marginBottom: 52 }}>
          <Chip>Hinnoittelu</Chip>
          <H2>Läpinäkyvä hinnoittelu.<br /><em style={{ color: "#E06B00", fontStyle: "italic" }}>Ei yllätyksiä</em>.</H2>
          <p style={{ fontSize: 16, color: "#5A7088", lineHeight: 1.75 }}>Komissiomalli: tienaamme vain silloin kun sinä tienaat.</p>
        </R>
        <Stagger style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: 20, marginBottom: 40 }}>
          {[
            { featured: false, top: "Helppo aloitus", t: "Avainpalvelu", pr: "29 €", un: "/ vaihto  tai  249 €/kk", items: ["Avainten luovutus & vastaanotto","Ammattimainen vieraan vastaanotto","Asunnon kunnon tarkistus","Valokuvaraportti joka vaihdon jälkeen"] },
            { featured: true,  top: "Suosituin", t: "Täysi hallinta", pr: "25 %", un: "komissiota – kaikki mukana", items: ["Ilmoitukset + AI-hinnoittelu","Vierasviestintä 24/7 (FI/EN/DE)","Ammattimainen siivous + liinavaatteet","Huoltokoordinointi & arvostelut","Kuukausittainen tuottoraportti"] },
            { featured: false, top: "Itse tekeville", t: "Kevyt hallinta", pr: "15 %", un: "komissiota – digitaalinen puoli", items: ["Ilmoitusten hallinta & optimointi","Dynaaminen hinnoittelu","Vierasviestintä 24/7","Arvostelujen hallinta","Omistaja hoitaa siivouksen & avaimet"] },
          ].map((p, i) => (
            <StaggerItem key={i}>
              <motion.div className={`kx-card-hover${p.featured ? " kx-card-featured" : ""}`}
                style={{ background: p.featured ? "#030710" : "#fff", borderRadius: 20, padding: "clamp(28px,4vw,44px)", border: p.featured ? "none" : "1px solid rgba(12,35,64,0.09)", height: "100%", display: "flex", flexDirection: "column", position: "relative", boxShadow: p.featured ? "0 16px 50px rgba(0,0,0,0.18)" : "none" }}>
                {p.featured && <div style={{ position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)", background: "#E06B00", color: "#fff", fontSize: 9, fontWeight: 700, padding: "5px 18px", borderRadius: "0 0 10px 10px", textTransform: "uppercase", letterSpacing: "1.5px" }}>Suosituin</div>}
                <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "2px", color: p.featured ? "#E06B00" : "#5A7088", marginBottom: 10, marginTop: p.featured ? 8 : 0 }}>{p.top}</div>
                <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: p.featured ? "#fff" : "#0C2340" }}>{p.t}</div>
                <div style={{ fontSize: 44, fontWeight: 700, color: "#E06B00", letterSpacing: "-2px", lineHeight: 1, marginBottom: 4 }}>{p.pr}</div>
                <div style={{ fontSize: 13, color: p.featured ? "rgba(255,255,255,0.4)" : "#5A7088", marginBottom: 24 }}>{p.un}</div>
                {p.items.map((it, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 9, fontSize: 13, lineHeight: 1.6, color: p.featured ? "rgba(255,255,255,0.72)" : "#555", marginBottom: 9 }}>
                    <span style={{ color: "#E06B00", flexShrink: 0 }}><Check s={13} /></span>{it}
                  </div>
                ))}
                <div style={{ marginTop: "auto", paddingTop: 24 }}>
                  <BtnOrange onClick={() => go("yhteystiedot")} full>Pyydä tarjousta <Arrow /></BtnOrange>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
        <R style={{ textAlign: "center" }}>
          <BtnOutline onClick={() => go("hinnat")}>Katso kaikki hinnat <Arrow /></BtnOutline>
        </R>
      </section>

      {/* ── FAQ ── */}
      <section style={{ ...W, paddingBottom: "clamp(56px,7vw,96px)", borderTop: "1px solid rgba(12,35,64,0.09)", paddingTop: "clamp(72px,9vw,120px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: 64, alignItems: "start" }}>
          <R>
            <Chip>Kysyttyä</Chip>
            <H2 style={{ textAlign: "left" }}>Usein kysytyt<br /><em style={{ color: "#E06B00", fontStyle: "italic" }}>kysymykset</em>.</H2>
            <p style={{ fontSize: 15, color: "#5A7088", lineHeight: 1.75, marginTop: 16, maxWidth: 340 }}>Etkö löydä vastausta? Ota yhteyttä – vastaamme 24 h sisällä.</p>
            <div style={{ marginTop: 24 }}><BtnOutline onClick={() => go("yhteystiedot")}>Ota yhteyttä <Arrow /></BtnOutline></div>
          </R>
          <R delay={0.12}>
            {[
              { q: "Kuinka nopeasti voitte aloittaa?", a: "Tyypillisesti 5–10 päivää yhteydenotosta ensimmäisiin varauksiin. Käymme kohteessa, kuvaamme sen ammattimaisesti, luomme optimoidut ilmoitukset ja käynnistämme kampanjat." },
              { q: "Mitä jos taloyhtiö kieltää lyhytvuokrauksen?", a: "Tarkista ensin taloyhtiön yhtiöjärjestys ja hallituksen kannan. Avustamme tarvittaessa neuvotteluissa ja vastaamme tavallisimpiin huoliin (turvallisuus, häiriöt). Monet kielot ovat tulkinnanvaraisia." },
              { q: "Miten avainten luovutus toimii ilman älylukkoja?", a: "Hoituu – käymme itse luovuttamassa avaimet tai käytämme turvallista avainlaatikkoa. Avainpalvelu on yksi erikoisuuksistamme: se on sujuvaa, ammattimaista ja henkilökohtaista." },
              { q: "Mitä jos kohteessani sattuu vahinko?", a: "Airbnb AirCover kattaa jopa 3 M€ asti omaisuusvahingot. Booking.com:lla on oma vakuutusjärjestelmänsä. Me dokumentoimme jokaisen vaihdon, reklamoimme ja hoidamme korvauksen puolestasi." },
              { q: "Kuinka paljon kohteeni tuottaa Oulussa?", a: "Oulun yksiö tuottaa lyhytvuokrauksessa tyypillisesti 1 200–2 000 €/kk ennen komissiotamme, kun käyttöaste on 60–75 %. Oulu2026-vuonna kasvupotentiaali on erityisen suuri. Saat ilmaisen arvion meiltä." },
              { q: "Onko sopimuksessa pitkä sitoutumisaika?", a: "Ei. Yhteistyö perustuu kuukausi kerrallaan -malliin – ei pitkiä sitoutumisia. Voit lopettaa yhteistyön 30 päivän irtisanomisajalla milloin tahansa." },
              { q: "Hoidatteko myös verot ja kirjanpidon?", a: "Emme ole kirjanpitäjiä, mutta annamme selkeät kuukausiraportit kaikista tuloista, jotka tilitoit verottajalle. Suosittelemme käyttämään omaa tilitoimistoa veroilmoitukseen." },
              { q: "Mitä tapahtuu, jos en ole tyytyväinen?", a: "Puhumme asiasta ensin. Jos yhteistyö ei toimi, voit irtisanoa sopimuksen 30 päivän ilmoitusajalla. Ei sakkomaksuja, ei lukituksia. Asiakkaamme pysyvät koska haluavat – ei koska pakko." },
            ].map((item, i) => (
              <div key={i} style={{ borderBottom: "1px solid rgba(12,35,64,0.09)", padding: "22px 4px" }}>
                <button aria-expanded={faqOpen === i} onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                  style={{ width: "100%", background: "none", border: "none", padding: 0, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 18, cursor: "pointer", textAlign: "left", color: "#0C2340", fontSize: "clamp(15px,1.6vw,17px)", fontWeight: 600, letterSpacing: "-0.2px", fontFamily: "'DM Sans',sans-serif" }}>
                  <span>{item.q}</span>
                  <motion.span animate={{ background: faqOpen === i ? "#E06B00" : "rgba(12,35,64,0.06)", color: faqOpen === i ? "#fff" : "#0C2340", rotate: faqOpen === i ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Plus s={14} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {faqOpen === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }} style={{ overflow: "hidden" }}>
                      <p style={{ paddingTop: 14, fontSize: 14.5, lineHeight: 1.78, color: "#555", margin: 0 }}>{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </R>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ background: "linear-gradient(160deg,#030710 0%,#0C2340 58%,#14305A 100%)", padding: "clamp(80px,11vw,140px) clamp(20px,5vw,60px)", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.07 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")", mixBlendMode: "overlay", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(206,136,64,0.12),transparent 70%)", bottom: -150, left: "50%", transform: "translateX(-50%)", pointerEvents: "none", animation: "kxBlob1 16s ease-in-out infinite" }} />
        <R style={{ maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <Chip dark>Valmis aloittamaan?</Chip>
          <h2 style={{ fontSize: "clamp(30px,4.8vw,56px)", fontWeight: 700, lineHeight: 1.06, letterSpacing: "-1.6px", margin: "0 0 20px", color: "#fff" }}>
            Lopeta päänvaiva.<br /><em style={{ color: "#F08820", fontStyle: "italic" }}>Aloita tuottaminen</em>.
          </h2>
          <p style={{ fontSize: "clamp(15px,1.6vw,18px)", lineHeight: 1.78, color: "rgba(255,255,255,0.62)", maxWidth: 520, margin: "0 auto 36px" }}>
            Kerro kohteestasi – saat ilmaisen tarjouksen 24 tunnin sisällä. Ei sitoumuksia.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 44 }}>
            <BtnOrange onClick={() => go("yhteystiedot")}>Pyydä tarjousta <Arrow /></BtnOrange>
            <motion.button whileHover={{ background: "rgba(255,255,255,0.12)", borderColor: "rgba(255,255,255,0.38)" }} onClick={() => go("hinnat")}
              style={{ background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.2)", borderRadius: 999, padding: "15px 30px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
              Katso hinnat
            </motion.button>
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
            <a href={`tel:${PHONE.replace(/\s/g,"")}`} style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.72)", textDecoration: "none", fontSize: 15, fontWeight: 500 }}>
              <span style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}><Phone s={18} /></span>{PHONE}
            </a>
            <a href={`mailto:${EMAIL}`} style={{ display: "flex", alignItems: "center", gap: 10, color: "rgba(255,255,255,0.72)", textDecoration: "none", fontSize: 15, fontWeight: 500 }}>
              <span style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}><Mail s={18} /></span>{EMAIL}
            </a>
          </div>
        </R>
      </section>
    </>
  );

  /* ══════════════════════════════════════
     PALVELUT
  ══════════════════════════════════════ */
  const Palvelut = () => (
    <section style={{ ...W, paddingTop: "clamp(64px,8vw,100px)", paddingBottom: 80 }}>
      <R style={{ marginBottom: 56, textAlign: "center" }}>
        <Chip>Palvelut</Chip>
        <H2>Valitse sinulle sopiva taso</H2>
        <p style={{ fontSize: 16, color: "#5A7088", lineHeight: 1.75, maxWidth: 560, margin: "0 auto" }}>Aloita vaikka pelkällä avainpalvelulla – tai anna meidän hoitaa kaikki.</p>
      </R>
      <Stagger style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))", gap: 22, marginBottom: 60 }}>
        {[
          { top: "Helppo aloitus", icon: <KeyIcon s={28} />, t: "Avainpalvelu", pr: "alk. 29 €/vaihto", desc: "Se alkuperäinen kipupiste ratkaistuna. Ei enää avainten juoksupoikana toimimista.", items: ["Avainten luovutus vieraalle sovittuna aikana","Henkilökohtainen vastaanotto ja opastus asuntoon","Avainten vastaanotto check-outissa ja kunnon tarkistus","Valokuvaraportti joka vaihdon jälkeen","Kuukausipaketti: 249 €/kk (10 vaihtoa), lisävaihdot 22 €/kpl"], feat: false },
          { top: "Suosituin", icon: <Home s={28} />, t: "Täysi hallinta", pr: "25 % komissiolla", desc: "Me hoidamme kaiken alusta loppuun. Sinun ainoa tehtäväsi on seurata raporttia.", items: ["Ilmoitusten luonti, optimointi ja näkyvyyden maksimointi","Ammattimainen valokuvaus","AI-pohjainen dynaaminen hinnoittelu","Vierasviestintä 24/7 (FI/EN/DE)","Ammattimainen siivous jokaisen vieraan jälkeen","Puhtaat liinavaatteet ja perustarvikkeet","Huoltokoordinointi","Arvostelujen hallinta","Oulu2026-tapahtumahinnoittelu","Kuukausittainen tuottoraportti"], feat: true },
          { top: "Itse tekeville", icon: <Star s={28} />, t: "Kevyt hallinta", pr: "15 % komissiolla", desc: "Sinä hoidat fyysisen puolen. Me hoidamme kaiken digitaalisen.", items: ["Ilmoitusten luonti, hallinta ja optimointi","Dynaaminen hinnoittelu","Vierasviestintä 24/7","Arvostelujen hallinta","Kuukausittainen tuottoraportti","Omistaja hoitaa itse siivouksen ja avaimet"], feat: false },
        ].map((p, i) => (
          <StaggerItem key={i}>
            <motion.div className={`kx-card-hover${p.feat ? " kx-card-featured" : ""}`}
              style={{ background: "#fff", borderRadius: 20, padding: "36px 28px", border: p.feat ? "2px solid #E06B00" : "1px solid rgba(12,35,64,0.09)", position: "relative", overflow: "hidden", height: "100%", display: "flex", flexDirection: "column", boxShadow: p.feat ? "0 8px 40px rgba(206,136,64,0.14)" : "none" }}>
              <div style={{ position: "absolute", top: 0, right: 20, background: p.feat ? "#E06B00" : "#0C2340", color: "#fff", fontSize: 9, fontWeight: 700, padding: "5px 14px", borderRadius: "0 0 8px 8px", textTransform: "uppercase", letterSpacing: "1.5px" }}>{p.top}</div>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(224,107,0,0.1)", color: "#E06B00", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, marginTop: 8 }}>{p.icon}</div>
              <div style={{ fontSize: 21, fontWeight: 700, marginBottom: 6, color: "#0C2340" }}>{p.t}</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#E06B00", marginBottom: 14 }}>{p.pr}</div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "#666", marginBottom: 20 }}>{p.desc}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", flex: 1 }}>{p.items.map((it, j) => <Li key={j}>{it}</Li>)}</ul>
              <BtnOrange onClick={() => go("yhteystiedot")} full>Pyydä tarjousta <Arrow /></BtnOrange>
            </motion.div>
          </StaggerItem>
        ))}
      </Stagger>
      <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 22, color: "#0C2340" }}>Lisäpalvelut</h3>
      <Stagger style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))", gap: 18 }}>
        {[
          { icon: <Camera s={24} />, t: "Ammattimainen valokuvaus", pr: "250 €", txt: "Laadukkaat, valoisan ja houkuttelevat kuvat kohteestasi. Hyvillä kuvilla varausprosessi voi nousta jopa 40 %." },
          { icon: <Globe s={24} />, t: "Monikielinen ilmoitusoptimointi", pr: "150 €/ilmoitus", txt: "Kirjoitamme ilmoituksesi suomeksi, englanniksi ja saksaksi. Erityisen tärkeää Oulu2026-vuonna." },
        ].map((s, i) => (
          <StaggerItem key={i}>
            <div style={{ background: "#fff", borderRadius: 14, padding: "28px 24px", border: "1px solid rgba(12,35,64,0.09)" }}>
              <div style={{ color: "#E06B00", marginBottom: 12 }}>{s.icon}</div>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4, color: "#0C2340" }}>{s.t}</div>
              <div style={{ fontSize: 14, color: "#E06B00", marginBottom: 10 }}>{s.pr}</div>
              <p style={{ fontSize: 13.5, lineHeight: 1.65, color: "#666", margin: 0 }}>{s.txt}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </section>
  );

  /* ══════════════════════════════════════
     HINNAT
  ══════════════════════════════════════ */
  const Hinnat = () => (
    <section style={{ ...W, paddingTop: "clamp(64px,8vw,100px)", paddingBottom: 80 }}>
      <R style={{ textAlign: "center", marginBottom: 56 }}>
        <Chip>Hinnoittelu</Chip>
        <H2>Läpinäkyvä hinnoittelu.<br /><em style={{ color: "#E06B00", fontStyle: "italic" }}>Ei yllätyksiä</em>.</H2>
        <p style={{ fontSize: 16, color: "#5A7088", lineHeight: 1.75, maxWidth: 540, margin: "0 auto" }}>Komissiomalli: tienaamme vain silloin kun sinä tienaat. Riski on meillä – tuotot sinulla.</p>
      </R>
      <Stagger style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,250px),1fr))", gap: 18, marginBottom: 56 }}>
        {[
          { feat: false, lab: "Avainpalvelu", nm: "Perusvaihto", pr: "29 €", un: "per vaihto", ft: ["Avainten luovutus ja vastaanotto","Ammattimainen vieraan opastus","Asunnon kunnon tarkistus","Valokuvaraportti omistajalle"] },
          { feat: false, lab: "Avainpalvelu", nm: "Kuukausipaketti", pr: "249 €", un: "per kk · sis. 10 vaihtoa", ft: ["Kaikki perusvaihdon palvelut","10 vaihtoa kuukaudessa","Lisävaihdot vain 22 €/kpl","Ensisijainen palvelu"] },
          { feat: true,  lab: "Hosting", nm: "Täysi hallinta", pr: "25 %", un: "komissiota bruttovuokratulosta", ft: ["Koko prosessi A:sta Ö:hön","Ilmoitukset, hinnoittelu, viestintä 24/7","Ammattimainen siivous & liinavaatteet","Huoltokoordinointi","Arvostelujen hallinta","AI-tapahtumahinnoittelu"] },
          { feat: false, lab: "Hosting", nm: "Kevyt hallinta", pr: "15 %", un: "komissiota bruttovuokratulosta", ft: ["Ilmoitusten hallinta & optimointi","Dynaaminen hinnoittelu","Vierasviestintä 24/7","Arvostelujen hallinta","Omistaja hoitaa fyysisen puolen"] },
        ].map((p, i) => (
          <StaggerItem key={i}>
            <motion.div className={`kx-card-hover${p.feat ? " kx-card-featured" : ""}`}
              style={{ background: p.feat ? "#030710" : "#fff", color: p.feat ? "#fff" : "#0C2340", borderRadius: 20, padding: "36px 26px", border: p.feat ? "none" : "1px solid rgba(12,35,64,0.09)", display: "flex", flexDirection: "column", position: "relative", height: "100%", boxShadow: p.feat ? "0 16px 50px rgba(0,0,0,0.18)" : "none" }}>
              {p.feat && <div style={{ position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)", background: "#E06B00", color: "#fff", fontSize: 9, fontWeight: 700, padding: "5px 18px", borderRadius: "0 0 10px 10px", textTransform: "uppercase", letterSpacing: "1.5px" }}>Suosituin</div>}
              <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "2px", color: "#E06B00", marginBottom: 10, marginTop: p.feat ? 8 : 0 }}>{p.lab}</div>
              <div style={{ fontSize: 21, fontWeight: 700, marginBottom: 8 }}>{p.nm}</div>
              <div style={{ fontSize: 42, fontWeight: 700, color: "#E06B00", letterSpacing: "-1.5px", marginBottom: 4, lineHeight: 1 }}>{p.pr}</div>
              <div style={{ fontSize: 13, color: p.feat ? "rgba(255,255,255,0.4)" : "#5A7088", marginBottom: 24 }}>{p.un}</div>
              {p.ft.map((ft, j) => <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, lineHeight: 1.6, color: p.feat ? "rgba(255,255,255,0.72)" : "#555", marginBottom: 9 }}><span style={{ color: "#E06B00", flexShrink: 0 }}><Check s={13} /></span>{ft}</div>)}
              <div style={{ marginTop: "auto", paddingTop: 24 }}>
                <BtnOrange onClick={() => go("yhteystiedot")} full>Pyydä tarjousta <Arrow /></BtnOrange>
              </div>
            </motion.div>
          </StaggerItem>
        ))}
      </Stagger>
      <R>
        <div style={{ background: "#fff", borderRadius: 20, padding: "clamp(24px,4vw,44px)", border: "1px solid rgba(12,35,64,0.09)" }}>
          <h3 style={{ fontSize: 21, fontWeight: 700, marginBottom: 6, color: "#0C2340" }}>Esimerkki: yksiö Oulun keskustassa</h3>
          <p style={{ fontSize: 13.5, color: "#5A7088", marginBottom: 28 }}>Yöhinta 85 €, käyttöaste 65 % – lyhytvuokra vs. pitkävuokra</p>
          <Stagger style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,140px),1fr))", gap: 14 }}>
            {[{ l: "Bruttotulo/kk", v: "~1 660 €" },{ l: "Kelvix (25 %)", v: "~415 €" },{ l: "Sinulle jää/kk", v: "~1 245 €", a: true },{ l: "Pitkävuokra tuottaisi", v: "~650 €" },{ l: "Lisätuottosi", v: "+91 %", a: true }].map((d, i) => (
              <StaggerItem key={i}>
                <div style={{ textAlign: "center", padding: 14 }}>
                  <div style={{ fontSize: 11, color: "#5A7088", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 6 }}>{d.l}</div>
                  <div style={{ fontSize: d.a ? 30 : 24, fontWeight: 700, color: d.a ? "#E06B00" : "#0C2340" }}>{d.v}</div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </R>
    </section>
  );

  /* ══════════════════════════════════════
     MEISTÄ
  ══════════════════════════════════════ */
  const Meista = () => (
    <section style={{ ...W, paddingTop: "clamp(64px,8vw,100px)", paddingBottom: 80 }}>
      <R style={{ textAlign: "center", marginBottom: 56 }}>
        <Chip>Meistä</Chip>
        <H2>Emme ole ketjufirma.<br /><em style={{ color: "#E06B00", fontStyle: "italic" }}>Olemme oululaisia</em>.</H2>
        <p style={{ fontSize: 16, color: "#5A7088", lineHeight: 1.75, maxWidth: 600, margin: "0 auto" }}>Kelvix Hosting syntyi kun eräs asunnonomistaja totesi: "Oulussa ei ole ketään, joka hoitaisi tämän puolestani." Me päätimme olla se joku.</p>
      </R>
      <Stagger style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))", gap: 28, marginBottom: 60 }}>
        {[
          { n: "01", t: "Kerro kohteestasi", txt: "Ota yhteyttä ja kerro asunnostasi. Teemme ilmaisen tarjouksen – ei sitoumuksia, ei velvoitteita." },
          { n: "02", t: "Me valmistelemme kaiken", txt: "Valokuvaamme kohteen, luomme optimoidut ilmoitukset ja valmistelemme asunnon ensimmäisiä vieraita varten." },
          { n: "03", t: "Varaukset alkavat tulla", txt: "Hoidamme kaiken viestinnän, avainten luovutuksen, siivouksen ja huollon. Sinä voit unohtaa koko homman." },
          { n: "04", t: "Sinä nautit tuotoista", txt: "Rahat tilillesi, selkeä kuukausiraportti ja mielenrauha siitä, että asuntosi on hyvissä käsissä." },
        ].map((s, i) => (
          <StaggerItem key={i}>
            <div className="kx-proc-step" style={{ paddingTop: 8 }}>
              <div className="kx-proc-num">{s.n}</div>
              <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, color: "#0C2340" }}>{s.t}</div>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "#666", margin: 0 }}>{s.txt}</p>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
      <R>
        <div style={{ background: "linear-gradient(135deg,#030710 0%,#0C2340 100%)", borderRadius: 24, padding: "clamp(36px,5vw,64px)", textAlign: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.07 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")", mixBlendMode: "overlay", pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{ fontSize: "clamp(22px,3.5vw,34px)", fontWeight: 700, color: "#fff", marginBottom: 14, letterSpacing: "-0.5px" }}>Asuntosi ansaitsee parempaa<br />kuin tyhjää seisomista.</h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", maxWidth: 480, margin: "0 auto 30px" }}>Aloita vaikka pelkällä avainpalvelulla – tai anna meidän hoitaa kaikki.</p>
            <BtnOrange onClick={() => go("yhteystiedot")}>Pyydä tarjousta <Arrow /></BtnOrange>
          </div>
        </div>
      </R>
    </section>
  );

  /* ══════════════════════════════════════
     YHTEYSTIEDOT
  ══════════════════════════════════════ */
  const Yhteystiedot = () => {
    const [state, handleSubmit] = useForm("mwvyzyjv");
    return (
      <section style={{ ...W, paddingTop: "clamp(64px,8vw,100px)", paddingBottom: 80 }}>
        <R style={{ textAlign: "center", marginBottom: 52 }}>
          <Chip>Ota yhteyttä</Chip>
          <H2>Pyydä ilmainen tarjous</H2>
          <p style={{ fontSize: 16, color: "#5A7088", lineHeight: 1.75, maxWidth: 480, margin: "0 auto" }}>Vastaamme jokaiseen yhteydenottoon 24 tunnin sisällä. Ei sido sinua mihinkään.</p>
        </R>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: 56, marginBottom: 80 }}>
          <R>
            {state.succeeded ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ background: "rgba(224,107,0,0.05)", borderRadius: 20, padding: 48, textAlign: "center", border: "1px solid rgba(224,107,0,0.16)" }}>
                <div style={{ fontSize: 56, marginBottom: 16, color: "#E06B00" }}>✓</div>
                <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 10, color: "#0C2340" }}>Kiitos yhteydenotosta!</div>
                <p style={{ color: "#666", fontSize: 15, lineHeight: 1.7 }}>Palaamme asiaan 24 tunnin sisällä.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#0C2340", marginBottom: 6 }}>Nimesi *</label>
                <input style={inp} placeholder="Etunimi Sukunimi" name="name" required />
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#0C2340", marginBottom: 6 }}>Sähköposti *</label>
                <input style={inp} placeholder="sinä@esimerkki.fi" type="email" name="email" required />
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#0C2340", marginBottom: 6 }}>Puhelinnumero</label>
                <input style={inp} placeholder="040 123 4567" name="puhelinnumero" />
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#0C2340", marginBottom: 6 }}>Kohteesi</label>
                <textarea style={{ ...inp, minHeight: 130, resize: "vertical" }} placeholder="Kerro kohteestasi - osoite, huoneiden määrä, onko jo Airbnb:ssä" name="viesti" />
                <BtnOrange full>
                  {state.submitting ? "Lähetetään…" : <><span>Pyydä tarjousta</span><Arrow /></>}
                </BtnOrange>
              </form>
            )}
          </R>
          <R delay={0.12}>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#0C2340", marginBottom: 16 }}>Kelvix Hosting</div>
            <p style={{ fontSize: 14.5, color: "#666", lineHeight: 1.75, marginBottom: 24 }}>Oulun ensimmäinen ammattimainen lyhytvuokrauksen hosting-palvelu. Sinä nautit tuotoista – me hoidamme kaiken muun.</p>
            {[
              { ic: <Mail s={20} />, t: EMAIL, href: `mailto:${EMAIL}` },
              { ic: <Phone s={20} />, t: PHONE, href: `tel:${PHONE.replace(/\s/g,"")}` },
              { ic: <MapPin s={20} />, t: "Oulu ja lähialueet", href: null },
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 13, marginBottom: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(12,35,64,0.06)", color: "#0C2340", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{c.ic}</div>
                {c.href ? <a href={c.href} style={{ fontSize: 14.5, color: "#0C2340", textDecoration: "none" }}>{c.t}</a> : <span style={{ fontSize: 14.5, color: "#555" }}>{c.t}</span>}
              </div>
            ))}
            <div style={{ marginTop: 16, padding: "20px 22px", background: "rgba(27,58,75,0.03)", borderRadius: 14, border: "1px solid rgba(12,35,64,0.08)" }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6, color: "#0C2340" }}>Ilmainen tarjous 24 h sisällä</div>
              <p style={{ fontSize: 13, color: "#777", margin: 0, lineHeight: 1.6 }}>Jokainen yhteydenotto saa henkilökohtaisen vastauksen. Ei riskiä, ei velvoitteita.</p>
            </div>
          </R>
        </div>
      </section>
    );
  };

  /* ══════════════════════════════════════
     TIETOSUOJA
  ══════════════════════════════════════ */
  const Tietosuoja = () => (
    <section style={{ ...W, paddingTop: "clamp(64px,8vw,100px)", paddingBottom: 80 }}>
      <R style={{ marginBottom: 48 }}>
        <Chip>Tietosuoja</Chip>
        <H2 style={{ textAlign: "left" }}>Tietosuojaseloste</H2>
        <p style={{ fontSize: 13, color: "#5A7088" }}>Päivitetty: 11.5.2026 · EU:n yleinen tietosuoja-asetus (GDPR) 2016/679</p>
      </R>
      {[
        { t: "1. Rekisterinpitäjä", b: [<><strong>Kelvix Oy</strong><br />Oulu, Suomi<br />Sähköposti: <a href={`mailto:${EMAIL}`} style={{ color: "#E06B00" }}>{EMAIL}</a><br />Puhelin: {PHONE}</>] },
        { t: "2. Rekisterin nimi", b: ["Kelvix Hosting asiakasrekisteri ja yhteydenottolomakkeen tietorekisteri."] },
        { t: "3. Henkilötietojen käsittelyn tarkoitus", b: ["Käsittelemme henkilötietoja seuraaviin tarkoituksiin:", <ul style={{ margin: "8px 0 0", padding: "0 0 0 20px", fontSize: 14, lineHeight: 1.75, color: "#555" }}><li>Yhteydenottopyyntöjen ja asiakaskyselyjen käsittely</li><li>Palvelusopimuksen solmiminen ja täyttäminen</li><li>Tarjousten toimittaminen</li><li>Laskutus ja maksujen käsittely</li><li>Asiakassuhteen ylläpito ja viestintä</li><li>Lakisääteisten velvoitteiden täyttäminen</li></ul>, "Käsittelyn oikeusperusteena on sopimuksen täytäntöönpano, rekisteröidyn suostumus sekä rekisterinpitäjän oikeutettu etu."] },
        { t: "4. Rekisterin tietosisältö", b: ["Rekisteri voi sisältää:", <ul style={{ margin: "8px 0 0", padding: "0 0 0 20px", fontSize: 14, lineHeight: 1.75, color: "#555" }}><li>Nimi, sähköpostiosoite, puhelinnumero</li><li>Kohteen osoite ja kiinteistön tiedot</li><li>Valittu palvelu tai palvelupyyntö</li><li>Viestintä- ja asiakashistoria</li><li>Sopimus- ja laskutustiedot</li></ul>] },
        { t: "5. Tietolähteet", b: ["Henkilötiedot kerätään rekisteröidyltä itseltään verkkosivun yhteydenottolomakkeen, sähköpostin tai puhelimen välityksellä."] },
        { t: "6. Tietojen luovuttaminen", b: ["Henkilötietoja ei luovuteta ulkopuolisille ilman rekisteröidyn suostumusta, ellei lainsäädäntö sitä edellytä."] },
        { t: "7. Siirto EU:n ulkopuolelle", b: ["Henkilötietoja ei siirretä EU:n tai ETA-alueen ulkopuolelle."] },
        { t: "8. Säilytysaika", b: ["Henkilötietoja säilytetään niin kauan kuin asiakassuhde on voimassa ja sen jälkeen kirjanpitolain edellyttämän ajan (6 vuotta). Yhteydenottolomakkeen tiedot, joista ei muodostu asiakassuhdetta, poistetaan 12 kuukauden kuluessa."] },
        { t: "9. Rekisteröidyn oikeudet", b: ["Rekisteröidyllä on oikeus tarkistaa tietonsa, oikaista virheellisiä tietoja, pyytää poistamista, rajoittaa käsittelyä sekä tehdä valitus Tietosuojavaltuutetulle (tietosuoja.fi). Pyyntöjen osoite: ", <a href={`mailto:${EMAIL}`} style={{ color: "#E06B00" }}>{EMAIL}</a>] },
        { t: "10. Tietoturva", b: ["Käytämme SSL-salattua yhteyttä. Tietoja käsittelevät vain ne henkilöt, joiden tehtävät sitä edellyttävät."] },
        { t: "11. Evästeet", b: ["Verkkosivumme saattaa käyttää teknisiä evästeitä sivuston toiminnan varmistamiseen. Emme käytä markkinointiEvästeitä ilman suostumustasi."] },
        { t: "12. Muutokset", b: ["Pidätämme oikeuden päivittää tätä tietosuojaselostetta. Muutoksista ilmoitetaan verkkosivullamme."] },
      ].map((sec, i, arr) => (
        <div key={i} style={{ marginBottom: 32, paddingBottom: 32, borderBottom: i < arr.length - 1 ? "1px solid rgba(12,35,64,0.09)" : "none" }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: "#0C2340", marginBottom: 12 }}>{sec.t}</h3>
          {sec.b.map((b, j) => typeof b === "string" ? <p key={j} style={{ fontSize: 14.5, lineHeight: 1.75, color: "#555", margin: "0 0 8px" }}>{b}</p> : <div key={j}>{b}</div>)}
        </div>
      ))}
    </section>
  );

  /* ══════════════════════════════════════
     FOOTER
  ══════════════════════════════════════ */
  const Footer = () => (
    <footer style={{ background: "#030710", color: "#fff", padding: "64px clamp(20px,5vw,60px) 32px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.07 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")", mixBlendMode: "overlay", pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle,rgba(206,136,64,0.1),transparent 70%)", top: -140, right: -120, pointerEvents: "none" }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,200px),1fr))", gap: 44, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <span style={{ color: "#E06B00" }}><KeyIcon s={18} /></span>
              <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: "-0.3px" }}>Kelvix<span style={{ color: "#E06B00", fontStyle: "italic" }}>Hosting</span></span>
            </div>
            <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, maxWidth: 260 }}>Oululainen premium-isännöinti Airbnb- ja Booking.com-omistajille.</p>
          </div>
          <div>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "2px", color: "rgba(255,255,255,0.4)", fontWeight: 600, marginBottom: 14 }}>Palvelut</div>
            {["Avainpalvelu","Täysi hallinta","Kevyt hallinta","Valokuvaus"].map((t, i) => (
              <div key={i} onClick={() => go("palvelut")} style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", marginBottom: 10, cursor: "pointer", transition: "color 0.2s" }}>{t}</div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "2px", color: "rgba(255,255,255,0.4)", fontWeight: 600, marginBottom: 14 }}>Sivut</div>
            {PAGES.map(p => (
              <div key={p} onClick={() => go(p)} style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", marginBottom: 10, cursor: "pointer" }}>{LABELS[p]}</div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "2px", color: "rgba(255,255,255,0.4)", fontWeight: 600, marginBottom: 14 }}>Yhteystiedot</div>
            <a href={`mailto:${EMAIL}`} style={{ display: "block", fontSize: 13.5, color: "rgba(255,255,255,0.65)", marginBottom: 10, textDecoration: "none" }}>{EMAIL}</a>
            <a href={`tel:${PHONE.replace(/\s/g,"")}`} style={{ display: "block", fontSize: 13.5, color: "rgba(255,255,255,0.65)", marginBottom: 16, textDecoration: "none" }}>{PHONE}</a>
            <BtnOrange onClick={() => go("yhteystiedot")} style={{ padding: "11px 22px", fontSize: 13 }}>Pyydä tarjousta <Arrow s={14} /></BtnOrange>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "space-between", alignItems: "center", fontSize: 12, color: "rgba(255,255,255,0.38)" }}>
          <div>Kelvix Hosting © 2026 Kelvix Oy, Oulu</div>
          <div style={{ display: "flex", gap: 20 }}>
            <span onClick={() => go("tietosuoja")} style={{ cursor: "pointer", color: "rgba(255,255,255,0.5)", textDecoration: "underline" }}>Tietosuoja</span>
            <span onClick={() => go("yhteystiedot")} style={{ cursor: "pointer", color: "rgba(255,255,255,0.5)", textDecoration: "underline" }}>Yhteystiedot</span>
          </div>
          <div style={{ fontSize: 11, opacity: 0.6 }}>Airbnb-hallinnointi Oulu · Booking.com · Oulu 2026</div>
        </div>
      </div>
    </footer>
  );

  /* ══════════════════════════════════════
     RENDER
  ══════════════════════════════════════ */
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,700;1,800&display=swap" rel="stylesheet" />

      {/* NAV */}
      <nav className={`kx-nav${scrolled ? " scrolled" : ""}`}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          <div className="kx-logo" style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.5px", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }} onClick={() => go("etusivu")}>
            <span className="kx-logo-accent"><KeyIcon s={18} /></span>
            Kelvix<span className="kx-logo-accent" style={{ fontStyle: "italic" }}>Hosting</span>
          </div>
          <div className="kx-desktop-nav" style={{ display: "flex", gap: 26, alignItems: "center" }}>
            {PAGES.map(p => (
              <span key={p} className={`kx-nav-link${page === p ? " active" : ""}`}
                style={{ fontSize: 13, fontWeight: page === p ? 600 : 500, cursor: "pointer", letterSpacing: "0.2px", position: "relative", paddingBottom: 3, userSelect: "none" }}
                onClick={() => go(p)}>
                {LABELS[p]}
                {page === p && <span style={{ position: "absolute", bottom: -1, left: 0, right: 0, height: 2, background: "currentColor", borderRadius: 2 }} />}
              </span>
            ))}
            <motion.button className="kx-nav-cta kx-shine" whileHover={{ scale: 1.025 }} whileTap={{ scale: 0.97 }} onClick={() => go("yhteystiedot")}
              style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", borderRadius: 999, fontSize: 12.5, fontWeight: 600, cursor: "pointer", border: "1px solid transparent", letterSpacing: "0.1px", position: "relative", overflow: "hidden" }}>
              Ota yhteyttä
            </motion.button>
          </div>
          <button className="kx-burger" style={{ cursor: "pointer", background: "none", border: "none", padding: 6, display: "none", color: scrolled ? "#0C2340" : "#fff" }} onClick={() => setMenuOpen(true)} aria-label="Avaa valikko">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}
            style={{ position: "fixed", inset: 0, background: "rgba(247,243,236,0.97)", backdropFilter: "blur(24px)", zIndex: 300, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32 }}>
            <button style={{ position: "absolute", top: 20, right: 24, background: "none", border: "none", fontSize: 32, cursor: "pointer", color: "#0C2340", lineHeight: 1 }} onClick={() => setMenuOpen(false)}>&times;</button>
            {PAGES.map((p, i) => (
              <motion.span key={p} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                style={{ fontSize: 22, fontWeight: 700, cursor: "pointer", textTransform: "uppercase", letterSpacing: "3px", color: page === p ? "#E06B00" : "#0C2340" }}
                onClick={() => go(p)}>
                {LABELS[p]}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* PAGE CONTENT */}
      <main>
        {page === "etusivu"     && <Etusivu />}
        {page === "palvelut"    && <Palvelut />}
        {page === "hinnat"      && <Hinnat />}
        {page === "meista"      && <Meista />}
        {page === "yhteystiedot"&& <Yhteystiedot />}
        {page === "tietosuoja"  && <Tietosuoja />}
        <Footer />
      </main>
    </>
  );
}
