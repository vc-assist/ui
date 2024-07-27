import type { Meta, StoryObj } from "@storybook/react"

import { Modal, Positioned } from "../components"

const meta: Meta<typeof Modal> = {
  title: "VC Assist/Modal",
  component: Modal,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    opened: true,
    children: (
      <Positioned x="center" y="middle">
        some text
      </Positioned>
    ),
    onClose: () => alert("closed"),
  },
}

export const NoCloseButton: Story = {
  args: {
    opened: true,
    children: (
      <Positioned x="center" y="middle">
        some text
      </Positioned>
    ),
    closeControls: false,
    onClose: () => alert("closed"),
  },
}
