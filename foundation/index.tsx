import { UIProvider } from "./ui"
import { ErrorBoundary, notifyError } from "./error"
import { initTelemetry, useSpan, type TelemetryConfig, FnSpan, createFnSpanner, narrowError } from "./telemetry"
import { type SafeArea, SafeAreaProvider, useSafeArea } from "./safe-area"
export * from "./context"

export { notifyError, useSpan, useSafeArea, type FnSpan, createFnSpanner, narrowError }

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

