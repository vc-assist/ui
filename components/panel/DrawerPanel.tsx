import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {ArrowButton} from "../buttons/ArrowButton";
import { Panel, PanelRoot } from "./Panel";

export function DrawerPanel(props: {
  classNames?: Partial<{
    root: string;
    button: string;
  }>;
  gapSize?: number;
  expanded?: boolean;
  onExpand?: (expanded: boolean) => void;
  children: React.ReactNode;
  drawer?: React.ReactNode;
  panelRoot?: PanelRoot;
}) {
  const [_expanded, setExpanded] = useState(false);

  const expanded = props.expanded !== undefined ? props.expanded : _expanded;

  const drawer =
    props.drawer !== null && props.drawer !== undefined ? (
      <motion.div
        className="overflow-hidden"
        initial={{ height: 0 }}
        animate={{ height: "auto" }}
        exit={{ height: 0 }}
      >
        {(props.gapSize ?? 16) > 0 ? (
          <div style={{ height: `${props.gapSize ?? 16}px` }} />
        ) : undefined}
        {props.drawer}
      </motion.div>
    ) : undefined;

  return (
    <Panel root={props.panelRoot} className={props.classNames?.root}>
      <ArrowButton
        up={expanded}
        classNames={{
          button: props.classNames?.button,
          icon: "fill-gray-400 group-hover:bg-bg-dimmed",
        }}
        onClick={() => {
          setExpanded(!_expanded);
          props.onExpand?.(!expanded);
        }}
      >
        {props.children}
      </ArrowButton>
      <AnimatePresence>{expanded ? drawer : undefined}</AnimatePresence>
    </Panel>
  );
}
