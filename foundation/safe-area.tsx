import { create } from "zustand";

export type SafeAreaInsets = {
  top: number
  left: number
  bottom: number
  right: number
}

export type SafeAreaContext = {
  insets: SafeAreaInsets
  setInsets(insets: SafeAreaInsets): void
}

export const useSafeArea = create<SafeAreaContext>((set) => ({
  insets: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  setInsets(insets) {
    set({ insets })
  }
}))
