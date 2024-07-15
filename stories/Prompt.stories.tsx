import type { Meta, StoryObj } from "@storybook/react"

import { Prompt } from "../components"

const meta: Meta<typeof Prompt> = {
  title: "VC Assist/Prompt",
  component: Prompt,
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => {
      return (
        <div className="flex">
          <div className="m-auto">
            <Story />
          </div>
        </div>
      )
    },
  ],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "Prompt title",
    actionText: "Action text",
    actionColor: "red",
    children: "Prompt body text.",
    onClose: () => alert("closed"),
    onAction: () => alert("action"),
  },
}

export const Loading: Story = {
  args: {
    title: "Prompt title",
    actionText: "Action text",
    actionColor: "red",
    children: "Prompt body text.",
    onClose: () => alert("closed"),
    onAction: () => alert("action"),
    loading: true,
  },
}
