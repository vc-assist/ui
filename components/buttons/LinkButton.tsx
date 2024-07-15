import { useComputedColorScheme } from "@mantine/core"
import { forwardRef } from "react"
import { twMerge } from "tailwind-merge"

/**
 * Do not get this confused with Link. This is just
 * a normal button that's styled to look like a link.
 *
 * It is semantically a button.
 */
export const LinkButton = forwardRef<
  HTMLButtonElement,
  {
    className?: string
    children: React.ReactNode
    onClick?: React.MouseEventHandler
  }
>(function LinkButton(props, ref) {
  const colorScheme = useComputedColorScheme()
  return (
    <button
      ref={ref}
      type="button"
      className={twMerge(
        "no-underline hover:underline",
        colorScheme === "dark" ? "text-blue-400" : "text-blue-600",
        props.className,
      )}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
})
