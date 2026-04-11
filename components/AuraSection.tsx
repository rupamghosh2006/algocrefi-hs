"use client";
import { useEffect, useRef, useState } from "react";

export default function AuraSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const fadeIn = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(20px)",
    transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });

  return (
    <section
      id="aura"
      ref={sectionRef}
      style={{
        position: "relative",
        zIndex: 1,
        padding: "100px 6vw",
        background: "rgba(255,183,71,0.03)",
        borderTop: "1px solid rgba(255,183,71,0.1)",
        borderBottom: "1px solid rgba(255,183,71,0.1)",
      }}
    >
      <div style={{ display: "flex", gap: "8vw", alignItems: "center", flexWrap: "wrap" }}>

        {/* Left column */}
        <div style={{ flex: "1 1 320px", minWidth: 0 }}>
          <div style={{ ...fadeIn(0), fontFamily: "Inter,sans-serif", fontSize: 11, color: "#FFB347", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500, marginBottom: 16 }}>
            AURA CREDIT
          </div>
          <h2
            className="font-display"
            style={{ ...fadeIn(0.1), fontSize: "clamp(32px,4vw,44px)", fontWeight: 800, color: "#F0F0F0", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 20 }}
          >
            Your on-chain credit score. Trustless.
          </h2>
          <p style={{ ...fadeIn(0.2), fontFamily: "Inter,sans-serif", fontSize: 16, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: 28, maxWidth: 480 }}>
            Every loan you repay earns Aura points. Accumulate 30 Aura points to unlock unsecured borrowing — no collateral, no bank, just your on-chain history.
          </p>

          {/* Bullet points */}
          <div style={fadeIn(0.3)}>
            {[
              "Permissionless — no KYC",
              "On-chain history builds your score",
              "30 pts unlocks collateral-free loans",
            ].map((item, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 14 }}>
                <div style={{ width: 2, height: 16, background: "#FFB347", borderRadius: 1, marginTop: 3, flexShrink: 0 }} />
                <span style={{ fontFamily: "Inter,sans-serif", fontSize: 15, color: "rgba(255,255,255,0.6)" }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right column — orb visualization */}
        <div style={{ flex: "1 1 280px", display: "flex", flexDirection: "column", alignItems: "center", gap: 24, ...fadeIn(0.15) }}>
          {/* Glowing orb */}
          <div
            style={{
              width: 280,
              height: 280,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(255,183,71,0.08) 0%, transparent 70%)",
              border: "1px solid rgba(255,183,71,0.15)",
              boxShadow: "0 0 80px rgba(255,183,71,0.08), inset 0 0 60px rgba(255,183,71,0.04)",
              animation: "orb-pulse 4s ease-in-out infinite",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
            }}
          >
            {/* Outer SVG arc */}
            <div style={{ position: "relative", width: 180, height: 180 }}>
              <svg width="180" height="180" viewBox="0 0 180 180" style={{ transform: "rotate(-90deg)", position: "absolute", inset: 0 }}>
                <circle cx="90" cy="90" r="82" stroke="rgba(255,183,71,0.1)" strokeWidth="8" fill="none" />
                <circle
                  cx="90" cy="90" r="82"
                  stroke="#FFB347" strokeWidth="8" fill="none"
                  strokeDasharray={`${2 * Math.PI * 82 * (1 / 30)} ${2 * Math.PI * 82}`}
                  strokeLinecap="round"
                  style={{ transition: "stroke-dasharray 1.5s ease-out" }}
                />
              </svg>
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
                <div style={{ fontFamily: "Inter,sans-serif", fontSize: 10, color: "rgba(255,183,71,0.6)", letterSpacing: "0.12em", textTransform: "uppercase" }}>AURA SCORE</div>
                <div className="font-display" style={{ fontSize: 40, fontWeight: 700, color: "#FFB347", lineHeight: 1 }}>30</div>
                <div style={{ fontFamily: "Inter,sans-serif", fontSize: 11, color: "rgba(255,183,71,0.5)" }}>pts minimum</div>
              </div>
            </div>
          </div>

          {/* Score rows */}
          <div style={{ width: "100%", maxWidth: 280 }}>
            {[["Earned", "1 pts"], ["Penalty", "0 pts"]].map(([label, val]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid rgba(255,183,71,0.08)" }}>
                <span style={{ fontFamily: "Inter,sans-serif", fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{label}</span>
                <span style={{ fontFamily: "Inter,sans-serif", fontSize: 13, fontWeight: 600, color: "#FFB347" }}>{val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
