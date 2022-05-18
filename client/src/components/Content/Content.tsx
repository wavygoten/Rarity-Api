import React, { useContext } from "react";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { RarityContext } from "../../contexts/Rarity.context";
import { useCx } from "../../hooks";
import { useTheme, useMediaQuery } from "@mui/material";

const Content = () => {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up("md"));
  const cx = useCx();
  const {
    Content_data,
    Content_handleCardLink,
    Content_handleNext,
    Content_handlePrev,
    Content_handleSort,
    Content_itemsPerPage,
    Content_matchExact,
    Content_onChange,
    Content_page,
    Content_paginationData,
    Content_searchToken,
  } = useContext(RarityContext);
  const data = [...Content_data];
  const styles = {
    root: css`
      padding: ${md ? "32px" : "24px"};
    `,
  };
  const classes = {
    root: cx(styles.root, "content-root"),
  };
  return (
    <section className="content">
      <div className={classes.root}>Content</div>
    </section>
  );
};

export default Content;
