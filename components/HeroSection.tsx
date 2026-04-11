"use client";
import { useEffect, useRef, useState } from "react";

function easeOutCubic(t: number) { return 1 - Math.pow(1 - t, 3); }

function useCounter(target: number, duration = 2000, active = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const raf = (now: number) => {
      if (!start) start = now;
      const p = Math.min((now - start) / duration, 1);
      setVal(Math.floor(easeOutCubic(p) * target));
      if (p < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [active, target, duration]);
  return val;
}

export default function HeroSection() {
  const [ready, setReady] = useState(false);
  const [statsActive, setStatsActive] = useState(false);
  const [showScroll, setShowScroll] = useState(true);
  const statsRef = useRef<HTMLDivElement>(null);
  const btn1Ref = useRef<HTMLButtonElement>(null);
  const btn2Ref = useRef<HTMLButtonElement>(null);

  const pool = useCounter(54030, 2000, statsActive);
  const aura = useCounter(30, 2000, statsActive);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 200);
    return () => clearTimeout(t);
  }, []);

  // Counter trigger on viewport entry
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsActive(true); }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Scroll indicator hide
  useEffect(() => {
    const fn = () => setShowScroll(window.scrollY < 100);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Magnetic button helper
  function magnetic(ref: React.RefObject<HTMLButtonElement | null>) {
    return {
      onMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
        const btn = ref.current; if (!btn) return;
        const r = btn.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        if (Math.sqrt(dx * dx + dy * dy) < 70)
          btn.style.transform = `translate(${dx * 0.2}px,${dy * 0.2}px)`;
      },
      onMouseEnter() { const btn = ref.current; if (btn) btn.style.transition = "transform 0.1s ease, box-shadow 0.25s ease"; },
      onMouseLeave() {
        const btn = ref.current; if (!btn) return;
        btn.style.transition = "transform 0.6s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease";
        btn.style.transform = "translate(0,0)";
      },
    };
  }

  // Per-line reveal style
  const lineWrap: React.CSSProperties = { display: "block", overflow: "hidden", lineHeight: 0.92 };
  const lineInner = (delay: number): React.CSSProperties => ({
    display: "block",
    transform: ready ? "translateY(0)" : "translateY(110%)",
    transition: `transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });
  const fadeIn = (delay: number): React.CSSProperties => ({
    opacity: ready ? 1 : 0,
    transform: ready ? "translateY(0)" : "translateY(12px)",
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  });

  return (
    <section
      id="hero"
      style={{ position: "relative", zIndex: 1, height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 24px" }}
    >
      {/* Orbital rings */}
      <div style={{ position: "relative", width: 320, height: 320, marginBottom: 36, flexShrink: 0 }}>
        <svg width="320" height="320" viewBox="0 0 320 320" style={{ position: "absolute", inset: 0, animation: "spin-cw 20s linear infinite" }}>
          <circle cx="160" cy="160" r="152" stroke="#00FFD1" strokeWidth="0.75" fill="none" opacity="0.15" />
        </svg>
        <svg width="320" height="320" viewBox="0 0 320 320" style={{ position: "absolute", inset: 0, animation: "spin-ccw 14s linear infinite" }}>
          <circle cx="160" cy="160" r="114" stroke="#7B2FFF" strokeWidth="0.75" fill="none" opacity="0.2" />
        </svg>
        <svg width="320" height="320" viewBox="0 0 320 320" style={{ position: "absolute", inset: 0, animation: "spin-cw 8s linear infinite" }}>
          <circle cx="160" cy="160" r="76" stroke="#00FFD1" strokeWidth="1" fill="none" opacity="0.3" strokeDasharray="20 8" />
        </svg>
        <svg width="48" height="48" viewBox="0 0 48 48"
          style={{ position: "absolute", top: "50%", left: "50%", animation: "pulse-hex 3s ease-in-out infinite" }}>
          <polygon points="24,4 42,14 42,34 24,44 6,34 6,14" stroke="#00FFD1" strokeWidth="1.5" fill="rgba(0,255,209,0.05)" />
        </svg>
      </div>

      {/* Badge */}
      <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(0,255,209,0.06)", border: "1px solid rgba(0,255,209,0.18)", borderRadius: 9999, padding: "5px 14px", fontFamily: "Inter,sans-serif", fontSize: 11, color: "#00FFD1", letterSpacing: "0.12em", textTransform: "uppercase", animation: "badge-in 0.5s ease 0.3s both", marginBottom: 24 }}>
        ⬡ BUILT ON ALGORAND · TESTNET LIVE
      </div>

      {/* Headline */}
      <h1 className="font-display" style={{ margin: 0, fontSize: "clamp(72px,11vw,140px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.9 }}>
        <span style={lineWrap}><span style={lineInner(0.5)} aria-hidden="false">Lend.</span></span>
        <span style={lineWrap}><span style={lineInner(0.62)}>Earn.</span></span>
        <span style={lineWrap}>
          <span style={{ ...lineInner(0.74), background: "linear-gradient(135deg,#00FFD1 0%,#7B2FFF 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
            On-chain.
          </span>
        </span>
      </h1>

      {/* Subtext */}
      <p style={{ ...fadeIn(1.1), fontFamily: "Inter,sans-serif", fontSize: 17, color: "rgba(255,255,255,0.45)", maxWidth: 420, lineHeight: 1.65, margin: "28px auto 0" }}>
        AlgoCrefi is a permissionless liquidity protocol on Algorand. Deposit ALGO to earn yield. Borrow against collateral or your Aura credit score.
      </p>

      {/* CTAs */}
      <div style={{ ...fadeIn(1.2), display: "flex", gap: 12, marginTop: 40, flexWrap: "wrap", justifyContent: "center" }}>
        <button
          ref={btn1Ref} {...magnetic(btn1Ref)}
          style={{ background: "#00FFD1", color: "#05050A", fontFamily: "Inter,sans-serif", fontWeight: 700, fontSize: 15, padding: "15px 36px", borderRadius: 9999, border: "none", cursor: "none" }}
          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 0 0 8px rgba(0,255,209,0.12),0 0 40px rgba(0,255,209,0.35)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translate(0,0)"; e.currentTarget.style.transition = "transform 0.6s cubic-bezier(0.34,1.56,0.64,1),box-shadow 0.25s ease"; }}
        >
          Enter App
        </button>
        <button
          ref={btn2Ref} {...magnetic(btn2Ref)}
          style={{ background: "rgba(255,255,255,0.04)", color: "rgba(255,255,255,0.7)", fontFamily: "Inter,sans-serif", fontWeight: 400, fontSize: 15, padding: "15px 36px", borderRadius: 9999, border: "1px solid rgba(255,255,255,0.1)", cursor: "none", transition: "background 0.25s,border-color 0.25s,color 0.25s" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.color = "#F0F0F0"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; e.currentTarget.style.transform = "translate(0,0)"; e.currentTarget.style.transition = "transform 0.6s cubic-bezier(0.34,1.56,0.64,1),background 0.25s,border-color 0.25s,color 0.25s"; }}
        >
          Read Docs ↗
        </button>
      </div>

      {/* Stats */}
      <div ref={statsRef} style={{ ...fadeIn(1.4), display: "flex", alignItems: "center", marginTop: 64, flexWrap: "wrap", justifyContent: "center" }}>
        {[
          { val: pool.toLocaleString() + " ALGO", label: "TOTAL POOL LIQUIDITY" },
          { val: "0.31 USDC", label: "ALGO PRICE" },
          { val: aura + " pts", label: "MIN AURA SCORE" },
        ].map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center" }}>
            {i > 0 && <div style={{ width: 1, height: 32, background: "rgba(255,255,255,0.1)", margin: "0 28px" }} />}
            <div style={{ textAlign: "center" }}>
              <div className="font-display" style={{ fontSize: 30, fontWeight: 700, color: "#F0F0F0", lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontFamily: "Inter,sans-serif", fontSize: 11, color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 6 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: showScroll ? 0.4 : 0, transition: "opacity 0.4s ease", pointerEvents: "none" }} aria-hidden="true">
        <div style={{ animation: "bounce-down 1.5s ease-in-out infinite", color: "rgba(255,255,255,0.5)", fontSize: 18 }}>↓</div>
        <span style={{ fontFamily: "Inter,sans-serif", fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>scroll</span>
      </div>

      {/* Fade to dark */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 120, background: "linear-gradient(to bottom,transparent,#05050A)", pointerEvents: "none" }} />
    </section>
  );
}
