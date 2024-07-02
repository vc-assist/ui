import type { Meta, StoryObj } from '@storybook/react';

import { LogoutModal } from '../blocks';

const meta: Meta<typeof LogoutModal> = {
  title: 'VC Assist/LogoutModal',
  component: LogoutModal,
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
  args: { }
};

