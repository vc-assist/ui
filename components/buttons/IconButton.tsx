import {
  Button,
  DefaultMantineColor,
  useMantineTheme,
} from "@mantine/core";
import type { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

export function IconButton(props: {
  label: string;
  icon: IconType;
  color: DefaultMantineColor;
  onClick?: () => void;
  horizontal?: boolean;
  disabled?: boolean;
  className?: string;
}) {
  const theme = useMantineTheme();

  if (props.horizontal) {
    return (
      <Button
        className={props.className}
        leftSection={<props.icon size={20} />}
        color={props.color}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.label}
      </Button>
    );
  }

  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={twMerge(
        "flex flex-col items-center justify-center p-2 gap-[0.1rem]",
        "rounded-xl aspect-square max-w-[5rem] bg-[var(--background)]",
        "hover:bg-[var(--hover-background)] active:translate-y-[2px]",
        "text-gray-50 disabled:bg-dimmed-subtle disabled:text-dimmed",
        "disabled:cursor-default disabled:translate-y-0",
        props.className,
      )}
      style={
        {
          "--background": theme.colors[props.color][7],
          "--hover-background": theme.colors[props.color][8],
        } as React.CSSProperties
      }
    >
      <props.icon size={24} className="fill-current" />
      <p className="font-semibold text-xs text-center">{props.label}</p>
    </button>
  );
}
