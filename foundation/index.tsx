import { ErrorBoundary, ErrorPage, notifyError } from "./error"
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

export * from "./credential-flow"
export * from "./auth-flow"
export * from "./safe-area"
export {
  notifyError,
  useSpan,
  type FnSpan,
  createFnSpanner,
  createDefaultMeter,
  narrowError,
}
export { ErrorPage }

export function Foundation(options: {
  telemetry?: TelemetryConfig
}): React.FC<{ children: React.ReactNode }> {
  if (options.telemetry) {
    initTelemetry(options.telemetry)
  }
  return function FoundationProvider(props: { children: React.ReactNode }) {
    return (
      <UIProvider>
        <ErrorBoundary>
          {props.children}
        </ErrorBoundary>
      </UIProvider>
    )
  }
}
