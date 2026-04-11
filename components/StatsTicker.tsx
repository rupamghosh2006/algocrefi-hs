"use client";

const TICKER_ITEMS = [
  { label: "ALGO / USDC", value: "0.31 USDC", prefix: "⬡ " },
  { label: "Total Deposits", value: "54,030 ALGO" },
  { label: "Active Loans", value: "2" },
  { label: "Min AURA", value: "30 pts" },
  { label: "App ID", value: "758675636" },
  { label: "Network", value: "Algorand Testnet" },
];

function TickerItem({ label, value, prefix }: { label: string; value: string; prefix?: string }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "0 32px",
        whiteSpace: "nowrap",
        fontFamily: "'Inter', sans-serif",
        fontSize: "13px",
      }}
    >
      {prefix && (
        <span style={{ color: "#00FFD1", fontSize: "14px" }}>{prefix}</span>
      )}
      <span style={{ color: "#6B7280" }}>{label}:</span>
      <span style={{ color: "#F0F0F0" }}>{value}</span>
      <span
        aria-hidden="true"
        style={{ color: "#00FFD1", marginLeft: "16px", fontSize: "10px" }}
      >
        ●
      </span>
    </span>
  );
}

export default function StatsTicker() {
  // Duplicate items 4 times for seamless loop
  const repeated = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div
      role="marquee"
      aria-label="Live protocol statistics"
      style={{
        width: "100%",
        height: "56px",
        background: "rgba(255,255,255,0.03)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        position: "relative",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          animation: "marquee 28s linear infinite",
          willChange: "transform",
        }}
      >
        {repeated.map((item, i) => (
          <TickerItem
            key={i}
            label={item.label}
            value={item.value}
            prefix={item.prefix}
          />
        ))}
      </div>
    </div>
  );
}
