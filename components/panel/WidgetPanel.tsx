import { Title } from "@mantine/core";
import { twMerge } from "tailwind-merge";
import Panel from "./Panel";

export default function WidgetPanel(props: {
  title: string;
  titleBarRight?: React.ReactNode;
  info?: string;
  className?: string;
  noLabelMargin?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Panel className={twMerge("h-fit overflow-y-auto", props.className)}>
      <div
        className={twMerge(
          "flex gap-8 justify-between z-20",
          !props.noLabelMargin ? "mb-5" : "",
        )}
      >
        <Title order={4}>{props.title}</Title>
        {props.titleBarRight}
      </div>
      {props.children}
    </Panel>
  );
}
