"use client";

import { useEffect, useRef } from "react";

const cardBase: React.CSSProperties = {
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: "20px",
  padding: "32px",
  position: "relative",
  overflow: "hidden",
  transition: "border-color 0.3s ease, background 0.3s ease",
};

function BentoCard({
  children,
  style,
  className,
  id,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={`reveal bento-card ${className ?? ""}`}
      style={{ ...cardBase, ...style }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "rgba(0,255,209,0.2)";
        el.style.background = "rgba(0,255,209,0.02)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = "rgba(255,255,255,0.07)";
        el.style.background = "rgba(255,255,255,0.03)";
      }}
    >
      {children}
    </div>
  );
}

/* ── Icon components ── */
function HexIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M16 2L28 9v14L16 30 4 23V9z"
        stroke="#00FFD1"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M16 3L5 7v9c0 6 4.5 11.5 11 13 6.5-1.5 11-7 11-13V7z"
        stroke="#7B2FFF"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DiamondIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M16 3l13 10-13 16L3 13z"
        stroke="#FFB347"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Aura arc circle ── */
function AuraArc({ value, max }: { value: number; max: number }) {
  const radius = 40;
  const circ = 2 * Math.PI * radius;
  const pct = value / max;
  const offset = circ * (1 - pct);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "16px" }}>
      <svg width="96" height="96" viewBox="0 0 96 96" aria-label={`${value} of ${max} Aura points`}>
        <circle
          cx="48" cy="48" r={radius}
          fill="none"
          stroke="rgba(255,183,71,0.1)"
          strokeWidth="7"
        />
        <circle
          cx="48" cy="48" r={radius}
          fill="none"
          stroke="#FFB347"
          strokeWidth="7"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 48 48)"
        />
        <text x="48" y="44" textAnchor="middle" fill="#FFB347" fontSize="11" fontFamily="Inter" dominantBaseline="middle">AURA</text>
        <text x="48" y="58" textAnchor="middle" fill="#FFB347" fontSize="13" fontFamily="Space Grotesk" fontWeight="700" dominantBaseline="middle">
          {value}/{max}
        </text>
      </svg>
      <div>
        <div style={{ color: "#FFB347", fontSize: "12px", fontFamily: "'Inter', sans-serif" }}>
          pts to unlock
        </div>
        <div style={{ color: "#FFB347", fontSize: "22px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>
          unsecured
        </div>
        <div style={{ color: "#6B7280", fontSize: "12px", fontFamily: "'Inter', sans-serif" }}>
          borrowing
        </div>
      </div>
    </div>
  );
}

/* ── Mini sparkline ── */
function Sparkline() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          path.style.animation = "sparkline-draw 1.4s ease forwards";
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(path);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      viewBox="0 0 400 80"
      preserveAspectRatio="none"
      style={{ width: "100%", height: "80px", marginTop: "16px" }}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="spark-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00FFD1" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#00FFD1" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Fill area */}
      <path
        d="M0,60 C40,50 60,30 100,35 C140,40 160,20 200,25 C240,30 260,15 300,20 C340,25 370,10 400,15 L400,80 L0,80 Z"
        fill="url(#spark-fill)"
      />
      {/* Line */}
      <path
        ref={pathRef}
        d="M0,60 C40,50 60,30 100,35 C140,40 160,20 200,25 C240,30 260,15 300,20 C340,25 370,10 400,15"
        fill="none"
        stroke="#00FFD1"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{
          strokeDasharray: 600,
          strokeDashoffset: 600,
        }}
      />
    </svg>
  );
}

/* ── Progress bar ── */
function ProgressBar({ pct, label }: { pct: number; label: string }) {
  return (
    <div style={{ marginTop: "auto", paddingTop: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#6B7280" }}>
          {label}
        </span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "#00FFD1" }}>
          {pct}%
        </span>
      </div>
      <div
        style={{
          height: "4px",
          background: "rgba(255,255,255,0.08)",
          borderRadius: "9999px",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: "#00FFD1",
            borderRadius: "9999px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* shimmer */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
              animation: "shimmer 2s linear infinite",
            }}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}

/* ── Section title helper ── */
function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div style={{ marginBottom: "40px" }} className="reveal">
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "11px",
          color: "#00FFD1",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: "16px",
        }}
      >
        {eyebrow}
      </p>
      <h2
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "clamp(36px, 5vw, 64px)",
          fontWeight: 700,
          color: "#F0F0F0",
          letterSpacing: "-0.03em",
          lineHeight: 1.05,
        }}
      >
        {title}
      </h2>
    </div>
  );
}

export default function BentoGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll reveal observer
  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal");
    if (!els) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              (entry.target as HTMLElement).classList.add("visible");
            }, i * 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="pool"
      ref={sectionRef}
      style={{ padding: "120px 5vw" }}
    >
      <SectionHead
        eyebrow="What AlgoCrefi Does"
        title="A complete on-chain credit layer."
      />

      {/* Bento grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.6fr 1fr 1fr",
          gridTemplateRows: "auto auto",
          gap: "16px",
        }}
        className="bento-outer"
      >
        {/* Card 1 — Liquidity Pool (spans 2 rows) */}
        <BentoCard
          style={{
            gridRow: "1 / 3",
            gridColumn: "1 / 2",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <HexIcon />
          <h3
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "22px",
              fontWeight: 600,
              color: "#F0F0F0",
              marginTop: "20px",
            }}
          >
            Deposit &amp; Earn
          </h3>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              color: "#6B7280",
              lineHeight: 1.6,
              marginTop: "12px",
            }}
          >
            Contribute ALGO to the shared pool. Receive proportional pool shares. Withdraw
            anytime. Your yield compounds with every new borrower.
          </p>

          {/* Extra info */}
          <div
            style={{
              marginTop: "24px",
              padding: "16px",
              background: "rgba(0,255,209,0.04)",
              border: "1px solid rgba(0,255,209,0.1)",
              borderRadius: "12px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ color: "#6B7280", fontSize: "12px", fontFamily: "'Inter', sans-serif" }}>Pool Balance</span>
              <span style={{ color: "#F0F0F0", fontSize: "12px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>54,030 ALGO</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#6B7280", fontSize: "12px", fontFamily: "'Inter', sans-serif" }}>Share Price</span>
              <span style={{ color: "#00FFD1", fontSize: "12px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>1.0031 ALGO</span>
            </div>
          </div>

          <ProgressBar pct={67} label="Pool Utilization" />
        </BentoCard>

        {/* Card 2 — Collateral Loans */}
        <BentoCard id="lend" style={{ transitionDelay: "0.1s" }}>
          <ShieldIcon />
          <h3
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "20px",
              fontWeight: 600,
              color: "#F0F0F0",
              marginTop: "16px",
            }}
          >
            Borrow with USDC collateral
          </h3>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              color: "#6B7280",
              lineHeight: 1.6,
              marginTop: "10px",
            }}
          >
            Lock USDC collateral, receive ALGO loans instantly. Smart contract enforced
            repayment terms.
          </p>
          <div
            style={{
              display: "inline-flex",
              marginTop: "20px",
              padding: "6px 14px",
              background: "rgba(123,47,255,0.1)",
              border: "1px solid rgba(123,47,255,0.2)",
              borderRadius: "9999px",
              fontSize: "12px",
              color: "#7B2FFF",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
            }}
          >
            USDC Collateral · 150% LTV
          </div>
        </BentoCard>

        {/* Card 3 — Aura Credit */}
        <BentoCard id="aura" style={{ transitionDelay: "0.2s" }}>
          <DiamondIcon />
          <h3
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "20px",
              fontWeight: 600,
              color: "#F0F0F0",
              marginTop: "16px",
            }}
          >
            Aura Score Lending
          </h3>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              color: "#6B7280",
              lineHeight: 1.6,
              marginTop: "10px",
            }}
          >
            Build on-chain credit. Reach 30 Aura points to unlock unsecured ALGO loans — no
            collateral needed.
          </p>
          <AuraArc value={1} max={30} />
        </BentoCard>

        {/* Card 4 — Analytics (spans col 2–3) */}
        <BentoCard
          id="analytics"
          style={{
            gridColumn: "2 / 4",
            transitionDelay: "0.3s",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
            <h3
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "20px",
                fontWeight: 600,
                color: "#F0F0F0",
              }}
            >
              Live Pool Analytics
            </h3>
            {/* Inline mini-stats */}
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {[
                { label: "Pool Balance", val: "54,030 ALGO" },
                { label: "Share Price",  val: "1.0031 ALGO" },
                { label: "Total Shares", val: "53,863" },
              ].map((s) => (
                <div
                  key={s.label}
                  style={{
                    padding: "6px 12px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "8px",
                    fontSize: "12px",
                    fontFamily: "'Inter', sans-serif",
                    display: "flex",
                    gap: "6px",
                  }}
                >
                  <span style={{ color: "#6B7280" }}>{s.label}</span>
                  <span style={{ color: "#F0F0F0", fontWeight: 500 }}>{s.val}</span>
                </div>
              ))}
            </div>
          </div>
          <Sparkline />
        </BentoCard>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .bento-outer {
            grid-template-columns: 1fr !important;
            grid-template-rows: auto !important;
          }
          .bento-outer > * {
            grid-row: auto !important;
            grid-column: auto !important;
          }
        }
      `}</style>
    </section>
  );
}
