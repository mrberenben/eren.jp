"use client";

import Image from "next/image";
import Link from "next/link";

import { ThemeToggle } from "~/components/shared/theme-toggle";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

import Monogram from "~/assets/monogram.png";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/components", label: "Components" },
  { href: "/contact", label: "Contact" }
] as const;

export function Header() {
  return (
    <header className="fixed top-0 inset-x-0 w-full border-b bg-background/80 backdrop-blur-lg z-50">
      <nav className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
        <Link href="/" className="flex items-center gap-x-2 text-lg font-semibold tracking-tight fill-foreground">
          <Image src={Monogram} alt="eren.jp" className="size-8 rounded-full" />
          eren
        </Link>

        {/* <ul className="flex items-center gap-x-7">
          {navLinks.map(link => (
            <li key={link.href}>
              <Link href={link.href} className="text-muted-foreground hover:text-foreground text-sm transition-colors">
                {link.label}
              </Link>
            </li>
          ))}
        </ul> */}

        <div className="flex flex-row items-center gap-x-2">
          <ThemeToggle />

          <Link href="mailto:hello@eren.jp" className={cn(buttonVariants({ variant: "ghost" }), "shadow-raised px-4")}>
            Hire me
          </Link>
        </div>
      </nav>
    </header>
  );
}
