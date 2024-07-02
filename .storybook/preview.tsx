import "@mantine/core/styles.css";
import "../styles/app.css"
import "../styles/content.css"
import "../styles/preflight.css"
import "../styles/fix-jank/mantine.css"
import "../styles/fix-jank/mobile.css"

import React from "react"
import { Preview } from '@storybook/react';
import { Foundation } from "../foundation"

const FoundationProvider = Foundation({
  safeArea: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <FoundationProvider>
        <Story />
      </FoundationProvider>
    ),
  ],
};

export default preview;
