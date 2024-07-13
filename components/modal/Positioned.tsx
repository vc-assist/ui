import { twMerge } from "tailwind-merge";
import { useSafeArea } from "../../foundation";

export function Positioned(props: {
  x: "left" | "center" | "right";
  y: "top" | "middle" | "bottom";
  padding?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const safeArea = useSafeArea();

  const padding = props.padding ?? "1rem";
  const style: Partial<React.CSSProperties> = {};
  const transform: string[] = [];

  switch (props.x) {
    case "left":
      style.left = `calc(${padding} + ${safeArea.left}px)`;
      break;
    case "center":
      style.left = `calc(50% + ${safeArea.left}px)`;
      transform.push("translateX(-50%)");
      break;
    case "right":
      style.right = `calc(${padding} + ${safeArea.right}px)`;
      break;
  }

  switch (props.y) {
    case "bottom":
      style.bottom = `calc(${padding} + ${safeArea.bottom}px)`;
      break;
    case "middle":
      style.bottom = `calc(50% + ${safeArea.bottom}px)`;
      transform.push("translateY(-50%)");
      break;
    case "top":
      style.top = `calc(${padding} + ${safeArea.top}px)`;
      break;
  }

  style.transform = transform.join(" ");

  return (
    <div className={twMerge("absolute", props.className)} style={style}>
      {props.children}
    </div>
  );
}
