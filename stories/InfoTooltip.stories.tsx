import type { Meta, StoryObj } from "@storybook/react"

import { InfoTooltip } from "../components"

const meta: Meta<typeof InfoTooltip> = {
  title: "VC Assist/InfoTooltip",
  component: InfoTooltip,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    message:
      "This is a long informational tooltip about some edge case in some UI or some justification for some feature behavior.",
  },
}
