import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Panel from '../components/Panel'

const meta: Meta<typeof Panel> = {
  title: 'VC Assist/Panel',
  component: Panel,
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
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <p>Lorem Ipsum + other words.</p>,
  }
};

