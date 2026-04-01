import { useState, useEffect, useRef, useCallback } from "react";

const TWEMOJI_BASE = "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/";
const flagCodePoints = {
  "🇫🇷": "1f1eb-1f1f7", "🇺🇸": "1f1fa-1f1f8", "🇯🇵": "1f1ef-1f1f5", "🇹🇭": "1f1f9-1f1ed",
  "🇧🇷": "1f1e7-1f1f7", "🇲🇽": "1f1f2-1f1fd", "🇦🇪": "1f1e6-1f1ea", "🇲🇺": "1f1f2-1f1fa",
  "🇬🇷": "1f1ec-1f1f7", "🇮🇹": "1f1ee-1f1f9", "🇪🇸": "1f1ea-1f1f8", "🇬🇧": "1f1ec-1f1e7",
  "🇵🇹": "1f1f5-1f1f9", "🇲🇦": "1f1f2-1f1e6", "🇸🇳": "1f1f8-1f1f3", "🇨🇮": "1f1e8-1f1ee",
  "🇷🇪": "1f1f7-1f1ea", "🇨🇦": "1f1e8-1f1e6", "🇩🇴": "1f1e9-1f1f4", "🇨🇺": "1f1e8-1f1fa",
  "🇲🇬": "1f1f2-1f1ec", "🇸🇨": "1f1f8-1f1e8", "🇲🇻": "1f1f2-1f1fb", "🇮🇩": "1f1ee-1f1e9",
  "🇰🇷": "1f1f0-1f1f7", "🇦🇺": "1f1e6-1f1fa", "🇿🇦": "1f1ff-1f1e6", "🇵🇫": "1f1f5-1f1eb",
  "✈️": "2708", "💎": "1f48e", "🔥": "1f525", "⭐": "2b50", "👑": "1f451",
  "🎯": "1f3af", "💰": "1f4b0", "🏆": "1f3c6", "🚀": "1f680", "💳": "1f4b3",
};

const Flag = ({ emoji, size = 32 }) => {
  const code = flagCodePoints[emoji];
  if (!code) return <span style={{ fontSize: size }}>{emoji}</span>;
  return <img src={`${TWEMOJI_BASE}${code}.png`} alt={emoji} style={{ width: size, height: size, verticalAlign: "middle", display: "inline-block" }} />;
};

const destinations = [
  { city: "New York", country: "États-Unis", flag: "🇺🇸", milesEco: 25000, milesBiz: 70000, milesFst: 150000, prixEco: 450, prixBiz: 3800, prixFst: 9500, img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80", continent: "Amérique" },
  { city: "Tokyo", country: "Japon", flag: "🇯🇵", milesEco: 37500, milesBiz: 95000, milesFst: 190000, prixEco: 650, prixBiz: 5200, prixFst: 12000, img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80", continent: "Asie" },
  { city: "Bangkok", country: "Thaïlande", flag: "🇹🇭", milesEco: 30000, milesBiz: 80000, milesFst: 160000, prixEco: 520, prixBiz: 3500, prixFst: 8500, img: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=600&q=80", continent: "Asie" },
  { city: "Dubaï", country: "Émirats", flag: "🇦🇪", milesEco: 22500, milesBiz: 62500, milesFst: 125000, prixEco: 380, prixBiz: 3200, prixFst: 7800, img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80", continent: "Moyen-Orient" },
  { city: "São Paulo", country: "Brésil", flag: "🇧🇷", milesEco: 35000, milesBiz: 87500, milesFst: 175000, prixEco: 600, prixBiz: 4200, prixFst: 10000, img: "https://images.unsplash.com/photo-1543059080-f9b1272213d5?w=600&q=80", continent: "Amérique" },
  { city: "Île Maurice", country: "Maurice", flag: "🇲🇺", milesEco: 30000, milesBiz: 82500, milesFst: 165000, prixEco: 700, prixBiz: 3800, prixFst: 9000, img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80", continent: "Océan Indien" },
  { city: "Athènes", country: "Grèce", flag: "🇬🇷", milesEco: 12500, milesBiz: 37500, milesFst: 75000, prixEco: 180, prixBiz: 1400, prixFst: 3500, img: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=600&q=80", continent: "Europe" },
  { city: "Cancún", country: "Mexique", flag: "🇲🇽", milesEco: 30000, milesBiz: 77500, milesFst: 155000, prixEco: 550, prixBiz: 3600, prixFst: 8800, img: "https://images.unsplash.com/photo-1510097467424-192d713fd8b2?w=600&q=80", continent: "Amérique" },
  { city: "Séoul", country: "Corée du Sud", flag: "🇰🇷", milesEco: 37500, milesBiz: 92500, milesFst: 185000, prixEco: 620, prixBiz: 4800, prixFst: 11500, img: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=600&q=80", continent: "Asie" },
  { city: "Le Cap", country: "Afrique du Sud", flag: "🇿🇦", milesEco: 35000, milesBiz: 87500, milesFst: 175000, prixEco: 580, prixBiz: 4000, prixFst: 9500, img: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600&q=80", continent: "Afrique" },
  { city: "Bora Bora", country: "Polynésie", flag: "🇵🇫", milesEco: 52500, milesBiz: 130000, milesFst: 260000, prixEco: 1800, prixBiz: 7500, prixFst: 16000, img: "https://images.unsplash.com/photo-1589197331516-4d84b72ebde3?w=600&q=80", continent: "Océanie" },
  { city: "Sydney", country: "Australie", flag: "🇦🇺", milesEco: 45000, milesBiz: 115000, milesFst: 230000, prixEco: 900, prixBiz: 6200, prixFst: 14000, img: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&q=80", continent: "Océanie" },
  { city: "Dakar", country: "Sénégal", flag: "🇸🇳", milesEco: 20000, milesBiz: 55000, milesFst: 110000, prixEco: 400, prixBiz: 2800, prixFst: 6500, img: "https://images.unsplash.com/photo-1605893516102-710af736e1cc?w=600&q=80", continent: "Afrique" },
  { city: "Lisbonne", country: "Portugal", flag: "🇵🇹", milesEco: 10000, milesBiz: 30000, milesFst: 60000, prixEco: 120, prixBiz: 950, prixFst: 2800, img: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=600&q=80", continent: "Europe" },
  { city: "Marrakech", country: "Maroc", flag: "🇲🇦", milesEco: 12500, milesBiz: 35000, milesFst: 70000, prixEco: 150, prixBiz: 1100, prixFst: 3000, img: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=600&q=80", continent: "Afrique" },
  { city: "Seychelles", country: "Seychelles", flag: "🇸🇨", milesEco: 32500, milesBiz: 85000, milesFst: 170000, prixEco: 750, prixBiz: 4200, prixFst: 10000, img: "https://images.unsplash.com/photo-1589979481223-deb893043163?w=600&q=80", continent: "Océan Indien" },
  { city: "Maldives", country: "Maldives", flag: "🇲🇻", milesEco: 35000, milesBiz: 90000, milesFst: 180000, prixEco: 800, prixBiz: 4500, prixFst: 11000, img: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&q=80", continent: "Océan Indien" },
  { city: "La Havane", country: "Cuba", flag: "🇨🇺", milesEco: 27500, milesBiz: 72500, milesFst: 145000, prixEco: 520, prixBiz: 3400, prixFst: 8200, img: "https://images.unsplash.com/photo-1500759285222-a95c2a7b4c79?w=600&q=80", continent: "Amérique" },
];

const continents = ["Tous", "Europe", "Amérique", "Asie", "Afrique", "Océan Indien", "Océanie", "Moyen-Orient"];

const AnimatedCounter = ({ target, duration = 2000, prefix = "", suffix = "", decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const animate = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - p, 3);
          setCount(ease * target);
          if (p < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return <span ref={ref}>{prefix}{decimals > 0 ? count.toFixed(decimals) : Math.round(count).toLocaleString("fr-FR")}{suffix}</span>;
};

const ParticleField = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = canvas.width = canvas.offsetWidth;
    let h = canvas.height = canvas.offsetHeight;
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 0.5, o: Math.random() * 0.5 + 0.1,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,175,55,${p.o})`;
        ctx.fill();
      });
      particles.forEach((a, i) => {
        particles.slice(i + 1).forEach(b => {
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 120) {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(212,175,55,${0.08 * (1 - d / 120)})`;
            ctx.stroke();
          }
        });
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    const resize = () => { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight; };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />;
};

export default function MilesSimulatorUltimate() {
  const [userMiles, setUserMiles] = useState(200000);
  const [selectedDest, setSelectedDest] = useState(null);
  const [filterContinent, setFilterContinent] = useState("Tous");
  const [selectedClass, setSelectedClass] = useState("business");
  const [showAllDest, setShowAllDest] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [animateHero, setAnimateHero] = useState(false);

  useEffect(() => { setTimeout(() => setAnimateHero(true), 100); }, []);

  const filtered = filterContinent === "Tous" ? destinations : destinations.filter(d => d.continent === filterContinent);
  const displayed = showAllDest ? filtered : filtered.slice(0, 6);

  const getClassData = (d) => {
    if (selectedClass === "economy") return { miles: d.milesEco, prix: d.prixEco, label: "Économique" };
    if (selectedClass === "business") return { miles: d.milesBiz, prix: d.prixBiz, label: "Business" };
    return { miles: d.milesFst, prix: d.prixFst, label: "La Première" };
  };

  const valeurParMile = (d) => {
    const cd = getClassData(d);
    return cd.prix / cd.miles;
  };

  const bestBizValue = destinations.reduce((max, d) => {
    const v = d.prixBiz / d.milesBiz;
    return v > max ? v : max;
  }, 0);

  const totalBizValue = destinations.reduce((sum, d) => sum + d.prixBiz / d.milesBiz, 0) / destinations.length;

  const milesValueEuro = 0.012;
  const milesValueBiz = totalBizValue;
  const multiplicateur = milesValueBiz / milesValueEuro;

  const valeurBasique = userMiles * milesValueEuro;
  const valeurBusiness = userMiles * milesValueBiz;

  const afLink = "#parrainage-air-france";
  const amexLink = "#parrainage-amex";

  return (
    <div style={{
      fontFamily: "'Playfair Display', 'Georgia', serif",
      background: "linear-gradient(165deg, #0a0a12 0%, #0d1117 40%, #101820 100%)",
      color: "#e8e0d0",
      minHeight: "100vh",
      overflowX: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;800;900&family=DM+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0a12; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #d4af37, #8b6914); border-radius: 3px; }
        @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-12px); } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes pulseGold { 0%,100% { box-shadow: 0 0 20px rgba(212,175,55,0.2); } 50% { box-shadow: 0 0 40px rgba(212,175,55,0.45); } }
        @keyframes slideUp { from { opacity:0; transform: translateY(40px); } to { opacity:1; transform: translateY(0); } }
        @keyframes scaleIn { from { opacity:0; transform: scale(0.9); } to { opacity:1; transform: scale(1); } }
        @keyframes glow { 0%,100% { text-shadow: 0 0 20px rgba(212,175,55,0.3); } 50% { text-shadow: 0 0 40px rgba(212,175,55,0.6), 0 0 80px rgba(212,175,55,0.2); } }
        @keyframes borderFlow {
          0% { border-image-source: linear-gradient(0deg, #d4af37, transparent, #d4af37); }
          50% { border-image-source: linear-gradient(180deg, #d4af37, transparent, #d4af37); }
          100% { border-image-source: linear-gradient(360deg, #d4af37, transparent, #d4af37); }
        }
        @keyframes countUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .dest-card { transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1); }
        .dest-card:hover { transform: translateY(-8px) scale(1.02); box-shadow: 0 20px 60px rgba(212,175,55,0.15), 0 0 0 1px rgba(212,175,55,0.3); }
        .glass { backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); background: rgba(255,255,255,0.03); border: 1px solid rgba(212,175,55,0.12); }
        .gold-text { background: linear-gradient(135deg, #f0d060 0%, #d4af37 40%, #b8860b 70%, #d4af37 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .shimmer-line { background: linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.15) 50%, transparent 100%); background-size: 200% 100%; animation: shimmer 3s ease infinite; height: 1px; width: 100%; }
        .btn-gold { background: linear-gradient(135deg, #d4af37, #f0d060, #d4af37); background-size: 200% 200%; color: #0a0a12; font-weight: 700; border: none; cursor: pointer; transition: all 0.3s; font-family: 'DM Sans', sans-serif; }
        .btn-gold:hover { background-position: 100% 100%; transform: translateY(-2px); box-shadow: 0 8px 30px rgba(212,175,55,0.35); }
        .btn-outline { background: transparent; color: #d4af37; border: 1.5px solid rgba(212,175,55,0.4); cursor: pointer; transition: all 0.3s; font-family: 'DM Sans', sans-serif; }
        .btn-outline:hover { background: rgba(212,175,55,0.1); border-color: #d4af37; }
        .tag-active { background: rgba(212,175,55,0.15) !important; border-color: #d4af37 !important; color: #f0d060 !important; }
        .referral-banner { position: relative; overflow: hidden; transition: all 0.4s; }
        .referral-banner:hover { transform: translateY(-4px); }
        .referral-banner::before { content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(212,175,55,0.08), transparent); pointer-events: none; }
        .value-bar { transition: width 1.2s cubic-bezier(0.23, 1, 0.32, 1); }
        .class-btn { transition: all 0.3s; cursor: pointer; }
        .class-btn:hover { background: rgba(212,175,55,0.1); }
        .ring-pulse { animation: pulseGold 2.5s ease infinite; }
      `}</style>

      {/* ═══════ HERO ═══════ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "40px 20px", overflow: "hidden" }}>
        <ParticleField />
        <div style={{ position: "absolute", top: "-30%", right: "-10%", width: 600, height: 600, background: "radial-gradient(circle, rgba(212,175,55,0.06) 0%, transparent 70%)", borderRadius: "50%", pointerEvents: "none" }} />

        <div style={{
          opacity: animateHero ? 1 : 0, transform: animateHero ? "translateY(0)" : "translateY(40px)",
          transition: "all 1.2s cubic-bezier(0.23, 1, 0.32, 1)", textAlign: "center", position: "relative", zIndex: 2, maxWidth: 900,
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 24, fontFamily: "'DM Sans', sans-serif", fontSize: 13, letterSpacing: 4, textTransform: "uppercase", color: "rgba(212,175,55,0.7)" }}>
            <Flag emoji="✈️" size={18} /> SIMULATEUR DE MILES PREMIUM <Flag emoji="✈️" size={18} />
          </div>

          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 900, lineHeight: 1.05, marginBottom: 20 }}>
            <span style={{ color: "#e8e0d0" }}>Vos Miles valent</span><br />
            <span className="gold-text" style={{ animation: "glow 3s ease infinite", fontSize: "clamp(3rem, 7vw, 5.5rem)" }}>
              bien plus
            </span><br />
            <span style={{ color: "#e8e0d0" }}>que vous ne pensez</span>
          </h1>

          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "rgba(232,224,208,0.6)", maxWidth: 600, margin: "0 auto 40px", lineHeight: 1.7 }}>
            Découvrez la vraie puissance de vos miles. Simulez, comparez et voyez comment <strong style={{ color: "#d4af37" }}>200 000 miles</strong> peuvent débloquer des expériences à <strong style={{ color: "#d4af37" }}>plus de 10 000€</strong> de valeur.
          </p>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#simulateur" className="btn-gold" style={{ padding: "16px 40px", borderRadius: 50, fontSize: 15, textDecoration: "none", letterSpacing: 1 }}>
              <Flag emoji="🚀" size={16} /> SIMULER MES MILES
            </a>
            <a href="#parrainage" className="btn-outline" style={{ padding: "16px 40px", borderRadius: 50, fontSize: 15, textDecoration: "none", letterSpacing: 1 }}>
              <Flag emoji="🎯" size={16} /> OFFRES PARRAINAGE
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 30, animation: "float 2.5s ease infinite", opacity: 0.4 }}>
          <svg width="24" height="40" viewBox="0 0 24 40" fill="none">
            <rect x="1" y="1" width="22" height="38" rx="11" stroke="#d4af37" strokeWidth="1.5"/>
            <circle cx="12" cy="12" r="3" fill="#d4af37">
              <animate attributeName="cy" values="12;24;12" dur="2s" repeatCount="indefinite"/>
            </circle>
          </svg>
        </div>
      </section>

      {/* ═══════ PUISSANCE DES MILES ═══════ */}
      <section style={{ padding: "80px 20px", position: "relative" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 12, letterSpacing: 4, color: "#d4af37", marginBottom: 12 }}>LA PUISSANCE CACHÉE</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 800 }}>
              <span className="gold-text"><Flag emoji="💎" size={32} /> La vraie valeur de vos Miles</span>
            </h2>
          </div>

          {/* Miles Input */}
          <div className="glass" style={{ borderRadius: 24, padding: "40px 32px", marginBottom: 40, textAlign: "center" }}>
            <label style={{ fontFamily: "'DM Sans'", fontSize: 14, color: "rgba(232,224,208,0.5)", display: "block", marginBottom: 16, letterSpacing: 2, textTransform: "uppercase" }}>
              Combien de Miles avez-vous ?
            </label>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
              <input
                type="range" min={10000} max={500000} step={5000} value={userMiles}
                onChange={e => setUserMiles(Number(e.target.value))}
                style={{ width: "100%", maxWidth: 500, accentColor: "#d4af37", height: 6 }}
              />
              <div style={{ fontFamily: "'JetBrains Mono'", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 700, color: "#f0d060", animation: "glow 3s ease infinite" }}>
                {userMiles.toLocaleString("fr-FR")} <span style={{ fontSize: "0.5em", color: "rgba(212,175,55,0.6)" }}>miles</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 20, flexWrap: "wrap" }}>
              {[50000, 100000, 150000, 200000, 300000, 500000].map(v => (
                <button key={v} onClick={() => setUserMiles(v)}
                  className={v === userMiles ? "tag-active" : ""}
                  style={{ padding: "8px 18px", borderRadius: 20, fontSize: 13, fontFamily: "'DM Sans'", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#e8e0d0", cursor: "pointer", transition: "all 0.3s" }}>
                  {(v / 1000).toLocaleString("fr-FR")}k
                </button>
              ))}
            </div>
          </div>

          {/* VALUE COMPARISON - THE KEY SECTION */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24, marginBottom: 40 }}>
            {/* Valeur basique */}
            <div className="glass" style={{ borderRadius: 20, padding: 32, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #666, #999)" }} />
              <div style={{ fontFamily: "'DM Sans'", fontSize: 11, letterSpacing: 3, color: "rgba(232,224,208,0.4)", marginBottom: 8, textTransform: "uppercase" }}>
                ❌ Conversion basique (change)
              </div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: "rgba(232,224,208,0.5)", marginBottom: 16 }}>
                1 mile = ~{milesValueEuro.toFixed(3)}€ (valeur catalogue)
              </div>
              <div style={{ fontFamily: "'JetBrains Mono'", fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 700, color: "#999", marginBottom: 8 }}>
                <AnimatedCounter target={valeurBasique} prefix="" suffix=" €" />
              </div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
                Valeur si vous "changiez" en euros
              </div>
              <div style={{ marginTop: 16, height: 8, background: "rgba(255,255,255,0.05)", borderRadius: 4, overflow: "hidden" }}>
                <div className="value-bar" style={{ width: "20%", height: "100%", background: "#666", borderRadius: 4 }} />
              </div>
            </div>

            {/* VALEUR BUSINESS - MISE EN AVANT */}
            <div className="glass ring-pulse" style={{ borderRadius: 20, padding: 32, position: "relative", overflow: "hidden", border: "1.5px solid rgba(212,175,55,0.4)" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #b8860b, #f0d060, #d4af37)" }} />
              <div style={{ position: "absolute", top: 16, right: 16, background: "linear-gradient(135deg, #d4af37, #f0d060)", color: "#0a0a12", padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700, fontFamily: "'DM Sans'" }}>
                <Flag emoji="👑" size={12} /> VALEUR RÉELLE
              </div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 11, letterSpacing: 3, color: "#d4af37", marginBottom: 8, textTransform: "uppercase" }}>
                ✈️ Valeur en classe Business
              </div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: "rgba(212,175,55,0.6)", marginBottom: 16 }}>
                1 mile = ~{milesValueBiz.toFixed(3)}€ (prix billet moyen)
              </div>
              <div style={{ fontFamily: "'JetBrains Mono'", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 700, marginBottom: 8 }}>
                <span className="gold-text"><AnimatedCounter target={valeurBusiness} prefix="" suffix=" €" /></span>
              </div>
              <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: "rgba(212,175,55,0.5)" }}>
                Valeur réelle en billets Business
              </div>
              <div style={{ marginTop: 16, height: 8, background: "rgba(255,255,255,0.05)", borderRadius: 4, overflow: "hidden" }}>
                <div className="value-bar" style={{ width: "100%", height: "100%", background: "linear-gradient(90deg, #b8860b, #f0d060)", borderRadius: 4 }} />
              </div>
            </div>
          </div>

          {/* Multiplicateur */}
          <div className="glass" style={{ borderRadius: 20, padding: "32px", textAlign: "center", marginBottom: 40, border: "1px solid rgba(212,175,55,0.2)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "rgba(232,224,208,0.5)", letterSpacing: 2, marginBottom: 4 }}>MULTIPLICATEUR</div>
                <div style={{ fontFamily: "'JetBrains Mono'", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800 }}>
                  <span className="gold-text">x<AnimatedCounter target={multiplicateur} suffix="" decimals={1} /></span>
                </div>
              </div>
              <div style={{ width: 1, height: 60, background: "rgba(212,175,55,0.2)" }} />
              <div style={{ maxWidth: 400, textAlign: "left" }}>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 15, color: "#e8e0d0", lineHeight: 1.6 }}>
                  Vos miles valent <strong style={{ color: "#f0d060" }}>x{multiplicateur.toFixed(1)} plus</strong> que leur valeur de change ! En utilisant vos miles pour des billets <strong style={{ color: "#d4af37" }}>Business</strong> ou <strong style={{ color: "#d4af37" }}>La Première</strong>, chaque mile travaille beaucoup plus dur pour vous.
                </div>
              </div>
            </div>
            <div className="shimmer-line" style={{ marginTop: 24 }} />
            <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: "rgba(232,224,208,0.4)", marginTop: 16 }}>
              <strong style={{ color: "#f0d060" }}>{userMiles.toLocaleString("fr-FR")} miles</strong> = {valeurBasique.toLocaleString("fr-FR", { maximumFractionDigits: 0 })}€ en change vs <strong style={{ color: "#f0d060" }}>{valeurBusiness.toLocaleString("fr-FR", { maximumFractionDigits: 0 })}€</strong> en vol Business → vous gagnez <strong style={{ color: "#4ade80" }}>+{(valeurBusiness - valeurBasique).toLocaleString("fr-FR", { maximumFractionDigits: 0 })}€</strong> de valeur
            </div>
          </div>

          {/* What can you get stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 20 }}>
            {[
              { icon: "⭐", label: "Vols Business accessibles", value: destinations.filter(d => d.milesBiz <= userMiles).length, suffix: ` / ${destinations.length}` },
              { icon: "👑", label: "Vols La Première accessibles", value: destinations.filter(d => d.milesFst <= userMiles).length, suffix: ` / ${destinations.length}` },
              { icon: "💰", label: "Meilleure valeur / mile", value: bestBizValue, suffix: "€", decimals: 3 },
              { icon: "🏆", label: "Économies max vs achat", value: Math.max(...destinations.filter(d => d.milesBiz <= userMiles).map(d => d.prixBiz)) || 0, suffix: "€" },
            ].map((s, i) => (
              <div key={i} className="glass" style={{ borderRadius: 16, padding: "20px 16px", textAlign: "center", animation: `slideUp 0.6s ease ${i * 0.1}s both` }}>
                <Flag emoji={s.icon} size={28} />
                <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 22, fontWeight: 700, color: "#f0d060", margin: "8px 0 4px" }}>
                  <AnimatedCounter target={s.value} suffix={s.suffix} decimals={s.decimals || 0} />
                </div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: "rgba(232,224,208,0.4)", letterSpacing: 1 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ DESTINATION SIMULATOR ═══════ */}
      <section id="simulateur" style={{ padding: "80px 20px", background: "linear-gradient(180deg, transparent, rgba(212,175,55,0.02), transparent)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 12, letterSpacing: 4, color: "#d4af37", marginBottom: 12 }}>SIMULATEUR INTERACTIF</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, marginBottom: 16 }}>
              <Flag emoji="🌍" size={34} /> <span className="gold-text">Explorez les destinations</span>
            </h2>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 15, color: "rgba(232,224,208,0.5)", maxWidth: 600, margin: "0 auto" }}>
              Sélectionnez une destination et voyez instantanément la valeur réelle de vos miles selon la classe de voyage
            </p>
          </div>

          {/* Class selector */}
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
            {[
              { key: "economy", label: "Économique", icon: "✈️" },
              { key: "business", label: "Business", icon: "💎" },
              { key: "first", label: "La Première", icon: "👑" },
            ].map(c => (
              <button key={c.key} onClick={() => setSelectedClass(c.key)}
                className={`class-btn ${selectedClass === c.key ? "tag-active" : ""}`}
                style={{ padding: "12px 28px", borderRadius: 30, fontSize: 14, fontFamily: "'DM Sans'", fontWeight: 600, background: selectedClass === c.key ? "rgba(212,175,55,0.15)" : "rgba(255,255,255,0.03)", border: `1.5px solid ${selectedClass === c.key ? "#d4af37" : "rgba(255,255,255,0.08)"}`, color: selectedClass === c.key ? "#f0d060" : "#e8e0d0" }}>
                <Flag emoji={c.icon} size={16} /> {c.label}
              </button>
            ))}
          </div>

          {/* Continent filter */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
            {continents.map(c => (
              <button key={c} onClick={() => { setFilterContinent(c); setShowAllDest(false); }}
                style={{ padding: "7px 18px", borderRadius: 20, fontSize: 12, fontFamily: "'DM Sans'", fontWeight: 500, background: filterContinent === c ? "rgba(212,175,55,0.12)" : "transparent", border: `1px solid ${filterContinent === c ? "rgba(212,175,55,0.4)" : "rgba(255,255,255,0.06)"}`, color: filterContinent === c ? "#f0d060" : "rgba(232,224,208,0.5)", cursor: "pointer", transition: "all 0.3s" }}>
                {c}
              </button>
            ))}
          </div>

          {/* Destination grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 20 }}>
            {displayed.map((d, i) => {
              const cd = getClassData(d);
              const valMile = valeurParMile(d);
              const canAfford = cd.miles <= userMiles;
              const isSelected = selectedDest?.city === d.city;
              return (
                <div key={d.city} className="dest-card" onClick={() => setSelectedDest(isSelected ? null : d)}
                  style={{
                    borderRadius: 20, overflow: "hidden", cursor: "pointer",
                    border: isSelected ? "2px solid #d4af37" : "1px solid rgba(255,255,255,0.06)",
                    background: "rgba(255,255,255,0.02)", animation: `scaleIn 0.5s ease ${i * 0.06}s both`,
                    opacity: canAfford ? 1 : 0.5,
                  }}
                  onMouseEnter={() => setHoveredCard(d.city)} onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Image */}
                  <div style={{ position: "relative", height: 180, overflow: "hidden" }}>
                    <img src={d.img} alt={d.city} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s", transform: hoveredCard === d.city ? "scale(1.08)" : "scale(1)" }} />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,10,18,0.95) 0%, rgba(10,10,18,0.2) 50%, transparent 100%)" }} />
                    {/* Flag badge */}
                    <div style={{ position: "absolute", top: 12, left: 12, display: "flex", alignItems: "center", gap: 8, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(10px)", padding: "6px 14px", borderRadius: 30 }}>
                      <Flag emoji={d.flag} size={24} />
                      <span style={{ fontFamily: "'DM Sans'", fontSize: 13, fontWeight: 600 }}>{d.city}</span>
                    </div>
                    {/* Affordability badge */}
                    <div style={{ position: "absolute", top: 12, right: 12, background: canAfford ? "rgba(74,222,128,0.2)" : "rgba(239,68,68,0.2)", border: `1px solid ${canAfford ? "rgba(74,222,128,0.4)" : "rgba(239,68,68,0.4)"}`, padding: "4px 12px", borderRadius: 20, fontFamily: "'DM Sans'", fontSize: 11, fontWeight: 600, color: canAfford ? "#4ade80" : "#ef4444" }}>
                      {canAfford ? "✓ Accessible" : "✗ Miles insuffisants"}
                    </div>
                    {/* Value badge */}
                    <div style={{ position: "absolute", bottom: 12, right: 12, background: "rgba(212,175,55,0.15)", border: "1px solid rgba(212,175,55,0.3)", padding: "4px 12px", borderRadius: 20, fontFamily: "'JetBrains Mono'", fontSize: 12, fontWeight: 600, color: "#f0d060" }}>
                      {valMile.toFixed(3)}€/mile
                    </div>
                  </div>

                  {/* Content */}
                  <div style={{ padding: "20px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
                      <div>
                        <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: "rgba(232,224,208,0.4)", letterSpacing: 1, textTransform: "uppercase" }}>
                          {cd.label} · Paris → {d.city}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                      <div>
                        <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: "rgba(232,224,208,0.35)", letterSpacing: 1, marginBottom: 4 }}>MILES REQUIS</div>
                        <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 20, fontWeight: 700, color: canAfford ? "#f0d060" : "#ef4444" }}>
                          {cd.miles.toLocaleString("fr-FR")}
                        </div>
                      </div>
                      <div>
                        <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: "rgba(232,224,208,0.35)", letterSpacing: 1, marginBottom: 4 }}>PRIX PAYANT</div>
                        <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 20, fontWeight: 700, color: "#e8e0d0", textDecoration: canAfford ? "line-through" : "none", textDecorationColor: "rgba(212,175,55,0.5)" }}>
                          {cd.prix.toLocaleString("fr-FR")}€
                        </div>
                      </div>
                    </div>

                    {/* Value bar */}
                    <div style={{ marginTop: 14 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "'DM Sans'", fontSize: 11, color: "rgba(232,224,208,0.4)", marginBottom: 4 }}>
                        <span>Économie réalisée</span>
                        <span style={{ color: "#4ade80", fontWeight: 600 }}>{canAfford ? `${cd.prix.toLocaleString("fr-FR")}€ économisés` : "—"}</span>
                      </div>
                      <div style={{ height: 5, background: "rgba(255,255,255,0.05)", borderRadius: 3, overflow: "hidden" }}>
                        <div style={{ width: canAfford ? "100%" : `${(userMiles / cd.miles * 100)}%`, height: "100%", background: canAfford ? "linear-gradient(90deg, #4ade80, #22c55e)" : "linear-gradient(90deg, #ef4444, #dc2626)", borderRadius: 3, transition: "width 0.8s ease" }} />
                      </div>
                    </div>

                    {isSelected && (
                      <div style={{ marginTop: 16, padding: "14px", background: "rgba(212,175,55,0.06)", borderRadius: 12, border: "1px solid rgba(212,175,55,0.15)", animation: "slideUp 0.3s ease" }}>
                        <div style={{ fontFamily: "'DM Sans'", fontSize: 12, fontWeight: 600, color: "#d4af37", marginBottom: 10 }}>
                          <Flag emoji="💎" size={14} /> Comparatif par classe
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, fontFamily: "'DM Sans'", fontSize: 11 }}>
                          {[
                            { l: "Éco", m: d.milesEco, p: d.prixEco },
                            { l: "Business", m: d.milesBiz, p: d.prixBiz },
                            { l: "Première", m: d.milesFst, p: d.prixFst },
                          ].map(cl => (
                            <div key={cl.l} style={{ textAlign: "center", padding: 8, background: "rgba(0,0,0,0.2)", borderRadius: 8 }}>
                              <div style={{ color: "rgba(232,224,208,0.5)", marginBottom: 4 }}>{cl.l}</div>
                              <div style={{ color: cl.m <= userMiles ? "#f0d060" : "#ef4444", fontWeight: 700, fontFamily: "'JetBrains Mono'", fontSize: 13 }}>
                                {(cl.m / 1000).toFixed(0)}k mi
                              </div>
                              <div style={{ color: "rgba(232,224,208,0.4)", marginTop: 2 }}>{cl.p.toLocaleString("fr-FR")}€</div>
                              <div style={{ color: "#4ade80", fontSize: 10, marginTop: 2 }}>{(cl.p / cl.m).toFixed(3)}€/mi</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {!showAllDest && filtered.length > 6 && (
            <div style={{ textAlign: "center", marginTop: 32 }}>
              <button onClick={() => setShowAllDest(true)} className="btn-outline" style={{ padding: "14px 40px", borderRadius: 30, fontSize: 14 }}>
                Voir les {filtered.length - 6} autres destinations <Flag emoji="🌍" size={16} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ═══════ PARRAINAGE SECTION ═══════ */}
      <section id="parrainage" style={{ padding: "80px 20px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 50 }}>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 12, letterSpacing: 4, color: "#d4af37", marginBottom: 12 }}>OFFRES EXCEPTIONNELLES</div>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 800, marginBottom: 12 }}>
              <Flag emoji="🔥" size={34} /> <span className="gold-text">Parrainage — Offres limitées</span>
            </h2>
            <p style={{ fontFamily: "'DM Sans'", fontSize: 15, color: "rgba(232,224,208,0.5)" }}>
              Cumulez jusqu'à <strong style={{ color: "#f0d060" }}>120 000 miles Air France</strong> et <strong style={{ color: "#f0d060" }}>144 000 miles Amex</strong> — avant le 08/06 !
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(460px, 1fr))", gap: 24 }}>
            {/* AIR FRANCE BANNER */}
            <a href={afLink} className="referral-banner" style={{
              display: "block", borderRadius: 24, padding: "36px 32px", textDecoration: "none", color: "#e8e0d0",
              background: "linear-gradient(135deg, #001a4d 0%, #002870 40%, #003399 100%)",
              border: "1px solid rgba(212,175,55,0.2)", position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, background: "radial-gradient(circle, rgba(212,175,55,0.12), transparent 70%)", borderRadius: "50%" }} />
              <div style={{ position: "absolute", bottom: -30, left: -30, width: 150, height: 150, background: "radial-gradient(circle, rgba(255,0,0,0.08), transparent 70%)", borderRadius: "50%" }} />

              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <Flag emoji="🇫🇷" size={36} />
                <div>
                  <div style={{ fontFamily: "'Playfair Display'", fontSize: 22, fontWeight: 800 }}>Air France</div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: 2, textTransform: "uppercase" }}>Flying Blue</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
                <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 14, padding: "14px 18px", flex: 1, minWidth: 150, backdropFilter: "blur(10px)" }}>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: "rgba(255,255,255,0.45)", letterSpacing: 1.5, marginBottom: 6 }}>BONUS INSCRIPTION</div>
                  <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 28, fontWeight: 700, color: "#f0d060" }}>25 000</div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "rgba(255,255,255,0.5)" }}>miles offerts</div>
                </div>
                <div style={{ background: "rgba(212,175,55,0.1)", borderRadius: 14, padding: "14px 18px", flex: 1, minWidth: 150, border: "1px solid rgba(212,175,55,0.25)" }}>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: "rgba(212,175,55,0.6)", letterSpacing: 1.5, marginBottom: 6 }}>SI UPGRADE PLATINUM</div>
                  <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 28, fontWeight: 700, color: "#f0d060" }}>+40 000</div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "rgba(212,175,55,0.5)" }}>miles bonus</div>
                </div>
              </div>

              <div style={{ background: "rgba(74,222,128,0.08)", borderRadius: 12, padding: "12px 16px", border: "1px solid rgba(74,222,128,0.15)", marginBottom: 16 }}>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: "#4ade80", fontWeight: 600 }}>
                  <Flag emoji="🎯" size={14} /> Total potentiel : jusqu'à <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 18 }}>65 000 miles</span> / filleul
                </div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "rgba(74,222,128,0.6)", marginTop: 4 }}>
                  Soit <strong>120 000 miles</strong> pour 2 filleuls — un vol Business vers New York ! <Flag emoji="🇺🇸" size={14} />
                </div>
              </div>

              <div className="btn-gold" style={{ display: "block", textAlign: "center", padding: "14px", borderRadius: 14, fontSize: 15, letterSpacing: 1 }}>
                <Flag emoji="✈️" size={16} /> PROFITER DU PARRAINAGE AIR FRANCE →
              </div>
            </a>

            {/* AMEX BANNER */}
            <a href={amexLink} className="referral-banner" style={{
              display: "block", borderRadius: 24, padding: "36px 32px", textDecoration: "none", color: "#e8e0d0",
              background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)",
              border: "1px solid rgba(212,175,55,0.2)", position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, background: "radial-gradient(circle, rgba(212,175,55,0.15), transparent 70%)", borderRadius: "50%" }} />

              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <Flag emoji="💳" size={36} />
                <div>
                  <div style={{ fontFamily: "'Playfair Display'", fontSize: 22, fontWeight: 800 }}>American Express</div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: "rgba(255,255,255,0.5)", letterSpacing: 2, textTransform: "uppercase" }}>Membership Rewards</div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
                <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 14, padding: "14px 18px", flex: 1, minWidth: 150, backdropFilter: "blur(10px)" }}>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: "rgba(255,255,255,0.45)", letterSpacing: 1.5, marginBottom: 6 }}>1ÈRE ANNÉE</div>
                  <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 28, fontWeight: 700, color: "#4ade80" }}>0€</div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "rgba(255,255,255,0.5)" }}>cotisation offerte</div>
                </div>
                <div style={{ background: "rgba(212,175,55,0.1)", borderRadius: 14, padding: "14px 18px", flex: 1, minWidth: 150, border: "1px solid rgba(212,175,55,0.25)" }}>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 10, color: "rgba(212,175,55,0.6)", letterSpacing: 1.5, marginBottom: 6 }}>SI UPGRADE PLATINUM</div>
                  <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 28, fontWeight: 700, color: "#f0d060" }}>80 000</div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "rgba(212,175,55,0.5)" }}>points MR bonus</div>
                </div>
              </div>

              <div style={{ background: "rgba(212,175,55,0.06)", borderRadius: 12, padding: "12px 16px", border: "1px solid rgba(212,175,55,0.12)", marginBottom: 16 }}>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: "#f0d060", fontWeight: 600 }}>
                  <Flag emoji="🔥" size={14} /> Parrainage : jusqu'à <span style={{ fontFamily: "'JetBrains Mono'", fontSize: 18 }}>180 000 pts MR</span>
                </div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "rgba(212,175,55,0.5)", marginTop: 4 }}>
                  = <strong>144 000 miles</strong> (taux 0.8) — un A/R Business vers Tokyo ! <Flag emoji="🇯🇵" size={14} />
                </div>
              </div>

              <div style={{ background: "rgba(239,68,68,0.08)", borderRadius: 8, padding: "8px 14px", border: "1px solid rgba(239,68,68,0.15)", marginBottom: 16, textAlign: "center" }}>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "#ef4444", fontWeight: 600 }}>
                  <Flag emoji="⏰" size={12} /> Offre valable jusqu'au 08/06 seulement
                </div>
              </div>

              <div className="btn-gold" style={{ display: "block", textAlign: "center", padding: "14px", borderRadius: 14, fontSize: 15, letterSpacing: 1 }}>
                <Flag emoji="💳" size={16} /> PROFITER DU PARRAINAGE AMEX →
              </div>
            </a>
          </div>

          {/* Combined value */}
          <div className="glass" style={{ borderRadius: 20, padding: "32px", textAlign: "center", marginTop: 32, border: "1px solid rgba(212,175,55,0.2)" }}>
            <div style={{ fontFamily: "'DM Sans'", fontSize: 12, letterSpacing: 3, color: "rgba(232,224,208,0.4)", marginBottom: 12 }}>EN CUMULANT LES 2 PARRAINAGES</div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap", marginBottom: 16 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'JetBrains Mono'", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, color: "#f0d060" }}>264 000</div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "rgba(232,224,208,0.4)" }}>miles cumulés possibles</div>
              </div>
              <div style={{ fontSize: 24, color: "rgba(212,175,55,0.4)" }}>=</div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'JetBrains Mono'", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 800, color: "#4ade80" }}>
                  {Math.round(264000 * milesValueBiz).toLocaleString("fr-FR")}€
                </div>
                <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "rgba(232,224,208,0.4)" }}>de valeur en Business</div>
              </div>
            </div>
            <div className="shimmer-line" />
            <div style={{ fontFamily: "'DM Sans'", fontSize: 14, color: "rgba(232,224,208,0.5)", marginTop: 12, lineHeight: 1.7 }}>
              <Flag emoji="🏆" size={16} /> Assez pour un <strong style={{ color: "#f0d060" }}>A/R Paris-Tokyo en Business</strong> + un <strong style={{ color: "#f0d060" }}>A/R Paris-New York en Business</strong> — le tout <strong style={{ color: "#4ade80" }}>gratuitement</strong> via le parrainage !
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ HOW MILES MULTIPLY - INFOGRAPHIC ═══════ */}
      <section style={{ padding: "60px 20px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <div className="glass" style={{ borderRadius: 24, padding: "40px 32px", border: "1px solid rgba(212,175,55,0.15)" }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <h3 style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", fontWeight: 800 }}>
                <Flag emoji="🚀" size={28} /> <span className="gold-text">Pourquoi les miles surpassent l'euro</span>
              </h3>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
              {[
                { step: "01", title: "Vous accumulez", desc: "Via parrainage, carte bancaire, achats — sans effort", value: "200 000 miles", color: "#d4af37" },
                { step: "02", title: "Conversion \"change\"", desc: "Valeur faciale si vous les convertissiez en euros", value: `${(200000 * milesValueEuro).toLocaleString("fr-FR")}€`, color: "#999" },
                { step: "03", title: "Valeur Business", desc: "Ce que vous obtenez RÉELLEMENT en billet Business", value: `${Math.round(200000 * milesValueBiz).toLocaleString("fr-FR")}€`, color: "#4ade80" },
                { step: "04", title: "Le gain net", desc: "La différence — c'est ça la puissance des miles !", value: `+${Math.round(200000 * milesValueBiz - 200000 * milesValueEuro).toLocaleString("fr-FR")}€`, color: "#f0d060" },
              ].map((s, i) => (
                <div key={i} style={{ textAlign: "center", padding: 16 }}>
                  <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 40, fontWeight: 800, color: "rgba(212,175,55,0.1)", marginBottom: -10 }}>{s.step}</div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 15, fontWeight: 700, color: "#e8e0d0", marginBottom: 8 }}>{s.title}</div>
                  <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "rgba(232,224,208,0.4)", marginBottom: 12, lineHeight: 1.5 }}>{s.desc}</div>
                  <div style={{ fontFamily: "'JetBrains Mono'", fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer style={{ padding: "40px 20px", borderTop: "1px solid rgba(212,175,55,0.08)", textAlign: "center" }}>
        <div style={{ fontFamily: "'DM Sans'", fontSize: 12, color: "rgba(232,224,208,0.25)", lineHeight: 1.8 }}>
          Les valeurs des miles sont calculées sur la base des prix moyens observés sur les vols Air France au départ de Paris.<br />
          Prix indicatifs, susceptibles de varier selon la saison, la disponibilité et les taxes. Offres de parrainage valables jusqu'au 08/06/2025.<br />
          <span style={{ color: "rgba(212,175,55,0.3)" }}>✈ Miles Simulator Premium — Simulez. Comparez. Voyagez mieux.</span>
        </div>
      </footer>
    </div>
  );
}
