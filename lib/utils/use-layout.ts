import { useMediaQuery } from "@mantine/hooks"

export type MacroLayouts = "mobile" | "desktop"

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
