import {
  type Context,
  type Counter,
  type Meter,
  type Span,
  metrics,
} from "@opentelemetry/api"
import { context, trace } from "@opentelemetry/api"
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-http"
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http"
import { Resource } from "@opentelemetry/resources"
import {
  MeterProvider,
  PeriodicExportingMetricReader,
} from "@opentelemetry/sdk-metrics"
import {
  BatchSpanProcessor,
  WebTracerProvider,
} from "@opentelemetry/sdk-trace-web"
import { SEMRESATTRS_SERVICE_NAME } from "@opentelemetry/semantic-conventions"
import { useEffect, useRef } from "react"

/**
 * Creates a span that will exist for the duration of a component's lifecycle.
 */
export function useSpan(
  fnSpan: FnSpan,
  parentSpan: Span | undefined,
  name: string,
): Span {
  const span = useRef<Span>()

  useEffect(() => {
    return () => {
      span.current?.end()
      span.current = undefined
    }
  }, [])

  if (!span.current) {
    span.current = fnSpan(parentSpan, name, (s) => s, true, true)
  }

  return span.current as Span
}

/**
 * - Returns an error object if the passed in object is an instanceof Error.
 * - Returns a string for any other type.
 */
export function narrowError(err: unknown): Error | string {
  if (err instanceof Error) {
    return err
  }
  return String(err)
}

let afterError: AfterErrorHook

export type AfterErrorHook = ((err: unknown) => void) | undefined

export type TelemetryConfig = {
  serviceName: string
  otlp: {
    tracesHttpEndpoint: string
    metricsHttpEndpoint: string
  }
  afterError?: AfterErrorHook
}

export function initTelemetry(config: TelemetryConfig) {
  const OTEL_RESOURCE = new Resource({
    [SEMRESATTRS_SERVICE_NAME]: config.serviceName,
  })

  const traceExporter = new OTLPTraceExporter({
    url: config.otlp.tracesHttpEndpoint,
  })
  const tracerProvider = new WebTracerProvider({
    resource: OTEL_RESOURCE,
  })
  tracerProvider.addSpanProcessor(new BatchSpanProcessor(traceExporter))
  tracerProvider.register()

  const meterProvider = new MeterProvider({
    resource: OTEL_RESOURCE,
    readers: [
      new PeriodicExportingMetricReader({
        exporter: new OTLPMetricExporter({
          url: config.otlp.metricsHttpEndpoint,
        }),
        exportIntervalMillis: 5000,
      }),
    ],
  })
  metrics.setGlobalMeterProvider(meterProvider)
}

/**
 * Creates a span that can be automatically linked to a parent span.
 * `span.end()` will automatically be called unless otherwise specified by `noCleanup`.
 * Uncaught exceptions will automatically be recorded unless otherwise specified by `noErrorHandling`.
 */
export function createFnSpanner(tracerName: string) {
  const tracer = trace.getTracer(tracerName)

  return function fnSpan<T>(
    parent: Span | undefined,
    name: string,
    fn: (span: Span) => T,
    noCleanup?: boolean,
    noErrorHandling?: boolean,
  ) {
    let ctx: Context | undefined
    if (parent) {
      ctx = trace.setSpan(context.active(), parent)
    }
    const span = tracer.startSpan(`${tracerName}:${name}`, undefined, ctx)

    try {
      const output = fn(span)
      if (output instanceof Promise) {
        if (!noCleanup) {
          output
            .then(() => {
              if (!noCleanup) {
                span.end()
              }
            })
            .catch((err) => {
              if (!noErrorHandling) {
                span.recordException(err)
                span.setStatus({
                  code: 2, // this is the ERROR SpanStatusCode
                  message: err.message,
                })
                afterError?.(err)
              }
              if (!noCleanup) {
                span.end()
              }
            })
        }
        return output
      }
      if (!noCleanup) {
        span.end()
      }
      return output
    } catch (err) {
      if (!noErrorHandling) {
        span.recordException(narrowError(err))

        let message: string
        if (err instanceof Error) {
          message = err.message
        } else {
          message = String(err)
        }
        span.setStatus({
          code: 2, // this is the ERROR SpanStatusCode
          message: message,
        })

        afterError?.(err)
      }
      if (!noCleanup) {
        span.end()
      }
      throw err
    }
  }
}

export type FnSpan = ReturnType<typeof createFnSpanner>

/**
 * Creates a meter with some defaults defined.
 */
export function createDefaultMeter(meterName: string): {
  object: Meter
  createCounter: (name: string) => Counter
} {
  const meter = metrics.getMeter(meterName)
  return {
    object: meter,
    createCounter: (name: string) =>
      meter.createCounter(`${meterName}:${name}`),
  }
}
