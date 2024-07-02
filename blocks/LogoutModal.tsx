import { Text } from "@mantine/core";
import { MdLogout } from "react-icons/md";
import { IconButton, Modal, Prompt } from "../components";
import { useDisclosure } from "@mantine/hooks";

export default function LogoutModal(props: {
  showCloseButton?: boolean
  handleLogout: () => void;
  className?: string;
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
      <Modal opened={opened} showCloseButton={props.showCloseButton}>
        <Prompt
          title="Log out"
          actionText="Log out"
          actionColor="red"
          onClose={close}
          onAction={() => {
            props.handleLogout();
          }}
        >
          <Text>Are you sure you want to log out?</Text>
        </Prompt>
      </Modal>
    </>
  );
}
