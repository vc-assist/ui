import chroma from "chroma-js"
import ColorThief from "color-thief-ts"
import sha1 from "sha1"

export namespace Color {
  export const CUSTOM = {
    blue: "#242463",
    lightBlue: "#A5CEF2",
    purple: "#FFB703",
    red: "#ec4234",
    lightRed: "#e5736e",
    orange: "#fb923c",
    gray: "#6F6F6F",
    lightGray: "#e9e7ec",
    lightGreen: "#53b486",
  }

  export const DAY_COLORS_LIST = [
    CUSTOM.red,
    CUSTOM.blue,
    CUSTOM.lightGreen,
    CUSTOM.orange,
    CUSTOM.purple,
  ]

  /**
   * Generates a color given a string, the same string will always return
   * the same color. This is done by taking the first 3 bytes of a SHA-1 hash.
   *
   * @param text An arbitrary string.
   * @param colors If colors is provided, the function will pick the color closest to the generated color. (optional)
   */
  export async function fromString<
    Colors extends Record<string, string> = never,
  >(text: string, colors?: Colors) {
    const hashed = sha1(text, { asBytes: true })
    const buffer = hashed.slice(0, 3)
    const color = chroma.rgb(buffer[0], buffer[1], buffer[2])
    if (!colors) {
      return color.hex("rgb")
    }

    let minDistance = Number.POSITIVE_INFINITY
    let closest: string | undefined
    for (const k in colors) {
      const distance = chroma.distance(chroma(colors[k]), color)
      if (distance < minDistance) {
        minDistance = distance
        closest = k
      }
    }
    return closest
  }

  /**
   * Generates a color for a grade from 0-100.
   */
  export function fromGrade(grade: number): string {
    if (grade >= 85) {
      return CUSTOM.lightGreen
    }
    if (grade >= 75) {
      return CUSTOM.orange
    }
    return CUSTOM.red
  }

  const colorThief = new ColorThief()

  /**
   * Returns the most prominent color of a given image.
   *
   * @param image A url to an image.
   */
  export async function fromImage(image: string): Promise<string | undefined> {
    const _color = await colorThief.getColorAsync(image)
    if (typeof _color !== "string") {
      return
    }
    return _color
  }
}
