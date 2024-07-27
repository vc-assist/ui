import type { Meta, StoryObj } from "@storybook/react"

import { ColorKey } from "../components"

const meta: Meta<typeof ColorKey> = {
  title: "VC Assist/ColorKey",
  component: ColorKey,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: "Label",
    color: "red",
    size: 14,
  },
}
