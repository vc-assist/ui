import {
  ColorSwatch,
  type DefaultMantineColor,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core"
import { useElementSize } from "@mantine/hooks"
import { twMerge } from "tailwind-merge"
import { RingProgress } from "./RingProgress"

function AnimatedUnderline(props: {
  children: React.ReactNode
  classNames?: Partial<{
    container?: string
    text?: string
  }>
  hide?: boolean
}) {
  return (
    <div className={props.classNames?.container}>
      <span
        className={twMerge(
          props.classNames?.text,
          "animated-underline",
          !props.hide ? "animated-underline-active" : undefined,
        )}
      >
        {props.children}
      </span>
    </div>
  )
}

export type RingSection = {
  value: number
  color: DefaultMantineColor
  label: () => React.ReactNode
  id: string
}

/**
 * All number values should be a value from 0-100.
 */
export function RingProgressPicker(props: {
  className?: string
  sections: RingSection[]
  value?: RingSection
  onChoose?: (segment: RingSection) => void
  disabled?: boolean
  formatters?: Partial<{
    tooltip: (segment: RingSection) => string
    progressLabel: (total: number) => string
  }>
}) {
  const disabled = props.disabled ?? false
  const { ref, width } = useElementSize()
  const { colors } = useMantineTheme()

  const expanded = width > 300
  let sum = 0
  for (const s of props.sections) {
    sum += s.value
  }

  return (
    <div
      className={twMerge(props.className, "flex gap-3 items-center")}
      ref={ref}
    >
      <RingProgress
        size={expanded ? 120 : 100}
        thickness={12}
        rootColor="transparent"
        style={{
          "--bg-dimmed": "transparent",
        }}
        sections={props.sections.map((s) => ({
          color: s.color,
          value: s.value,
          onClick: () => {
            if (disabled) {
              return
            }
            props.onChoose?.(s)
          },
          tooltip: props.formatters?.tooltip?.(s) ?? `${s.value.toFixed(1)}%`,
          className: twMerge(
            "transition-all duration-500 origin-center",
            props.value?.id === s.id ? "scale-110" : "",
          ),
        }))}
        classNames={{ label: "font-bold text-center" }}
        label={
          props.formatters?.progressLabel
            ? props.formatters?.progressLabel(sum)
            : sum === 100
              ? `${sum.toFixed(0)}%`
              : `${sum.toFixed(1)}%`
        }
      />
      <div className="flex flex-col gap-2">
        {props.sections.map((s) => {
          return (
            <UnstyledButton
              className="rounded-md flex gap-2 items-center transition-all disabled:cursor-default"
              disabled={
                !disabled ? props.onChoose && props.value?.id === s.id : true
              }
              onClick={() => {
                if (disabled) {
                  return
                }
                props.onChoose?.(s)
              }}
              key={s.id}
            >
              <ColorSwatch
                className="min-w-[1rem] min-h-[1rem] max-w-[1rem] max-h-[1rem]"
                color={colors[s.color][6]}
              />
              <AnimatedUnderline
                classNames={{ text: "text-sm flex-1" }}
                hide={props.value?.id !== s.id}
              >
                <s.label />
              </AnimatedUnderline>
            </UnstyledButton>
          )
        })}
      </div>
    </div>
  )
}
