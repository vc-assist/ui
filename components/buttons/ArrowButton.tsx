import { UnstyledButton } from "@mantine/core";
import { motion } from "framer-motion";
import { MdKeyboardArrowDown } from "react-icons/md";
import { twMerge } from "tailwind-merge";

export function ArrowButton(props: {
  up?: boolean;
  onClick?: () => void;
  classNames?: Partial<{
    button: string;
    icon: string;
  }>;
  children?: React.ReactNode;
}) {
  return (
    <UnstyledButton
      className={twMerge(
        "flex gap-3 items-center group w-full",
        props.classNames?.button,
      )}
      onClick={props.onClick}
    >
      {props.children}
      <motion.div
        className="w-fit h-fit"
        animate={{ rotate: props.up ? -180 : 0 }}
      >
        <MdKeyboardArrowDown
          className={twMerge(
            "w-8 h-8 transition-all rounded-full",
            props.classNames?.icon,
          )}
        />
      </motion.div>
    </UnstyledButton>
  );
}
