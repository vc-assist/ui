import { Button, MantineColor, Title } from "@mantine/core";
import { MdClose } from "react-icons/md";
import { Panel } from "../panel/Panel";

export function Prompt(props: {
  loading?: boolean;
  title: string;
  children: React.ReactNode;
  actionText: string;
  actionColor: MantineColor;
  onAction: () => void;
  onClose: () => void;
}) {
  return (
    <Panel className="m-auto flex flex-col gap-3 min-w-[360px] p-4">
      <div className="flex gap-3 justify-between items-center">
        <Title order={4}>{props.title}</Title>
        <button
          className="rounded-lg p-1 transition-all hover:bg-dimmed-subtle"
          onClick={props.onClose}
        >
          <MdClose size={16} />
        </button>
      </div>
      <div className="mb-1">{props.children}</div>
      <div className="flex justify-end">
        <Button
          size="sm"
          color={props.actionColor}
          onClick={props.onAction}
          loading={props.loading}
        >
          {props.actionText}
        </Button>
      </div>
    </Panel>
  );
}

