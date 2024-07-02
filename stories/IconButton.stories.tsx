import type { Meta, StoryObj } from '@storybook/react';

import { RiDownloadLine } from "react-icons/ri"
import { IconButton } from '../components';

const meta: Meta<typeof IconButton> = {
  title: 'VC Assist/IconButton',
  component: IconButton,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [(Story) => {
    return (
      <div className="flex">
        <div className="m-auto">
          <Story />
        </div>
      </div>
    )
  }]
}

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Request Data",
    icon: RiDownloadLine,
    color: "blue",
  }
};

export const Horizontal: Story = {
  args: {
    label: "Request Data",
    icon: RiDownloadLine,
    color: "blue",
    horizontal: true,
  }
};
export const DefaultDisabled: Story = {
  args: {
    label: "Request Data",
    icon: RiDownloadLine,
    color: "blue",
    disabled: true
  }
};

export const HorizontalDisabled: Story = {
  args: {
    label: "Request Data",
    icon: RiDownloadLine,
    color: "blue",
    horizontal: true,
    disabled: true
  }
};
