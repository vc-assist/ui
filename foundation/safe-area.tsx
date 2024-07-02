import { context } from "./context";

export type SafeArea = {
  top: number
  left: number
  right: number
  bottom: number
}

export const [SafeAreaProvider, useSafeArea] = context<SafeArea>()

