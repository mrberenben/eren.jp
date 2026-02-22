"use client";

import Link from "next/link";
import React, { useRef, useState } from "react";

import { AnimatePresence, motion } from "motion/react";

import { cn } from "~/lib/utils";
import { Icon } from "~/components/ui/icon";

interface InlineLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  previewEnabled?: boolean;
  href: string;
  children: React.ReactNode;
}

interface InlineLinkIconProps {
  className?: string;
  children: React.ReactNode;
}

function LinkPreview({ href, show }: { href: string; show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98, filter: "blur(6px)", y: 6 }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
          exit={{ opacity: 0, scale: 0.98, filter: "blur(6px)", y: 6 }}
          transition={{ duration: 0.15 }}
          className={cn(
            "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50",
            "w-80 h-48 rounded-lg border border-border bg-muted shadow-xl overflow-hidden"
          )}
        >
          <iframe
            src={href}
            className="size-full pointer-events-none"
            title={`Preview of ${href}`}
            sandbox="allow-scripts allow-same-origin"
            loading="lazy"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export const InlineLink: React.FC<InlineLinkProps> & { Icon: React.FC<InlineLinkIconProps> } = (({
  href,
  className,
  children,
  previewEnabled = true,
  ...props
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  function handleMouseEnter() {
    timeoutRef.current = setTimeout(() => setShowPreview(true), 300);
  }

  function handleMouseLeave() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setShowPreview(false);
  }

  return (
    <span className="relative inline-flex items-center" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Link
        href={href}
        className={cn(
          "pr-1 text-foreground hover:text-foreground/80 transition-colors hover:underline underline-offset-2 decoration-dashed",
          className
        )}
        {...props}
      >
        {children}
      </Link>

      {previewEnabled && <LinkPreview href={href} show={showPreview} />}
    </span>
  );
}) as React.FC<InlineLinkProps> & { Icon: React.FC<InlineLinkIconProps> };

export function InlineLinkIcon({ className, children, ...props }: InlineLinkIconProps) {
  return (
    <span className={cn("inline-flex align-middle pr-1 size-6", className)} {...props}>
      {children}
    </span>
  );
}
