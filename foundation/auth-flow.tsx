import { Button, TextInput, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useMutation } from "@tanstack/react-query"
import { Panel } from "../components/panel"
import { useEffect, useRef, useState } from "react"
import type { UserProfile } from "../components"

export enum AuthState {
  WAITING_FOR_EMAIL = 0,
  WAITING_FOR_CODE = 1,
}

export function AuthFlow(props: {
  token?: string
  state?: AuthState

  startLogin(email: string): Promise<void>
  consumeVerificationCode(email: string, code: string): Promise<{ token: string }>
  verifyToken(token: string): Promise<{ email: string }>

  onLogin(token: string, profile: UserProfile): void
  onInvalidToken(): void
}) {
  const tokenRef = useRef(props.token)
  const emailRef = useRef("")
  const [state, setState] = useState(props.state ?? AuthState.WAITING_FOR_EMAIL)

  const consumeVerificationCode = async (code: string, email: string) => {
    const tokenRes = await props.consumeVerificationCode(code, email)
    const res = await props.verifyToken(tokenRes.token)
    return {
      token: tokenRes.token,
      profile: { email: res.email } satisfies UserProfile,
    }
  }

  useEffect(() => {
    if (!tokenRef.current) {
      return
    }
    props.verifyToken(tokenRef.current)
      .then((res) => props.onLogin(tokenRef.current!, res))
      .catch(() => {
        tokenRef.current = undefined
        props.onInvalidToken()
      })
  }, [props.onLogin, props.onInvalidToken, props.verifyToken])

  if (tokenRef.current) {
    return
  }

  return (
    <div className="flex h-full">
      <Panel className="m-auto">
        {state === AuthState.WAITING_FOR_EMAIL ? (
          <EmailPrompt
            onSubmit={async (email: string) => {
              await props.startLogin(email)
              emailRef.current = email
              setState(AuthState.WAITING_FOR_CODE)
            }}
          />
        ) : undefined}

        {state === AuthState.WAITING_FOR_CODE ? (
          <CodePrompt
            onSubmit={async (code: string) => {
              const res = await consumeVerificationCode(code, emailRef.current)
              props.onLogin(res.token, res.profile)
            }}
          />
        ) : undefined}
      </Panel>
    </div>
  )
}

function EmailPrompt(props: { onSubmit: (email: string) => Promise<void> }) {
  const form = useForm({
    initialValues: {
      email: "",
    },
  })

  const submitMutation = useMutation({
    mutationFn: (code: string) => props.onSubmit(code),
  })

  const submit = () => {
    if (form.validate().hasErrors) {
      return
    }
    submitMutation.mutate(form.values.email)
  }

  return (
    <div className="flex flex-col gap-3 min-w-[240px] max-w-[240px]">
      <Title order={3}>Log in...</Title>
      <TextInput
        placeholder="Email address"
        {...form.getInputProps("email")}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            submit()
          }
        }}
      />

      <Button onClick={submit} loading={submitMutation.isPending}>
        Submit
      </Button>

      {submitMutation.error ? (
        <p className="text-red-700 font-normal max-w-[240px]">
          {submitMutation.error.message}
        </p>
      ) : undefined}
    </div>
  )
}

function CodePrompt(props: { onSubmit: (code: string) => Promise<void> }) {
  const form = useForm({
    initialValues: {
      code: "",
    },
  })

  const submitMutation = useMutation({
    mutationFn: (code: string) => props.onSubmit(code),
  })

  const submit = () => {
    if (form.validate().hasErrors) {
      return
    }
    submitMutation.mutate(form.values.code)
  }

  return (
    <div className="flex flex-col gap-3 min-w-[240px] max-w-[240px]">
      <div className="flex flex-col gap-1">
        <Title order={3}>Enter the code...</Title>
        <p className="text-dimmed italic">
          A verification code has been sent to your email address.
        </p>
      </div>

      <TextInput
        placeholder="Verification Code"
        {...form.getInputProps("code")}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            submit()
          }
        }}
      />

      <Button className="" onClick={submit} loading={submitMutation.isPending}>
        Submit
      </Button>

      {submitMutation.error ? (
        <p className="text-red-700 font-normal max-w-[240px]">
          {submitMutation.error.message}
        </p>
      ) : undefined}
    </div>
  )
}
