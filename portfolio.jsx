import { useState, useEffect, useRef } from "react";

/* ─── DATA ───────────────────────────────────────────────────── */
const person = {
  name: "Ahmad Mujtaba Wakeel",
  initials: "AMW",
  location: "Athens, OH · Peshawar, Pakistan",
  email: "aw431425@ohio.edu",
  phone: "+1 (740) 907-7712",
  summary:
    "Entrepreneur and business operator with a demonstrated record of building, scaling, and managing revenue-generating ventures. Founded a tourism company that grew to 300+ organized tours serving institutional and corporate clients. Currently advancing analytical capabilities through data analytics research at Ohio University's SMART Lab.",
  stats: [
    { value: "300+", label: "Organized Tours" },
    { value: "30+", label: "Vendor Partnerships" },
    { value: "3",    label: "Ventures Founded"  },
    { value: "3",    label: "Languages Fluent"  },
  ],
  experience: [
    {
      role: "Graduate Research Associate – Data Analytics",
      org: "SMART Lab, Ohio University",
      period: "Dec 2025 – Present",
      location: "Athens, OH",
      color: "#c8a96e",
      desc: "Conducting data analytics research applying quantitative and qualitative methods to real-world datasets. Building analytical models and producing data-driven insights to support lab research objectives.",
      tags: ["Data Analytics", "Research", "Visualization"],
    },
    {
      role: "Founder & CEO",
      org: "Daastan Travel and Tours",
      period: "2022 – 2025",
      location: "Peshawar, Pakistan",
      color: "#7eb8a4",
      desc: "Built a tourism company from zero to 300+ organized group tours in three years. Managed full P&L, digital marketing, and partnerships with 30+ vendors across northern Pakistan.",
      tags: ["P&L Management", "Venture Scaling", "Digital Marketing"],
    },
    {
      role: "Local Coordinator for North America",
      org: "Students for Liberty",
      period: "Jul 2025 – Present",
      location: "Remote / USA",
      color: "#a07ebf",
      desc: "Coordinate student programming and outreach across North American campuses, managing event logistics, stakeholder communications, and organizational growth strategy.",
      tags: ["Leadership", "Outreach", "Events"],
    },
    {
      role: "Secondary School Teacher",
      org: "The Green Lyceum School",
      period: "Mar 2024 – Mar 2025",
      location: "Peshawar, Pakistan",
      color: "#e07a5f",
      desc: "Designed curriculum and delivered instruction for secondary-level students, applying project management and communication skills to drive student engagement.",
      tags: ["Curriculum Design", "Communication"],
    },
    {
      role: "Entrepreneur & Owner",
      org: "Cold Bros Café",
      period: "Feb 2021 – 2023",
      location: "Peshawar, Pakistan",
      color: "#f4b942",
      desc: "Launched and operated a café business, managing day-to-day operations, staffing, inventory, financial reporting, and customer experience.",
      tags: ["Operations", "Finance", "Marketing"],
    },
  ],
  education: [
    {
      degree: "Master of Arts in Asian Studies",
      school: "Ohio University",
      period: "2025 – Present",
      detail: "Advisor: Dr. Takaaki Suzuki · SMART Lab Research Team Member",
    },
    {
      degree: "Bachelor of Science in International Relations",
      school: "University of Peshawar",
      period: "2019 – 2024",
      detail: "Advisor: Dr. Saima Gul · General Secretary, IR Student Association",
    },
  ],
  skills: [
    { cat: "Business & Operations",      items: ["Venture Creation","P&L Management","Strategic Planning","Supply Chain","Pricing Strategy","Financial Reporting"] },
    { cat: "Analytics & Research",        items: ["Data Analysis","Data Visualization","Research Methodology","Market Analysis","Academic Writing"] },
    { cat: "Marketing & Communication",   items: ["Digital Marketing","Brand Development","Client Relations","Proposal Writing","Public Speaking"] },
    { cat: "Languages",                   items: ["English (Fluent)","Urdu (Fluent)","Pashto (Native)","Arabic (Reading)"] },
  ],
  awards: [
    { title: "Innovation & Entrepreneurship Award", org: "USAID × NUST", year: "2025" },
    { title: "Certificate of Appreciation",         org: "UNICEF Sustainable Development Program", year: "" },
    { title: "Certificate of Appreciation",         org: "International Conference – University of Peshawar", year: "" },
    { title: "Certificate of Completion",           org: "Gender Equality in Tourism Training", year: "" },
  ],
  research: [
    { title: "Maximizing Gains in the Era of Cold War 2.0",        sub: "Pakistan's Diplomatic Strategy Amidst Great Power Rivalry",              type: "Bachelor's Thesis"       },
    { title: "Media, Military, and the Manufacturing of Consent",  sub: "How Narratives Are Controlled in Pakistan's Political Discourse",         type: "Ongoing Graduate Research"},
  ],
};

const heroImg     = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80";
const aboutImg    = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80";
const tourImg     = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80";
const cafeImg     = "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=600&q=80";
const researchImg = "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80";
const eventImg    = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80";
const expImages   = [researchImg, tourImg, eventImg, aboutImg, cafeImg];

/* ─── UTILS ──────────────────────────────────────────────────── */
function useBreakpoint(bp = 768) {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < bp);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, [bp]);
  return mobile;
}

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

function FadeIn({ children, delay = 0, style: extra = {} }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(28px)",
      transition: `opacity .7s ease ${delay}s, transform .7s ease ${delay}s`,
      ...extra,
    }}>
      {children}
    </div>
  );
}

/* Smooth scroll with fixed-nav offset */
function goTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 68;
  window.scrollTo({ top: y, behavior: "smooth" });
}

/* ─── NAV ────────────────────────────────────────────────────── */
const LINKS = ["about","experience","research","skills","awards","contact"];

function Nav({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const isMobile                = useBreakpoint(860);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* Close drawer on outside tap */
  useEffect(() => {
    if (!open) return;
    const fn = (e) => {
      if (!e.target.closest("#mob-drawer") && !e.target.closest("#ham-btn"))
        setOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, [open]);

  const cap = (s) => s[0].toUpperCase() + s.slice(1);

  return (
    <>
      <nav style={{
        position: "fixed", inset: "0 0 auto 0", zIndex: 300,
        height: 68,
        background: scrolled || open ? "rgba(10,10,14,.97)" : "transparent",
        backdropFilter: scrolled || open ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(200,169,110,.13)" : "1px solid transparent",
        transition: "background .35s, border-color .35s, backdrop-filter .35s",
        display: "flex", alignItems: "center",
        padding: "0 6vw",
      }}>
        {/* Logo */}
        <button onClick={() => { window.scrollTo({ top:0, behavior:"smooth" }); setOpen(false); }}
          style={{ background:"none", border:"none", cursor:"pointer",
            fontFamily:"'Cormorant Garamond',serif", fontSize:22, color:"#c8a96e",
            letterSpacing:3, fontWeight:600, marginRight:"auto" }}>
          AMW
        </button>

        {/* Desktop links */}
        {!isMobile && (
          <div style={{ display:"flex", gap:30 }}>
            {LINKS.map(l => (
              <button key={l} onClick={() => goTo(l)} style={{
                background:"none", border:"none", cursor:"pointer",
                fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:2,
                textTransform:"uppercase",
                color: active === l ? "#c8a96e" : "rgba(255,255,255,.5)",
                paddingBottom:3,
                borderBottom: active === l ? "1px solid #c8a96e" : "1px solid transparent",
                transition:"color .2s, border-color .2s",
              }}>{cap(l)}</button>
            ))}
          </div>
        )}

        {/* Hamburger */}
        {isMobile && (
          <button id="ham-btn" onClick={() => setOpen(o => !o)}
            aria-label="Menu" style={{ background:"none", border:"none", cursor:"pointer",
              padding:8, display:"flex", flexDirection:"column", gap:5 }}>
            {[0,1,2].map(i => (
              <span key={i} style={{
                display:"block", width:24, height:1.5, background:"#c8a96e",
                transformOrigin:"center", transition:"transform .3s, opacity .3s",
                transform: open
                  ? i===0 ? "translateY(6.5px) rotate(45deg)"
                  : i===2 ? "translateY(-6.5px) rotate(-45deg)"
                  : "scaleX(0)"
                  : "none",
                opacity: open && i===1 ? 0 : 1,
              }} />
            ))}
          </button>
        )}
      </nav>

      {/* Mobile full-screen drawer */}
      {isMobile && (
        <div id="mob-drawer" style={{
          position:"fixed", top:68, left:0, right:0, bottom:0, zIndex:299,
          background:"rgba(10,10,14,.98)", backdropFilter:"blur(20px)",
          display:"flex", flexDirection:"column", justifyContent:"center",
          alignItems:"center", gap:8,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition:"opacity .35s ease",
        }}>
          {LINKS.map((l, i) => (
            <button key={l} onClick={() => { goTo(l); setOpen(false); }} style={{
              background:"none", border:"none", cursor:"pointer",
              fontFamily:"'Cormorant Garamond',serif",
              fontSize:"clamp(32px,7vw,48px)",
              fontWeight: active === l ? 600 : 300,
              color: active === l ? "#c8a96e" : "rgba(255,255,255,.7)",
              padding:"10px 0",
              borderBottom: i < LINKS.length-1 ? "1px solid rgba(255,255,255,.06)" : "none",
              width:"70%", textAlign:"center",
              transition:"color .2s",
              opacity: open ? 1 : 0,
              transform: open ? "translateY(0)" : "translateY(12px)",
              transitionDelay: `${i*0.06}s`,
            }}>{cap(l)}</button>
          ))}
        </div>
      )}
    </>
  );
}

/* ─── HERO ───────────────────────────────────────────────────── */
function Hero() {
  const [ready, setReady] = useState(false);
  useEffect(() => { const t = setTimeout(() => setReady(true), 80); return () => clearTimeout(t); }, []);

  return (
    <section id="hero" style={{ position:"relative", minHeight:"100vh", display:"flex", alignItems:"center", overflow:"hidden" }}>
      <div style={{
        position:"absolute", inset:0,
        backgroundImage:`url(${heroImg})`, backgroundSize:"cover", backgroundPosition:"center",
        filter:"brightness(.22)",
        transform: ready ? "scale(1)" : "scale(1.06)",
        transition:"transform 1.6s ease",
      }} />
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(135deg,rgba(10,10,14,.75) 0%,transparent 55%,rgba(10,10,14,.55) 100%)" }} />

      <div style={{ position:"relative", padding:"clamp(100px,14vw,140px) 8vw 60px", maxWidth:960, width:"100%" }}>
        <div style={{
          opacity: ready ? 1 : 0,
          transform: ready ? "translateY(0)" : "translateY(22px)",
          transition:"all .9s ease .2s",
        }}>
          <p style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:"#c8a96e", letterSpacing:4, textTransform:"uppercase", marginBottom:18 }}>
            Portfolio · Ahmad Mujtaba Wakeel
          </p>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(44px,9vw,100px)", fontWeight:300, color:"#fff", lineHeight:1, margin:"0 0 4px" }}>
            Ahmad Mujtaba
          </h1>
          <h1 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(44px,9vw,100px)", fontWeight:600, color:"#c8a96e", lineHeight:1, margin:"0 0 28px", fontStyle:"italic" }}>
            Wakeel.
          </h1>
          <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:"clamp(14px,1.8vw,16px)", color:"rgba(255,255,255,.6)", maxWidth:520, lineHeight:1.85, marginBottom:40 }}>
            Entrepreneur who built 300+ tours from zero. Data analytics researcher at Ohio University's SMART Lab. Rooted in Peshawar, thinking globally.
          </p>
          <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
            <button onClick={() => goTo("experience")}
              style={{ padding:"13px 28px", background:"#c8a96e", border:"none", color:"#0a0a0e", fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:2, textTransform:"uppercase", cursor:"pointer", transition:"opacity .2s" }}
              onMouseEnter={e=>e.currentTarget.style.opacity=".82"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
              View Work
            </button>
            <button onClick={() => goTo("contact")}
              style={{ padding:"13px 28px", background:"transparent", border:"1px solid rgba(200,169,110,.45)", color:"#c8a96e", fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:2, textTransform:"uppercase", cursor:"pointer", transition:"border-color .2s" }}
              onMouseEnter={e=>e.currentTarget.style.borderColor="#c8a96e"} onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(200,169,110,.45)"}>
              Get In Touch
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position:"absolute", bottom:36, left:"50%", transform:"translateX(-50%)", display:"flex", flexDirection:"column", alignItems:"center", gap:8, opacity:.4 }}>
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:"#fff", letterSpacing:3, textTransform:"uppercase" }}>Scroll</span>
        <div style={{ width:1, height:44, background:"linear-gradient(to bottom,#fff,transparent)", animation:"amwPulse 2s infinite" }} />
      </div>
    </section>
  );
}

/* ─── ABOUT ──────────────────────────────────────────────────── */
function About() {
  const isMobile = useBreakpoint(768);
  return (
    <section id="about" style={{ padding:"90px 8vw", background:"#0d0d12" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>

        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 48 : 80, alignItems:"center" }}>
          <FadeIn>
            <p style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:"#c8a96e", letterSpacing:4, textTransform:"uppercase", marginBottom:16 }}>About</p>
            <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(30px,4vw,52px)", fontWeight:300, color:"#fff", lineHeight:1.1, marginBottom:24 }}>
              Building ventures,<br /><em style={{ color:"#c8a96e" }}>advancing knowledge.</em>
            </h2>
            <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:15, color:"rgba(255,255,255,.57)", lineHeight:1.9, marginBottom:28 }}>{person.summary}</p>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {["MBA Aspirant","Multilingual","USAID Award Winner","Peshawar · Athens"].map(t=>(
                <span key={t} style={{ padding:"6px 13px", border:"1px solid rgba(200,169,110,.28)", fontFamily:"'DM Mono',monospace", fontSize:10, color:"#c8a96e", letterSpacing:1, textTransform:"uppercase" }}>{t}</span>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={.18}>
            <div style={{ position:"relative" }}>
              <img src={aboutImg} alt="" style={{ width:"100%", height: isMobile ? 260 : 420, objectFit:"cover" }} />
              <div style={{ position:"absolute", bottom: isMobile ? -14 : -18, right: isMobile ? -10 : -18, background:"#c8a96e", padding:"16px 20px" }}>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:30, fontWeight:700, color:"#0a0a0e", margin:0, lineHeight:1 }}>300+</p>
                <p style={{ fontFamily:"'DM Mono',monospace", fontSize:9, color:"#0a0a0e", letterSpacing:2, margin:"4px 0 0", textTransform:"uppercase" }}>Tours Organized</p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Stats */}
        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(4,1fr)", gap:1, background:"rgba(200,169,110,.08)", marginTop: isMobile ? 60 : 80 }}>
          {person.stats.map((s,i)=>(
            <FadeIn key={i} delay={i*.07}>
              <div style={{ padding:"36px 20px", background:"#0d0d12", textAlign:"center" }}>
                <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:48, fontWeight:600, color:"#c8a96e", margin:0, lineHeight:1 }}>{s.value}</p>
                <p style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"rgba(255,255,255,.32)", letterSpacing:2, marginTop:8, textTransform:"uppercase" }}>{s.label}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── EXPERIENCE ─────────────────────────────────────────────── */
function Experience() {
  const [active, setActive] = useState(0);
  const isMobile = useBreakpoint(900);

  return (
    <section id="experience" style={{ padding:"90px 8vw", background:"#0a0a0e" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <FadeIn>
          <p style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:"#c8a96e", letterSpacing:4, textTransform:"uppercase", marginBottom:10 }}>Experience</p>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(30px,4vw,52px)", fontWeight:300, color:"#fff", lineHeight:1.1, marginBottom:48 }}>
            A track record of<br /><em style={{ color:"#c8a96e" }}>building things.</em>
          </h2>
        </FadeIn>

        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 0 : 56, alignItems:"start" }}>

          {/* Accordion */}
          <div>
            {person.experience.map((e,i) => (
              <div key={i} onClick={() => setActive(i)}
                style={{ padding:"22px 0", borderTop:"1px solid rgba(255,255,255,.07)", cursor:"pointer" }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:12 }}>
                  <div style={{ flex:1 }}>
                    <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(16px,2vw,20px)", fontWeight: active===i ? 600 : 400, color: active===i ? "#fff" : "rgba(255,255,255,.42)", margin:0, transition:"all .3s" }}>{e.role}</p>
                    <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color: active===i ? e.color : "rgba(255,255,255,.25)", margin:"4px 0 0", transition:"all .3s" }}>{e.org}</p>
                  </div>
                  <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"rgba(255,255,255,.25)", letterSpacing:1, whiteSpace:"nowrap", paddingTop:3 }}>{e.period}</span>
                </div>

                {active===i && (
                  <div style={{ marginTop:14 }}>
                    {isMobile && <img src={expImages[i]} alt="" style={{ width:"100%", height:200, objectFit:"cover", marginBottom:14 }} />}
                    <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:"rgba(255,255,255,.5)", lineHeight:1.85, margin:"0 0 12px" }}>{e.desc}</p>
                    <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
                      {e.tags.map(t=>(
                        <span key={t} style={{ padding:"4px 10px", background:`${e.color}18`, border:`1px solid ${e.color}40`, fontFamily:"'DM Mono',monospace", fontSize:9, color:e.color, letterSpacing:1, textTransform:"uppercase" }}>{t}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Sticky image — desktop only */}
          {!isMobile && (
            <FadeIn delay={.15}>
              <div style={{ position:"sticky", top:90 }}>
                <img key={active} src={expImages[active]} alt="" style={{ width:"100%", height:460, objectFit:"cover", animation:"amwFadeImg .4s ease" }} />
                <div style={{ background: person.experience[active].color, padding:"18px 22px" }}>
                  <p style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"#0a0a0e", letterSpacing:2, textTransform:"uppercase", margin:0 }}>{person.experience[active].location}</p>
                  <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:20, fontWeight:600, color:"#0a0a0e", margin:"4px 0 0" }}>{person.experience[active].org}</p>
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  );
}

/* ─── EDUCATION ──────────────────────────────────────────────── */
function Education() {
  const isMobile = useBreakpoint(768);
  return (
    <section id="education" style={{ padding:"80px 8vw", background:"#0d0d12", borderTop:"1px solid rgba(200,169,110,.08)" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <FadeIn>
          <p style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:"#c8a96e", letterSpacing:4, textTransform:"uppercase", marginBottom:36 }}>Education</p>
        </FadeIn>
        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:24 }}>
          {person.education.map((e,i)=>(
            <FadeIn key={i} delay={i*.12}>
              <div style={{ padding:"34px 30px", border:"1px solid rgba(200,169,110,.13)", position:"relative", overflow:"hidden", height:"100%" }}>
                <div style={{ position:"absolute", top:0, left:0, width:3, height:"100%", background:"#c8a96e" }} />
                <p style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"rgba(255,255,255,.28)", letterSpacing:2, marginBottom:14, textTransform:"uppercase" }}>{e.period}</p>
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(18px,2.5vw,24px)", fontWeight:600, color:"#fff", margin:"0 0 7px" }}>{e.degree}</h3>
                <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, color:"#c8a96e", margin:"0 0 10px" }}>{e.school}</p>
                <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:"rgba(255,255,255,.35)", lineHeight:1.7 }}>{e.detail}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── RESEARCH ───────────────────────────────────────────────── */
function Research() {
  const isMobile = useBreakpoint(768);
  return (
    <section id="research" style={{ padding:"90px 8vw", background:"#0a0a0e" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <FadeIn>
          <p style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:"#c8a96e", letterSpacing:4, textTransform:"uppercase", marginBottom:10 }}>Research</p>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(30px,4vw,52px)", fontWeight:300, color:"#fff", lineHeight:1.1, marginBottom:48 }}>
            Scholarly work &<br /><em style={{ color:"#c8a96e" }}>analytical inquiry.</em>
          </h2>
        </FadeIn>

        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:24, marginBottom:48 }}>
          {person.research.map((r,i)=>(
            <FadeIn key={i} delay={i*.12}>
              <div style={{ padding:"34px 30px", background:"#0d0d12", border:"1px solid rgba(255,255,255,.06)", height:"100%" }}>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"#c8a96e", letterSpacing:2, textTransform:"uppercase" }}>{r.type}</span>
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(19px,2.5vw,24px)", fontWeight:600, color:"#fff", margin:"14px 0 8px", lineHeight:1.25 }}>{r.title}</h3>
                <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:"rgba(255,255,255,.37)", lineHeight:1.7 }}>{r.sub}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap:40, alignItems:"center" }}>
            <div>
              <p style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:"#c8a96e", letterSpacing:4, textTransform:"uppercase", marginBottom:14 }}>Current Lab Work</p>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:15, color:"rgba(255,255,255,.52)", lineHeight:1.9 }}>
                As a Graduate Research Associate at the SMART Lab, Ahmad Mujtaba Wakeel applies quantitative and qualitative methods to real-world datasets — developing proficiency in data collection, cleaning, analysis, and visualization. Contributing to publications and research presentations under the direction of Dr. Laeeq Khan at Ohio University.
              </p>
            </div>
            <img src={researchImg} alt="" style={{ width:"100%", height:280, objectFit:"cover" }} />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── SKILLS ─────────────────────────────────────────────────── */
function Skills() {
  const isMobile = useBreakpoint(768);
  return (
    <section id="skills" style={{ padding:"90px 8vw", background:"#0d0d12" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <FadeIn>
          <p style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:"#c8a96e", letterSpacing:4, textTransform:"uppercase", marginBottom:10 }}>Skills</p>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(30px,4vw,52px)", fontWeight:300, color:"#fff", lineHeight:1.1, marginBottom:48 }}>
            Capabilities &<br /><em style={{ color:"#c8a96e" }}>competencies.</em>
          </h2>
        </FadeIn>
        <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)", gap:20 }}>
          {person.skills.map((s,i)=>(
            <FadeIn key={i} delay={i*.07}>
              <div style={{ padding:"30px 26px", border:"1px solid rgba(255,255,255,.06)", background:"#0a0a0e" }}>
                <p style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"#c8a96e", letterSpacing:2, textTransform:"uppercase", marginBottom:16 }}>{s.cat}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:9 }}>
                  {s.items.map(item=>(
                    <span key={item}
                      style={{ padding:"7px 13px", background:"rgba(255,255,255,.04)", fontFamily:"'DM Sans',sans-serif", fontSize:13, color:"rgba(255,255,255,.57)", border:"1px solid rgba(255,255,255,.07)", cursor:"default", transition:"all .2s" }}
                      onMouseEnter={e=>{ e.currentTarget.style.background="rgba(200,169,110,.1)"; e.currentTarget.style.color="#c8a96e"; e.currentTarget.style.borderColor="rgba(200,169,110,.28)"; }}
                      onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,.04)"; e.currentTarget.style.color="rgba(255,255,255,.57)"; e.currentTarget.style.borderColor="rgba(255,255,255,.07)"; }}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── AWARDS ─────────────────────────────────────────────────── */
function Awards() {
  return (
    <section id="awards" style={{ padding:"90px 8vw", background:"#0a0a0e" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <FadeIn>
          <p style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:"#c8a96e", letterSpacing:4, textTransform:"uppercase", marginBottom:10 }}>Awards</p>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(30px,4vw,52px)", fontWeight:300, color:"#fff", lineHeight:1.1, marginBottom:48 }}>
            Recognition &<br /><em style={{ color:"#c8a96e" }}>honors.</em>
          </h2>
        </FadeIn>
        {person.awards.map((a,i)=>(
          <FadeIn key={i} delay={i*.07}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"22px 0", borderTop:"1px solid rgba(255,255,255,.07)", gap:16, flexWrap:"wrap" }}>
              <div>
                <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(17px,2.5vw,21px)", fontWeight:500, color:"#fff", margin:"0 0 4px" }}>{a.title}</h3>
                <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:13, color:"rgba(255,255,255,.3)", margin:0 }}>{a.org}</p>
              </div>
              {a.year && <span style={{ fontFamily:"'DM Mono',monospace", fontSize:12, color:"#c8a96e", letterSpacing:2, whiteSpace:"nowrap" }}>{a.year}</span>}
            </div>
          </FadeIn>
        ))}
        <div style={{ borderTop:"1px solid rgba(255,255,255,.07)" }} />
      </div>
    </section>
  );
}

/* ─── CONTACT ────────────────────────────────────────────────── */
function Contact() {
  const [sent, setSent]   = useState(false);
  const [form, setForm]   = useState({ name:"", email:"", message:"" });
  const isMobile          = useBreakpoint(768);

  const base = {
    width:"100%", padding:"13px 15px",
    background:"rgba(255,255,255,.04)",
    border:"1px solid rgba(255,255,255,.1)",
    color:"#fff", fontFamily:"'DM Sans',sans-serif",
    fontSize:14, outline:"none",
    boxSizing:"border-box", transition:"border-color .2s",
  };

  return (
    <section id="contact" style={{ padding:"90px 8vw", background:"#0d0d12", borderTop:"1px solid rgba(200,169,110,.08)" }}>
      <div style={{ maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 48 : 80, alignItems:"start" }}>
        <FadeIn>
          <p style={{ fontFamily:"'DM Mono',monospace", fontSize:11, color:"#c8a96e", letterSpacing:4, textTransform:"uppercase", marginBottom:10 }}>Contact</p>
          <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:"clamp(30px,4vw,52px)", fontWeight:300, color:"#fff", lineHeight:1.1, marginBottom:24 }}>
            Let's build<br /><em style={{ color:"#c8a96e" }}>something together.</em>
          </h2>
          <div style={{ display:"flex", flexDirection:"column", gap:20, marginTop:36 }}>
            {[{label:"Email",val:person.email},{label:"Phone",val:person.phone},{label:"Location",val:person.location}].map(c=>(
              <div key={c.label}>
                <p style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"rgba(255,255,255,.27)", letterSpacing:2, textTransform:"uppercase", margin:"0 0 4px" }}>{c.label}</p>
                <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:15, color:"#fff", margin:0, wordBreak:"break-all" }}>{c.val}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={.18}>
          {sent ? (
            <div style={{ padding:"56px 32px", border:"1px solid rgba(200,169,110,.28)", textAlign:"center" }}>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:32, color:"#c8a96e", marginBottom:10 }}>Message sent.</p>
              <p style={{ fontFamily:"'DM Sans',sans-serif", fontSize:14, color:"rgba(255,255,255,.38)" }}>Thank you for reaching out. Ahmad Mujtaba Wakeel will respond shortly.</p>
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
              {[["Name","name","text"],["Email","email","email"]].map(([lbl,key,type])=>(
                <div key={key}>
                  <label style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"rgba(255,255,255,.3)", letterSpacing:2, textTransform:"uppercase", display:"block", marginBottom:8 }}>{lbl}</label>
                  <input type={type} value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})} style={base}
                    onFocus={e=>e.currentTarget.style.borderColor="rgba(200,169,110,.5)"}
                    onBlur={e=>e.currentTarget.style.borderColor="rgba(255,255,255,.1)"} />
                </div>
              ))}
              <div>
                <label style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"rgba(255,255,255,.3)", letterSpacing:2, textTransform:"uppercase", display:"block", marginBottom:8 }}>Message</label>
                <textarea rows={5} value={form.message} onChange={e=>setForm({...form,message:e.target.value})}
                  style={{...base,resize:"vertical"}}
                  onFocus={e=>e.currentTarget.style.borderColor="rgba(200,169,110,.5)"}
                  onBlur={e=>e.currentTarget.style.borderColor="rgba(255,255,255,.1)"} />
              </div>
              <button onClick={()=>{ if(form.name&&form.email&&form.message) setSent(true); }}
                style={{ padding:"15px 28px", background:"#c8a96e", border:"none", color:"#0a0a0e", fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:2, textTransform:"uppercase", cursor:"pointer", transition:"opacity .2s", alignSelf:"flex-start" }}
                onMouseEnter={e=>e.currentTarget.style.opacity=".82"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                Send Message
              </button>
            </div>
          )}
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── FOOTER ─────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ padding:"26px 8vw", background:"#0a0a0e", borderTop:"1px solid rgba(255,255,255,.05)", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
      <span style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:17, color:"#c8a96e", letterSpacing:2 }}>Ahmad Mujtaba Wakeel</span>
      <span style={{ fontFamily:"'DM Mono',monospace", fontSize:10, color:"rgba(255,255,255,.18)", letterSpacing:2 }}>© 2026 · All rights reserved</span>
    </footer>
  );
}

/* ─── ROOT ───────────────────────────────────────────────────── */
export default function Portfolio() {
  const [active, setActive] = useState("");

  useEffect(() => {
    /* Google Fonts */
    if (!document.querySelector("#amw-fonts")) {
      const link = document.createElement("link");
      link.id   = "amw-fonts";
      link.rel  = "stylesheet";
      link.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,600&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@300;400&display=swap";
      document.head.appendChild(link);
    }

    /* Global reset + animations */
    if (!document.querySelector("#amw-styles")) {
      const s = document.createElement("style");
      s.id = "amw-styles";
      s.textContent = `
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior: auto; }
        body { background:#0a0a0e; color:#fff; overflow-x:hidden; }
        img  { display:block; max-width:100%; }
        button { font-size:inherit; }
        @keyframes amwPulse    { 0%,100%{opacity:.4}  50%{opacity:.9} }
        @keyframes amwFadeImg  { from{opacity:0}       to{opacity:1}   }
        ::-webkit-scrollbar       { width:3px; }
        ::-webkit-scrollbar-track { background:#0a0a0e; }
        ::-webkit-scrollbar-thumb { background:#c8a96e; border-radius:2px; }
      `;
      document.head.appendChild(s);
    }

    /* Active section tracker via IntersectionObserver */
    const ids = ["about","experience","research","skills","awards","contact"];
    const map = new Map();

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(en => map.set(en.target.id, en.intersectionRatio));
        let best = ""; let bestR = 0;
        map.forEach((ratio, id) => { if (ratio > bestR) { bestR = ratio; best = id; } });
        if (best) setActive(best);
      },
      { threshold: [0, 0.1, 0.2, 0.5], rootMargin: "-60px 0px -30% 0px" }
    );

    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) { map.set(id, 0); obs.observe(el); }
    });

    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ background:"#0a0a0e", minHeight:"100vh" }}>
      <Nav active={active} />
      <Hero />
      <About />
      <Experience />
      <Education />
      <Research />
      <Skills />
      <Awards />
      <Contact />
      <Footer />
    </div>
  );
}
