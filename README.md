# ui

> Shared UI components for VC Assist.

## Usage

```tsx
import "@mantine/core/styles.css";
import "@vcassist/ui/styles.css"
import { Foundation, SomeComponent } from "@vcassist/ui"

const FoundationProvider = Foundation({
   ...
})

ReactDOM.render(
   <FoundationProvider>
      ...
   </FoundationProvider>
)
```

## Project structure

- `components/` - ui components (note: components are grouped together by *what they look like, what they look like they do, and heavily related components*)
- `foundation/` - foundation for any web app (error boundary, telemetry, mantine providers/theme)
- `lib/` - libraries
   - `color/` - contains methods for producing and transforming color
   - `format/` - contains methods for converting various types into various string formats
   - `utils/` - contains miscellaneous utils
- `static/` - static assets
   - `fonts/` - static assets
   - `styles/` - css styling
   - `favicon.svg` - the vcassist favicon
- `global.css` - global css styles
- `.storybook/` - contains configuration for storybook
- `stories/` - storybook stories

## Storybook

You can think of storybook akin to unit testing for UI. it allows you to define certain "stories", states in which UI components can be in, and preview those states in the browser. it also allows for visual testing, in which it will validate a screenshot of a rendered component against a previous "good" screenshot of the component and check if it has changed.

You can learn how to use the storybook straight from their documentation, you can also look at the existing `*.stories.tsx` files under `stories/` or `stories/example/` to get a feel for how to use storybook.

## Commands

- `pnpm run storybook` - runs storybook

