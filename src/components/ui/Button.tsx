import { forwardRef, MouseEventHandler, ReactNode } from "react";

export interface ButtonProps {
    text: string,
    type?: "button" | "reset" | "submit",
    classList?: string,
    classes?: string,
    fn?: MouseEventHandler<HTMLButtonElement>,
    disabled?: boolean,
    children?: ReactNode[]
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props: ButtonProps, ref) {
  const className = props.classList || "z-10 text-[.875rem] [line-height:1.71] text-white bg-primary rounded-[4px] font-bold py-1 px-3 disabled:bg-dark disabled:opacity-75 disabled:text-dark " + props.classes;

  return (
    <button 
      type={!!props.type ? props.type : undefined} 
      onClick={!!props.fn ? props.fn : undefined } 
      className={className} 
      disabled={!!props.disabled} 
      ref={ref}
    >
      {props.text}
      {props.children}
    </button>
  );
}); 