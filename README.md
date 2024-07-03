## usage

```tsx
import "@mantine/core/styles.css";
import "@vcassist/ui/global.css"
import { Foundation } from "@vcassist/ui/foundation"
import { SomeComponent } from "@vcassist/ui/components"

const FoundationProvider = Foundation({
   ...
})

ReactDOM.render(
   <FoundationProvider>
      ...
   </FoundationProvider>
)
```

### project structure

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

### storybook

you can think of storybook akin to unit testing for UI. it allows you to define certain "stories", states in which UI components can be in, and preview those states in the browser. it also allows for visual testing, in which it will validate a screenshot of a rendered component against a previous "good" screenshot of the component and check if it has changed.

you can learn how to use the storybook straight from their documentation, you can also look at the existing `*.stories.tsx` files under `stories/` or `stories/example/` to get a feel for how to use storybook.

### commands

- `pnpm run storybook` - runs storybook

