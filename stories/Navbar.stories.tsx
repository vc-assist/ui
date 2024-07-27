import type { Meta, StoryObj } from "@storybook/react"

import { Ri4kFill, RiHqFill, RiLinksLine } from "react-icons/ri"
import { NavbarList } from "../components"

const meta: Meta<typeof NavbarList> = {
  title: "VC Assist/NavbarList",
  component: NavbarList,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Desktop: Story = {
  args: {
    layout: "desktop",
    route: "/links",
    routes: [
      {
        icon: RiLinksLine,
        title: "Saved links",
        route: "/links",
      },
      {
        icon: Ri4kFill,
        title: "4k videos",
        route: "/video",
      },
      {
        icon: RiHqFill,
        title: "High quality audio",
        route: "/audio",
      },
    ],
  },
}

export const Mobile: Story = {
  args: {
    layout: "mobile",
    route: "/links",
    routes: [
      {
        icon: RiLinksLine,
        title: "Saved links",
        route: "/links",
      },
      {
        icon: Ri4kFill,
        title: "4k videos",
        route: "/video",
      },
      {
        icon: RiHqFill,
        title: "High quality audio",
        route: "/audio",
      },
    ],
  },
}
