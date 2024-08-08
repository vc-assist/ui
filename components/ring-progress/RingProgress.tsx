import {
  RingProgress as MantineRingProgress,
  type RingProgressProps,
} from "@mantine/core"

/**
 * A wrapper around mantine's RingProgress but with centering fixed and a default background color.
 */
export function RingProgress(props: RingProgressProps) {
  return (
    <MantineRingProgress
      {...props}
      rootColor="rgb(var(--colors-bg-dimmed))"
      styles={{
        curve: {
          transform: "none",
          cx: "50%",
          cy: "50%",
        },
      }}
    />
  )
}
