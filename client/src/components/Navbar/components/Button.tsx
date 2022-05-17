import React from "react";
import { styled } from "@mui/system";
import { Button } from "@mui/material";
type Props = {};
export const StyledButton = styled(Button)<Props>(
  ({ theme, ...args }: Props | any) => ({
    fontSize: "14px",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    padding: "7px 13px",
  })
);
