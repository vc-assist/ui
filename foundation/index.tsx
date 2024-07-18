import { ErrorPage, ErrorBoundary, notifyError } from "./error"
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
export * from "./context"

export {
  notifyError,
  useSpan,
  useSafeArea,
  type FnSpan,
  createFnSpanner,
  narrowError,
  createDefaultMeter,
  ErrorPage,
}

export function Foundation(options: {
  safeArea: SafeArea
  telemetry?: TelemetryConfig
}): React.FC<{ children: React.ReactNode }> {
  if (options.telemetry) {
    initTelemetry(options.telemetry)
  }
  return function FoundationProvider(props: { children: React.ReactNode }) {
    return (
      <UIProvider>
        <ErrorBoundary>
          <SafeAreaProvider value={options.safeArea}>
            {props.children}
          </SafeAreaProvider>
        </ErrorBoundary>
      </UIProvider>
    )
  }
}
