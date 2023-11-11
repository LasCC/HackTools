import create from "zustand";
import { persist } from "zustand/middleware";
import Tabs, { IRouterComponent } from "./SideItemMenuRouting";

interface GlobalState {
  darkMode: boolean;
  setDarkModeState: (mode: boolean) => void;
  hackTools: string;
  setHackToolsState: (mode: string) => void;
  index: string;
  setIndex: (index: string) => void;
}

// @ts-ignore
export const useStore = create<GlobalState>(
  persist(
    (set, get) => ({
      darkMode: false,
      setDarkModeState: (mode: boolean) =>
        set(() => ({
          darkMode: mode,
        })),
      hackTools: "web",
      setHackToolsState: (mode: string) =>
        set(() => ({
          hackTools: mode,
        })),
      index: "1",
      setIndex: (index: string) =>
        set(() => ({
          index: index,
        })),
    }),
    {
      name: "GlobalState", // unique name
      getStorage: () => localStorage,
    }
  )
);
