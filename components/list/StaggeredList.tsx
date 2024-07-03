import { Text } from "@mantine/core";
import { AnimatePresence, type Variants, motion } from "framer-motion";
import { useState } from "react";
import { ArrowButton } from "../buttons";

const itemAnimationVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -16,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function StaggeredList(props: {
  title: string;
  children: JSX.Element[];
  expandedByDefault?: boolean;
  stagger?: number;
}) {
  const stagger = props.stagger ?? 0.1;
  const [expanded, setExpanded] = useState(props.expandedByDefault ?? true);

  return (
    <motion.div
      className="flex flex-col gap-3"
      initial="hidden"
      animate={expanded ? "visible" : "hidden"}
      layout
    >
      <motion.div className="flex gap-2" layout>
        <ArrowButton
          up={!expanded}
          onClick={() => setExpanded(!expanded)}
          classNames={{ button: "gap-2" }}
        >
          <Text className="font-semibold">{props.title}</Text>
        </ArrowButton>
      </motion.div>
      <AnimatePresence>
        {expanded ? (
          <motion.div className="grid gap-3 grid-cols-[6px_1fr] w-full">
            <motion.div
              className="rounded-full bg-primary my-2"
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
            />
            <motion.ul
              variants={{
                hidden: {
                  y: -16,
                  opacity: 0,
                  transition: {
                    when: "afterChildren",
                    staggerChildren: stagger,
                  },
                },
                visible: {
                  y: 0,
                  opacity: 1,
                  transition: {
                    when: "beforeChildren",
                    staggerChildren: stagger,
                  },
                },
              }}
              className="flex flex-col gap-4 w-full"
            >
              {props.children.map((child) => {
                return (
                  <motion.li
                    className="w-full"
                    variants={itemAnimationVariants}
                    key={child.key}
                  >
                    {child}
                  </motion.li>
                );
              })}
            </motion.ul>
          </motion.div>
        ) : undefined}
      </AnimatePresence>
    </motion.div>
  );
}
