import { Button, PasswordInput, Text, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useMutation } from "@tanstack/react-query"

export function OAuthForm(props: {
  credentialId: string
  color: string
  /**
   * This should not throw on success.
   */
  onStart(): Promise<void>
  onSuccess(): void
}) {
  const oauthStart = useMutation({
    mutationFn: async () => {
      await props.onStart()
      props.onSuccess()
    },
  })

  return (
    <div className="flex flex-col gap-3">
      <Button
        loading={oauthStart.isPending}
        style={{ backgroundColor: props.color }}
        color={props.color}
        onClick={() => {
          oauthStart.mutate()
        }}
      >
        Login
      </Button>

      {oauthStart.isError ? (
        <Text c="red" size="sm">
          Authorization failed.
        </Text>
      ) : undefined}
    </div>
  )
}

export function UsernamePasswordForm(props: {
  credentialId: string
  color: string
  onSubmit(username: string, password: string): Promise<void>
  /**
   * This should not throw on success.
   */
  onSuccess(): void
}) {
  const form = useForm<{
    username: string
    password: string
  }>({
    initialValues: {
      username: "",
      password: "",
    },
    validate: {
      username: (c) => (c ? null : "Username required."),
      password: (c) => (c ? null : "Password required."),
    },
  })

  const submitMutation = useMutation({
    mutationFn: async ({
      username,
      password,
    }: { username: string; password: string }) => {
      await props.onSubmit(username, password)
      props.onSuccess()
    }
  })

  const submitForm = () => {
    form.validate()
    if (!form.isValid()) {
      return
    }
    submitMutation.mutate({
      username: form.values.username,
      password: form.values.password,
    })
  }

  return (
    <div className="flex flex-col gap-3">
      <TextInput
        placeholder="Username"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            submitForm()
          }
        }}
        {...form.getInputProps("username")}
      />
      <PasswordInput
        placeholder="Password"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            submitForm()
          }
        }}
        {...form.getInputProps("password")}
      />

      <Button
        className="font-bold"
        style={{ backgroundColor: props.color }}
        color={props.color}
        loading={submitMutation.isPending}
        onClick={submitForm}
      >
        Authorize
      </Button>

      {submitMutation.error ? (
        <Text c="red" size="sm">
          {submitMutation.error.message}
        </Text>
      ) : undefined}
    </div>
  )
}
