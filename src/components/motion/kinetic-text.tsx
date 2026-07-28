"use client";

import React from "react";

import { motion } from "motion/react";

import { cn } from "~/lib/utils";

type As = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";

type KineticTextProps = React.HTMLAttributes<HTMLElement> & {
  text: string;
  as?: As;
};

export function KineticText({ text, as: Tag = "h1", className = "", style, ...rest }: KineticTextProps) {
  const mergedStyle = {
    "--hover-padding": "calc(0.25em / 12)",
    "--text-stroke-width": "calc(1em * 125 / 6000)",
    ...(style as React.CSSProperties | undefined)
  } as React.CSSProperties;

  return (
    <Tag {...rest} className={cn("flex flex-wrap font-light", className)} style={mergedStyle}>
      {text.split("").map((letter, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="will-change-[font-weight,-webkit-text-stroke-width,padding] [-webkit-text-stroke-color:transparent] [-webkit-text-stroke-width:var(--text-stroke-width)] [transition:font-weight_0.4s,-webkit-text-stroke-color_0.4s,padding_0.4s] hover:px-(--hover-padding) hover:font-black hover:[-webkit-text-stroke-color:currentcolor] hover:[-webkit-text-stroke-width:calc(var(--text-stroke-width)*2)] has-[+span+span:hover]:font-normal has-[+span:hover]:px-(--hover-padding) has-[+span:hover]:font-semibold [:hover+&]:px-(--hover-padding) [:hover+&]:font-semibold [:hover+span+&]:font-normal"
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
      <span className="sr-only">{text}</span>
    </Tag>
  );
}

type FullWidthKineticTextProps = React.ComponentProps<typeof KineticText>;

export function FullWidthKineticText({ text, as = "h1", className, style, ...rest }: FullWidthKineticTextProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const measureRef = React.useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = React.useState<number | null>(null);

  React.useLayoutEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;

    const compute = () => {
      const containerWidth = container.offsetWidth;
      // Reference size to measure the *base* (unhovered) weight/tracking
      measure.style.fontSize = "102px";
      const naturalWidth = measure.offsetWidth;
      if (naturalWidth === 0) return;
      setFontSize((containerWidth / naturalWidth) * 100);
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(container);
    return () => ro.disconnect();
  }, [text]);

  return (
    <motion.div
      ref={containerRef}
      className="w-full"
      initial={{ opacity: 0, y: 36, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      {/* Invisible measurer: same font settings as the base (light) state */}
      <span ref={measureRef} aria-hidden="true" className="invisible absolute whitespace-nowrap font-light">
        {text}
      </span>

      <KineticText
        text={text}
        as={as}
        className={cn("flex-nowrap whitespace-nowrap leading-none", className)}
        style={{
          ...style,
          fontSize: fontSize ? `${fontSize}px` : "0" // 0 avoids a flash-of-wrong-size before measuring
        }}
        {...rest}
      />
    </motion.div>
  );
}
