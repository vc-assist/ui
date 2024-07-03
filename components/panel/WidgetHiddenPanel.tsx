import { Title } from "@mantine/core";
import  Panel  from "./Panel";
import { MdVisibilityOff } from "react-icons/md";
import { twMerge } from "tailwind-merge";

export default function WidgetHiddenPanel(props: {
  message: string;
  className?: string;
}) {
  return (
    <Panel className={twMerge("flex", props.className)}>
      <div className="flex gap-2 items-center m-auto">
        <MdVisibilityOff size={24} />
        <Title order={5}>{props.message}</Title>
      </div>
    </Panel>
  );
}
