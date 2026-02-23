import React from "react";

// lucide
import { DynamicIcon, type IconName } from "lucide-react/dynamic";

import {
  ArrowUpRight,
  CircleAlert,
  ChevronRight,
  ArrowRight,
  X,
  Check,
  CirclePlus,
  ChevronsRight,
  Biohazard,
  Bird,
  Copy,
  KeyRound,
  Plus,
  Hourglass,
  CircleCheck,
  ChevronLeft,
  ArrowUpDown,
  Repeat2,
  Globe,
  RotateCw,
  Power,
  Skull,
  Ellipsis,
  CircleArrowOutUpLeft,
  ArrowRightLeft,
  ReceiptText,
  ScanText,
  Route,
  History,
  ArrowUpNarrowWide,
  LogOut,
  Trash,
  MoveUpRight,
  Info,
  RadioTower,
  Settings2,
  CircleHelp,
  ChevronsUpDown,
  Search,
  ChevronDown,
  ScrollText,
  Settings,
  Shuffle,
  ChartPie,
  Star,
  Wallet
} from "lucide-react";

// custom icons
import { contrast, ethereum, github, linkedin, spotify, twitter } from "~/components/ui/custom-icons";

// types
import type { LucideProps } from "lucide-react";

// Static icon map
const staticIcons: Record<string, React.ComponentType<LucideProps>> = {
  // base lucide icons
  "arrow-up-right": ArrowUpRight,
  "circle-alert": CircleAlert,
  "chevron-right": ChevronRight,
  "arrow-right": ArrowRight,
  x: X,
  check: Check,
  "circle-plus": CirclePlus,
  "chevrons-right": ChevronsRight,
  biohazard: Biohazard,
  bird: Bird,
  copy: Copy,
  "key-round": KeyRound,
  plus: Plus,
  hourglass: Hourglass,
  "circle-check": CircleCheck,
  "chevron-left": ChevronLeft,
  "arrow-up-down": ArrowUpDown,
  "repeat-2": Repeat2,
  globe: Globe,
  "rotate-cw": RotateCw,
  power: Power,
  skull: Skull,
  ellipsis: Ellipsis,
  "circle-arrow-out-up-left": CircleArrowOutUpLeft,
  "arrow-right-left": ArrowRightLeft,
  "receipt-text": ReceiptText,
  "scan-text": ScanText,
  route: Route,
  history: History,
  "arrow-up-narrow-wide": ArrowUpNarrowWide,
  "log-out": LogOut,
  trash: Trash,
  "move-up-right": MoveUpRight,
  info: Info,
  "radio-tower": RadioTower,
  "settings-2": Settings2,
  "circle-help": CircleHelp,
  "chevrons-up-down": ChevronsUpDown,
  search: Search,
  shuffle: Shuffle,
  "chevron-down": ChevronDown,
  "scroll-text": ScrollText,
  settings: Settings,
  "chart-pie": ChartPie,
  star: Star,
  wallet: Wallet,

  // custom icons
  contrast: contrast,
  github: github,
  linkedin: linkedin,
  twitter: twitter,
  spotify: spotify,
  ethereum: ethereum
};

type CustomIconName = "contrast" | "github" | "linkedin" | "twitter" | "spotify" | "ethereum";
type GenericIconName = IconName | CustomIconName;

export const Icon = React.memo(({ name, ...props }: LucideProps & { name: GenericIconName }) => {
  const StaticIcon = name ? staticIcons[name] : undefined;

  if (StaticIcon) {
    return <StaticIcon {...props} />;
  }

  if (name === undefined) return null;

  return (
    <React.Suspense fallback={<LucideIconSuspense {...props} />}>
      <DynamicIcon name={name as IconName} {...props} />
    </React.Suspense>
  );
});

Icon.displayName = "Icon";

function LucideIconSuspense(props: LucideProps) {
  return (
    <span
      className="flex h-6 w-6 animate-pulse rounded-full bg-foreground/10 duration-500"
      style={{ width: props.size || props.width, height: props.size || props.height }}
    />
  );
}
