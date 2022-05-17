import React, { ReactNode } from "react";
import { Title } from "../styles/Logo";

type Props = {
  children: ReactNode;
};

export const Logo = ({ children, ...args }: Props) => {
  return <Title>{children}</Title>;
};
