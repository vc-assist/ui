import { useEffect, useState } from "react"
import { Color } from "../color"

export function useImageToColor(image: string): string | undefined {
  const [color, setColor] = useState<string>()
  useEffect(() => {
    Color.fromImage(image)
      .then((c) => setColor(c))
  }, [image])
  return color
}

