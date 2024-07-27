import { Switch, Text } from "@mantine/core"

export function BooleanOption(props: {
  title: string
  description: string
  checked?: boolean
  onChange?: (value: boolean) => void
}) {
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
          checked={props.checked}
          onChange={() => {
            props.onChange?.(!!props.checked)
          }}
        />
      </div>
    </div>
  )
}
