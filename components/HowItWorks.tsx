"use client";

import { useEffect, useRef } from "react";

const STEPS = [
  {
    num: "01",
    title: "Connect your wallet",
    body: "Link Pera, Lute, or Exodus wallet. Sign up with a password. Instant JWT session.",
  },
  {
    num: "02",
    title: "Deposit ALGO",
    body: "Sign a grouped transaction to deposit ALGO into the pool and receive pool shares.",
  },
  {
    num: "03",
    title: "Borrow or Earn",
    body: "Use collateral or your Aura score to borrow. Or simply hold shares to earn from lending interest.",
  },
];

export default function HowItWorks() {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Reveal title
  useEffect(() => {
    const titles = sectionRef.current?.querySelectorAll(".reveal");
    if (!titles) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    titles.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Horizontal scroll on desktop
  useEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return;

    const onScroll = () => {
      const rect = outer.getBoundingClientRect();
      const outerH = outer.offsetHeight;
      const windowH = window.innerHeight;

      // How far into the sticky zone we are (0 → 1)
      const progress = Math.max(
        0,
        Math.min(1, (-rect.top) / (outerH - windowH))
      );

      // Max translate: total track width minus viewport width
      const maxTranslate = track.scrollWidth - window.innerWidth;
      const translate = progress * maxTranslate;
      track.style.transform = `translateX(-${translate}px)`;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} style={{ background: "var(--bg)" }}>
      {/* Section header — outside the sticky zone */}
      <div style={{ padding: "120px 5vw 60px" }}>
        <p
          className="reveal"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "11px",
            color: "#00FFD1",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            marginBottom: "16px",
          }}
        >
          How It Works
        </p>
        <h2
          className="reveal"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(36px, 5vw, 64px)",
            fontWeight: 700,
            color: "#F0F0F0",
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
          }}
        >
          Three steps to earning.
        </h2>
      </div>

      {/* Sticky horizontal scroll container */}
      <div
        ref={outerRef}
        className="how-outer"
        style={{ height: "300vh", position: "relative" }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            display: "flex",
            alignItems: "center",
            overflow: "hidden",
          }}
        >
          <div
            ref={trackRef}
            style={{
              display: "flex",
              gap: "24px",
              paddingLeft: "5vw",
              paddingRight: "5vw",
              flexShrink: 0,
              willChange: "transform",
            }}
          >
            {STEPS.map((step) => (
              <div
                key={step.num}
                style={{
                  width: "400px",
                  height: "260px",
                  flexShrink: 0,
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "20px",
                  padding: "40px",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Decorative large number */}
                <span
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "20px",
                    transform: "translateY(-50%)",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "80px",
                    fontWeight: 800,
                    color: "rgba(255,255,255,0.05)",
                    lineHeight: 1,
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                >
                  {step.num}
                </span>

                <div style={{ position: "relative", zIndex: 1 }}>
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "11px",
                      fontWeight: 500,
                      color: "#00FFD1",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      marginBottom: "12px",
                    }}
                  >
                    Step {step.num}
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: "22px",
                      fontWeight: 600,
                      color: "#F0F0F0",
                      marginBottom: "14px",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "14px",
                      color: "#6B7280",
                      lineHeight: 1.65,
                    }}
                  >
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: vertical cards */}
      <div className="mobile-steps" style={{ display: "none", padding: "0 5vw 80px", flexDirection: "column", gap: "16px" }}>
        {STEPS.map((step) => (
          <div
            key={step.num}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "20px",
              padding: "32px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "16px",
                right: "20px",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "64px",
                fontWeight: 800,
                color: "rgba(255,255,255,0.05)",
                lineHeight: 1,
                userSelect: "none",
              }}
            >
              {step.num}
            </div>
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ color: "#00FFD1", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "8px", fontFamily: "'Inter', sans-serif" }}>
                Step {step.num}
              </div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "20px", fontWeight: 600, color: "#F0F0F0", marginBottom: "10px" }}>
                {step.title}
              </h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#6B7280", lineHeight: 1.6 }}>
                {step.body}
              </p>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .how-outer { display: none !important; }
          .mobile-steps { display: flex !important; }
        }
      `}</style>
    </section>
  );
}
