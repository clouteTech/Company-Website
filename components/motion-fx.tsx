"use client";

import { useEffect, useRef } from "react";

/*
 * Site-wide pointer effects for mouse users (styles in globals.css, .fx-*):
 *  - Magnetic buttons: a `.btn` under the pointer leans up to 6px towards it (as --mag-x/--mag-y) and springs
 *    back when the pointer leaves.
 *  - Cursor follower: a soft ring that trails the pointer and grows over links and buttons. The real cursor is
 *    kept; the ring only decorates it.
 * Nothing runs on touch devices or when the visitor prefers reduced motion.
 */
const MAGNET = 6;
const INTERACTIVE = "a, button, [role='button'], label, summary, input, textarea, select";

export function MotionFx() {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    const ring = ringRef.current;
    let frame = 0;
    let x = -100;
    let y = -100;
    let rx = x;
    let ry = y;
    let magnet: HTMLElement | null = null;

    const release = () => {
      magnet?.style.removeProperty("--mag-x");
      magnet?.style.removeProperty("--mag-y");
      magnet = null;
    };

    // The ring eases towards the pointer every frame, which gives it its trailing feel.
    const tick = () => {
      rx += (x - rx) * 0.2;
      ry += (y - ry) * 0.2;
      if (ring) ring.style.translate = `${rx}px ${ry}px`;
      frame = Math.abs(x - rx) + Math.abs(y - ry) > 0.2 ? requestAnimationFrame(tick) : 0;
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x = event.clientX;
      y = event.clientY;
      if (!frame) frame = requestAnimationFrame(tick);

      const target = event.target as Element | null;
      ring?.toggleAttribute("data-active", !!target?.closest(INTERACTIVE));
      ring?.toggleAttribute("data-hidden", false);

      const button = target?.closest<HTMLElement>(".btn");
      if (button !== magnet) release();
      if (button && !button.matches(":disabled")) {
        magnet = button;
        const rect = button.getBoundingClientRect();
        const dx = (x - (rect.left + rect.width / 2)) / (rect.width / 2);
        const dy = (y - (rect.top + rect.height / 2)) / (rect.height / 2);
        button.style.setProperty("--mag-x", `${(dx * MAGNET).toFixed(1)}px`);
        button.style.setProperty("--mag-y", `${(dy * MAGNET).toFixed(1)}px`);
      }
    };
    const onLeave = () => {
      release();
      ring?.toggleAttribute("data-hidden", true);
    };
    const onDown = () => ring?.toggleAttribute("data-pressed", true);
    const onUp = () => ring?.toggleAttribute("data-pressed", false);

    document.documentElement.classList.add("fx-on");
    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerup", onUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      release();
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("fx-on");
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <div ref={ringRef} aria-hidden="true" className="fx-ring" data-hidden="" />;
}
