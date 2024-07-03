import { Popover, Text, ThemeIcon, UnstyledButton } from "@mantine/core";
import type { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

export default function PopoutChip(props: {
  title?: string;
  icon?: IconType;
  className?: string;
  children: React.ReactNode;
  chip: React.ReactNode;
  onOpened?: (opened: boolean) => void;
}) {
  return (
    <Popover
      classNames={{
        dropdown: "border-dimmed-subtle shadow-lg",
        arrow: "border-dimmed-subtle",
      }}
      position="bottom"
      shadow="md"
      onChange={props.onOpened}
      withArrow
      arrowSize={16}
    >
      <Popover.Target>
        <UnstyledButton
          className={twMerge(
            "w-fit transition-transform duration-[400]",
            props.className,
          )}
        >
          {props.children}
        </UnstyledButton>
      </Popover.Target>
      <Popover.Dropdown className="rounded-xl" bg="var(--bg)">
        {props.title !== undefined || props.icon !== undefined ? (
          <div className="flex gap-3 mb-4 items-center">
            {props.icon ? (
              <ThemeIcon color="dark" size="lg" radius="md">
                <props.icon size={24} />
              </ThemeIcon>
            ) : undefined}
            {props.title !== undefined ? (
              <Text style={{ fontWeight: 600 }} size="md">
                {props.title}
              </Text>
            ) : undefined}
          </div>
        ) : undefined}
        {props.chip}
      </Popover.Dropdown>
    </Popover>
  );
}
