import { useRef, useState } from "react";
import { Chat, type ChatMessage } from "./Chat";
import { HiSparkles } from "react-icons/hi";

export function AIChat(props: {
  className?: string;
  aiName: string;
  introduction?: string;
  createThread: (
    message: string,
  ) => Promise<{ threadId: string; completion: string }>;
  addMessage: (threadId: string, message: string) => Promise<string>;
}) {
  const threadId = useRef<string>();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Chat
      className={props.className}
      messages={
        props.introduction
          ? [
              {
                user: props.aiName,
                avatar: <HiSparkles size={20} />,
                text: props.introduction,
                time: new Date(),
              },
              ...messages,
            ]
          : messages
      }
      disabled={isLoading}
      typingDisplay={
        isLoading
          ? {
              name: "Jarvis",
              text: "Thinking",
            }
          : undefined
      }
      send={async (message) => {
        setIsLoading(true);
        try {
          if (threadId.current === undefined) {
            const { completion, threadId: id } =
              await props.createThread(message);
            threadId.current = id;
            setMessages([
              ...messages,
              {
                user: props.aiName,
                text: completion,
                avatar: <HiSparkles size={20} />,
                time: new Date(),
              },
            ]);
            setIsLoading(false);
            return;
          }
          const completion = await props.addMessage(threadId.current, message);
          setMessages([
            ...messages,
            {
              user: props.aiName,
              text: completion,
              avatar: <HiSparkles size={20} />,
              time: new Date(),
            },
          ]);
          setIsLoading(false);
        } catch (err) {
          setIsLoading(false);
        }
      }}
    />
  );
}
