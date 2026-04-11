"use client";

import { useEffect, useRef } from "react";

export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const current = useRef({ x: -100, y: -100 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const loop = () => {
      current.current.x = lerp(current.current.x, pos.current.x, 0.18);
      current.current.y = lerp(current.current.y, pos.current.y, 0.18);
      cursor.style.left = `${current.current.x}px`;
      cursor.style.top = `${current.current.y}px`;
      rafId.current = requestAnimationFrame(loop);
    };

    const onMouseEnterInteractive = () => cursor.classList.add("expanded");
    const onMouseLeaveInteractive = () => cursor.classList.remove("expanded");

    window.addEventListener("mousemove", onMouseMove);
    rafId.current = requestAnimationFrame(loop);

    // Attach to all interactive elements
    const attach = () => {
      document
        .querySelectorAll("a, button, [data-cursor-expand]")
        .forEach((el) => {
          el.addEventListener("mouseenter", onMouseEnterInteractive);
          el.addEventListener("mouseleave", onMouseLeaveInteractive);
        });
    };

    attach();

    // Re-attach on DOM changes
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      observer.disconnect();
    };
  }, []);

  return <div id="custom-cursor" ref={cursorRef} aria-hidden="true" />;
}
