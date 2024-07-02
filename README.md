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

- `components/` - shared components
- `foundation/` - foundation for any web app (error boundary, telemetry, mantine providers/theme)
- `assets/` - static assets
- `styles/` - css styling
- `stories/` - storybook preview of ui components
- `global.css` - global css styles

