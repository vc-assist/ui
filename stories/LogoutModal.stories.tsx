import type { Meta, StoryObj } from "@storybook/react"

import { LogoutModal } from "../components"

const meta: Meta<typeof LogoutModal> = {
  title: "VC Assist/LogoutModal",
  component: LogoutModal,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
