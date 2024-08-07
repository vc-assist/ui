import { Code, Text, Title } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { ErrorBoundary as ErrorBoundaryComponent } from "react-error-boundary"
import { Panel } from "../components/panel/Panel"
import { createFnSpanner } from "./telemetry"

export function notifyError(err: unknown) {
  if (import.meta.env.MODE === "production") {
    notifications.show({
      message: "Something went wrong!",
      autoClose: 3000,
      color: "red",
    })
    return
  }
  notifications.show({
    message: err instanceof Error ? err.message : String(err),
    title: "Something went wrong!",
    autoClose: 10000,
    color: "red",
  })
}

export function ErrorPage(
  props: Partial<{
    message: string
    description: string
    children: React.ReactNode
  }>,
) {
  return (
    <div className="flex h-full">
      <Panel className="flex flex-col gap-3 m-auto max-w-[80%]">
        <Title order={2}>Uh oh!</Title>
        <Text>An error has occurred.</Text>

        {props.message ? (
          <>
            <Text className="font-semibold">Message:</Text>
            <Code block>{props.message}</Code>
          </>
        ) : undefined}

        {props.description ? (
          <>
            <Text className="overflow-x-auto font-semibold">Description:</Text>
            <Code className="whitespace-pre" block>
              {props.description}
            </Code>
          </>
        ) : undefined}

        {props.children}
      </Panel>
    </div>
  )
}

const fnSpan = createFnSpanner("global-error")

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundaryComponent
      fallbackRender={({ error: err }) => {
        notifyError(err)

        if (err instanceof Error) {
          let cause = String(err.cause)
          if (typeof err.cause === "object") {
            try {
              cause = JSON.stringify(err.cause)
            } catch {}
          }

          fnSpan(undefined, "fatal-error", (span) => {
            span.setAttribute("exception.name", err.name)
            span.setAttribute("exception.message", err.message)
            span.setAttribute("exception.stack", err.stack ?? "<undefined>")
            span.setAttribute("exception.cause", cause)
          })

          return (
            <ErrorPage message={err.message} description={err.stack ?? ""} />
          )
        }

        fnSpan(undefined, "fatal-error", (span) => {
          span.setAttribute("exception.value", String(err))
        })

        return (
          <ErrorPage
            message="Unknown error"
            description="Something went wrong!"
          />
        )
      }}
    >
      {children}
    </ErrorBoundaryComponent>
  )
}
