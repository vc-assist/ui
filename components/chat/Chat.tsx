import { Avatar, Button } from "@mantine/core"
import { formatDistance } from "date-fns"
import { createRef, forwardRef, useEffect, useState } from "react"
import { HiSparkles } from "react-icons/hi"
import { MdSend } from "react-icons/md"
import { twMerge } from "tailwind-merge"
import { useCurrentTime } from "../../lib/utils"
import { Panel } from "../panel/Panel"

export type ChatMessage = {
  user: string
  avatar: React.ReactNode
  text: string
  time: Date
}

const MessageDisplay = forwardRef(
  (
    { message }: { message: ChatMessage },
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const now = useCurrentTime()

    return (
      <div className="flex gap-3 items-start" ref={ref}>
        <Avatar>{message.avatar}</Avatar>
        <div>
          <div className="flex gap-2 items-center">
            <p className="font-semibold">{message.user}</p>
            <p className="text-xs text-gray-400 select-all">
              {formatDistance(message.time, now, { addSuffix: true })}
            </p>
          </div>
          <p className="whitespace-break-spaces leading-6 select-text">
            {message.text}
          </p>
        </div>
      </div>
    )
  },
)

function TypingDisplay(props: {
  name: string
  text: string
}) {
  const [loadingDots, setLoadingDots] = useState(".")
  const runGradient = true // TODO: make this a setting

  useEffect(() => {
    const interval = setInterval(
      () => setLoadingDots((dots) => (dots.length < 3 ? `${dots}.` : ".")),
      500,
    )
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex gap-3 items-start">
      <Avatar>
        {runGradient ? (
          <>
            <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <title>typing</title>
              <defs>
                <linearGradient
                  id="gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" className="start" />
                  <stop offset="100%" className="end" />
                </linearGradient>
              </defs>
              <HiSparkles size={20} fill="url(#gradient)" />
            </svg>
            <style>
              {" "}
              {/* Jarvis takes around 3 seconds to respond, so we animate the gradient to show that it's thinking. */}
              {`
          .start {
            stop-color: #ff008c;
            animation: slowGradient 3s infinite linear;
          }

          .end {
            stop-color: #3224ff;
            animation: slowGradient 3s infinite linear;
          }

          @keyframes slowGradient {
            0% {
              stop-color: #ff008c;
            }

            50% {
              stop-color: #3224ff;
            }

            100% {
              stop-color: #ff008c;
            }
          }
        `}
            </style>
          </>
        ) : (
          <HiSparkles size={20} />
        )}
      </Avatar>
      <div>
        <div className="flex gap-2 items-center">
          <p className="font-semibold">{props.name}</p>
          <p className="text-xs text-gray-400">----</p>
        </div>
        {/* If the loading time is longer than 3 seconds, we show a different message. */}
        <p className="whitespace-break-spaces leading-6">
          {props.text}
          {loadingDots}
        </p>
      </div>
    </div>
  )
}

export function Chat({
  disabled,
  messages,
  send,
  className,
  typingDisplay,
}: {
  className?: string
  messages: ChatMessage[]
  disabled: boolean
  send: (message: string) => void
  typingDisplay?: {
    name: string
    text: string
  }
}) {
  const [message, setQuestion] = useState("")

  const latestRef = createRef<HTMLDivElement>()
  // biome-ignore lint/correctness/useExhaustiveDependencies: I think this was necessary for some reason
  useEffect(() => {
    if (latestRef.current === null) {
      return
    }
    latestRef.current.scrollIntoView()
  }, [messages.length])

  return (
    <div className={twMerge("flex flex-col gap-6", className)}>
      <Panel className="flex flex-col gap-3 overflow-y-auto overflow-x-hidden flex-1">
        {messages.map((msg, index) => (
          <MessageDisplay
            // biome-ignore lint/suspicious/noArrayIndexKey: Order is preserved in chat history so this is okay
            key={index}
            message={msg}
            ref={index === messages.length - 1 ? latestRef : undefined}
          />
        ))}
        {typingDisplay ? <TypingDisplay {...typingDisplay} /> : undefined}
      </Panel>

      <div className="flex gap-3">
        <Panel className="flex-1 overflow-hidden" noPadding>
          <input
            type="text"
            className="p-4 w-full h-full text-sm outline-none"
            placeholder="Enter a message"
            value={message}
            onChange={(e) => setQuestion(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !(message.trim() === "") && !disabled) {
                void send(message)
              }
            }}
          />
        </Panel>
        <Button
          className="shadow-xl h-full"
          radius="0.75rem"
          loading={disabled}
          disabled={message.trim() === "" && !disabled}
          onClick={() => {
            void send(message)
          }}
        >
          <MdSend size="1rem" />
        </Button>
      </div>
    </div>
  )
}
