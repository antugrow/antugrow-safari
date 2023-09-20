import { DetailedHTMLProps, ButtonHTMLAttributes, ReactNode } from "react";

export interface HomeButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}
