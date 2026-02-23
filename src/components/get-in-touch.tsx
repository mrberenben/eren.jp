"use client";

import Link from "next/link";
import { FullScreenDivider } from "~/components/shared/full-screen-divider";
import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";

export function GetInTouch() {
  return (
    <div className="relative mx-auto flex w-full max-w-4xl flex-col justify-between border-x">
      <FullScreenDivider className="-top-px" />
      <div className="flex flex-col border-b px-2 py-8 gap-y-1">
        <h2 className="text-center font-semibold text-lg md:text-2xl bg-linear-to-b from-foreground to-muted-foreground bg-clip-text text-transparent">
          Ready to build something extraordinary?
        </h2>
        <p className="text-balance text-center text-muted-foreground text-sm md:text-base">Let&apos;s get in touch.</p>
      </div>
      <div className="flex items-center justify-center gap-2 p-4 bg-secondary/10">
        <Link
          href="mailto:hello@eren.jp"
          className={cn(buttonVariants({ size: "lg", variant: "shadow" }), "w-48 h-12 text-base")}
        >
          Hire me
        </Link>
      </div>
      <FullScreenDivider className="-bottom-px" />
    </div>
  );
}
