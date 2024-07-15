import { effect, signal } from "@preact/signals-react"

function serializeAny(value: unknown): string {
  switch (typeof value) {
    case "bigint":
      return `b${value.toString()}`
    case "boolean":
      return value ? "+" : "!"
    case "function":
      return value.toString()
    case "number":
      return value.toString()
    case "object":
      return JSON.stringify(value)
    case "string":
      return `"${value}"`
    case "symbol":
      return `s${value.description}`
    case "undefined":
      return "undefined"
  }
}

function parseAny(value: string): unknown {
  const charCode = value.charCodeAt(0)
  const char = value[0]

  if (charCode >= 48 && charCode < 58) {
    // if it is a number 0-9
    return Number(value)
  }

  switch (char) {
    case '"':
      return value.slice(1, value.length - 1)
    case "+":
      return true
    case "!":
      return false
    case "{":
    case "[":
      return JSON.parse(value)
    case "b":
      return BigInt(value.slice(1))
    case "f":
      return Function(value)
    case "s":
      return Symbol(value.slice(1))
    case "u":
      return undefined
  }

  throw new Error("Encountered unknown serialized value.", { cause: value })
}

/**
 * Creates a signal that will save and load to localStorage.
 */
export function persistentSignal<T extends Zod.ZodTypeAny>({
  key,
  schema,
  defaultValue,
}: {
  key: string
  schema: T
  defaultValue: Zod.TypeOf<T>
}) {
  let stored: Zod.TypeOf<T> | undefined
  const storedData = localStorage.getItem(key)
  if (storedData) {
    const result = schema.safeParse(parseAny(storedData))
    if (result.success) {
      stored = result.data
    }
  }
  const theme = signal<Zod.TypeOf<T>>(stored ?? defaultValue)
  effect(() => {
    localStorage.setItem(key, serializeAny(theme.value))
  })
  return theme
}
