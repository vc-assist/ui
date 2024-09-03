import "@mantine/carousel/styles.css"

import { Carousel, type Embla } from "@mantine/carousel"
import { Avatar, Button, Title, rem } from "@mantine/core"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { MdArrowBack, MdArrowForward, MdEdit } from "react-icons/md"
import { twMerge } from "tailwind-merge"
import { OAuthForm, UsernamePasswordForm } from "./credential-forms"
import { BrandTag, Panel, UserAvatar } from "../components"
import { ErrorPage } from "./error"
import { useImageToColor, useStringToMantineColor } from "../lib"
import type { UserProfile } from "../components"

export type CredentialState = {
  name: string
  picture?: string
  provided: boolean
  loginFlow: {
    type: "oauth",
    /**
     * This function should throw when an error happens.
     */
    onStart(): Promise<void>
  } | {
    type: "usernamePassword",
    /**
     * This function should throw when an error happens.
     */
    onSubmit(username: string, password: string): Promise<void>
  }
}

function CredentialForm(props: {
  className?: string
  profile: UserProfile
  status: CredentialState
  onSuccess(): void
}) {
  const pictureColor = useImageToColor(props.status.picture ?? "")
  const fallbackColor = useStringToMantineColor(props.status.name)
  const [editing, setEditing] = useState(!props.status.provided)

  const color = pictureColor ?? fallbackColor

  let form = <></>
  switch (props.status.loginFlow.type) {
    case "usernamePassword":
      form = (
        <UsernamePasswordForm
          color={color}
          credentialId={props.status.name}
          onSubmit={props.status.loginFlow.onSubmit}
          onSuccess={props.onSuccess}
        />
      )
      break
    case "oauth":
      form = (
        <OAuthForm
          color={color}
          credentialId={props.status.name}
          onStart={props.status.loginFlow.onStart}
          onSuccess={props.onSuccess}
        />
      )
      break
  }

  return (
    <Panel className={twMerge("flex flex-col gap-4 max-w-xs", props.className)}>
      <Avatar.Group>
        <UserAvatar className="rounded-full w-14 h-14" {...props.profile} />
        <Avatar
          classNames={{
            root: "rounded-full w-14 h-14",
            placeholder: "text-xl",
          }}
          c={color}
          variant="filled"
          src={props.profile.picture}
        >
          {props.status.name[0].toUpperCase()}
        </Avatar>
      </Avatar.Group>

      <div className="flex flex-col gap-2">
        <Title order={3}>
          {editing ? "Enter your credentials" : "Credentials provided"}
        </Title>
        <p>
          {editing ? (
            <>
              By providing your <b>{props.status.name}</b> credentials to VC
              Assist, you&apos;re enabling VC Assist to retrieve your data.
            </>
          ) : (
            <>
              You have already provided your <b>{props.status.name}</b>{" "}
              credentials.
            </>
          )}
        </p>
      </div>

      {!editing ? (
        <div className="flex gap-3">
          <Button
            variant="outline"
            c="gray"
            leftSection={<MdEdit size={16} />}
            onClick={() => setEditing(true)}
          >
            Edit
          </Button>
        </div>
      ) : (
        form
      )}

      {props.status.provided && editing ? (
        <Button
          className="w-fit m-auto"
          variant="subtle"
          c="gray"
          onClick={() => setEditing(false)}
        >
          Stop editing
        </Button>
      ) : undefined}
    </Panel>
  )
}

export function CredentialCarousel(props: {
  className?: string
  profile: UserProfile
  credentials: CredentialState[]
  onComplete: () => void
}) {
  const [credentials, setCredentials] = useState(props.credentials)
  const [embla, setEmbla] = useState<Embla | null>(null)

  useEffect(() => {
    const complete = credentials.every((val) => val.provided)
    if (complete) {
      props.onComplete()
    }
  }, [credentials, props.onComplete])

  return (
    <>
      <Carousel
        className={props.className}
        slideSize="100%"
        w="100%"
        height="100%"
        withIndicators
        styles={{
          indicator: {
            width: rem(12),
            height: rem(4),
            transition: "width 250ms ease",
          },
        }}
        withControls
        withKeyboardEvents={false}
        controlSize={40}
        previousControlIcon={<MdArrowBack size={22} />}
        nextControlIcon={<MdArrowForward size={22} />}
        getEmblaApi={setEmbla}
      >
        {props.credentials.map((cred, i) => (
          <Carousel.Slide
            className="flex hover:cursor-grab active:cursor-grabbing"
            key={cred.name}
          >
            <CredentialForm
              status={cred}
              className="m-auto hover:cursor-auto"
              profile={props.profile}
              onSuccess={() => {
                credentials[i].provided = true
                setCredentials([...credentials])

                if (!embla) {
                  return
                }
                const idx = credentials.findIndex((c) => !c.provided)
                if (idx >= 0) {
                  embla.scrollTo(idx)
                }
              }}
            />
          </Carousel.Slide>
        ))}
      </Carousel>
      <BrandTag className="absolute bottom-12 left-1/2 -translate-x-1/2" />
    </>
  )
}

export function CredentialFlow(props: {
  profile: UserProfile
  getCredentialStatuses(): Promise<CredentialState[]>
  onComplete: () => void
}) {
  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["ProvideCredentialsPage", "getCredentialStatuses"],
    queryFn: props.getCredentialStatuses,
  })

  const completed = data?.every((c) => c.provided)
  useEffect(() => {
    if (!data || !completed) {
      return
    }
    props.onComplete()
  }, [completed, data, props.onComplete])

  if (isPending) {
    return
  }
  if (error) {
    return (
      <ErrorPage
        message="Failed to fetch student credential status."
        description={error.message}
      />
    )
  }

  return (
    <CredentialCarousel
      className={twMerge("transition-all", completed ? "blur-sm" : "")}
      profile={props.profile}
      credentials={data}
      onComplete={() => {
        refetch()
      }}
    />
  )
}
