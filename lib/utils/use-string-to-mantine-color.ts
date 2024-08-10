import { useMantineTheme } from "@mantine/core"
import { useEffect, useState } from "react"
import { Color } from "../color"

export function useStringToMantineColor(text: string): string {
  const theme = useMantineTheme()
  const [color, setColor] = useState("gray")

  useEffect(() => {
    const colors: Record<string, string> = {}
    for (const k in theme.colors) {
      colors[k] = theme.colors[k][5]
    }
    Color.fromString(text, colors).then((value) => {
      if (!value) {
        return
      }
      setColor(value)
    })
  }, [text, theme.colors])

  return color
}
