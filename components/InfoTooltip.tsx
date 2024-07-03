import { twMerge } from "tailwind-merge";
import { Tooltip, UnstyledButton } from "@mantine/core";
import { useState } from "react";
import { MdInfo } from "react-icons/md";

export default function InfoTooltip(props: {
  className?: string;
  message: string;
  children?: React.ReactNode;
}) {
  const [opened, setOpened] = useState(false);

  return (
    <Tooltip
      opened={opened}
      className={twMerge(props.className, "hover:cursor-pointer")}
      classNames={{ tooltip: "max-w-[200px] whitespace-normal" }}
      label={props.message}
    >
      <UnstyledButton
        onMouseOver={() => setOpened(true)}
        onMouseLeave={() => setOpened(false)}
        onTouchStart={() => setOpened(!opened)}
      >
        {props.children ?? <MdInfo size={20} />}
      </UnstyledButton>
    </Tooltip>
  );
}
