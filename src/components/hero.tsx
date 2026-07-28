// "use client";

// import Image from "next/image";

// import { AnimatePresence, motion } from "motion/react";

// export default function Hero() {
//   const reveal = {
//     initial: {
//       opacity: 0,
//       scaleX: 0,
//       filter: "blur(6px)"
//     },
//     animate: {
//       opacity: 1,
//       scaleX: "100%",
//       filter: "blur(0px)"
//     },
//     transition: {
//       duration: 0.5,
//       delay: 1
//     }
//   };

//   const Bebek = `${process.env.NEXT_PUBLIC_SUPABASE_CDN}/0.jpeg`;

//   return (
//     <div className="relative flex h-dvh w-full items-center justify-center overflow-hidden">
//       <div className="relative flex flex-1 flex-col size-full items-center justify-center gap-y-4 sm:gap-y-6 px-4 sm:px-6 text-center font-serif">
//         {/* background image */}
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-auto max-w-xl aspect-3/4 max-h-[65dvh] sm:max-h-[80dvh] lg:max-h-none z-2 overflow-hidden">
//           <AnimatePresence initial>
//             <motion.span
//               initial={{ opacity: 1, left: 0, filter: "blur(0px)" }}
//               animate={{ opacity: 1, left: "-100%", filter: "blur(6px)" }}
//               transition={{ duration: 1.05, delay: 0.25, ease: [0.77, 0, 0.175, 1] }}
//               className="absolute w-1/2 h-[105%] left-0 -top-[2.5%] bg-background origin-right will-change-transform z-10"
//             />

//             <motion.span
//               initial={{ opacity: 1, right: 0, filter: "blur(0px)" }}
//               animate={{ opacity: 1, right: "-100%", filter: "blur(6px)" }}
//               transition={{ duration: 1.05, delay: 0.25, ease: [0.77, 0, 0.175, 1] }}
//               className="absolute w-1/2 h-[105%] right-0 -top-[2.5%] bg-background origin-right will-change-transform z-10"
//             />
//           </AnimatePresence>

//           <Image src={Bebek} alt="eren.jp" fill className="object-contain grayscale" />

//           {/* white */}
//           <div className="hidden lg:block absolute top-[9%] -left-[20%] z-2">
//             <motion.span
//               className="origin-left text-[max(3rem,13vw)] font-serif font-bold tracking-tight text-muted opacity-95"
//               {...reveal}
//             >
//               Eren
//             </motion.span>
//           </div>

//           <div className="hidden lg:block absolute bottom-[8.51%] -right-[20%] z-2">
//             <motion.span
//               className="origin-left text-[max(3rem,13vw)] font-serif font-bold tracking-tight text-muted opacity-95"
//               {...reveal}
//               transition={{ ...reveal.transition, delay: 1.25 }}
//             >
//               Kuliş
//             </motion.span>
//           </div>
//         </div>

//         {/* title */}
//         <div className="hidden lg:block relative w-full h-full max-w-7xl z-1">
//           {/* black */}
//           <div>
//             <div className="absolute top-[15%] left-[7%]">
//               <motion.span
//                 className="origin-left text-[max(3rem,13vw)] font-serif font-bold tracking-tight text-black"
//                 {...reveal}
//               >
//                 Eren
//               </motion.span>
//             </div>

//             <div className="absolute bottom-[15%] right-[7%]">
//               <motion.span
//                 className="origin-left text-[max(3rem,13vw)] font-serif font-bold tracking-tight text-black"
//                 {...reveal}
//                 transition={{ ...reveal.transition, delay: 1.25 }}
//               >
//                 Kuliş
//               </motion.span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";

// import Image from "next/image";

// import { AnimatePresence, motion } from "motion/react";
// import Link from "next/link";

// export default function Hero() {
//   const reveal = {
//     initial: {
//       opacity: 0,
//       scaleX: 0,
//       filter: "blur(6px)"
//     },
//     animate: {
//       opacity: 1,
//       scaleX: "100%",
//       filter: "blur(0px)"
//     },
//     transition: {
//       duration: 0.5,
//       delay: 1
//     }
//   };

//   const Bebek = `${process.env.NEXT_PUBLIC_SUPABASE_CDN}/0.jpeg`;

//   return (
//     <div className="relative flex h-dvh w-full items-center justify-center overflow-hidden">
//       <div className="relative flex flex-1 flex-row w-full h-[calc(100dvh-40px)] max-w-400 items-center justify-between px-6 py-10 text-center">
//         {/* background image */}
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/2 w-full h-auto max-w-xl aspect-3/4 max-h-[65dvh] sm:max-h-[80dvh] lg:max-h-none z-0 overflow-hidden">
//           <div className="relative flex flex-1 h-auto max-w-xl aspect-3/4 max-h-[65dvh] sm:max-h-[80dvh] lg:max-h-[85dvh] z-2 overflow-hidden">
//             <Image src={Bebek} alt="eren.jp" fill className="object-contain grayscale" />
//           </div>
//         </div>

//         {/* title & description */}
//         <div className="relative flex flex-col items-start flex-1 w-full h-full gap-y-12 z-1">
//           <div className="flex flex-col text-start font-serif gap-y-3 pt-8">
//             <motion.span
//               className="origin-left text-[max(3rem,13vw)] font-serif font-bold tracking-tight text-black leading-none"
//               {...reveal}
//             >
//               Eren
//             </motion.span>

//             <motion.span
//               className="origin-left text-[max(3rem,13vw)] font-serif font-bold tracking-tight text-black leading-none"
//               {...reveal}
//               transition={{ ...reveal.transition, delay: 1.25 }}
//             >
//               Kuliş
//             </motion.span>
//           </div>

//           <p className="text-black text-sm text-start max-w-lg mt-auto pr-3">
//             Hello and welcome to my digital portfolio. I&apos;m a passionate full-stack web developer dedicated to
//             building engaging web experiences. Explore my projects to see my capabilities. If you&apos;re interested in
//             collaborating, or have any questions, feel free to{" "}
//             <Link
//               href="mailto:hello@eren.jp"
//               className="font-semibold underline hover:text-muted-foreground transition-colors"
//             >
//               reach out here
//             </Link>
//             .
//           </p>
//         </div>

//         {/* background image */}
//         {/* <div className="relative flex flex-1 h-auto max-w-xl aspect-3/4 max-h-[65dvh] sm:max-h-[80dvh] lg:max-h-[85dvh] z-2 overflow-hidden">
//           <Image src={Bebek} alt="eren.jp" fill className="object-contain grayscale" />
//         </div> */}
//       </div>
//     </div>
//   );
// }

"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ChromaticTextReveal } from "~/components/motion/chromatic-text-reveal";

export default function Hero() {
  const reveal_text = {
    initial: { opacity: 0, y: 24, filter: "blur(6px)" },
    animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    transition: { duration: 0.4, delay: 1 }
  };

  const reveal_image = {
    initial: { opacity: 1, scale: 0.975, clipPath: "inset(0 0 100% 0)" },
    animate: { opacity: 1, scale: 1, clipPath: "inset(0 0 0% 0)" },
    transition: { duration: 1, ease: [0.77, 0, 0.175, 1] }
  };

  const Bebek = `${process.env.NEXT_PUBLIC_SUPABASE_CDN}/0.jpeg`;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 60, damping: 20, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20, mass: 0.5 });

  const parallaxX = useTransform(springX, [-1, 1], [-15, 15]);
  const parallaxY = useTransform(springY, [-1, 1], [-10, 10]);

  React.useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;

      mouseX.set(x);
      mouseY.set(y);
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="relative flex h-dvh w-full items-center justify-center overflow-hidden">
      <div className="relative flex flex-1 flex-row w-full h-[calc(100dvh-40px)] max-w-400 items-center justify-between px-6 py-10 text-center">
        {/* isolated blend */}
        <div className="absolute inset-0 isolate bg-white">
          {/* background image */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 lg:-translate-x-1/3 -translate-y-1/2 w-full h-auto max-w-xl aspect-3/4 max-h-[65dvh] sm:max-h-[80dvh] lg:max-h-none overflow-hidden">
            <motion.div style={{ x: parallaxX, y: parallaxY }}>
              {/* @ts-expect-error - ease typing issue */}
              <motion.div
                className="relative flex flex-1 h-auto max-w-xl aspect-3/4 max-h-[65dvh] sm:max-h-[80dvh] lg:max-h-[85dvh] overflow-hidden"
                {...reveal_image}
              >
                <Image src={Bebek} alt="eren.jp" fill className="object-contain grayscale md:grayscale-0" />
              </motion.div>
            </motion.div>
          </div>

          {/* title */}
          <div className="relative flex flex-col items-start w-full h-full gap-y-12 select-none">
            <div className="flex flex-col text-start font-serif gap-y-3 pt-8">
              <motion.span
                className="hidden md:block absolute top-36 left-16 lg:left-48 mix-blend-difference text-[max(128px,13.8vw)] font-serif font-bold tracking-tight text-white leading-none"
                {...reveal_text}
              >
                Eren
              </motion.span>

              <motion.span
                className="hidden md:block absolute right-16 lg:right-24 bottom-48 mix-blend-difference text-[max(128px,13.8vw)] font-serif font-bold tracking-tight text-white leading-none"
                {...reveal_text}
                transition={{ ...reveal_text.transition, delay: 1.25 }}
              >
                Kuliş
              </motion.span>
            </div>
          </div>
        </div>

        <div className="md:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex flex-col text-center gap-y-3 pt-8">
            <motion.span
              className="text-[172px] font-serif font-bold tracking-tight text-white leading-none"
              {...reveal_text}
            >
              Eren
            </motion.span>

            <motion.span
              className="text-[172px] font-serif font-bold tracking-tight text-white leading-none"
              {...reveal_text}
              transition={{ ...reveal_text.transition, delay: 1.25 }}
            >
              Kuliş
            </motion.span>
          </div>
        </div>

        {/* description */}
        <div className="relative pb-3 flex flex-col items-start flex-1 w-full h-full justify-end z-10 pointer-events-none">
          <ChromaticTextReveal delay={0.8} className="text-sm text-start max-w-lg pr-3 pointer-events-auto">
            Welcome to my digital portfolio. I&apos;m a frontend developer dedicated to building innovative web and
            mobile applications. Scroll to know me better. If you&apos;re interested in collaborating, feel free to{" "}
            <Link
              href="mailto:hello@eren.jp"
              className="font-semibold underline hover:text-muted-foreground transition-colors"
            >
              reach out here
            </Link>
            .
          </ChromaticTextReveal>
        </div>
      </div>
    </div>
  );
}
