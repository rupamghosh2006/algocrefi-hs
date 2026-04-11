"use client";

import { useEffect, useRef, useState } from "react";

interface StatItem {
  value: string;
  numericEnd: number;
  prefix: string;
  suffix: string;
  label: string;
}

const STATS: StatItem[] = [
  { value: "$54,030 ALGO", numericEnd: 54030, prefix: "$", suffix: " ALGO", label: "Total Pool Liquidity" },
  { value: "0.31% APR",    numericEnd: 0.31,   prefix: "",  suffix: "% APR", label: "Current Yield" },
  { value: "30 pts",       numericEnd: 30,      prefix: "",  suffix: " pts",  label: "Min AURA for Unsecured" },
];

function useCounter(end: number, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;
    const startTime = performance.now();
    const isDecimal = end % 1 !== 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * end;
      setCount(isDecimal ? parseFloat(current.toFixed(2)) : Math.floor(current));
      if (progress < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [end, duration, start]);

  return count;
}

function StatCounter({ stat, started }: { stat: StatItem; started: boolean }) {
  const count = useCounter(stat.numericEnd, 1500, started);
  const isDecimal = stat.numericEnd % 1 !== 0;
  const display = isDecimal ? count.toFixed(2) : count.toLocaleString();

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "28px",
          fontWeight: 600,
          color: "#F0F0F0",
          lineHeight: 1.1,
        }}
      >
        {stat.prefix}{display}{stat.suffix}
      </div>
      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "12px",
          color: "#6B7280",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
          marginTop: "4px",
        }}
      >
        {stat.label}
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [statsStarted, setStatsStarted] = useState(false);
  const [showScroll, setShowScroll] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  // Start counters after the main animation sequence (1s delay)
  useEffect(() => {
    const t = setTimeout(() => setStatsStarted(true), 1400);
    return () => clearTimeout(t);
  }, []);

  // Hide scroll indicator after 100px scroll
  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY < 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Magnetic button effect
  useEffect(() => {
    const buttons = sectionRef.current?.querySelectorAll<HTMLButtonElement>(".magnetic-btn");
    if (!buttons) return;

    const handlers: Array<{ el: Element; onMove: (e: MouseEvent) => void; onLeave: () => void }> = [];

    buttons.forEach((btn) => {
      const onMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 60) {
          const strength = (60 - dist) / 60;
          btn.style.transform = `translate(${dx * strength * 0.1}px, ${dy * strength * 0.1}px)`;
        } else {
          btn.style.transform = "";
        }
      };

      const onLeave = () => { btn.style.transform = ""; };

      window.addEventListener("mousemove", onMove);
      btn.addEventListener("mouseleave", onLeave);
      handlers.push({ el: btn, onMove, onLeave });
    });

    return () => {
      handlers.forEach(({ el, onMove, onLeave }) => {
        window.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        padding: "0 24px",
      }}
    >
      {/* Ambient orbs */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-100px",
          left: "-100px",
          width: "800px",
          height: "800px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(0,255,209,0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "orb-drift-teal 12s ease-in-out infinite alternate",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-100px",
          right: "-100px",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(123,47,255,0.12) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "orb-drift-violet 12s ease-in-out infinite alternate",
          pointerEvents: "none",
        }}
      />

      {/* Badge */}
      <div
        style={{
          background: "rgba(0,255,209,0.08)",
          border: "1px solid rgba(0,255,209,0.2)",
          borderRadius: "9999px",
          padding: "6px 16px",
          fontSize: "12px",
          color: "#00FFD1",
          fontWeight: 500,
          fontFamily: "'Inter', sans-serif",
          marginBottom: "32px",
          animation: "badge-in 0.6s ease 0.2s both",
        }}
        aria-label="Built on Algorand, Testnet Live"
      >
        ⬡ Built on Algorand · Testnet Live
      </div>

      {/* Main headline */}
      <h1
        style={{
          margin: 0,
          padding: 0,
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          lineHeight: 0.95,
          letterSpacing: "-0.04em",
          color: "#F0F0F0",
        }}
      >
        <span
          style={{
            display: "block",
            fontSize: "clamp(64px, 9vw, 130px)",
            animation: "clip-reveal 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s both",
          }}
        >
          Lend. Earn.
        </span>
        <span
          style={{
            display: "block",
            fontSize: "clamp(64px, 9vw, 130px)",
            animation: "clip-reveal 0.8s cubic-bezier(0.16,1,0.3,1) 0.65s both",
          }}
        >
          On-chain.
        </span>
      </h1>

      {/* Subheadline */}
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "18px",
          color: "#6B7280",
          maxWidth: "480px",
          margin: "28px auto 0",
          lineHeight: 1.6,
          animation: "fade-up 0.7s ease 1s both",
        }}
      >
        AlgoCrefi is a permissionless liquidity protocol on Algorand. Deposit ALGO to earn
        yield. Borrow against collateral or your Aura credit score.
      </p>

      {/* CTA Buttons */}
      <div
        style={{
          display: "flex",
          gap: "12px",
          marginTop: "40px",
          flexWrap: "wrap",
          justifyContent: "center",
          animation: "fade-up 0.7s ease 1.1s both",
        }}
      >
        <button
          className="magnetic-btn"
          style={{
            background: "#00FFD1",
            color: "#05050A",
            borderRadius: "9999px",
            padding: "14px 32px",
            fontSize: "15px",
            fontWeight: 600,
            fontFamily: "'Inter', sans-serif",
            border: "none",
            cursor: "none",
            transition: "box-shadow 0.2s ease, transform 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 0 40px rgba(0,255,209,0.4)";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.transform = "";
          }}
        >
          Enter App
        </button>

        <button
          className="magnetic-btn"
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "#F0F0F0",
            borderRadius: "9999px",
            padding: "14px 32px",
            fontSize: "15px",
            fontWeight: 400,
            fontFamily: "'Inter', sans-serif",
            cursor: "none",
            transition: "border-color 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
          }}
        >
          Read Docs ↗
        </button>
      </div>

      {/* Live stats bar */}
      <div
        style={{
          display: "flex",
          gap: "48px",
          marginTop: "64px",
          flexWrap: "wrap",
          justifyContent: "center",
          animation: "fade-up 0.7s ease 1.2s both",
        }}
        role="region"
        aria-label="Live protocol statistics"
      >
        {STATS.map((stat, i) => (
          <StatCounter key={i} stat={stat} started={statsStarted} />
        ))}
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          opacity: showScroll ? 1 : 0,
          transition: "opacity 0.4s ease",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <div
          style={{
            color: "#6B7280",
            fontSize: "18px",
            animation: "bounce-down 1.5s ease infinite",
          }}
        >
          ↓
        </div>
        <span
          style={{
            color: "#6B7280",
            fontSize: "11px",
            fontFamily: "'Inter', sans-serif",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          scroll
        </span>
      </div>
    </section>
  );
}
