import { twMerge } from "tailwind-merge";

export function BrandTag(props: { className?: string }) {
  return (
    <div
      className={twMerge("flex items-end w-fit h-fit", props.className)}
      style={{ gap: "0.375rem" }}
    >
      <img
        alt="logo"
        src="/favicon.svg"
        width="24"
        height="24"
        className="d-inline-block"
      />
      <p className="font-semibold">VC Assist</p>
    </div>
  );
}
