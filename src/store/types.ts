export type Theme = "light" | "dark" | "system";

export type PreferencesSlice = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export type BlogSlice = {
  blogSearchQuery: string;
  setBlogSearchQuery: (query: string) => void;
};

export type ComponentsSlice = {
  componentSearchQuery: string;
  setComponentSearchQuery: (query: string) => void;
};

export type AppStore = PreferencesSlice & BlogSlice & ComponentsSlice;
