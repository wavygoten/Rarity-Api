import React from "react";
import { Stack, IconButton } from "@mui/material";
import { StyledButton, Input } from "./components";
import Image from "next/image";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { Search, Twitter, Instagram } from "@mui/icons-material";
type Props = {};

const Navbar = (props: Props) => {
  const styles = {
    title: css`
      font-size: 32px;
      font-weight: 500;
      text-align: center;
      user-select: none;
    `,
    div: css`
      margin-left: 5px;
    `,
    links: css`
      cursor: pointer;
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
      transition: 100ms ease-in-out;
    `,
  };
  return (
    <nav className="navbar">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        p={4}
      >
        <div css={styles.title}>Trait Surfer</div>
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

        <Stack direction="row" spacing={3}>
          <Instagram color="primary" css={styles.links} />
          <Twitter color="primary" css={styles.links} />
        </Stack>
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
            <div css={styles.div}> Connect to MetaMask</div>
          </Stack>
        </StyledButton>
      </Stack>
    </nav>
  );
};

export default Navbar;
