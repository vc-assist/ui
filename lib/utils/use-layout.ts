import { useMediaQuery } from "@mantine/hooks"
import { z } from "zod"

export const macroLayouts = z.enum(["desktop", "mobile"])

export type MacroLayouts = z.TypeOf<typeof macroLayouts>

/**
 * Uses a media query to keep track of layout changes, accepts an
 * initial value.
 *
 * @param layout The initial layout value. (optional)
 */
export function useLayout(): MacroLayouts {
  const mobile = useMediaQuery(
    "screen and (max-width: 800px)",
    window.innerWidth < 800,
  )
  return mobile ? "mobile" : "desktop"
}
