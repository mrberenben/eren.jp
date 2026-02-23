"use client";

import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";
import { Icon } from "~/components/ui/icon";

export function Footer() {
  return (
    <footer className="w-full bg-background">
      <div className="mx-auto max-w-4xl px-6 py-5">
        <div className="flex flex-row items-center justify-between w-full">
          <p className="text-muted-foreground text-sm">&copy; {new Date().getFullYear()} eren.jp</p>

          <div className="flex flex-row items-center gap-x-2">
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
          </div>
        </div>
      </div>
    </footer>
  );
}
