import type { Meta, StoryObj } from "@storybook/react"

import { RingProgressPicker } from "../components"

const meta: Meta<typeof RingProgressPicker> = {
  title: "VC Assist/RingProgressPicker",
  component: RingProgressPicker,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    sections: [
      {
        id: "1",
        color: "red",
        label: () => "Option 1",
        value: 34,
      },
      {
        id: "2",
        color: "blue",
        label: () => "Option 2",
        value: 26,
      },
      {
        id: "3",
        color: "orange",
        label: () => "Option 3",
        value: 40,
      },
    ],
  },
}

export const Selected: Story = {
  args: {
    selectedId: "1",
    sections: [
      {
        id: "1",
        color: "red",
        label: () => "Option 1",
        value: 34,
      },
      {
        id: "2",
        color: "blue",
        label: () => "Option 2",
        value: 26,
      },
      {
        id: "3",
        color: "orange",
        label: () => "Option 3",
        value: 40,
      },
    ],
  },
}
