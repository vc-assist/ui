import {
  type DefaultMantineColor,
  Text,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core"
import { useMemo } from "react"
import {
  MdClose,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdTipsAndUpdates,
} from "react-icons/md"
import { twMerge } from "tailwind-merge"
import { Panel } from "./Panel"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export enum AlertVariant {
  STATIC = 0,
  DISMISSIBLE = 1,
  EXPANDABLE = 2,
}

export function AlertPanel(props: {
  classNames?: Partial<{
    root: string
    inner: string
  }>
  id: string
  icon?: React.ReactNode
  title?: string
  color?: DefaultMantineColor
  children?: React.ReactNode
  variant?: AlertVariant
}) {
  const variant = props.variant ?? AlertVariant.STATIC

  const closed = useMemo(
    () => create<{ isClosed: boolean, setClosed(value: boolean): void }>()(persist(
      (set) => ({
        isClosed: false,
        setClosed(value) {
          set({ isClosed: value })
        }
      }),
      { name: `alert-panel.${props.id}` }
    ))((value) => value),
    [props.id],
  )
  const color = props.color ?? "violet"

  if (closed.isClosed && variant === AlertVariant.DISMISSIBLE) {
    return null
  }

  return (
    <Panel className={twMerge(props.classNames?.root, "flex gap-2")}>
      <div>
        <ThemeIcon color={color} variant="light">
          {props.icon ?? <MdTipsAndUpdates size="1rem" />}
        </ThemeIcon>
      </div>
      <div
        className={twMerge(
          "flex flex-col gap-1 flex-1 justify-center",
          props.classNames?.inner,
        )}
      >
        {props.title ? (
          <Text c={color} className="font-bold">
            {props.title}
          </Text>
        ) : undefined}
        {variant === AlertVariant.EXPANDABLE && closed.isClosed
          ? undefined
          : props.children}
      </div>
      {variant === AlertVariant.DISMISSIBLE ||
        variant === AlertVariant.EXPANDABLE ? (
        <div>
          <UnstyledButton
            className={twMerge(
              "fill-dimmed group-hover:fill-primary group-hover:scale-125",
              "group-active:scale-100 transition-all duration-[400]",
            )}
            onClick={() => {
              switch (variant) {
                case AlertVariant.DISMISSIBLE:
                  closed.setClosed(true)
                  break
                case AlertVariant.EXPANDABLE:
                  closed.setClosed(!closed.isClosed)
                  break
              }
            }}
          >
            {variant === AlertVariant.DISMISSIBLE ? (
              <MdClose size={18} />
            ) : closed.isClosed ? (
              <MdKeyboardArrowUp size={18} />
            ) : (
              <MdKeyboardArrowDown size={18} />
            )}
          </UnstyledButton>
        </div>
      ) : undefined}
    </Panel>
  )
}
