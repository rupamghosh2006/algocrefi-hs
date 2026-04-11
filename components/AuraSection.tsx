"use client";

import { useEffect, useRef, useState } from "react";

function AuraCircle({ earned = 0, penalty = 0 }: { earned?: number; penalty?: number }) {
  const score = Math.max(0, earned - penalty);
  const minScore = 30;
  const radius = 110;
  const circ = 2 * Math.PI * radius;
  const pct = Math.min(score / minScore, 1);
  const offset = circ * (1 - pct);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>
      <div style={{ position: "relative", width: "280px", height: "280px" }}>
        <svg
          viewBox="0 0 280 280"
          width="280"
          height="280"
          aria-label={`Aura score: ${score} of ${minScore} points`}
        >
          {/* Background track */}
          <circle
            cx="140" cy="140" r={radius}
            fill="none"
            stroke="rgba(255,183,71,0.1)"
            strokeWidth="8"
          />
          {/* Progress arc */}
          <circle
            cx="140" cy="140" r={radius}
            fill="none"
            stroke="#FFB347"
            strokeWidth="8"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 140 140)"
            style={{ transition: "stroke-dashoffset 1s ease" }}
          />
        </svg>

        {/* Center content */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px",
              color: "#FFB347",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
            }}
          >
            AURA SCORE
          </span>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "40px",
              fontWeight: 700,
              color: "#FFB347",
              lineHeight: 1,
            }}
          >
            {score}
          </span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              color: "#6B7280",
            }}
          >
            of {minScore} pts min
          </span>
        </div>
      </div>

      {/* Stat rows */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          width: "100%",
          maxWidth: "280px",
        }}
      >
        {[
          { label: "Earned", value: earned },
          { label: "Penalty", value: penalty },
        ].map(({ label, value }) => (
          <div
            key={label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px 16px",
              background: "rgba(255,183,71,0.04)",
              border: "1px solid rgba(255,183,71,0.1)",
              borderRadius: "12px",
            }}
          >
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#6B7280" }}>
              {label}
            </span>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "13px", fontWeight: 600, color: "#FFB347" }}>
              {value} pts
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AuraSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll(".reveal");
    const section = sectionRef.current;
    if (!els || !section) return;

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionObserver.observe(section);
    els.forEach((el) => revealObserver.observe(el));

    return () => {
      sectionObserver.disconnect();
      revealObserver.disconnect();
    };
  }, []);

  return (
    <section
      id="aura-section"
      ref={sectionRef}
      style={{
        background: "rgba(255,183,71,0.03)",
        borderTop: "1px solid rgba(255,183,71,0.1)",
        borderBottom: "1px solid rgba(255,183,71,0.1)",
        padding: "100px 5vw",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          gap: "80px",
          flexWrap: "wrap",
        }}
        className="aura-inner"
      >
        {/* Left column */}
        <div style={{ flex: "1 1 360px" }}>
          <p
            className="reveal"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px",
              color: "#FFB347",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            AURA CREDIT
          </p>
          <h2
            className="reveal"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(32px, 4vw, 48px)",
              fontWeight: 700,
              color: "#F0F0F0",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "20px",
            }}
          >
            Your on-chain credit score. Trustless.
          </h2>
          <p
            className="reveal"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "16px",
              color: "#6B7280",
              lineHeight: 1.65,
              maxWidth: "460px",
            }}
          >
            Every loan you repay earns Aura points. Accumulate 30 Aura points to unlock
            unsecured borrowing — no collateral, no bank, just your on-chain history.
          </p>

          {/* Feature list */}
          <div style={{ marginTop: "32px", display: "flex", flexDirection: "column", gap: "12px" }}>
            {[
              "Permissionless — no KYC, no credit check",
              "On-chain history builds your score",
              "30 pts unlocks collateral-free loans",
            ].map((feat) => (
              <div
                key={feat}
                className="reveal"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  color: "#6B7280",
                }}
              >
                <span style={{ color: "#FFB347", fontSize: "16px", lineHeight: 1 }}>—</span>
                {feat}
              </div>
            ))}
          </div>
        </div>

        {/* Right column — Aura circle visual */}
        <div
          className="reveal"
          style={{ flex: "0 0 auto", display: "flex", justifyContent: "center" }}
        >
          <AuraCircle earned={visible ? 1 : 0} penalty={0} />
        </div>
      </div>
    </section>
  );
}
