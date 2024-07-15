import { Switch, Text } from "@mantine/core"
import type { Signal } from "@preact/signals-react"
import { useSignals } from "@preact/signals-react/runtime"

export function BooleanOption(props: {
  title: string
  description: string
  signal: Signal<boolean>
}) {
  useSignals()
  return (
    <div className="flex gap-3 justify-between items-center">
      <div className="flex flex-col gap-1">
        <Text>{props.title}</Text>
        <Text className="italic" c="dimmed" size="sm">
          {props.description}
        </Text>
      </div>
      <div>
        <Switch
          checked={props.signal.value}
          onChange={() => {
            props.signal.value = !props.signal.value
          }}
        />
      </div>
    </div>
  )
}
