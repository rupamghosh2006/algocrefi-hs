"use client";

const NAV_LINKS = ["Pool", "Lending", "Aura", "Documentation", "GitHub"];

function ExternalLinkIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M6 3H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-3M9 2h5v5M14 2 7 9"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function PeraIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="rgba(255,255,255,0.06)" />
      <text x="16" y="22" textAnchor="middle" fill="#F0F0F0" fontSize="14" fontFamily="Inter" fontWeight="600">P</text>
    </svg>
  );
}

function LuteIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="rgba(255,255,255,0.06)" />
      <text x="16" y="22" textAnchor="middle" fill="#F0F0F0" fontSize="14" fontFamily="Inter" fontWeight="600">L</text>
    </svg>
  );
}

function AlgoIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="rgba(255,255,255,0.06)" />
      <path
        d="M9 23l4-14h2l-4 14H9zm7-14h2l-2 7h-2l2-7zm4 0h2l-4 14h-2l4-14z"
        fill="#00FFD1"
        fontSize="12"
      />
    </svg>
  );
}

const WALLET_LINKS = [
  { icon: <PeraIcon />, label: "Pera Wallet", href: "https://perawallet.app" },
  { icon: <LuteIcon />, label: "Lute Wallet", href: "https://lute.app" },
  { icon: <AlgoIcon />, label: "Algorand Explorer", href: "https://testnet.algoexplorer.io" },
];

export default function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        background: "rgba(255,255,255,0.02)",
        paddingTop: "80px",
        paddingBottom: "40px",
        paddingLeft: "5vw",
        paddingRight: "5vw",
        marginTop: "0",
      }}
      className="site-footer"
    >
      {/* Diagonal clip top */}
      <div
        aria-hidden="true"
        className="footer-diagonal"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "60px",
          background: "var(--bg)",
          clipPath: "polygon(0 0, 100% 0, 100% 0%, 0 100%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr 1fr",
          gap: "48px",
          paddingTop: "16px",
        }}
        className="footer-grid"
      >
        {/* Left column */}
        <div>
          <a
            href="#"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              fontSize: "18px",
              textDecoration: "none",
              display: "block",
              marginBottom: "12px",
            }}
            aria-label="AlgoCrefi home"
          >
            <span style={{ color: "#F0F0F0" }}>Algo</span>
            <span style={{ color: "#00FFD1" }}>Crefi</span>
          </a>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              color: "#6B7280",
              lineHeight: 1.6,
              marginBottom: "8px",
            }}
          >
            Permissionless lending on Algorand.
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "13px",
              color: "#6B7280",
            }}
          >
            Built by RupanDos · Testnet Only
          </p>
        </div>

        {/* Middle column — links */}
        <div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px",
              color: "#6B7280",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Navigate
          </p>
          <nav
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            aria-label="Footer navigation"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  color: "#6B7280",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#F0F0F0")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#6B7280")}
              >
                {link}
                {(link === "Documentation" || link === "GitHub") && (
                  <ExternalLinkIcon size={12} />
                )}
              </a>
            ))}
          </nav>
        </div>

        {/* Right column — wallet links */}
        <div>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "11px",
              color: "#6B7280",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}
          >
            Connect
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {WALLET_LINKS.map((w) => (
              <a
                key={w.label}
                href={w.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  color: "#6B7280",
                  textDecoration: "none",
                  transition: "color 0.2s ease",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#F0F0F0")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "#6B7280")}
              >
                {w.icon}
                {w.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "40px auto 0",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          paddingTop: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "12px",
            color: "#6B7280",
          }}
        >
          © 2026 AlgoCrefi · MIT License
        </span>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "12px",
            color: "#6B7280",
          }}
        >
          Algorand Testnet · App ID: 758675636
        </span>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
          .footer-diagonal {
            display: none !important;
          }
        }
      `}</style>
    </footer>
  );
}
