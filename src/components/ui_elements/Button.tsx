import { MouseEventHandler } from "react";

export interface ButtonProps {
    text: string,
    type?: "button" | "reset" | "submit",
    classList?: string,
    classes?: string,
    fn?: MouseEventHandler<HTMLButtonElement>
}

export function Button(props: ButtonProps) {
  const className = props.classList || "text-[.875rem] [line-height:1.71] text-white bg-primary rounded-[4px] font-bold py-1 px-3" + props.classes;

  return (
    <button type={!!props.type ? props.type : undefined} onClick={!!props.fn ? props.fn : undefined } className={className}>{props.text}</button>
  );
}