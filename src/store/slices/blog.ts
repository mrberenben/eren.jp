import type { StateCreator } from "zustand";
import type { AppStore, BlogSlice } from "~/store/types";

export const createBlogSlice: StateCreator<AppStore, [], [], BlogSlice> = (
  set,
) => ({
  blogSearchQuery: "",
  setBlogSearchQuery: (query) => set({ blogSearchQuery: query }),
});
