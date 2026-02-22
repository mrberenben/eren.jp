import type { StateCreator } from "zustand";
import type { AppStore, ComponentsSlice } from "~/store/types";

export const createComponentsSlice: StateCreator<
  AppStore,
  [],
  [],
  ComponentsSlice
> = (set) => ({
  componentSearchQuery: "",
  setComponentSearchQuery: (query) => set({ componentSearchQuery: query }),
});
