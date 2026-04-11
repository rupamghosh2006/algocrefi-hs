"use client";

const NAV_LINKS = ["Pool", "Lending", "Aura", "Documentation", "GitHub"];

export default function Footer() {
  return (
    <>
      <footer
        style={{
          position: "relative",
          zIndex: 1,
          clipPath: "polygon(0 80px, 100% 0, 100% 100%, 0 100%)",
          background: "rgba(255,255,255,0.015)",
          paddingTop: 120,
          paddingBottom: 48,
          paddingLeft: "6vw",
          paddingRight: "6vw",
        }}
      >
        {/* Three-column grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr 1fr",
            gap: 48,
            marginBottom: 64,
          }}
        >
          {/* Col 1 — Logo + tagline */}
          <div>
            <div className="font-display" style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 12 }}>
              <span style={{ color: "#F0F0F0" }}>Algo</span>
              <span style={{ color: "#00FFD1" }}>Crefi</span>
            </div>
            <p style={{ fontFamily: "Inter,sans-serif", fontSize: 14, color: "rgba(255,255,255,0.35)", lineHeight: 1.6, marginBottom: 8, maxWidth: 260 }}>
              Permissionless lending on Algorand.
            </p>
            <p style={{ fontFamily: "Inter,sans-serif", fontSize: 13, color: "rgba(255,255,255,0.2)" }}>
              Built by RupanDos · Testnet Only
            </p>
          </div>

          {/* Col 2 — Navigation */}
          <div>
            <div style={{ fontFamily: "Inter,sans-serif", fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 20 }}>
              Navigate
            </div>
            <nav style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {NAV_LINKS.map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  style={{ fontFamily: "Inter,sans-serif", fontSize: 14, color: "rgba(255,255,255,0.45)", textDecoration: "none", transition: "color 0.2s ease" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#F0F0F0")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                >
                  {l}
                </a>
              ))}
            </nav>
          </div>

          {/* Col 3 — Connect */}
          <div>
            <div style={{ fontFamily: "Inter,sans-serif", fontSize: 11, color: "rgba(255,255,255,0.25)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 20 }}>
              Connect
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { name: "Pera Wallet", href: "https://perawallet.app" },
                { name: "Lute Wallet", href: "https://lute.app" },
                { name: "Algorand Explorer", href: "https://testnet.algoexplorer.io" },
              ].map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "Inter,sans-serif",
                    fontSize: 14,
                    color: "rgba(255,255,255,0.45)",
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    transition: "color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#00FFD1")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                >
                  {item.name}
                  <span style={{ fontSize: 10, opacity: 0.5 }}>↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontFamily: "Inter,sans-serif", fontSize: 12, color: "rgba(255,255,255,0.25)" }}>
            © 2026 AlgoCrefi · MIT License
          </span>
          <span style={{ fontFamily: "Inter,sans-serif", fontSize: 12, color: "rgba(255,255,255,0.25)" }}>
            Algorand Testnet · App ID: 758675636
          </span>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          footer {
            clip-path: none !important;
            padding-top: 60px !important;
          }
          footer > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </>
  );
}
