"use client";

import { useEffect, useRef } from "react";

export default function Loader() {
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = loaderRef.current;
    const content = document.getElementById("page-content");

    if (!loader || !content) return;

    // After 1.2s, fade out loader and reveal content
    const timer = setTimeout(() => {
      loader.classList.add("exit");
      content.classList.add("visible");

      // Remove from DOM after transition
      setTimeout(() => {
        loader.style.display = "none";
      }, 450);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="page-loader" ref={loaderRef} aria-hidden="true">
      <div style={{ display: "flex", alignItems: "center", gap: "2px" }}>
        {/* SVG wordmark with stroke-draw animation on "Algo" */}
        <svg
          viewBox="0 0 220 48"
          width="220"
          height="48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="AlgoCrefi"
        >
          {/* "Algo" — animated stroke */}
          <text
            x="0"
            y="38"
            fontFamily="'Space Grotesk', sans-serif"
            fontWeight="600"
            fontSize="40"
            fill="none"
            stroke="#F0F0F0"
            strokeWidth="1"
            strokeDasharray="300"
            strokeDashoffset="300"
            style={{
              animation: "stroke-draw 0.8s cubic-bezier(0.16,1,0.3,1) 0.1s forwards",
            }}
          >
            Algo
          </text>
          {/* "Crefi" — teal, fades in slightly after */}
          <text
            x="101"
            y="38"
            fontFamily="'Space Grotesk', sans-serif"
            fontWeight="600"
            fontSize="40"
            fill="#00FFD1"
            opacity="0"
            style={{
              animation: "fade-up 0.5s ease 0.85s forwards",
            }}
          >
            Crefi
          </text>
        </svg>
      </div>
    </div>
  );
}
