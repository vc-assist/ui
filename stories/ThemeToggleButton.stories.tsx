import type { Meta, StoryObj } from "@storybook/react"

import { ThemeToggleButton } from "../components"

const meta: Meta<typeof ThemeToggleButton> = {
  title: "VC Assist/ThemeToggleButton",
  component: ThemeToggleButton,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
