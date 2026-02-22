import type { StateCreator } from "zustand";
import type { AppStore, PreferencesSlice } from "~/store/types";

export const createPreferencesSlice: StateCreator<
  AppStore,
  [],
  [],
  PreferencesSlice
> = (set) => ({
  theme: "system",
  setTheme: (theme) => set({ theme }),
});
