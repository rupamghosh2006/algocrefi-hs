"use client";
import { useEffect, useRef, useState } from "react";

const SECTION_BG = "rgba(5,5,10,0.92)";
const CARD: React.CSSProperties = {
  background: "rgba(255,255,255,0.025)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 18,
  padding: 28,
  position: "relative",
  overflow: "hidden",
  transition: "border-color 0.3s ease, box-shadow 0.3s ease, background 0.3s ease",
};

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function CardHover({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="bento-card"
      style={{
        ...CARD,
        ...style,
        borderColor: hov ? "rgba(0,255,209,0.25)" : "rgba(255,255,255,0.07)",
        boxShadow: hov ? "0 0 40px rgba(0,255,209,0.04), inset 0 0 60px rgba(0,255,209,0.015)" : "none",
        background: hov ? "rgba(0,255,209,0.018)" : "rgba(255,255,255,0.025)",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      {children}
    </div>
  );
}

// Animated arc for Aura card
function AuraArc({ active }: { active: boolean }) {
  const r = 34;
  const circ = 2 * Math.PI * r;
  const target = circ * (1 / 30);
  const [dash, setDash] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const raf = (now: number) => {
      if (!start) start = now;
      const p = Math.min((now - start) / 1200, 1);
      setDash(p * target);
      if (p < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [active, target]);

  return (
    <div style={{ position: "relative", width: 80, height: 80, margin: "16px auto 0" }}>
      <svg width="80" height="80" viewBox="0 0 80 80" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="40" cy="40" r={r} stroke="rgba(255,183,71,0.12)" strokeWidth="5" fill="none" />
        <circle cx="40" cy="40" r={r} stroke="#FFB347" strokeWidth="5" fill="none"
          strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter,sans-serif", fontSize: 13, fontWeight: 700, color: "#FFB347" }}>
        1/30
      </div>
    </div>
  );
}

// Pool utilization bar
function PoolBar({ active }: { active: boolean }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const raf = (now: number) => {
      if (!start) start = now;
      const p = Math.min((now - start) / 1200, 1);
      setW(p * 67);
      if (p < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [active]);

  return (
    <div style={{ marginTop: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontFamily: "Inter,sans-serif", fontSize: 12, color: "rgba(255,255,255,0.4)" }}>Pool Utilization</span>
        <span style={{ fontFamily: "Inter,sans-serif", fontSize: 12, color: "#F0F0F0" }}>67%</span>
      </div>
      <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 9999, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${w}%`, background: "linear-gradient(90deg,#00FFD1,#7B2FFF)", borderRadius: 9999, transition: "width 0.05s linear", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.3),transparent)", animation: "shimmer-sweep 2s linear infinite" }} />
        </div>
      </div>
    </div>
  );
}

// Sparkline SVG with draw animation
function Sparkline({ active }: { active: boolean }) {
  const pathRef = useRef<SVGPathElement>(null);
  const [drawn, setDrawn] = useState(false);
  useEffect(() => {
    if (!active || drawn) return;
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;
    path.style.transition = "stroke-dashoffset 1.5s ease-out";
    requestAnimationFrame(() => { path.style.strokeDashoffset = "0"; });
    setDrawn(true);
  }, [active, drawn]);

  const d = "M0,50 C20,40 30,60 50,45 C70,30 80,55 100,38 C120,20 130,48 150,32 C170,16 180,42 200,28";
  return (
    <svg width="200" height="80" viewBox="0 0 200 80" style={{ overflow: "visible" }}>
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(0,255,209,0.15)" />
          <stop offset="100%" stopColor="rgba(0,255,209,0)" />
        </linearGradient>
      </defs>
      <path d={`${d} L200,80 L0,80 Z`} fill="url(#spark-fill)" />
      <path ref={pathRef} d={d} stroke="#00FFD1" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export default function BentoGrid() {
  const { ref: sectionRef, visible } = useReveal(0.1);

  const cardReveal = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(28px)",
    transition: `opacity 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.65s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });

  return (
    <section
      id="pool"
      ref={sectionRef}
      style={{ position: "relative", zIndex: 1, padding: "120px 6vw", background: SECTION_BG }}
    >
      {/* Section label */}
      <div className="reveal" style={{ fontFamily: "Inter,sans-serif", fontSize: 11, color: "#00FFD1", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500, marginBottom: 12 }}>
        WHAT ALGOCREFI DOES
      </div>
      <h2 className="font-display reveal" style={{ transitionDelay: "0.1s", fontSize: "clamp(38px,5.5vw,70px)", fontWeight: 800, color: "#F0F0F0", letterSpacing: "-0.035em", lineHeight: 1.05, maxWidth: 700, marginBottom: 40 }}>
        A complete on-chain credit layer.
      </h2>

      {/* Asymmetric bento grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1.7fr 1fr 1fr", gridTemplateRows: "280px 220px", gap: 14 }}>

        {/* Card A — Deposit & Earn (spans both rows) */}
        <div style={{ gridRow: "1 / 3", ...cardReveal(0) }}>
          <CardHover style={{ height: "100%", display: "flex", flexDirection: "column" }}>
            {/* Hex icon */}
            <svg width="28" height="28" viewBox="0 0 28 28">
              <polygon points="14,2 24,8 24,20 14,26 4,20 4,8" stroke="#00FFD1" strokeWidth="1.5" fill="none" />
            </svg>
            <div className="font-display" style={{ fontSize: 20, fontWeight: 700, color: "#F0F0F0", marginTop: 16, marginBottom: 8 }}>Deposit & Earn</div>
            <p style={{ fontFamily: "Inter,sans-serif", fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
              Contribute ALGO to the shared pool. Receive proportional pool shares. Withdraw anytime.
            </p>
            <div style={{ marginTop: "auto", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20 }}>
              {[["Pool Balance", "54,030 ALGO"], ["Share Price", "1.0031 ALGO"]].map(([label, value], i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: i === 0 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                  <span style={{ fontFamily: "Inter,sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{label}</span>
                  <span style={{ fontFamily: "Inter,sans-serif", fontSize: 13, color: "#F0F0F0" }}>{value}</span>
                </div>
              ))}
              <PoolBar active={visible} />
            </div>
          </CardHover>
        </div>

        {/* Card B — Collateral Loans */}
        <div style={cardReveal(0.1)}>
          <CardHover style={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <svg width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 2L4 7v7c0 6.5 4.4 12.6 10 14 5.6-1.4 10-7.5 10-14V7L14 2z" stroke="#7B2FFF" strokeWidth="1.5" fill="none" />
            </svg>
            <div className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "#F0F0F0", marginTop: 14, marginBottom: 8 }}>Borrow Against Collateral</div>
            <p style={{ fontFamily: "Inter,sans-serif", fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
              Lock USDC collateral, receive ALGO instantly. Smart contract enforced terms. No intermediaries.
            </p>
            <div style={{ marginTop: "auto" }}>
              <span style={{ display: "inline-block", background: "rgba(123,47,255,0.12)", border: "1px solid rgba(123,47,255,0.3)", borderRadius: 9999, padding: "5px 14px", fontFamily: "Inter,sans-serif", fontSize: 12, color: "#7B2FFF" }}>
                USDC Collateral · 150% LTV
              </span>
            </div>
          </CardHover>
        </div>

        {/* Card C — Aura Credit */}
        <div style={cardReveal(0.15)}>
          <CardHover style={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <svg width="28" height="28" viewBox="0 0 28 28">
              <polygon points="14,2 16.9,10.3 25.5,10.3 18.8,15.6 21.3,23.9 14,19 6.7,23.9 9.2,15.6 2.5,10.3 11.1,10.3" stroke="#FFB347" strokeWidth="1.5" fill="none" />
            </svg>
            <div className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "#F0F0F0", marginTop: 14, marginBottom: 8 }}>Aura Credit Score</div>
            <p style={{ fontFamily: "Inter,sans-serif", fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>
              Build on-chain credit history. Reach 30 pts to borrow without any collateral.
            </p>
            <AuraArc active={visible} />
          </CardHover>
        </div>

        {/* Card D — Live Analytics (spans 2 columns) */}
        <div style={{ gridColumn: "2 / 4", ...cardReveal(0.2) }}>
          <CardHover style={{ height: "100%", display: "flex", gap: 32 }}>
            {/* Left */}
            <div style={{ flex: "0 0 45%" }}>
              <div className="font-display" style={{ fontSize: 18, fontWeight: 700, color: "#F0F0F0", marginBottom: 16 }}>Live Pool Analytics</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["Pool Balance · 54,030 ALGO", "Share Price · 1.0031 ALGO", "Total Shares · 53,863"].map((c) => (
                  <span key={c} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 8, padding: "6px 12px", fontFamily: "Inter,sans-serif", fontSize: 12, color: "#F0F0F0" }}>{c}</span>
                ))}
              </div>
            </div>
            {/* Right — sparkline */}
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
              <Sparkline active={visible} />
            </div>
          </CardHover>
        </div>
      </div>

      {/* Mobile override */}
      <style>{`
        @media (max-width: 768px) {
          #pool > div:last-child {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto !important;
          }
          #pool > div:last-child > div:first-child {
            grid-row: auto !important;
          }
          #pool > div:last-child > div:last-child {
            grid-column: auto !important;
          }
        }
      `}</style>
    </section>
  );
}
