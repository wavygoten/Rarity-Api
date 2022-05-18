import React, { useContext, useReducer } from "react";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import {
  Stack,
  Avatar,
  Divider,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link } from "@mui/icons-material";
import { RarityContext } from "../../contexts/Rarity.context";
import { StyledStack } from "./components/StyledStack";
import EthereumLogoSvg from "../../../public/ethereum-svgrepo-com.svg";
import Image from "next/image";
import { useCx } from "../../hooks/";
const Stats = () => {
  const theme = useTheme();
  const cx = useCx();
  const md = useMediaQuery(theme.breakpoints.up("md"));
  const { Stats_collection, Stats_contract } = useContext(RarityContext);
  const styles = {
    root: css`
      justify-content: space-between;
      flex-flow: ${md ? "row" : "column"} wrap;
    `,
    labels: css`
      font-size: ${md ? "20px" : "16px"};
      display: flex;
      align-items: center;
    `,
    leftStack: css`
      &:first-of-type {
        margin-left: 0;
      }
      margin: 1rem ${md ? "2.5rem" : "1rem"};
      flex-wrap: wrap;
    `,
    styleStack: css`
      justify-content: ${!md ? "center" : ""};
      margin-bottom: 1rem;
    `,
    imageStyles: css`
      width: 24px;
      height: 24px;
      margin-left: 5px;
    `,
    linksContainer: css`
      font-size: ${md ? "20px" : "16px"};
      display: flex;
      align-items: center;
      margin: 0 1rem;
    `,
    links: css`
      background: linear-gradient(${theme.palette.action.hover} 0 0)
        var(--p, 100%) 100% / var(--d, 0) 2px no-repeat;
      margin: 0 1rem;
      &:hover {
        cursor: pointer;
        transition: 275ms, background-position 0s 0.3s;
        --d: 100%;
        --p: 0%;
      }
    `,
  };

  const classes = {
    root: cx(styles.root, "stats-root"),
    labels: cx(styles.labels, "labels"),
    leftStack: cx(styles.leftStack, "leftStack"),
    styleStack: cx(styles.styleStack, "styledStack"),
    imageStyles: cx(styles.imageStyles, "imageStyles"),
    linksContainer: cx(styles.linksContainer, "linksContainer"),
    links: cx(styles.links, "links"),
  };
  return (
    <section className="stats">
      <Stack className={classes.root} p={md ? 4 : 3}>
        <StyledStack direction="row" className={classes.styleStack}>
          {Stats_collection?.image_url ? (
            <>
              <StyledStack direction="column" className={classes.leftStack}>
                <Avatar
                  sx={
                    md ? { width: 80, height: 80 } : { width: 60, height: 60 }
                  }
                  alt="col-img"
                  src={Stats_collection?.image_url}
                ></Avatar>
              </StyledStack>
              <Divider orientation="vertical" flexItem={true} />
            </>
          ) : (
            <></>
          )}
          <StyledStack direction="row" className={classes.leftStack}>
            <StyledStack direction="column" spacing={4}>
              {" "}
              <div className={classes.labels}>Floor</div>
              <div className={classes.labels}>
                {Stats_collection?.stats?.floor_price ? (
                  <>
                    {Stats_collection?.stats?.floor_price}
                    <div className={classes.imageStyles}>
                      <Image src={EthereumLogoSvg} alt="eth-logo"></Image>
                    </div>
                  </>
                ) : (
                  "___"
                )}
              </div>
            </StyledStack>
          </StyledStack>
          <Divider orientation="vertical" flexItem={true} />
          <StyledStack direction="row" className={classes.leftStack}>
            <StyledStack direction="column" spacing={4}>
              {" "}
              <div className={classes.labels}>Volume</div>
              <div className={classes.labels}>
                {Stats_collection?.stats?.total_volume ? (
                  <>
                    {Stats_collection?.stats?.total_volume.toFixed(2)}
                    <div className={classes.imageStyles}>
                      <Image src={EthereumLogoSvg} alt="eth-logo"></Image>
                    </div>
                  </>
                ) : (
                  "___"
                )}
              </div>
            </StyledStack>{" "}
          </StyledStack>
          <Divider orientation="vertical" flexItem={true} />

          <StyledStack direction="row" className={classes.leftStack}>
            <StyledStack direction="column" spacing={4}>
              {" "}
              <div className={classes.labels}>Owners</div>
              <div className={classes.labels}>
                {Stats_collection?.stats?.num_owners
                  ? Stats_collection?.stats?.num_owners
                  : "___"}
              </div>
            </StyledStack>
          </StyledStack>
          <Divider orientation="vertical" flexItem={true} />

          <StyledStack direction="row" className={classes.leftStack}>
            <StyledStack direction="column" spacing={4}>
              {" "}
              <div className={classes.labels}>Items</div>
              <div className={classes.labels}>
                {Stats_collection?.stats?.count
                  ? Stats_collection?.stats?.count
                  : "___"}
              </div>
            </StyledStack>
          </StyledStack>
          <Divider orientation="vertical" flexItem={true} />
        </StyledStack>

        {/* links here */}
        <StyledStack direction="row" className={classes.styleStack}>
          <div className={classes.linksContainer}>
            {" "}
            <Link></Link>
            <a
              href={
                Stats_contract
                  ? `https://etherscan.io/address/${Stats_contract}`
                  : ""
              }
              className={classes.links}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              {" "}
              <li>Etherscan</li>
            </a>{" "}
          </div>
          <div className={classes.linksContainer}>
            {" "}
            <Link></Link>
            <a
              href={
                Stats_collection
                  ? `https://opensea.io/collection/${Stats_collection?.slug}`
                  : ""
              }
              className={classes.links}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              <li>Opensea</li>
            </a>
          </div>{" "}
        </StyledStack>
      </Stack>
    </section>
  );
};

export default Stats;
