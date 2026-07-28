"use client";

import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import { Icon } from "~/components/ui/icon";

const SOCIALS = [
  { title: "Email", href: "mailto:hello@eren.jp" },
  { title: "Instagram", href: "https://instagram.com/mrberenben" },
  { title: "Linkedin", href: "https://linkedin.com/in/mrberenben" },
  { title: "Github", href: "https://github.com/mrberenben" },
  { title: "X (Twitter)", href: "https://x.com/mrberenben" },
  { title: "Spotify", href: "https://open.spotify.com/user/7bf0ddiirfhsuseuhduvfbkoj?si=3e216a2e86b24176" }
];

export function Footer() {
  return (
    <footer className="relative w-full bg-muted pt-36 mt-20 h-dvh overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-y-4">
          <strong className="text-[max(4rem,6.9vw)] font-serif">Let&apos;s Build!</strong>
          <small className="text-sm text-muted-foreground">
            Do you want to bring the idea you&apos;ve been dreaming of to life? Reach me out!
          </small>
        </div>

        <div className="flex flex-col gap-y-3 py-16 text-sm">
          <span className="font-semibold">Reach Out</span>

          <div className="flex flex-col">
            {SOCIALS.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                target="_blank"
                rel="norefereer noopenner"
                className="py-1 hover:text-muted-foreground transition-colors"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-row items-center justify-between w-full">
          <p className="text-muted-foreground text-sm">&copy; {new Date().getFullYear()} eren.jp</p>

          {/* <div className="flex flex-row items-center gap-x-2">
            <Link
              href="https://x.com/mrberenben"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "ghost", size: "icon" })}
            >
              <Icon name="twitter" className="size-4" />
            </Link>

            <Link
              href="https://open.spotify.com/user/7bf0ddiirfhsuseuhduvfbkoj?si=3e216a2e86b24176"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "ghost", size: "icon" })}
            >
              <Icon name="spotify" className="size-4" />
            </Link>

            <Link
              href="https://github.com/mrberenben"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "ghost", size: "icon" })}
            >
              <Icon name="github" className="size-4" />
            </Link>

            <Link
              href="https://linkedin.com/in/mrberenben"
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "ghost", size: "icon" })}
            >
              <Icon name="linkedin" className="size-4" />
            </Link>
          </div> */}
        </div>
      </div>

      <div className="absolute flex justify-center -bottom-1/4 left-1/2 -translate-x-1/2 w-full h-120 opacity-5">
        <strong className="text-[18vw] font-serif">eren kuliş</strong>
      </div>
    </footer>
  );
}
