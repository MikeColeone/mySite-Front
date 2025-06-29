// src/store/app.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AppState {
  isCollapse: boolean;
  device: string;
  size: string;

  // actions
  toggle: () => void;
  changeCollapse: (isCollapse: boolean) => void;
  toggleDevice: (device: string) => void;
  setSize: (size: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isCollapse: false,
      device: "desktop",
      size: "default",

      toggle: () =>
        set((state) => ({
          isCollapse: !state.isCollapse,
        })),

      changeCollapse: (isCollapse) => set({ isCollapse }),

      toggleDevice: (device) => set({ device }),

      setSize: (size) => set({ size }),
    }),
    {
      name: "app-store", // localStorage key
    }
  )
);
