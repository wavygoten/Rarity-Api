import React, { useContext, useReducer } from "react";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import {
  Stack,
  IconButton,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { StyledButton, Input } from "./components";
import Image from "next/image";
import { Search, Twitter, Instagram } from "@mui/icons-material";
import { RarityContext } from "../../contexts/Rarity.context";
import { useCx } from "../../hooks";
type Props = {};

const Navbar = ({ ...args }: Props) => {
  const theme = useTheme();
  const cx = useCx();
  const md = useMediaQuery(theme.breakpoints.up("md"));
  const {
    Nav_onChange,
    Nav_onClick,
    Nav_onMetaMaskClick,
    Nav_walletAddress,
    Nav_loading,
  } = useContext(RarityContext);
  const styles = {
    title: css`
      font-size: 32px;
      font-weight: 500;
      text-align: center;
      user-select: none;
    `,
    div: css`
      margin-left: 5px;
      font-size: 14px;
    `,
    links: css`
      cursor: pointer;
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
      transition: 100ms ease-in-out;
    `,
    input: css`
      width: ${md ? "450px" : "225px"};
    `,
  };

  const classes = {
    title: cx(styles.title, "nav-title"),
    div: cx(styles.div, "nav-div"),
    links: cx(styles.links, "nav-links"),
    input: cx(styles.input, "nav-input"),
  };

  return (
    <nav className="navbar">
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        p={md ? 4 : 3}
      >
        <div className={classes.title}>{md ? "Trait Surfer" : "TS"}</div>
        <Stack direction="row" spacing={2}>
          {" "}
          <Input
            variant="outlined"
            className={classes.input}
            label="Search Contract"
            onChange={Nav_onChange}
            name="searchContract"
            size="small"
            InputProps={{
              endAdornment: (
                <IconButton onClick={Nav_onClick}>
                  {Nav_loading ? (
                    <CircularProgress size="24px" />
                  ) : (
                    <Search aria-label="search icon" color="primary"></Search>
                  )}
                </IconButton>
              ),
            }}
          />
        </Stack>

        {md ? (
          <Stack direction="row" spacing={3}>
            <Instagram color="primary" className={classes.links} />
            <Twitter color="primary" className={classes.links} />
          </Stack>
        ) : (
          <></>
        )}

        <StyledButton variant="contained" onClick={Nav_onMetaMaskClick}>
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
            {md ? (
              <div className={classes.div}>{Nav_walletAddress}</div>
            ) : (
              <></>
            )}
          </Stack>
        </StyledButton>
      </Stack>
    </nav>
  );
};

export default Navbar;