import { twMerge } from "tailwind-merge"
import { Favicon } from "./Favicon"

export function BrandTag(props: { className?: string }) {
  return (
    <div
      className={twMerge("flex items-end w-fit h-fit", props.className)}
      style={{ gap: "0.375rem" }}
    >
      <Favicon className="w-[24px] h-[24px] d-inline-block" />
      <p className="font-semibold">VC Assist</p>
    </div>
  )
}
