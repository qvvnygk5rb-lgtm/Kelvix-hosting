import { useState, useEffect, useRef, useCallback } from "react";
import { useForm } from "@formspree/react";

const EMAIL = "ville@kelvixhosting.com";
const PHONE = "040 965 6825";
const PAGES = ["etusivu","palvelut","hinnat","meista","yhteystiedot","tietosuoja"];
const LABELS = { etusivu:"Etusivu", palvelut:"Palvelut", hinnat:"Hinnat", meista:"Meistä", yhteystiedot:"Yhteystiedot", tietosuoja:"Tietosuoja" };

/* ── ICONS ── */
const KeyIcon=({size=24,color="currentColor"})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>;
const ArrowIcon=({size=16})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12,5 19,12 12,19"/></svg>;
const CheckIcon=({size=16})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20,6 9,17 4,12"/></svg>;
const PhoneIcon=({size=20})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
const MailIcon=({size=20})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const MapIcon=({size=20})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const TrendIcon=({size=22})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/><polyline points="17,6 23,6 23,12"/></svg>;
const StarIcon=({size=22})=><svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>;
const ShieldIcon=({size=22})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const ClockIcon=({size=22})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>;
const PlusIcon=({size=16})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const HomeIcon=({size=24})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>;
const CameraIcon=({size=24})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>;
const GlobeIcon=({size=24})=><svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>;

const GRAIN = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.07 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;

const OULU_IMAGES = [
  "https://upload.wikimedia.org/wikipedia/commons/a/a7/Oulu_Skyline_20120128.JPG",
  "https://upload.wikimedia.org/wikipedia/commons/0/0a/Kaijonharju_elokuussa_2019.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/0/00/Kuusisaari_Oulu_20120115.JPG",
  "https://upload.wikimedia.org/wikipedia/commons/7/78/Kiviniemi_harbour.JPG",
];

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&display=swap');

  * { box-sizing: border-box; }

  .display-italic {
    font-family: 'DM Sans', sans-serif;
    font-style: normal;
    font-weight: 800;
    letter-spacing: -0.03em;
  }

  nav {
    background: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    border-bottom: 1px solid transparent;
    transition: background 0.45s cubic-bezier(0.16,1,0.3,1),
                backdrop-filter 0.45s, border-color 0.45s;
    --nav-logo: #fff;
    --nav-accent: #F08820;
    --nav-link: rgba(255,255,255,0.72);
    --nav-link-active: #F08820;
    --nav-burger: #fff;
    --nav-cta-bg: rgba(255,255,255,0.12);
  }
  nav.nav-scrolled {
    background: rgba(247,243,236,0.92);
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    border-bottom: 1px solid rgba(15,42,61,0.08);
    --nav-logo: #0C2340;
    --nav-accent: #E06B00;
    --nav-link: #5A7088;
    --nav-link-active: #E06B00;
    --nav-burger: #0C2340;
    --nav-cta-bg: #0C2340;
  }
  .nav-logo { color: var(--nav-logo); transition: color 0.4s; }
  .nav-accent-text { color: var(--nav-accent); transition: color 0.4s; }
  .nav-link-item {
    color: var(--nav-link) !important;
    transition: color 0.3s;
  }
  .nav-link-item.active { color: var(--nav-link-active) !important; }
  .nav-link-item:hover { color: var(--nav-link-active) !important; cursor: pointer; }
  .nav-burger-btn svg { stroke: var(--nav-burger); transition: stroke 0.4s; }
  .nav-cta {
    background: var(--nav-cta-bg) !important;
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255,255,255,0.18) !important;
    transition: background 0.35s !important;
  }
  nav.nav-scrolled .nav-cta { border: 1px solid transparent !important; }
  .nav-cta:hover { opacity: 0.88; }

  [data-reveal] {
    opacity: 0;
    transform: translateY(36px);
    transition: opacity 0.95s cubic-bezier(0.16,1,0.3,1),
                transform 0.95s cubic-bezier(0.16,1,0.3,1);
  }
  [data-reveal].is-visible { opacity: 1; transform: translateY(0); }

  .hero-slide {
    position: absolute; inset: 0;
    background-size: cover;
    background-position: center;
    opacity: 0;
    animation: heroSlide 28s ease-in-out infinite;
    filter: brightness(0.58) saturate(1.12) contrast(1.06);
  }

  .hero-orb {
    position: absolute;
    border-radius: 50%;
    filter: blur(60px);
    opacity: 0.55;
    pointer-events: none;
  }
  .hero-orb-1 {
    width: 520px; height: 520px;
    background: radial-gradient(circle, rgba(206,136,64,0.5), transparent 70%);
    top: -120px; right: -80px;
    animation: orbDrift1 22s ease-in-out infinite;
  }
  .hero-orb-2 {
    width: 380px; height: 380px;
    background: radial-gradient(circle, rgba(226,168,104,0.35), transparent 70%);
    bottom: -80px; left: -60px;
    animation: orbDrift2 26s ease-in-out infinite;
  }
  .hero-orb-3 {
    width: 280px; height: 280px;
    background: radial-gradient(circle, rgba(255,255,255,0.18), transparent 70%);
    top: 30%; left: 55%;
    animation: orbDrift3 20s ease-in-out infinite;
  }

  .word-reveal {
    display: inline-block;
    opacity: 0;
    transform: translateY(0.6em) scale(0.98);
    animation: wordIn 0.8s cubic-bezier(0.16,1,0.3,1) both;
  }

  .pill-badge {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 8px 16px;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.14);
    border-radius: 999px;
    font-size: 12.5px; font-weight: 500;
    color: rgba(255,255,255,0.92);
    opacity: 0;
    animation: fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both;
  }

  .marquee { overflow: hidden; mask-image: linear-gradient(90deg, transparent, black 8%, black 92%, transparent); }
  .marquee-track { display: flex; width: max-content; animation: marqueeScroll 36s linear infinite; }

  .btn-primary, .btn-accent {
    transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease, filter 0.25s;
    position: relative;
    overflow: hidden;
  }
  .btn-primary::before, .btn-accent::before {
    content: "";
    position: absolute; inset: 0;
    background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%);
    transform: translateX(-100%);
    transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
  }
  .btn-primary:hover::before, .btn-accent:hover::before { transform: translateX(100%); }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 44px rgba(15,42,61,0.32); }
  .btn-accent:hover { transform: translateY(-2px); box-shadow: 0 14px 44px rgba(206,136,64,0.40); filter: brightness(1.06); }
  .btn-ghost { transition: background 0.25s, border-color 0.25s; }
  .btn-ghost:hover { background: rgba(255,255,255,0.12) !important; border-color: rgba(255,255,255,0.35) !important; }
  .btn-outline {
    transition: background 0.25s, color 0.25s, border-color 0.25s, transform 0.25s, box-shadow 0.25s;
  }
  .btn-outline:hover {
    background: #0C2340; color: #fff; border-color: #0C2340;
    transform: translateY(-1px); box-shadow: 0 10px 28px rgba(15,42,61,0.18);
  }

  .tilt-card {
    transition: box-shadow 0.3s ease, border-color 0.3s;
  }
  .tilt-card:hover { box-shadow: 0 32px 80px rgba(15,42,61,0.14); border-color: rgba(206,136,64,0.3) !important; }

  .feature-icon {
    width: 52px; height: 52px; border-radius: 14px;
    background: rgba(12,35,64,0.06); color: #0C2340;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 18px;
    transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1), background 0.3s;
  }
  .feature-card:hover .feature-icon {
    transform: scale(1.08) rotate(-4deg);
    background: rgba(224,107,0,0.10);
    color: #E06B00;
  }

  .process-num {
    display: flex; align-items: center; justify-content: center;
    font-family: 'DM Sans', sans-serif; font-weight: 700;
    font-size: 22px; color: #0C2340;
    background: #FFFFFF;
    width: 64px; height: 64px; border-radius: 50%;
    border: 1.5px solid rgba(12,35,64,0.09);
    margin-bottom: 20px;
    position: relative; z-index: 2;
    transition: all 0.4s cubic-bezier(0.34,1.56,0.64,1);
  }
  .process-step:hover .process-num {
    background: #E06B00; color: #fff; border-color: #E06B00;
    transform: scale(1.06);
  }

  .faq-plus svg { transition: transform 0.3s ease; }
  .faq-plus.open svg { transform: rotate(45deg); }
  .faq-body {
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.4s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease;
    opacity: 0;
  }
  .faq-body.open { max-height: 400px; opacity: 1; }

  input, select, textarea {
    -webkit-appearance: none;
    font-size: 16px;
    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
    font-family: 'DM Sans', sans-serif;
  }
  input:focus, select:focus, textarea:focus {
    outline: none;
    border-color: #E06B00 !important;
    box-shadow: 0 0 0 4px rgba(206,136,64,0.12) !important;
    background: #fff !important;
  }
  input::placeholder, textarea::placeholder { color: #9aa8b5; }

  @keyframes heroIn {
    from { opacity: 0; transform: translateY(40px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes wordIn {
    from { opacity: 0; transform: translateY(0.6em) scale(0.98); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes heroSlide {
    0%   { opacity: 0; transform: scale(1.04); }
    5%   { opacity: 1; transform: scale(1.04); }
    22%  { opacity: 1; transform: scale(1.12); }
    28%  { opacity: 0; transform: scale(1.12); }
    100% { opacity: 0; transform: scale(1.04); }
  }
  @keyframes orbDrift1 {
    0%,100% { transform: translate(0,0) scale(1); }
    33%     { transform: translate(-40px, 30px) scale(1.08); }
    66%     { transform: translate(30px, -20px) scale(0.96); }
  }
  @keyframes orbDrift2 {
    0%,100% { transform: translate(0,0) scale(1); }
    50%     { transform: translate(50px, -40px) scale(1.1); }
  }
  @keyframes orbDrift3 {
    0%,100% { transform: translate(0,0) scale(1); opacity: 0.55; }
    50%     { transform: translate(-30px, 20px) scale(1.15); opacity: 0.35; }
  }
  @keyframes marqueeScroll {
    from { transform: translateX(0); }
    to   { transform: translateX(-50%); }
  }
  @keyframes blobFloat {
    0%,100% { transform: translate(0,0) scale(1); }
    38%     { transform: translate(22px,-16px) scale(1.04); }
    72%     { transform: translate(-12px,12px) scale(0.97); }
  }
  @keyframes blobFloat2 {
    0%,100% { transform: translate(0,0) scale(1); }
    50%     { transform: translate(-18px,14px) scale(1.03); }
  }
  @keyframes scrollCueAnim {
    0%,100% { transform: translate(-50%, 0); }
    50%     { transform: translate(-50%, 8px); }
  }

  @media (max-width: 767px) {
    .tilt-card { transform: none !important; }
    .hero-orb-1 { width: 300px; height: 300px; }
    .hero-orb-2 { width: 200px; height: 200px; }
    .hero-orb-3 { display: none; }
  }
  @media (prefers-reduced-motion: reduce) {
    * { animation-duration: 0.01s !important; transition-duration: 0.01s !important; }
    .marquee-track { animation: none; }
  }
`;

export default function KelvixHosting() {
  const [page, setPage] = useState("etusivu");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [vis, setVis] = useState({});
  const [faqOpen, setFaqOpen] = useState(0);
  const [spotX, setSpotX] = useState("50%");
  const [spotY, setSpotY] = useState("30%");
  const mainRef = useRef(null);

  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    const h = () => setScrollY(el.scrollTop);
    el.addEventListener("scroll", h);
    return () => el.removeEventListener("scroll", h);
  }, [page]);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setVis(p => ({ ...p, [e.target.dataset.reveal]: true }));
      });
    }, { threshold: 0.1 });
    const t = setTimeout(() => {
      document.querySelectorAll("[data-reveal]").forEach(el => {
        if (el.dataset.reveal) obs.observe(el);
      });
    }, 100);
    return () => { clearTimeout(t); obs.disconnect(); };
  }, [page]);

  const go = useCallback((p) => {
    setPage(p); setMenuOpen(false); setVis({});
    if (mainRef.current) mainRef.current.scrollTop = 0;
  }, []);

  const rv = (id, d = 0) => ({
    opacity: vis[id] ? 1 : 0,
    transform: vis[id] ? "translateY(0)" : "translateY(36px)",
    transition: `opacity 0.95s cubic-bezier(0.16,1,0.3,1) ${d}s, transform 0.95s cubic-bezier(0.16,1,0.3,1) ${d}s`
  });

  const handleHeroMouse = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setSpotX(((e.clientX - rect.left) / rect.width * 100).toFixed(2) + "%");
    setSpotY(((e.clientY - rect.top) / rect.height * 100).toFixed(2) + "%");
  };

  /* ── SHARED COMPONENTS ── */
  const Chip = ({ children, dark }) => (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 10,
      marginBottom: 20, padding: "6px 14px", borderRadius: 999,
      background: dark ? "rgba(255,255,255,0.06)" : "rgba(224,107,0,0.1)",
      border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(206,136,64,0.18)"
    }}>
      <span style={{ color: "#E06B00", display: "inline-flex" }}>
        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0l2.35 8.65L23 11l-8.65 2.35L12 22l-2.35-8.65L1 11l8.65-2.35L12 0z"/></svg>
      </span>
      <span style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "2.2px", color: "#E06B00" }}>{children}</span>
    </div>
  );

  const SectionH2 = ({ children, style: s }) => (
    <h2 style={{ fontSize: "clamp(30px,4.8vw,56px)", fontWeight: 700, lineHeight: 1.06, letterSpacing: "-1.6px", margin: "0 0 20px", color: "#0C2340", ...(s || {}) }}>
      {children}
    </h2>
  );

  const Sub = ({ children, style: s }) => (
    <p style={{ fontSize: "clamp(15px,1.6vw,18px)", lineHeight: 1.78, color: "#5A7088", maxWidth: 520, margin: "0 auto 20px", ...(s || {}) }}>
      {children}
    </p>
  );

  const BtnAccent = ({ children, onClick, style: s }) => (
    <button className="btn-accent" onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", gap: 10,
      background: "#E06B00", color: "#fff", padding: "16px 32px",
      borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: "pointer",
      border: "none", letterSpacing: "0.1px", ...(s || {})
    }}>
      <span style={{ position: "relative", zIndex: 2, display: "inline-flex", alignItems: "center", gap: 10 }}>{children}</span>
    </button>
  );

  const BtnPrimary = ({ children, onClick, style: s }) => (
    <button className="btn-primary" onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", gap: 10,
      background: "#0C2340", color: "#fff", padding: "16px 32px",
      borderRadius: 999, fontSize: 14, fontWeight: 600, cursor: "pointer",
      border: "none", letterSpacing: "0.1px", ...(s || {})
    }}>
      <span style={{ position: "relative", zIndex: 2, display: "inline-flex", alignItems: "center", gap: 10 }}>{children}</span>
    </button>
  );

  const Li = ({ children }) => (
    <li style={{ display: "flex", alignItems: "flex-start", gap: 9, fontSize: 13.5, lineHeight: 1.65, color: "#555", marginBottom: 10 }}>
      <span style={{ color: "#E06B00", flexShrink: 0, marginTop: 2 }}><CheckIcon size={14} /></span>
      <span>{children}</span>
    </li>
  );

  const inputStyle = {
    width: "100%", padding: "14px 18px",
    border: "1px solid rgba(12,35,64,0.12)",
    borderRadius: 12, fontSize: 15, background: "#fff",
    marginBottom: 14, display: "block"
  };

  /* ── ETUSIVU ── */
  const Etusivu = () => (
    <>
      {/* HERO */}
      <section
        style={{ position: "relative", overflow: "hidden", minHeight: "92vh", display: "flex", flexDirection: "column", background: "linear-gradient(180deg,#030710 0%,#0C2340 55%,#14305A 100%)" }}
        onMouseMove={handleHeroMouse}
      >
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />

        {/* Slideshow */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}>
          {OULU_IMAGES.map((src, i) => (
            <div key={i} className="hero-slide" style={{ backgroundImage: `url(${src})`, animationDelay: `${i * 7}s` }} />
          ))}
        </div>

        {/* Overlays */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(8,21,35,0.55) 0%,rgba(8,21,35,0.35) 40%,rgba(8,21,35,0.75) 100%)", zIndex: 1, pointerEvents: "none" }} />
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(600px circle at ${spotX} ${spotY}, rgba(206,136,64,0.22) 0%, rgba(206,136,64,0.06) 30%, transparent 60%)`, zIndex: 2, mixBlendMode: "screen", pointerEvents: "none", transition: "background 0.2s" }} />
        <div style={{ position: "absolute", inset: 0, backgroundImage: GRAIN, opacity: 1, mixBlendMode: "overlay", zIndex: 2, pointerEvents: "none" }} />

        {/* Content */}
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(72px,11vw,150px) clamp(20px,5vw,60px) clamp(48px,6vw,80px)", position: "relative", zIndex: 3, flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ maxWidth: 980, margin: "0 auto", textAlign: "center", width: "100%" }}>

            <div style={{ animation: "0.75s cubic-bezier(0.16,1,0.3,1) 0.05s both heroIn" }}>
              <Chip dark>Airbnb &amp; Booking.com · Oulu 2026</Chip>
            </div>

            <h1 style={{ fontSize: "clamp(44px,7.8vw,104px)", fontWeight: 700, lineHeight: 0.99, letterSpacing: "-3.2px", margin: "0 0 28px", color: "#fff", textShadow: "0 6px 40px rgba(0,0,0,0.35)" }}>
              <span className="word-reveal" style={{ animationDelay: "0.15s" }}>Tuottaako</span>{" "}
              <span className="word-reveal" style={{ animationDelay: "0.23s" }}>kiinteistösi</span>
              <br />
              <span className="word-reveal display-italic" style={{ animationDelay: "0.32s", color: "#F08820" }}>päänvaivaa</span>
              <span className="word-reveal" style={{ animationDelay: "0.4s" }}>?</span>
            </h1>

            <div style={{ animation: "0.8s cubic-bezier(0.16,1,0.3,1) 0.55s both heroIn" }}>
              <p style={{ fontSize: "clamp(15px,1.6vw,19px)", lineHeight: 1.75, color: "rgba(255,255,255,0.78)", maxWidth: 640, margin: "0 auto 20px", textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}>
                Kelvix Hosting hoitaa kaiken – avainten luovutuksesta AI-hinnoitteluun ja 24/7 vieraspalveluun. Oululainen premium-isännöinti lyhytvuokraajille, jotka haluavat tuoton ilman päänvaivaa.
              </p>
            </div>

            <div style={{ animation: "0.8s cubic-bezier(0.16,1,0.3,1) 0.7s both heroIn", display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 22 }}>
              <BtnAccent onClick={() => go("yhteystiedot")}>Pyydä tarjousta <ArrowIcon /></BtnAccent>
              <button className="btn-ghost" onClick={() => go("palvelut")} style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(16px)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.18)", borderRadius: 999, padding: "15px 30px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
                Katso palvelut
              </button>
            </div>

            <div style={{ animation: "0.8s cubic-bezier(0.16,1,0.3,1) 0.85s both heroIn", display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap", marginTop: 36 }}>
              {["Ei kiinteitä kuluja","24 h vastausaika","Nolla riskiä"].map((t, i) => (
                <div key={i} className="pill-badge" style={{ animationDelay: `${1 + i * 0.15}s` }}>
                  <span style={{ color: "#F08820" }}><CheckIcon size={12} /></span>{t}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(20px,5vw,60px) clamp(32px,5vw,64px)", position: "relative", zIndex: 3, width: "100%" }}>
          <div style={{ animation: "0.7s cubic-bezier(0.16,1,0.3,1) 1s both heroIn", borderTop: "1px solid rgba(255,255,255,0.12)", borderBottom: "1px solid rgba(255,255,255,0.12)", padding: "32px 0", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,150px),1fr))", gap: 24 }}>
            {[
              { v: "25", suf: "%", l: "Komissio – vain tuloksista" },
              { v: "+80", suf: " %", l: "Enemmän kuin pitkävuokra" },
              { v: "24 / 7", suf: "", l: "Vieraspalvelu kolmella kielellä" },
              { v: "0", suf: " €", l: "Kiinteitä kuluja – riski meillä" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "clamp(26px,3.6vw,42px)", fontWeight: 700, color: "#F08820", letterSpacing: "-1.2px", lineHeight: 1 }}>
                  {s.v}<span style={{ fontSize: "0.7em", opacity: 0.7 }}>{s.suf}</span>
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: "1.6px", marginTop: 8 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <section style={{ padding: "36px 0", borderTop: "1px solid rgba(12,35,64,0.09)", borderBottom: "1px solid rgba(12,35,64,0.09)", background: "#F7F9FC", overflow: "hidden" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(20px,5vw,60px)", display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap" }}>
          <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "2.2px", color: "#5A7088", flexShrink: 0 }}>Kohteesi löytyy täältä</div>
          <div className="marquee" style={{ flex: 1, minWidth: 0 }}>
            <div className="marquee-track">
              {[...["Airbnb","Booking.com","VRBO","Expedia","Homelike","Google Travel"],...["Airbnb","Booking.com","VRBO","Expedia","Homelike","Google Travel"]].map((name, i) => (
                <div key={i} style={{ fontSize: 20, fontWeight: 700, color: "#0C2340", letterSpacing: "-0.3px", opacity: 0.5, whiteSpace: "nowrap", fontFamily: "'DM Sans',sans-serif", paddingRight: 64 }}>{name}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* KIPUPISTEET */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(72px,9vw,120px) clamp(20px,5vw,60px) clamp(56px,7vw,96px)" }}>
        <div data-reveal="pain" style={{ textAlign: "center", marginBottom: 52, ...rv("pain") }}>
          <Chip>Tunnistatko tämän?</Chip>
          <SectionH2>Vuokraus vie aikaasi –<br /><span className="display-italic" style={{ color: "#E06B00" }}>vaikka tuottoa pitäisi tulla</span>.</SectionH2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: 16 }}>
          {[
            { icon: <KeyIcon size={24} />, t: "Avaimet edestakaisin", txt: "Juokset luovuttamassa avaimia illalla, viikonloppuna ja lomallasi. Se vie tuntikausia joka viikko – ja silti tulee päällekkäisyyksiä." },
            { icon: <ClockIcon size={24} />, t: "Viestit keskellä yötä", txt: "\"Mikä on WiFi-salasana?\" klo 23. \"Miten sauna toimii?\" klo 7. Puhelimesi ei saa olla ikinä äänettömällä." },
            { icon: <ShieldIcon size={24} />, t: "Siivous, lakanat, huolto", txt: "Siivoojien koordinointi, liinavaatteiden pyykki, saippuat loppu, hana vuotaa – kaikki ennen seuraavaa vierasta." },
          ].map((p, i) => (
            <div key={i} data-reveal={`pain-card-${i}`} className="tilt-card" style={{ background: "#fff", borderRadius: 18, padding: "clamp(28px,4vw,44px)", border: "1px solid rgba(12,35,64,0.09)", position: "relative", overflow: "hidden", ...rv(`pain-card-${i}`, i * 0.1) }}>
              <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(224,107,0,0.1)", color: "#E06B00", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 22 }}>{p.icon}</div>
              <div style={{ fontSize: 19, fontWeight: 700, marginBottom: 12, color: "#0C2340", letterSpacing: "-0.3px" }}>{p.t}</div>
              <p style={{ fontSize: 14, lineHeight: 1.78, color: "#666", margin: 0 }}>{p.txt}</p>
            </div>
          ))}
        </div>
      </section>

      {/* MIKSI KELVIX */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(72px,9vw,120px) clamp(20px,5vw,60px) clamp(56px,7vw,96px)", borderTop: "1px solid rgba(12,35,64,0.09)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", width: 560, height: 560, borderRadius: "50%", background: "radial-gradient(circle,rgba(206,136,64,0.05),transparent 70%)", top: 60, right: -200, pointerEvents: "none", animation: "blobFloat 14s ease-in-out infinite" }} />
        <div data-reveal="why" style={{ textAlign: "center", marginBottom: 56, position: "relative", ...rv("why") }}>
          <Chip>Miksi Kelvix?</Chip>
          <SectionH2>Rakennettu Oululle.<br /><span className="display-italic" style={{ color: "#E06B00" }}>Pyöritetään Oulussa</span>.</SectionH2>
          <Sub>Emme ole etäfirma Helsingistä. Olemme täällä, tunnemme kaupungin ja reagoimme samana päivänä.</Sub>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))", gap: 40 }}>
          {[
            { icon: <MapIcon size={22} />, t: "Paikallinen ja nopea", txt: "Reagoimme ongelmatilanteisiin tuntien – emme päivien – sisällä. Tunnemme Oulun alueet, palvelut ja tapahtumakalenterin." },
            { icon: <TrendIcon size={22} />, t: "AI-pohjainen hinnoittelu", txt: "Algoritmimme seuraa kysyntää, kilpailijoiden hintoja ja tulevia tapahtumia. Yöhintasi on aina optimaalinen." },
            { icon: <StarIcon size={22} />, t: "Oulu2026-valmius", txt: "Kulttuuripääkaupunkivuosi tuo ennätysmäärän matkailijoita. Maksimoimme tuottosi koko vuoden." },
            { icon: <ShieldIcon size={22} />, t: "Nolla riskiä sinulle", txt: "Komissiomalli: ei kiinteitä kuluja. Jos emme tuota tulosta, emme veloita senttiäkään." },
          ].map((c, i) => (
            <div key={i} data-reveal={`why-${i}`} className="feature-card" style={{ ...rv(`why-${i}`, i * 0.1) }}>
              <div className="feature-icon">{c.icon}</div>
              <div style={{ width: 32, height: 2, background: "#E06B00", marginBottom: 14, borderRadius: 2 }} />
              <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, color: "#0C2340", letterSpacing: "-0.2px" }}>{c.t}</div>
              <p style={{ fontSize: 14, lineHeight: 1.74, color: "#666", margin: 0 }}>{c.txt}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROSESSI */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(72px,9vw,120px) clamp(20px,5vw,60px) clamp(56px,7vw,96px)", borderTop: "1px solid rgba(12,35,64,0.09)" }}>
        <div data-reveal="proc" style={{ textAlign: "center", marginBottom: 56, ...rv("proc") }}>
          <Chip>Näin se toimii</Chip>
          <SectionH2>Neljä askelta <span className="display-italic" style={{ color: "#E06B00" }}>vaivattomaan</span> tuottoon.</SectionH2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))", gap: 32 }}>
          {[
            { n: "01", t: "Tuottoarvio", txt: "Kerro kohteestasi. Saat ilmaisen, yksityiskohtaisen tuottoarvion 24 tunnin sisällä." },
            { n: "02", t: "Käynnistys", txt: "Kuvaamme kohteen, kirjoitamme ilmoitukset ja valmistelemme asunnon vieraille." },
            { n: "03", t: "Automaatio", txt: "AI hinnoittelee, viestii vieraille ja koordinoi siivouksen – 24/7 kolmella kielellä." },
            { n: "04", t: "Tuotot tilille", txt: "Kuukausittainen raportti ja tuotot suoraan tilillesi. Sinä et tee mitään." },
          ].map((s, i) => (
            <div key={i} data-reveal={`proc-${i}`} className="process-step" style={{ paddingTop: 8, ...rv(`proc-${i}`, i * 0.12) }}>
              <div className="process-num">{s.n}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "#0C2340", letterSpacing: "-0.3px", marginBottom: 10 }}>{s.t}</div>
              <p style={{ fontSize: 14, lineHeight: 1.74, color: "#666", margin: 0 }}>{s.txt}</p>
            </div>
          ))}
        </div>
      </section>

      {/* RATKAISU CTA (dark) */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(20px,5vw,60px) clamp(56px,7vw,88px)" }}>
        <div data-reveal="sol" style={{ background: "linear-gradient(135deg,#030710 0%,#0C2340 60%,#14305A 100%)", borderRadius: 24, padding: "clamp(48px,7vw,88px)", position: "relative", overflow: "hidden", ...rv("sol") }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: GRAIN, pointerEvents: "none", borderRadius: 24 }} />
          <div style={{ position: "absolute", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle,rgba(206,136,64,0.18),transparent 70%)", top: -140, right: -100, pointerEvents: "none", animation: "blobFloat 12s ease-in-out infinite" }} />
          <div style={{ position: "absolute", width: 340, height: 340, borderRadius: "50%", background: "radial-gradient(circle,rgba(206,136,64,0.08),transparent 70%)", bottom: -120, left: -60, pointerEvents: "none", animation: "blobFloat2 15s ease-in-out infinite" }} />
          <div style={{ position: "relative", maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
            <Chip dark>Ratkaisu</Chip>
            <h2 style={{ fontSize: "clamp(30px,4.8vw,56px)", fontWeight: 700, lineHeight: 1.06, letterSpacing: "-1.6px", margin: "0 0 20px", color: "#fff" }}>
              Sinä nautit tuotoista.<br /><span className="display-italic" style={{ color: "#F08820" }}>Me hoidamme kaiken muun</span>.
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.75, color: "rgba(255,255,255,0.62)", maxWidth: 500, margin: "0 auto 44px" }}>
              Ulkoista meille niin paljon tai vähän kuin haluat – aloita vaikka pelkällä avainpalvelulla.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,160px),1fr))", gap: 28, marginBottom: 36 }}>
              {[{ v: "25 %", l: "Komissiota" }, { v: "+80 %", l: "Enemmän kuin pitkävuokra" }, { v: "0 h", l: "Sinun aikaasi" }].map((s, i) => (
                <div key={i}>
                  <div style={{ fontSize: "clamp(32px,4.4vw,52px)", fontWeight: 700, color: "#F08820", letterSpacing: "-1.5px", lineHeight: 1 }}>{s.v}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.48)", marginTop: 8, textTransform: "uppercase", letterSpacing: "1.4px" }}>{s.l}</div>
                </div>
              ))}
            </div>
            <BtnAccent onClick={() => go("palvelut")}>Tutustu palveluihin <ArrowIcon /></BtnAccent>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(72px,9vw,120px) clamp(20px,5vw,60px) clamp(56px,7vw,96px)", borderTop: "1px solid rgba(12,35,64,0.09)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: 64, alignItems: "start" }}>
          <div data-reveal="faq-left" style={{ ...rv("faq-left") }}>
            <Chip>Kysyttyä</Chip>
            <SectionH2 style={{ textAlign: "left" }}>Usein kysytyt<br /><span className="display-italic" style={{ color: "#E06B00" }}>kysymykset</span>.</SectionH2>
            <p style={{ fontSize: 15, color: "#5A7088", lineHeight: 1.75, marginTop: 20, maxWidth: 360 }}>Etkö löydä vastausta? Ota yhteyttä – vastaamme 24 h sisällä.</p>
            <div style={{ marginTop: 24 }}>
              <button className="btn-outline" onClick={() => go("yhteystiedot")} style={{ background: "transparent", color: "#0C2340", border: "1.5px solid rgba(15,42,61,0.25)", borderRadius: 999, padding: "15px 30px", fontSize: 14, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8 }}>
                Ota yhteyttä <ArrowIcon />
              </button>
            </div>
          </div>
          <div data-reveal="faq-right" style={{ ...rv("faq-right", 0.15) }}>
            {[
              { q: "Kuinka nopeasti pääsen alkuun?", a: "Tyypillisesti 5–10 päivää yhteydenotosta ensimmäisiin varauksiin. Käymme kohteessa, kuvaamme sen, luomme ilmoitukset ja käynnistämme kampanjat." },
              { q: "Mitä komissio 25 % sisältää?", a: "Kaiken: ilmoitukset, hinnoittelu, vierasviestintä 24/7, siivouskoordinointi, huolto, arvostelut ja kuukausiraportti. Ei piilokuluja, ei kiinteitä maksuja." },
              { q: "Voinko itse käyttää asuntoa välillä?", a: "Totta kai. Varaat itsellesi kalenterista ne päivät, jolloin haluat käyttää asuntoa. Me hoidamme loput." },
              { q: "Entä siivous ja liinavaatteet?", a: "Sisältyy täyteen hallintaan. Ammattisiivoojat, hotellilaatuiset liinavaatteet ja amenities – kaikki koordinoidaan puolestasi." },
              { q: "Mitä jos vieras vahingoittaa asuntoa?", a: "Airbnb AirCover ja Booking.com vakuutukset kattavat useimmat tilanteet. Me dokumentoimme, reklamoimme ja hoidamme korvausprosessin puolestasi." },
            ].map((item, i) => (
              <div key={i} style={{ borderBottom: "1px solid rgba(12,35,64,0.09)", padding: "24px 4px" }}>
                <button aria-expanded={faqOpen === i} onClick={() => setFaqOpen(faqOpen === i ? null : i)} style={{ width: "100%", background: "none", border: "none", padding: 0, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, cursor: "pointer", textAlign: "left", color: "#0C2340", fontSize: "clamp(16px,1.7vw,18px)", fontWeight: 600, letterSpacing: "-0.2px" }}>
                  <span>{item.q}</span>
                  <span className={`faq-plus${faqOpen === i ? " open" : ""}`} style={{ width: 36, height: 36, borderRadius: "50%", background: faqOpen === i ? "#E06B00" : "rgba(12,35,64,0.06)", color: faqOpen === i ? "#fff" : "#0C2340", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "background 0.3s, color 0.3s" }}>
                    <PlusIcon size={16} />
                  </span>
                </button>
                <div className={`faq-body${faqOpen === i ? " open" : ""}`}>
                  <div style={{ paddingTop: 14, fontSize: 15, lineHeight: 1.78, color: "#555" }}>{item.a}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ background: "linear-gradient(160deg,#030710 0%,#0C2340 60%,#14305A 100%)", color: "#fff", padding: "clamp(80px,11vw,140px) clamp(20px,5vw,60px)", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: GRAIN, pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle,rgba(206,136,64,0.12),transparent 70%)", bottom: -160, left: "50%", transform: "translateX(-50%)", pointerEvents: "none", animation: "blobFloat 16s ease-in-out infinite" }} />
        <div data-reveal="final-cta" style={{ maxWidth: 680, margin: "0 auto", position: "relative", zIndex: 2, ...rv("final-cta") }}>
          <Chip dark>Valmis aloittamaan?</Chip>
          <h2 style={{ fontSize: "clamp(30px,4.8vw,56px)", fontWeight: 700, lineHeight: 1.06, letterSpacing: "-1.6px", margin: "0 0 20px", color: "#fff" }}>
            Lopeta päänvaiva.<br /><span className="display-italic" style={{ color: "#F08820" }}>Aloita tuottaminen</span>.
          </h2>
          <p style={{ fontSize: "clamp(15px,1.6vw,18px)", lineHeight: 1.78, color: "rgba(255,255,255,0.62)", maxWidth: 520, margin: "0 auto 32px" }}>
            Kerro kohteestasi – saat ilmaisen tarjouksen 24 tunnin sisällä. Ei sitoumuksia.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <BtnAccent onClick={() => go("yhteystiedot")}>Pyydä tarjousta <ArrowIcon /></BtnAccent>
            <button className="btn-ghost" onClick={() => go("hinnat")} style={{ background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.2)", borderRadius: 999, padding: "15px 30px", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
              Katso hinnat
            </button>
          </div>
        </div>
      </section>
    </>
  );

  /* ── PALVELUT ── */
  const Palvelut = () => (
    <section style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(72px,9vw,120px) clamp(20px,5vw,60px) clamp(56px,7vw,96px)" }}>
      <div data-reveal="palv" style={{ textAlign: "center", marginBottom: 56, ...rv("palv") }}>
        <Chip>Palvelut</Chip>
        <SectionH2>Valitse sinulle <span className="display-italic" style={{ color: "#E06B00" }}>sopiva taso</span>.</SectionH2>
        <Sub>Aloita vaikka pelkällä avainpalvelulla – tai anna meidän hoitaa kaikki.</Sub>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))", gap: 22, marginBottom: 56 }}>
        {[
          {
            label: "Helppo aloitus", icon: <KeyIcon size={28} />, t: "Avainpalvelu", pr: "alk. 29 €/vaihto",
            desc: "Se alkuperäinen kipupiste ratkaistuna. Ei enää avainten juoksupoikana toimimista – me hoidamme jokaisen vaihdon puolestasi.",
            items: ["Avainten luovutus vieraalle sovittuna aikana – ystävällisesti ja ammattimaisesti","Vieraan henkilökohtainen vastaanotto ja opastus asuntoon","Avainten vastaanotto check-outissa ja asunnon kunnon tarkistus","Valokuvaraportti asunnon tilasta joka vaihdon jälkeen","Kuukausipaketti: 249 €/kk sisältäen 10 vaihtoa – lisävaihdot 22 €/kpl"],
            featured: false,
          },
          {
            label: "Suosituin", icon: <HomeIcon size={28} />, t: "Täysi hallinta", pr: "25 % komissiolla",
            desc: "Avaimet käteen – kirjaimellisesti. Me hoidamme kaiken alusta loppuun. Sinun ainoa tehtäväsi on katsoa kuukausiraporttia ja nauttia tuotoista.",
            items: ["Ilmoitusten luonti, jatkuva optimointi ja näkyvyyden maksimointi","Ammattimainen valokuvaus – laadukkaat kuvat hakutuloksiin","AI-pohjainen dynaaminen hinnoittelu – optimoituu automaattisesti","Vierasviestintä 24/7 suomeksi, englanniksi ja saksaksi","Ammattimainen siivous jokaisen vieraan jälkeen","Puhtaat liinavaatteet, pyyhkeet ja perustarvikkeet valmiina","Huoltokoordinointi: jos jokin menee rikki, hoidamme sen","Arvostelujen hallinta ja kuukausittainen tuottoraportti","Oulu2026-tapahtumahinnoittelu"],
            featured: true,
          },
          {
            label: "Itse tekeville", icon: <StarIcon size={28} />, t: "Kevyt hallinta", pr: "15 % komissiolla",
            desc: "Sinä hoidat fyysisen puolen – avaimet ja siivous. Me hoidamme kaiken digitaalisen: ilmoitukset, hinnoittelun, viestinnän ja arvostelut.",
            items: ["Ilmoitusten luonti, hallinta ja jatkuva optimointi kaikilla alustoilla","Dynaaminen hinnoittelu – yöhintasi mukautuu automaattisesti","Vierasviestintä 24/7: vastaamme kaikkiin viesteihin puolestasi","Arvostelujen hallinta ja ammattimainen vastaaminen","Kuukausittainen tuottoraportti","Omistaja hoitaa itse siivouksen, avaimet ja tarvikkeet"],
            featured: false,
          },
        ].map((p, i) => (
          <div key={i} data-reveal={`palv-${i}`} style={{ background: "#fff", borderRadius: 18, padding: "36px 28px", border: p.featured ? `2px solid #E06B00` : "1px solid rgba(12,35,64,0.09)", position: "relative", overflow: "hidden", boxShadow: p.featured ? "0 8px 40px rgba(206,136,64,0.15)" : "none", ...rv(`palv-${i}`, i * 0.1) }}>
            <div style={{ position: "absolute", top: 0, right: 20, background: p.featured ? "#E06B00" : "#0C2340", color: "#fff", fontSize: 9, fontWeight: 700, padding: "5px 14px", borderRadius: "0 0 8px 8px", textTransform: "uppercase", letterSpacing: "1.5px" }}>{p.label}</div>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(224,107,0,0.1)", color: "#E06B00", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, marginTop: 8 }}>{p.icon}</div>
            <div style={{ fontSize: 21, fontWeight: 700, marginBottom: 6, color: "#0C2340" }}>{p.t}</div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#E06B00", marginBottom: 16 }}>{p.pr}</div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#666", marginBottom: 20 }}>{p.desc}</p>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px" }}>{p.items.map((it, j) => <Li key={j}>{it}</Li>)}</ul>
            <BtnAccent onClick={() => go("yhteystiedot")} style={{ width: "100%", justifyContent: "center" }}>Pyydä tarjousta <ArrowIcon /></BtnAccent>
          </div>
        ))}
      </div>

      <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 24, color: "#0C2340" }}>Lisäpalvelut</h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,320px),1fr))", gap: 18 }}>
        {[
          { icon: <CameraIcon size={24} />, t: "Ammattimainen valokuvaus", pr: "250 €", txt: "Laadukkaat, valoisan ja houkuttelevat kuvat kohteestasi. Kuvaamme jokaisen huoneen parhaasta kulmasta luonnonvalossa. Sisältää kuvien jälkikäsittelyn. Hyvillä kuvilla varausprosessi voi nousta jopa 40 %." },
          { icon: <GlobeIcon size={24} />, t: "Monikielinen ilmoitusoptimointi", pr: "150 €/ilmoitus", txt: "Kirjoitamme ilmoituksesi suomeksi, englanniksi ja saksaksi – ammattitasoisesti. Erityisen tärkeää Oulu2026-vuonna, kun kansainväliset matkailijat etsivät majoitusta." },
        ].map((s, i) => (
          <div key={i} style={{ background: "#fff", borderRadius: 14, padding: "28px 24px", border: "1px solid rgba(12,35,64,0.09)" }}>
            <div style={{ color: "#E06B00", marginBottom: 12 }}>{s.icon}</div>
            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4, color: "#0C2340" }}>{s.t}</div>
            <div style={{ fontSize: 14, color: "#E06B00", marginBottom: 10 }}>{s.pr}</div>
            <p style={{ fontSize: 13.5, lineHeight: 1.65, color: "#666", margin: 0 }}>{s.txt}</p>
          </div>
        ))}
      </div>
    </section>
  );

  /* ── HINNAT ── */
  const Hinnat = () => (
    <section style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(72px,9vw,120px) clamp(20px,5vw,60px) clamp(56px,7vw,96px)" }}>
      <div data-reveal="hinn" style={{ textAlign: "center", marginBottom: 56, ...rv("hinn") }}>
        <Chip>Hinnoittelu</Chip>
        <SectionH2>Läpinäkyvä hinnoittelu.<br /><span className="display-italic" style={{ color: "#E06B00" }}>Ei yllätyksiä</span>.</SectionH2>
        <Sub>Komissiomalli: tienaamme vain silloin kun sinä tienaat. Riski on meillä – tuotot sinulla.</Sub>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,260px),1fr))", gap: 18, marginBottom: 56 }}>
        {[
          { featured: false, lab: "Avainpalvelu", nm: "Perusvaihto", pr: "29 €", un: "per vaihto", ft: ["Avainten luovutus ja vastaanotto","Ystävällinen vieraan opastus","Asunnon kunnon tarkistus","Valokuvaraportti omistajalle"] },
          { featured: false, lab: "Avainpalvelu", nm: "Kuukausipaketti", pr: "249 €", un: "per kuukausi · sis. 10 vaihtoa", ft: ["Kaikki perusvaihdon palvelut","10 vaihtoa kuukaudessa","Lisävaihdot vain 22 €/kpl","Ensisijainen palvelu"] },
          { featured: true, lab: "Hosting", nm: "Täysi hallinta", pr: "25 %", un: "komissiota bruttovuokratulosta", ft: ["Koko prosessi A:sta Ö:hön","Ilmoitukset, hinnoittelu, viestintä 24/7","Ammattimainen siivous ja liinavaatteet","Huoltokoordinointi ja ongelmanratkaisu","Arvostelujen hallinta","AI-tapahtumahinnoittelu"] },
          { featured: false, lab: "Hosting", nm: "Kevyt hallinta", pr: "15 %", un: "komissiota bruttovuokratulosta", ft: ["Ilmoitusten hallinta ja optimointi","Dynaaminen hinnoittelu","Vierasviestintä 24/7","Arvostelujen hallinta","Omistaja hoitaa fyysisen puolen"] },
        ].map((p, i) => (
          <div key={i} data-reveal={`hinn-${i}`} style={{ background: p.featured ? "#030710" : "#fff", color: p.featured ? "#fff" : "#0C2340", borderRadius: 20, padding: "36px 26px", border: p.featured ? "none" : "1px solid rgba(12,35,64,0.09)", display: "flex", flexDirection: "column", position: "relative", boxShadow: p.featured ? "0 16px 50px rgba(0,0,0,0.15)" : "none", ...rv(`hinn-${i}`, i * 0.08) }}>
            {p.featured && <div style={{ position: "absolute", top: -1, left: "50%", transform: "translateX(-50%)", background: "#E06B00", color: "#fff", fontSize: 9, fontWeight: 700, padding: "5px 16px", borderRadius: "0 0 9px 9px", textTransform: "uppercase", letterSpacing: "1.5px" }}>Suosituin</div>}
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "2px", color: p.featured ? "#E06B00" : "#5A7088", marginBottom: 10 }}>{p.lab}</div>
            <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>{p.nm}</div>
            <div style={{ fontSize: 38, fontWeight: 700, color: "#E06B00", letterSpacing: "-1px", marginBottom: 2 }}>{p.pr}</div>
            <div style={{ fontSize: 13, color: p.featured ? "rgba(255,255,255,0.4)" : "#5A7088", marginBottom: 24 }}>{p.un}</div>
            {p.ft.map((ft, j) => (
              <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 9, fontSize: 13, lineHeight: 1.6, color: p.featured ? "rgba(255,255,255,0.7)" : "#555", marginBottom: 9 }}>
                <span style={{ color: "#E06B00", flexShrink: 0 }}><CheckIcon size={13} /></span>{ft}
              </div>
            ))}
            <button onClick={() => go("yhteystiedot")} style={{ marginTop: "auto", paddingTop: 22, background: p.featured ? "#E06B00" : "transparent", color: p.featured ? "#fff" : "#0C2340", border: p.featured ? "none" : "2px solid #0C2340", borderRadius: 50, padding: "13px 22px", fontSize: 13.5, fontWeight: 600, cursor: "pointer", width: "100%", transition: "all 0.2s" }}>
              {p.featured ? "Pyydä tarjousta" : "Ota yhteyttä"}
            </button>
          </div>
        ))}
      </div>

      <div data-reveal="calc" style={{ background: "#fff", borderRadius: 20, padding: "clamp(24px,4vw,44px)", border: "1px solid rgba(12,35,64,0.09)", ...rv("calc") }}>
        <h3 style={{ fontSize: 21, fontWeight: 700, marginBottom: 6, color: "#0C2340" }}>Esimerkki: yksiö Oulun keskustassa</h3>
        <p style={{ fontSize: 13.5, color: "#5A7088", marginBottom: 28 }}>Yöhinta 85 €, käyttöaste 65 % – lyhytvuokra verrattuna pitkävuokraan</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,150px),1fr))", gap: 14 }}>
          {[{ l: "Bruttotulo/kk", v: "~1 660 €" }, { l: "Kelvix (25 %)", v: "~415 €" }, { l: "Sinulle jää/kk", v: "~1 245 €", a: true }, { l: "Pitkävuokra tuottaisi", v: "~650 €" }, { l: "Lisätuottosi", v: "+91 %", a: true }].map((d, i) => (
            <div key={i} style={{ textAlign: "center", padding: 14 }}>
              <div style={{ fontSize: 11, color: "#5A7088", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 6 }}>{d.l}</div>
              <div style={{ fontSize: d.a ? 30 : 24, fontWeight: 700, color: d.a ? "#E06B00" : "#0C2340" }}>{d.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  /* ── MEISTÄ ── */
  const Meista = () => (
    <section style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(72px,9vw,120px) clamp(20px,5vw,60px) clamp(56px,7vw,96px)" }}>
      <div data-reveal="me" style={{ textAlign: "center", marginBottom: 56, ...rv("me") }}>
        <Chip>Meistä</Chip>
        <SectionH2>Emme ole ketjufirma.<br /><span className="display-italic" style={{ color: "#E06B00" }}>Olemme oululaisia</span>.</SectionH2>
        <Sub style={{ maxWidth: 620, margin: "0 auto 20px" }}>Kelvix Hosting syntyi kun eräs asunnonomistaja totesi: "Oulussa ei ole ketään, joka hoitaisi tämän puolestani." Me päätimme olla se joku.</Sub>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,240px),1fr))", gap: 20, marginBottom: 56 }}>
        {[
          { n: "01", t: "Kerro kohteestasi", txt: "Ota yhteyttä ja kerro asunnostasi. Teemme ilmaisen tarjouksen – ei sitoumuksia, ei velvoitteita." },
          { n: "02", t: "Me valmistelemme kaiken", txt: "Valokuvaamme kohteen, luomme optimoidut ilmoitukset ja valmistelemme asunnon ensimmäisiä vieraita varten." },
          { n: "03", t: "Varaukset alkavat tulla", txt: "Hoidamme kaiken viestinnän, avainten luovutuksen, siivouksen ja huollon. Sinä voit unohtaa koko homman." },
          { n: "04", t: "Sinä nautit tuotoista", txt: "Rahat tilillesi, selkeä kuukausiraportti ja mielenrauha siitä, että asuntosi on hyvissä käsissä." },
        ].map((s, i) => (
          <div key={i} data-reveal={`me-${i}`} className="process-step" style={{ padding: "24px 0", ...rv(`me-${i}`, 0.05 + i * 0.12) }}>
            <div className="process-num">{s.n}</div>
            <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 8, color: "#0C2340" }}>{s.t}</div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "#666", margin: 0 }}>{s.txt}</p>
          </div>
        ))}
      </div>

      <div style={{ background: "linear-gradient(135deg,#030710 0%,#0C2340 100%)", borderRadius: 24, padding: "clamp(32px,5vw,60px)", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: GRAIN, pointerEvents: "none", borderRadius: 24 }} />
        <div style={{ position: "absolute", width: 250, height: 250, borderRadius: "50%", background: "rgba(206,136,64,0.1)", top: -80, right: -80, pointerEvents: "none" }} />
        <h2 style={{ fontSize: "clamp(22px,3.5vw,32px)", fontWeight: 700, color: "#fff", marginBottom: 14, letterSpacing: "-0.5px", position: "relative" }}>Asuntosi ansaitsee parempaa<br />kuin tyhjää seisomista.</h2>
        <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", maxWidth: 480, margin: "0 auto 28px", position: "relative" }}>Aloita vaikka pelkällä avainpalvelulla – tai anna meidän hoitaa kaikki.</p>
        <BtnAccent onClick={() => go("yhteystiedot")} style={{ position: "relative" }}>Pyydä tarjousta <ArrowIcon /></BtnAccent>
      </div>
    </section>
  );

  /* ── YHTEYSTIEDOT ── */
  const Yhteystiedot = () => {
    const [state, handleSubmit] = useForm("mwvyzyjv");
    return (
      <section style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(72px,9vw,120px) clamp(20px,5vw,60px) clamp(56px,7vw,96px)" }}>
        <div data-reveal="contact" style={{ textAlign: "center", marginBottom: 56, ...rv("contact") }}>
          <Chip>Ota yhteyttä</Chip>
          <SectionH2>Pyydä ilmainen tarjous</SectionH2>
          <Sub>Vastaamme jokaiseen yhteydenottoon 24 tunnin sisällä. Ei sido sinua mihinkään.</Sub>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: 64, marginBottom: 80 }}>
          <div>
            {state.succeeded ? (
              <div style={{ background: "rgba(224,107,0,0.05)", borderRadius: 18, padding: 44, textAlign: "center", border: "1px solid rgba(224,107,0,0.15)" }}>
                <div style={{ fontSize: 52, marginBottom: 16, color: "#E06B00" }}>✓</div>
                <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, color: "#0C2340" }}>Kiitos yhteydenotosta!</div>
                <p style={{ color: "#666", fontSize: 15 }}>Palaamme asiaan 24 tunnin sisällä.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#0C2340", marginBottom: 6 }}>Nimesi *</label>
                <input style={inputStyle} placeholder="Etunimi Sukunimi" name="name" required />
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#0C2340", marginBottom: 6 }}>Sähköposti *</label>
                <input style={inputStyle} placeholder="sinä@esimerkki.fi" type="email" name="email" required />
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#0C2340", marginBottom: 6 }}>Puhelinnumero</label>
                <input style={inputStyle} placeholder="040 123 4567" name="puhelinnumero" />
                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#0C2340", marginBottom: 6 }}>Kohteesi</label>
                <textarea style={{ ...inputStyle, minHeight: 130, resize: "vertical" }} placeholder="Kerro kohteestasi (osoite, huoneiden määrä, onko jo Airbnb:ssä)" name="viesti" />
                <BtnAccent style={{ width: "100%", justifyContent: "center" }}>
                  {state.submitting ? "Lähetetään..." : "Pyydä tarjousta"}
                  {!state.submitting && <ArrowIcon />}
                </BtnAccent>
              </form>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#0C2340" }}>Kelvix Hosting</div>
            <p style={{ fontSize: 14.5, color: "#666", lineHeight: 1.7, margin: 0 }}>Oulun ensimmäinen ammattimainen lyhytvuokrauksen hosting-palvelu. Sinä nautit tuotoista – me hoidamme kaiken muun.</p>
            {[
              { ic: <MailIcon />, t: EMAIL, href: `mailto:${EMAIL}` },
              { ic: <PhoneIcon />, t: PHONE, href: `tel:${PHONE.replace(/\s/g,"")}` },
              { ic: <MapIcon />, t: "Oulu ja lähialueet", href: null },
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 13 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(12,35,64,0.06)", color: "#0C2340", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{c.ic}</div>
                {c.href ? <a href={c.href} style={{ fontSize: 14.5, color: "#0C2340", textDecoration: "none" }}>{c.t}</a> : <span style={{ fontSize: 14.5, color: "#555" }}>{c.t}</span>}
              </div>
            ))}
            <div style={{ padding: "20px 22px", background: "rgba(27,58,75,0.03)", borderRadius: 14, border: "1px solid rgba(12,35,64,0.09)" }}>
              <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 6, color: "#0C2340" }}>Ilmainen tarjous 24h sisällä</div>
              <p style={{ fontSize: 13, color: "#777", margin: 0, lineHeight: 1.6 }}>Jokainen yhteydenotto saa henkilökohtaisen vastauksen. Ei sido sinua mihinkään – ei riskiä, ei velvoitteita.</p>
            </div>
          </div>
        </div>
      </section>
    );
  };

  /* ── TIETOSUOJA ── */
  const Tietosuoja = () => (
    <section style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(72px,9vw,120px) clamp(20px,5vw,60px) 80px" }}>
      <div data-reveal="ts" style={{ marginBottom: 48, ...rv("ts") }}>
        <Chip>Tietosuoja</Chip>
        <SectionH2 style={{ textAlign: "left" }}>Tietosuojaseloste</SectionH2>
        <p style={{ fontSize: 13, color: "#5A7088", marginBottom: 0 }}>Päivitetty: 11.5.2026 · EU:n yleinen tietosuoja-asetus (GDPR) 2016/679</p>
      </div>
      {[
        { t: "1. Rekisterinpitäjä", body: [<><strong>Kelvix Oy</strong><br />Oulu, Suomi<br />Sähköposti: <a href={`mailto:${EMAIL}`} style={{ color: "#E06B00" }}>{EMAIL}</a><br />Puhelin: {PHONE}</>] },
        { t: "2. Rekisterin nimi", body: ["Kelvix Hosting asiakasrekisteri ja yhteydenottolomakkeen tietorekisteri."] },
        { t: "3. Henkilötietojen käsittelyn tarkoitus", body: ["Käsittelemme henkilötietoja seuraaviin tarkoituksiin:", <ul style={{ margin: "8px 0", padding: "0 0 0 20px", fontSize: 14, lineHeight: 1.75, color: "#555" }}><li>Yhteydenottopyyntöjen ja asiakaskyselyjen käsittely</li><li>Palvelusopimuksen solmiminen ja täyttäminen</li><li>Tarjousten toimittaminen</li><li>Laskutus ja maksujen käsittely</li><li>Asiakassuhteen ylläpito ja viestintä</li><li>Lakisääteisten velvoitteiden täyttäminen</li></ul>, "Käsittelyn oikeusperusteena on sopimuksen täytäntöönpano, rekisteröidyn suostumus sekä rekisterinpitäjän oikeutettu etu."] },
        { t: "4. Rekisterin tietosisältö", body: ["Rekisteri voi sisältää:", <ul style={{ margin: "8px 0", padding: "0 0 0 20px", fontSize: 14, lineHeight: 1.75, color: "#555" }}><li>Nimi, sähköpostiosoite, puhelinnumero</li><li>Kohteen osoite ja kiinteistön tiedot</li><li>Valittu palvelu tai palvelupyyntö</li><li>Viestintä- ja asiakashistoria</li><li>Sopimus- ja laskutustiedot</li></ul>] },
        { t: "5. Tietolähteet", body: ["Henkilötiedot kerätään rekisteröidyltä itseltään verkkosivun yhteydenottolomakkeen, sähköpostin tai puhelimen välityksellä."] },
        { t: "6. Tietojen luovuttaminen", body: ["Henkilötietoja ei luovuteta ulkopuolisille ilman rekisteröidyn suostumusta, ellei lainsäädäntö sitä edellytä."] },
        { t: "7. Siirto EU:n ulkopuolelle", body: ["Henkilötietoja ei siirretä EU:n tai ETA-alueen ulkopuolelle."] },
        { t: "8. Säilytysaika", body: ["Henkilötietoja säilytetään niin kauan kuin asiakassuhde on voimassa ja sen jälkeen kirjanpitolain edellyttämän ajan (6 vuotta). Yhteydenottolomakkeen tiedot, joista ei muodostu asiakassuhdetta, poistetaan 12 kuukauden kuluessa."] },
        { t: "9. Rekisteröidyn oikeudet", body: ["Rekisteröidyllä on oikeus tarkistaa tietonsa, oikaista virheellisiä tietoja, pyytää tietojen poistamista, rajoittaa käsittelyä sekä tehdä valitus Tietosuojavaltuutetulle (tietosuoja.fi). Pyyntöjen osoite: ", <a href={`mailto:${EMAIL}`} style={{ color: "#E06B00" }}>{EMAIL}</a>] },
        { t: "10. Tietoturva", body: ["Rekisterin tiedot on suojattu asianmukaisin teknisin ja organisatorisin toimenpitein. Käytämme SSL-salattua yhteyttä tiedonsiirron suojaamiseen."] },
        { t: "11. Evästeet", body: ["Verkkosivumme saattaa käyttää teknisiä evästeitä sivuston toiminnan varmistamiseen. Emme käytä markkinointi- tai seurantaevästeitä ilman suostumustasi."] },
        { t: "12. Muutokset", body: ["Pidätämme oikeuden päivittää tätä tietosuojaselostetta. Muutoksista ilmoitetaan verkkosivullamme."] },
      ].map((sec, i, arr) => (
        <div key={i} style={{ marginBottom: 32, paddingBottom: 32, borderBottom: i < arr.length - 1 ? "1px solid rgba(12,35,64,0.09)" : "none" }}>
          <h3 style={{ fontSize: 17, fontWeight: 700, color: "#0C2340", marginBottom: 12 }}>{sec.t}</h3>
          {sec.body.map((b, j) => typeof b === "string" ? <p key={j} style={{ fontSize: 14.5, lineHeight: 1.75, color: "#555", margin: "0 0 8px" }}>{b}</p> : <div key={j}>{b}</div>)}
        </div>
      ))}
    </section>
  );

  /* ── FOOTER ── */
  const Footer = () => (
    <footer style={{ background: "#030710", color: "#fff", padding: "64px clamp(20px,5vw,60px) 32px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: GRAIN, pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle,rgba(206,136,64,0.1),transparent 70%)", top: -140, right: -120, pointerEvents: "none" }} />
      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative", zIndex: 2 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))", gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <span style={{ color: "#E06B00" }}><KeyIcon size={18} /></span>
              <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: "-0.3px" }}>Kelvix<span className="display-italic" style={{ color: "#E06B00", fontSize: 18 }}>Hosting</span></span>
            </div>
            <p style={{ fontSize: 13.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, margin: 0, maxWidth: 280 }}>Oululainen premium-isännöinti Airbnb- ja Booking.com-omistajille. Sinä nautit tuotoista.</p>
          </div>
          <div>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "2px", color: "rgba(255,255,255,0.45)", fontWeight: 600, marginBottom: 16 }}>Palvelut</div>
            {["Avainpalvelu","Täysi hallinta","Kevyt hallinta","Valokuvaus"].map((t, i) => (
              <div key={i} onClick={() => go("palvelut")} style={{ fontSize: 14, color: "rgba(255,255,255,0.72)", marginBottom: 10, cursor: "pointer", transition: "color 0.2s" }}>{t}</div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "2px", color: "rgba(255,255,255,0.45)", fontWeight: 600, marginBottom: 16 }}>Yhteys</div>
            <a href={`mailto:${EMAIL}`} style={{ display: "block", fontSize: 14, color: "rgba(255,255,255,0.72)", marginBottom: 10, textDecoration: "none" }}>{EMAIL}</a>
            <a href={`tel:${PHONE.replace(/\s/g,"")}`} style={{ display: "block", fontSize: 14, color: "rgba(255,255,255,0.72)", marginBottom: 10, textDecoration: "none" }}>{PHONE}</a>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.72)" }}>Oulu, Suomi</div>
          </div>
          <div>
            <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "2px", color: "rgba(255,255,255,0.45)", fontWeight: 600, marginBottom: 16 }}>Aloita</div>
            <BtnAccent onClick={() => go("yhteystiedot")} style={{ padding: "13px 24px", fontSize: 13 }}>Pyydä tarjousta <ArrowIcon /></BtnAccent>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 24, display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between", alignItems: "center", fontSize: 12, color: "rgba(255,255,255,0.45)" }}>
          <div>Kelvix Oy · Y-tunnus: 3611027-9 · © 2026</div>
          <div>
            <span role="link" tabIndex={0} onClick={() => go("tietosuoja")} style={{ color: "rgba(255,255,255,0.55)", cursor: "pointer", textDecoration: "underline" }}>Tietosuojaseloste</span>
          </div>
          <div style={{ fontSize: 11, opacity: 0.7 }}>Airbnb-hallinnointi Oulu · Booking.com · Oulu 2026</div>
        </div>
      </div>
    </footer>
  );

  /* ── RENDER ── */
  const navScrolled = scrollY > 40;

  return (
    <div style={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column", fontFamily: "'DM Sans','Helvetica Neue',sans-serif", background: "#F2F5F9", color: "#0C2340", overflow: "hidden" }}>
      <style>{GLOBAL_STYLES}</style>

      <nav className={navScrolled ? "nav-scrolled" : ""} role="navigation" aria-label="Päänavigaatio" style={{ position: "sticky", top: 0, zIndex: 100, padding: "0 clamp(20px,5vw,60px)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 72 }}>
          <div className="nav-logo" style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.5px", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }} onClick={() => go("etusivu")}>
            <span className="nav-accent-text"><KeyIcon size={18} /></span>
            Kelvix<span className="display-italic nav-accent-text" style={{ fontSize: 19 }}>Hosting</span>
          </div>

          <div style={{ display: "flex", gap: 28, alignItems: "center" }} className="desktop-nav">
            {PAGES.map(p => (
              <span key={p} role="link" tabIndex={0} className={`nav-link-item${page === p ? " active" : ""}`} style={{ fontSize: 13, fontWeight: page === p ? 600 : 500, cursor: "pointer", letterSpacing: "0.3px", position: "relative", paddingBottom: 4 }}
                onClick={() => go(p)} onKeyDown={e => e.key === "Enter" && go(p)}>
                {LABELS[p]}
                {page === p && <span style={{ position: "absolute", bottom: -2, left: 0, right: 0, height: 2, background: "currentColor", borderRadius: 2 }} />}
              </span>
            ))}
            <button className="nav-cta btn-primary" onClick={() => go("yhteystiedot")} style={{ display: "inline-flex", alignItems: "center", gap: 8, color: "#fff", padding: "11px 22px", borderRadius: 999, fontSize: 12.5, fontWeight: 600, cursor: "pointer", border: "none", letterSpacing: "0.1px" }}>
              Ota yhteyttä
            </button>
          </div>

          <button className="nav-burger-btn" style={{ cursor: "pointer", background: "none", border: "none", padding: 6, display: "none" }} onClick={() => setMenuOpen(true)} aria-label="Avaa valikko">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          </button>
        </div>
      </nav>

      <style>{`
        @media (max-width: 767px) {
          .desktop-nav { display: none !important; }
          .nav-burger-btn { display: flex !important; }
        }
      `}</style>

      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(247,243,236,0.98)", backdropFilter: "blur(24px)", zIndex: 200, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32 }}>
          <button style={{ position: "absolute", top: 20, right: 24, background: "none", border: "none", fontSize: 32, cursor: "pointer", color: "#0C2340", lineHeight: 1 }} onClick={() => setMenuOpen(false)}>&times;</button>
          {PAGES.map(p => (
            <span key={p} role="link" tabIndex={0} style={{ fontSize: 24, fontWeight: 700, cursor: "pointer", textTransform: "uppercase", letterSpacing: "3px", color: page === p ? "#E06B00" : "#0C2340" }} onClick={() => go(p)}>
              {LABELS[p]}
            </span>
          ))}
        </div>
      )}

      <main ref={mainRef} style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
        {page === "etusivu" && <Etusivu />}
        {page === "palvelut" && <Palvelut />}
        {page === "hinnat" && <Hinnat />}
        {page === "meista" && <Meista />}
        {page === "yhteystiedot" && <Yhteystiedot />}
        {page === "tietosuoja" && <Tietosuoja />}
        <Footer />
      </main>
    </div>
  );
}
