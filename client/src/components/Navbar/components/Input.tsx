import React from "react";
import { styled } from "@mui/system";
import { TextField } from "@mui/material";
type Props = {};
export const Input = styled(TextField)<Props>(
  ({ theme, ...args }: Props | any) => ({
    backgroundColor: theme.palette.primary.dark,
  })
);
