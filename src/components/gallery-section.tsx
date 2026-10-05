"use client";

import { useEffect, useRef } from "react";
import { useLenis } from "lenis/react";

import CircularGallery, { type CircularGalleryHandle } from "~/components/motion/circular-gallery";
import { useMediaQuery } from "~/hooks/use-media-query";

export default function GallerySection(props: { galleryItems: { image: string; text: string }[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<CircularGalleryHandle>(null);
  const lenis = useLenis();

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const lockedRef = useRef(false);
  const completedRef = useRef(false);
  const baselineRef = useRef(0);
  const rafRef = useRef<number>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !lenis) return;
    if (!isDesktop) return;

    const preventDefault = (e: Event) => e.preventDefault();

    const unlock = () => {
      lockedRef.current = false;
      completedRef.current = true;
      window.removeEventListener("wheel", preventDefault);
      window.removeEventListener("touchmove", preventDefault);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lenis.start();
    };

    const lock = () => {
      if (lockedRef.current || completedRef.current) return;
      lockedRef.current = true;
      lenis.stop();

      const state = galleryRef.current?.getScrollState();
      baselineRef.current = state?.current ?? 0;

      window.addEventListener("wheel", preventDefault, { passive: false });
      window.addEventListener("touchmove", preventDefault, { passive: false });

      const check = () => {
        if (!lockedRef.current) return;
        const s = galleryRef.current?.getScrollState();
        if (s && s.loopWidth > 0) {
          const travelled = Math.abs(s.current - baselineRef.current);
          if (travelled >= s.loopWidth) {
            unlock();
            return;
          }
        }
        rafRef.current = requestAnimationFrame(check);
      };
      rafRef.current = requestAnimationFrame(check);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio > 0.98) {
          lock();
        } else {
          completedRef.current = false;
        }
      },
      { threshold: [0, 0.98, 1] }
    );
    observer.observe(section);

    return () => {
      observer.disconnect();
      if (lockedRef.current) unlock();
    };
  }, [lenis, isDesktop]);

  return (
    <section ref={sectionRef} className="h-screen w-full">
      <CircularGallery
        ref={galleryRef}
        items={props.galleryItems}
        bend={isDesktop ? 2 : 0}
        textColor="#ffffff"
        borderRadius={0}
        scrollEase={0.02}
        scrollSpeed={4.8}
      />
    </section>
  );
}
