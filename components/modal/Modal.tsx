import { Button, Portal } from "@mantine/core"
import { useHotkeys } from "@mantine/hooks"
import { AnimatePresence, motion } from "framer-motion"
import { MdClose } from "react-icons/md"
import { twMerge } from "tailwind-merge"
import { useSafeArea } from "../../foundation"
import { Positioned } from "./Positioned"

export function Modal(props: {
  opened: boolean
  closeControls?: boolean
  children: React.ReactNode
  onClose(): void
}) {
  const closeControls = props.closeControls ?? true
  const safeArea = useSafeArea()

  const closeHandler = () => {
    if (!closeControls) {
      return
    }
    props.onClose()
  }

  useHotkeys([
    ["Escape", closeHandler],
    ["27", closeHandler],
  ])

  return (
    <Portal>
      <AnimatePresence>
        {props.opened ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={twMerge(
              "absolute top-0 left-0 w-full h-full z-[60]",
              "bg-opacity-10 bg-gray-900 backdrop-blur-sm",
            )}
            style={{
              paddingLeft: `${safeArea.left}px`,
              paddingRight: `${safeArea.right}px`,
              paddingTop: `${safeArea.top}px`,
              paddingBottom: `${safeArea.bottom}px`,
            }}
          >
            <motion.div
              className="flex w-full h-full"
              initial={{ y: "15%" }}
              animate={{ y: "0%" }}
              exit={{ y: "15%" }}
            >
              {props.children}
              {closeControls ? (
                <Positioned x="left" y="top" padding="2rem">
                  <Button
                    className={twMerge(
                      "shadow-lg bg-primary text-bg",
                      "hover:text-bg hover:bg-primary",
                      "active:text-bg active:bg-primary",
                    )}
                    variant="filled"
                    leftSection={<MdClose size={16} />}
                    onClick={closeHandler}
                  >
                    Close
                  </Button>
                </Positioned>
              ) : undefined}
            </motion.div>
          </motion.div>
        ) : undefined}
      </AnimatePresence>
    </Portal>
  )
}
