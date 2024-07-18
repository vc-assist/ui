import { Avatar } from "@mantine/core"
import { Format } from "../lib/format"
import { useStringToMantineColor } from "../lib/utils"

export type UserProfile = {
  name?: string
  email: string
  picture?: string
}

export function UserAvatar(props: UserProfile & { className?: string }) {
  const defaultColor = useStringToMantineColor(props.name ?? props.email)

  return (
    <Avatar
      className={props.className}
      styles={{
        placeholder: { fontSize: "inherit" },
      }}
      src={props.picture}
      color={defaultColor}
      variant="filled"
      radius="lg"
    >
      {Format.initials(props.name ?? props.email)}
    </Avatar>
  )
}
