import { useComputedColorScheme, useMantineColorScheme } from "@mantine/core"
import { MdDarkMode, MdLightMode } from "react-icons/md"
import { twMerge } from "tailwind-merge"

export function ThemeToggleButton() {
  const colorScheme = useComputedColorScheme()
  const { toggleColorScheme } = useMantineColorScheme()

  const ButtonIcon = colorScheme === "light" ? MdLightMode : MdDarkMode

  return (
    <button
      type="button"
      className={twMerge(
        "p-2 mt-auto w-fit text-dimmed hover:text-primary",
        "transition-all rounded-full",
      )}
      onClick={toggleColorScheme}
    >
      <ButtonIcon className="size-6" />
    </button>
  )
}
