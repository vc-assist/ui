import { useComputedColorScheme, useMantineColorScheme } from "@mantine/core"
import { MdDarkMode, MdLightMode } from "react-icons/md"

export function ThemeToggle() {
  const colorScheme = useComputedColorScheme()
  const { toggleColorScheme } = useMantineColorScheme()

  const ButtonIcon = colorScheme === "light" ? MdLightMode : MdDarkMode

  return (
    <button
      type="button"
      className="p-1 mt-auto w-fit fill-dimmed hover:text-primary"
      onClick={toggleColorScheme}
    >
      <ButtonIcon />
    </button>
  )
}
