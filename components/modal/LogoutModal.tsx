import { Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { MdLogout } from "react-icons/md"
import { IconButton } from "../buttons"
import { Modal } from "./Modal"
import { Prompt } from "./Prompt"

export function LogoutModal(props: {
  handleLogout: () => void
  className?: string
}) {
  const [opened, { open, close }] = useDisclosure(false)
  return (
    <>
      <IconButton
        className={props.className}
        icon={MdLogout}
        label="Log out"
        color="red"
        horizontal
        onClick={open}
      />
      <Modal opened={opened} closeControls={false} onClose={close}>
        <Prompt
          title="Log out"
          actionText="Log out"
          actionColor="red"
          onClose={close}
          onAction={() => {
            props.handleLogout()
          }}
        >
          <Text>Are you sure you want to log out?</Text>
        </Prompt>
      </Modal>
    </>
  )
}
