import {
  ColorSchemeScript,
  MantineProvider,
  useComputedColorScheme,
} from "@mantine/core"
import { Notifications } from "@mantine/notifications"
import { useEffect } from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"

function WithMetaColor() {
  const colorScheme = useComputedColorScheme()

  useEffect(() => {
    const html = document.querySelector("html")
    if (!html) {
      return
    }
    if (colorScheme === "dark") {
      html.classList.add("dark")
      return
    }
    html.classList.remove("dark")
  }, [colorScheme])

  return (
    <Helmet>
      <meta
        name="theme-color"
        content={colorScheme === "dark" ? "#18181b" : "#e5e7eb"}
      />
    </Helmet>
  )
}

/**
 * This provides default styling and theme handling for the UI.
 */
export function UIProvider(props: { children: React.ReactNode }) {
  return (
    <>
      <ColorSchemeScript defaultColorScheme="auto" />
      <MantineProvider
        theme={{
          primaryColor: "gray",
          fontFamily: "inherit",
          headings: {
            fontFamily: "inherit",
            sizes: {
              h4: { fontWeight: "600" },
              h5: { fontWeight: "600" },
              h6: { fontWeight: "600" },
            },
          },
          defaultRadius: "md",
        }}
      >
        <HelmetProvider>
          <WithMetaColor />
          {props.children}
        </HelmetProvider>
        <Notifications />
      </MantineProvider>
    </>
  )
}
