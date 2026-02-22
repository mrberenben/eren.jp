"use client";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { useAppStore } from "~/store";
import type { Theme } from "~/store/types";

export function useThemeSync() {
  const { theme: nextTheme } = useTheme();
  const setStoreTheme = useAppStore((s) => s.setTheme);

  // next-themes → Zustand (one-way sync)
  useEffect(() => {
    if (nextTheme) {
      setStoreTheme(nextTheme as Theme);
    }
  }, [nextTheme, setStoreTheme]);
}
