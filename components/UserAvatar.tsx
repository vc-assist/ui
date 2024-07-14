import { Avatar, useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";
import { Color } from "../lib/color";
import { Format } from "../lib/format";

export function useStringToMantineColor(text: string): string {
  const theme = useMantineTheme();
  const [color, setColor] = useState("gray");

  useEffect(() => {
    const colors: Record<string, string> = {};
    for (const k in theme.colors) {
      colors[k] = theme.colors[k][5];
    }
    Color.fromString(text, colors)
      .then((value) => {
        if (!value) {
          return
        }
        setColor(value)
      })
  }, [text, theme.colors]);

  return color;
}

export type UserProfile = {
  name?: string
  email: string
  picture?: string
}

export function UserAvatar(props: UserProfile & { className?: string; }) {
  const defaultColor = useStringToMantineColor(
    props.name ?? props.email,
  );

  return (
    <Avatar
      className={props.className}
      styles={{
        placeholder: { fontSize: "inherit" },
      }}
      src={props.picture}
      color={defaultColor}
      variant="filled"
      radius="lg"
    >
      {Format.initials(props.name ?? props.email)}
    </Avatar>
  );
}
