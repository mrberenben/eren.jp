"use client";

import { useEffect, useRef, useState } from "react";
import CURSORS from "~/assets/cursors.webp";

// sprite sheet is 168x112, each cursor frame is 56x56 => 3 columns x 2 rows
const FRAME_SIZE = 56;
const SHEET_WIDTH = 168;
const SHEET_HEIGHT = 112;

const CURSOR_POSITIONS = {
  default: { x: 0, y: 0 },
  hover: { x: 1, y: 0 },
  click: { x: 2, y: 0 },
  text: { x: 0, y: 1 }
} as const;

type CursorType = keyof typeof CURSOR_POSITIONS;

export function Cursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [cursorType, setCursorType] = useState<CursorType>("default");
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      rafRef.current = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY });
        if (!visible) setVisible(true);

        const target = e.target as HTMLElement;

        if (target.closest("a, button, [role='button']")) {
          setCursorType("hover");
        } else if (target.closest("input[type='text'], textarea, [contenteditable='true']")) {
          setCursorType("text");
        } else {
          setCursorType("default");
        }
      });
    };

    const handleMouseUp = () => setCursorType("default");
    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);
    document.documentElement.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
      document.documentElement.removeEventListener("mouseenter", handleMouseEnter);

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [visible]);

  const { x: frameX, y: frameY } = CURSOR_POSITIONS[cursorType];

  const styles: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: FRAME_SIZE,
    height: FRAME_SIZE,
    pointerEvents: "none",
    zIndex: 999999,
    backgroundImage: `url(${CURSORS.src ?? CURSORS})`,
    backgroundSize: `${SHEET_WIDTH}px ${SHEET_HEIGHT}px`,
    backgroundPosition: `-${frameX * FRAME_SIZE}px -${frameY * FRAME_SIZE}px`,
    backgroundRepeat: "no-repeat",
    imageRendering: "-webkit-optimize-contrast",
    transform: `translate3d(${position.x}px, ${position.y}px, 0px)`,
    willChange: "transform",
    opacity: visible ? 1 : 0,
    transition: "opacity 0.15s"
  };

  return <div style={styles} />;
}
