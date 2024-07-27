import type { Meta, StoryObj } from "@storybook/react"

import { RingProgress } from "../components"

const meta: Meta<typeof RingProgress> = {
  title: "VC Assist/RingProgress",
  component: RingProgress,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "Title",
    size: 180,
    color: "red",
    sections: [
      {
        name: "Section 1",
        color: "red",
        value: 50,
      },
      {
        name: "Section 2",
        color: "green",
        value: 20,
      },
      {
        name: "Section 3",
        color: "purple",
        value: 30,
      },
    ]
  },
}
