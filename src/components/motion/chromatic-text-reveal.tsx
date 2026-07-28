"use client";

import { type MotionStyle, motion, type UseInViewOptions, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

// utils
import { cn } from "~/lib/utils";

const EASE_IN_OUT = [0.77, 0, 0.175, 1];

const CHROMATIC_PALETTE = ["#60a5fa", "#818cf8", "#c084fc", "#fb7185", "#fbbf24"];

const TRAIL_HALF_WIDTH = 14;
const REVEAL_START = `-${TRAIL_HALF_WIDTH}%`;
const REVEAL_FINISH = `${100 + TRAIL_HALF_WIDTH}%`;

export type ChromaticTextRevealProps = {
  /** Full block of text (or rich children) to reveal with the sweep. */
  children: React.ReactNode;
  /** Element the animation renders as. */
  as?: "p" | "div" | "span" | "h1" | "h2" | "h3";
  /** Colors used along the moving chromatic edge. */
  colors?: string[];
  /** Final text color after the sweep passes. */
  foregroundColor?: string;
  /** Gradient angle in degrees. 45 gives a diagonal sweep across wrapped lines. */
  angle?: number;
  /** Sweep duration in seconds. Longer paragraphs usually want a longer sweep. */
  duration?: number;
  /** Delay before the sweep starts, in seconds. */
  delay?: number;
  /** Starts when the text enters the viewport. */
  startOnView?: boolean;
  /** Only starts on the first viewport entry. */
  once?: boolean;
  /** IntersectionObserver root margin used by the viewport trigger. */
  inViewMargin?: UseInViewOptions["margin"];
  className?: string;
};

function composeChromaticGradient(colors: string[], foregroundColor: string, angle: number) {
  const palette = colors.length > 0 ? colors : CHROMATIC_PALETTE;
  const colorStops = palette.map((color, index) => {
    const offset = palette.length === 1 ? 0 : -TRAIL_HALF_WIDTH + (index / (palette.length - 1)) * TRAIL_HALF_WIDTH * 2;
    const operator = offset < 0 ? "-" : "+";
    const distance = Number(Math.abs(offset).toFixed(2));
    return `${color} calc(var(--chromatic-sweep) ${operator} ${distance}%)`;
  });

  return `linear-gradient(${angle}deg, ${foregroundColor} 0%, ${foregroundColor} calc(var(--chromatic-sweep) - ${TRAIL_HALF_WIDTH}%), ${colorStops.join(", ")}, transparent calc(var(--chromatic-sweep) + ${TRAIL_HALF_WIDTH}%), transparent 100%)`;
}

export function ChromaticTextReveal({
  children,
  as = "p",
  colors = CHROMATIC_PALETTE,
  foregroundColor = "var(--foreground)",
  angle = 145,
  duration = 2,
  delay = 0,
  startOnView = true,
  once = true,
  inViewMargin,
  className
}: ChromaticTextRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isInView = useInView(ref, {
    once,
    margin: inViewMargin,
    amount: 0.4
  });
  const shouldReveal = !startOnView || isInView || reduceMotion;
  const backgroundImage = composeChromaticGradient(colors, foregroundColor, angle);

  const MotionTag = motion[as];

  return (
    <MotionTag
      ref={ref as any}
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0.56,
              filter: "blur(6px)",
              transform: "translateY(6px)"
            }
      }
      animate={{
        "--chromatic-sweep": shouldReveal ? REVEAL_FINISH : REVEAL_START,
        opacity: 1,
        filter: "blur(0px)",
        transform: "translateY(0px)"
      }}
      transition={{
        "--chromatic-sweep": reduceMotion ? { duration: 0 } : { duration, delay, ease: EASE_IN_OUT },
        opacity: reduceMotion ? { duration: 0 } : { duration: 0.4 },
        filter: reduceMotion ? { duration: 0 } : { duration: 0.5 },
        transform: reduceMotion ? { duration: 0 } : { duration: 0.5 }
      }}
      className={cn(
        "bg-clip-text text-transparent [background-image:var(--chromatic-gradient)] contain-[paint]",
        className
      )}
      style={
        {
          "--chromatic-sweep": reduceMotion ? REVEAL_FINISH : REVEAL_START,
          "--chromatic-gradient": backgroundImage,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat"
        } as MotionStyle
      }
    >
      {children}
    </MotionTag>
  );
}
