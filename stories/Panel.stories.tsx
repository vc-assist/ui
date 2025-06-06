import type { Meta, StoryObj } from "@storybook/react"

import { Panel } from "../components/panel/Panel"

const meta: Meta<typeof Panel> = {
  title: "VC Assist/Panel",
  component: Panel,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <p>Lorem Ipsum + other words.</p>,
  },
}
