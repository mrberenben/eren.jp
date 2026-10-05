"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  texts: string[];
}

const clamp = (v: number, min = 0, max = 1) => Math.max(min, Math.min(max, v));

const mix = (a: number, b: number, t: number) => a + (b - a) * t;

const ease = (t: number) => gsap.parseEase("power3.inOut")(t);

export default function MorphingText({ texts }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const blurRef = useRef<SVGFEGaussianBlurElement>(null);

  useLayoutEffect(() => {
    if (!container.current) return;

    const words = Array.from(container.current.querySelectorAll<HTMLElement>(".word"));

    const setters = words.map(el => ({
      opacity: gsap.quickSetter(el, "opacity"),
      y: gsap.quickSetter(el, "y", "px"),
      scale: gsap.quickSetter(el, "scale"),
      letterSpacing: gsap.quickSetter(el, "letterSpacing", "em")
    }));

    const state = {
      progress: 0
    };

    const render = () => {
      const index = Math.floor(state.progress);

      const t = clamp(state.progress - index);

      const p = ease(t);

      const blur = Math.sin(Math.PI * p) * 14;

      if (blurRef.current) {
        blurRef.current.setAttribute("stdDeviation", blur.toFixed(2));
      }

      words.forEach((el, i) => {
        if (i !== index && i !== index + 1) {
          el.style.opacity = "0";
          return;
        }

        let opacity = 0;
        let scale = 1;
        let y = 0;
        let spacing = 0;

        if (i === index) {
          opacity = 1 - p;
          scale = mix(1, 1.08, p);
          y = mix(0, -20, p);
          spacing = mix(0, 0.04, p);
        }

        if (i === index + 1) {
          opacity = p;
          scale = mix(0.95, 1, p);
          y = mix(20, 0, p);
          spacing = mix(0.04, 0, p);
        }

        setters[i].opacity(opacity);
        setters[i].y(y);
        setters[i].scale(scale);
        setters[i].letterSpacing(spacing);
      });
    };

    render();

    const tween = gsap.to(state, {
      progress: texts.length - 1,
      ease: "none",

      scrollTrigger: {
        trigger: container.current,
        pin: true,
        scrub: true,
        start: "top top",
        end: `+=${texts.length * 700}`
      },

      onUpdate: render
    });

    return () => {
      tween.kill();
      ScrollTrigger.killAll();
    };
  }, [texts]);

  return (
    <>
      <svg className="absolute h-0 w-0">
        <filter id="goo">
          <feGaussianBlur ref={blurRef} stdDeviation="0" in="SourceGraphic" result="blur" />

          <feColorMatrix
            in="blur"
            mode="matrix"
            values="
            1 0 0 0 0
            0 1 0 0 0
            0 0 1 0 0
            0 0 0 28 -10
          "
            result="goo"
          />

          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </svg>

      <div
        ref={container}
        className="
        grid
        h-screen
        place-items-center
      "
      >
        <div
          className="
          relative
          h-44
          w-[min(900px,90vw)]
          [perspective:1200px]
        "
          style={{
            filter: "url(#goo)"
          }}
        >
          {texts.map(text => (
            <h1
              key={text}
              className="
              word
              absolute
  inset-0
  grid
  place-items-center
  font-bold
  leading-none
  text-center
  text-[clamp(3rem,8vw,7rem)]
  will-change-[transform,opacity,letter-spacing]
  transform-gpu
  select-none
            "
            >
              {text}
            </h1>
          ))}
        </div>
      </div>
    </>
  );
}
