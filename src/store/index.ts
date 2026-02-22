import { create } from "zustand";
import type { AppStore } from "./types";
import {
  createPreferencesSlice,
  createBlogSlice,
  createComponentsSlice,
} from "./slices";

export const useAppStore = create<AppStore>()((...args) => ({
  ...createPreferencesSlice(...args),
  ...createBlogSlice(...args),
  ...createComponentsSlice(...args),
}));
