import type { Meta, StoryObj } from "@storybook/react"

import { BooleanOption } from "../components"

const meta: Meta<typeof BooleanOption> = {
  title: "VC Assist/BooleanOption",
  component: BooleanOption,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Unchecked: Story = {
  args: {
    title: "Use Some Setting",
    description: "Do some behavior by default.",
    checked: false,
  },
}
export const Checked: Story = {
  args: {
    title: "Use Some Setting",
    description: "Do some behavior by default.",
    checked: true,
  },
}
