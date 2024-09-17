# ui

> Shared UI components for VC Assist.

## Usage

```tsx
// main.tsx
import "@mantine/core/styles.css";
import "@vcassist/ui/styles.css"
import "@mantine/carousel/styles.css"
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

```js
// tailwind.config.cjs
module.exports = {
  ...require("@vcassist/ui/tailwind.config.cjs"),
  content: [
    "ui/foundation/**/*.tsx",
    "ui/components/**/*.tsx",
    "ui/styles/**/*.css",
     // + your own files that use tailwind classes here
     // ...
  ],
}
```

## Project structure

- `.storybook/` - contains configuration for storybook
- `stories/` - storybook stories
- `components/` - ui components
- `foundation/` - foundation for any web app (error boundary, telemetry, mantine providers/theme)
- `lib/` - libraries
   - `color/` - contains methods for producing and transforming color
   - `format/` - contains methods for converting various types into various string formats
   - `utils/` - contains miscellaneous utils
- `static/` - static assets
   - `fonts/` - static assets
   - `styles/` - css styling
   - `favicon.svg` - the vcassist favicon
- `styles.css` - global css styles
- `index.ts` - the entrypoint to the library, you should be able to import anything that is meant to be imported by importing this file.

## Commands

- `pnpm lint` - lints using biome and tsc
- `pnpm storybook` - runs storybook
- `pnpm syncpack fix-mismatches` - makes all dependencies an exact version (this is so you don't get weird errors when if you have a library with some kind of global, using a different version of the library will resolve in a different global), *you should run this after adding any dependency*

## Storybook

You can think of storybook akin to unit testing for UI. it allows you to define certain "stories", states in which UI components can be in, and preview those states in the browser. it also allows for visual testing, in which it will validate a screenshot of a rendered component against a previous "good" screenshot of the component and check if it has changed.

You can learn how to use the storybook straight from their documentation, you can also look at the existing `*.stories.tsx` files under `stories/` or `stories/example/` to get a feel for how to use storybook.

## Naming conventions

You may notice that all components that look or function like a button have the prefix "Button" at the end of their names. (ex. `ArrowButton.tsx`, `IconButton.tsx`)

Similarly, all components that use the `Panel` component have the suffix "Panel" at the end of their names. (ex. `AlertPanel.tsx`)

The naming convention could then be described as following.

> Group components together by the most significant feature of commonality between them.
>
> But if components don't necessarily have any significant commonalities, do not force them together, keep them separate.

It doesn't matter if this is functionality, visuals, or whatever, the most significant similarity between two components should be used as the grouping suffix of the component (or no suffix should be used if it is a standalone component).

