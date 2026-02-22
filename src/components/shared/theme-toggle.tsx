"use client";

import { useTheme } from "next-themes";
import { Button } from "~/components/ui/button";
import { Icon } from "~/components/ui/icon";

export function ThemeToggle() {
  const { systemTheme, setTheme } = useTheme();

  function toggleTheme() {
    setTheme(prev => {
      if (prev === "system") {
        if (systemTheme === "light") return "dark";
        if (systemTheme === "dark") return "light";
        return "system";
      }

      if (prev === "light") return "dark";
      return "light";
    });
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      <Icon name="contrast" className="size-4.5" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
