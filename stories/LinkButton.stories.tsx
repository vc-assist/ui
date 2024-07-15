import type { Meta, StoryObj } from "@storybook/react"

import { LinkButton } from "../components"

const meta: Meta<typeof LinkButton> = {
  title: "VC Assist/LinkButton",
  component: LinkButton,
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
    children: "a link to somewhere",
  },
}
