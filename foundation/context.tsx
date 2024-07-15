import { createContext, useContext } from "react"

/**
 * A thing that makes providing a global value easy.
 */
export function context<T>(defaultValue?: T) {
  const ctx = createContext<T | undefined>(defaultValue)

  function useValue(): T {
    const value = useContext(ctx)
    if (!value) {
      throw new Error("Provider has not been initialized.")
    }
    return value
  }

  function Provider(props: {
    children: React.ReactNode
    value: T
  }) {
    return <ctx.Provider value={props.value}>{props.children}</ctx.Provider>
  }

  return [Provider, useValue] as const
}
