import {
  ColorSwatch,
  type DefaultMantineColor,
  useMantineTheme,
} from "@mantine/core"
import { twMerge } from "tailwind-merge"

export function ColorKey<T extends boolean = false>(props: {
  classNames?: Partial<{ root: string; label: string }>
  mantine?: T
  color: T extends true ? DefaultMantineColor : string
  label: string
  size?: number
}) {
  const { colors } = useMantineTheme()
  return (
    <div className={twMerge("flex gap-2 items-center", props.classNames?.root)}>
      <ColorSwatch
        size={props.size ?? 16}
        color={props.mantine ? colors[props.color][6] : props.color}
      />
      <span className={props.classNames?.label}>{props.label}</span>
    </div>
  )
}
