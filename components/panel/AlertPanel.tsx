import {
  DefaultMantineColor,
  Text,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import { useMemo } from "react";
import {
  MdClose,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdTipsAndUpdates,
} from "react-icons/md";
import { twMerge } from "tailwind-merge";
import { z } from "zod";
import { persistentSignal } from "../../lib/utils";
import Panel from "./Panel";
import { useSignals } from "@preact/signals-react/runtime";

export const enum AlertVariant {
  STATIC = 0,
  DISMISSIBLE = 1,
  EXPANDABLE = 2,
}

export default function AlertPanel(props: {
  classNames?: Partial<{
    root: string;
    inner: string;
  }>;
  id: string;
  icon?: React.ReactNode;
  title?: string;
  color?: DefaultMantineColor;
  children?: React.ReactNode;
  variant?: AlertVariant;
}) {
  useSignals();

  const variant = props.variant ?? AlertVariant.STATIC;

  const closed = useMemo(
    () =>
      persistentSignal({
        key: `alert-${props.id}`,
        schema: z.coerce.boolean(),
        defaultValue: false,
      }),
    [props.id],
  );
  const color = props.color ?? "violet";

  if (closed.value && variant === AlertVariant.DISMISSIBLE) {
    return null;
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
        {variant === AlertVariant.EXPANDABLE && closed.value
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
                  closed.value = true;
                  break;
                case AlertVariant.EXPANDABLE:
                  closed.value = !closed.value;
                  break;
              }
            }}
          >
            {variant === AlertVariant.DISMISSIBLE ? (
              <MdClose size={18} />
            ) : closed.value ? (
              <MdKeyboardArrowUp size={18} />
            ) : (
              <MdKeyboardArrowDown size={18} />
            )}
          </UnstyledButton>
        </div>
      ) : undefined}
    </Panel>
  );
}
