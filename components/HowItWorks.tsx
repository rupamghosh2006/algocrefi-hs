"use client";
import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    num: "01",
    title: "Connect your wallet",
    desc: "Link Pera, Lute, or Exodus wallet. Sign up with a password. Instant JWT session.",
  },
  {
    num: "02",
    title: "Deposit ALGO",
    desc: "Sign a grouped transaction to deposit ALGO into the pool and receive pool shares.",
  },
  {
    num: "03",
    title: "Borrow or Earn",
    desc: "Use collateral or your Aura score to borrow. Or simply hold shares to earn from lending interest.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="lend"
      ref={sectionRef}
      style={{ position: "relative", zIndex: 1, padding: "120px 6vw", background: "rgba(5,5,10,0.92)" }}
    >
      <div style={{ fontFamily: "Inter,sans-serif", fontSize: 11, color: "#00FFD1", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500, marginBottom: 12 }}>
        HOW IT WORKS
      </div>
      <h2
        className="font-display reveal"
        style={{ fontSize: "clamp(38px,5.5vw,70px)", fontWeight: 800, color: "#F0F0F0", letterSpacing: "-0.035em", lineHeight: 1.05, marginBottom: 48 }}
      >
        Three steps.
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {STEPS.map((step, i) => (
          <div
            key={i}
            style={{
              position: "relative",
              padding: 48,
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: 20,
              overflow: "hidden",
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-30px)",
              transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${i * 0.12}s`,
            }}
          >
            {/* Giant decorative number */}
            <div
              className="font-display"
              style={{
                position: "absolute",
                top: "50%",
                left: 24,
                transform: "translateY(-50%)",
                fontSize: 96,
                fontWeight: 800,
                color: "rgba(255,255,255,0.04)",
                lineHeight: 1,
                userSelect: "none",
                pointerEvents: "none",
              }}
              aria-hidden="true"
            >
              {step.num}
            </div>

            {/* Content — offset right to avoid overlap */}
            <div style={{ marginLeft: 100 }}>
              <h3 className="font-display" style={{ fontSize: 24, fontWeight: 700, color: "#F0F0F0", marginBottom: 12, letterSpacing: "-0.02em" }}>
                {step.title}
              </h3>
              <p style={{ fontFamily: "Inter,sans-serif", fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.65, maxWidth: 560 }}>
                {step.desc}
              </p>
              <div style={{ width: 40, height: 2, background: "#00FFD1", marginTop: 20, borderRadius: 1 }} />
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          #lend .step-inner { margin-left: 0 !important; }
          #lend .step-num { display: none !important; }
        }
      `}</style>
    </section>
  );
}
