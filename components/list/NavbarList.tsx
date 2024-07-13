import type { IconType } from "react-icons";
import { HiUser } from "react-icons/hi";
import { Panel } from "../panel/Panel";
import { Title } from "@mantine/core";
import { twMerge } from "tailwind-merge";

type NavButtonProps = {
  icon: (props: { className?: string }) => JSX.Element;
  label?: string;
  routeSelected: boolean
  onClick: () => void;
};

function NavButton(props: NavButtonProps) {
  const className = twMerge(
    "flex gap-2 rounded-xl transition-all p-3 min-[400px]:p-4",
    "focus:outline focus:outline-2 focus:outline-dimmed bg-bg",
    props.routeSelected
      ? "bg-bg-dimmed text-dimmed hover:text-dimmed fill-primary"
      : "text-dimmed fill-dimmed hover:cursor-pointer hover:text-primary",
  );

  const children = (
    <>
      <props.icon className="min-w-[2rem] min-h-[2rem]" />
      {props.label ? (
        <Title className="leading-8" order={5}>
          {props.label}
        </Title>
      ) : undefined}
    </>
  );

  if (props.onClick) {
    return (
      <button className={className} onClick={props.onClick}>
        {children}
      </button>
    );
  }

  // this is done so one can "tab" over buttons that don't do anything
  return <div className={className}>{children}</div>;
}

export type NavbarRoute = {
  title: string;
  icon: IconType;
  route: string;
};

export function NavbarList(props: {
  route: string;
  routes: NavbarRoute[];
  layout: "mobile" | "desktop";
  onNavigate: (route: string) => void;
}) {
  if (props.layout === "mobile") {
    return (
      <Panel className="m-auto overflow-x-auto" noPadding>
        <div className="max-w-min flex flex-1 p-2">
          {props.routes.map(({ route, icon }) => {
            return (
              <NavButton
                key={route}
                routeSelected={props.route === route}
                icon={icon}
                onClick={() => {
                  props.onNavigate(route);
                }}
              />
            );
          })}
          <NavButton
            routeSelected={props.route === "/profile"}
            icon={HiUser}
            onClick={() => {
              props.onNavigate("/profile");
            }}
          />
        </div>
      </Panel>
    );
  }

  return (
    <Panel
      className="flex flex-col flex-1 overflow-y-auto p-2 whitespace-nowrap"
      noPadding
    >
      {props.routes.map(({ title, route: path, icon }) => {
        return (
          <NavButton
            key={path}
            icon={icon}
            label={title}
            routeSelected={props.route === path}
            onClick={() => {
              props.onNavigate(path);
            }}
          />
        );
      })}
    </Panel>
  );
}
