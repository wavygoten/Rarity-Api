import React from "react";
import { Stack, IconButton } from "@mui/material";
import { Logo, StyledButton, Input } from "./components";
import Image from "next/image";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { Search } from "@mui/icons-material";
type Props = {};

const Navbar = (props: Props) => {
  const styles = {
    div: {
      outlined: css`
        margin-left: 5px;
      `,
    },
  };
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      p={4}
    >
      <Logo>Trait Surfer</Logo>
      <Stack direction="row">
        {" "}
        <Input
          variant="outlined"
          label="Search Contract"
          size="small"
          InputProps={{
            endAdornment: (
              <IconButton>
                <Search aria-label="search icon"></Search>
              </IconButton>
            ),
          }}
        />
      </Stack>
      <Stack direction="row" spacing={1}>
        <StyledButton variant="contained">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Image
              width="24px"
              height="24px"
              src="https://traitsurfer.app/static/media/metamask.45038d58.svg"
              alt="mmlogo"
            />

            <div css={styles.div.outlined}> Connect to MetaMask</div>
          </Stack>
        </StyledButton>
      </Stack>
    </Stack>
  );
};

export default Navbar;
