import type { Meta, StoryObj } from "@storybook/react"

import { UserAvatar } from "../components"

const meta: Meta<typeof UserAvatar> = {
  title: "VC Assist/UserAvatar",
  component: UserAvatar,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const EmailOnly: Story = {
  args: {
    email: "adam.james@gmail.com",
  },
}
export const WithName: Story = {
  args: {
    name: "Adam James",
    email: "adam.james@gmail.com",
  },
}
export const WithPicture: Story = {
  args: {
    name: "Adam James",
    email: "adam.james@gmail.com",
    picture: "/static/favicon.svg"
  },
}
