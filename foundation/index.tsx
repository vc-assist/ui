import { useSignals } from "@preact/signals-react/runtime"
import { ErrorBoundary, ErrorPage, notifyError } from "./error"
import { type SafeArea, SafeAreaProvider, useSafeArea } from "./safe-area"
import {
  type FnSpan,
  type TelemetryConfig,
  createDefaultMeter,
  createFnSpanner,
  initTelemetry,
  narrowError,
  useSpan,
} from "./telemetry"
import { UIProvider } from "./ui"
import type { Signal } from "@preact/signals-react"

export * from "./context"
export * from "./credential-flow"
export * from "./auth-flow"
export {
  notifyError,
  useSpan,
  type FnSpan,
  createFnSpanner,
  createDefaultMeter,
  narrowError,
}
export { useSafeArea, type SafeArea }
export { ErrorPage }

export function Foundation(options: {
  safeArea: Signal<SafeArea>
  telemetry?: TelemetryConfig
}): React.FC<{ children: React.ReactNode }> {
  if (options.telemetry) {
    initTelemetry(options.telemetry)
  }
  return function FoundationProvider(props: { children: React.ReactNode }) {
    useSignals()

    return (
      <UIProvider>
        <ErrorBoundary>
          <SafeAreaProvider value={options.safeArea.value}>
            {props.children}
          </SafeAreaProvider>
        </ErrorBoundary>
      </UIProvider>
    )
  }
}
