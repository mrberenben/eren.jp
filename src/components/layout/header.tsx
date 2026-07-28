"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "motion/react";

import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

import Logo from "~/assets/e.svg";

export function Header() {
  return (
    <motion.header
      className="fixed top-0 inset-x-0 w-full z-50"
      initial={{ opacity: 0, y: -16, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-x-2 text-lg font-semibold tracking-tight fill-foreground">
          <Image src={Logo} alt="eren.jp" className="size-10" />
        </Link>

        <div className="flex flex-row items-center gap-x-6">
          <Link
            href="/eren-kuliş-cv.pdf"
            target="_blank"
            rel="noreferrer noopenner"
            className="text-sm font-bold uppercase text-foreground hover:text-muted-foreground transition-colors"
          >
            Download CV
          </Link>

          <Link
            href="mailto:hello@eren.jp"
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "font-semibold rounded-full px-4 uppercase leading-none"
            )}
          >
            Hire me
          </Link>
        </div>
      </nav>
    </motion.header>
  );
}
