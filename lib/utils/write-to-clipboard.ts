import { notifications } from "@mantine/notifications";

export function writeToClipboard(text: string, message = "Copied."): void {
  navigator.clipboard.write([
    new ClipboardItem({
      "text/plain": new Blob([text], {
        type: "text/plain",
      }),
    }),
  ]);
  notifications.show({
    autoClose: 1000,
    message: message,
    color: "green",
  });
}

