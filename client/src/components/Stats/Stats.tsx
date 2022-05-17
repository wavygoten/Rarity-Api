import React, { useContext, useReducer } from "react";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { Avatar, Divider, useTheme, useMediaQuery } from "@mui/material";
import { RarityContext } from "../../contexts/Rarity.context";
import { StyledStack } from "./components/StyledStack";

const Stats = () => {
	const theme = useTheme();
	const md = useMediaQuery(theme.breakpoints.up("md"));
	const { Stats_collection, Stats_contract } = useContext(RarityContext);
	const styles = {
		root: css``,
		labels: css`
			font-size: 22px;
			user-select: none;
		`,
		leftStack: css`
			&:first-of-type {
				margin-left: 0;
			}
			margin: 0 ${md ? "2.5rem" : "1.25rem"};
		`,
	};
	return (
		<section className="stats">
			<StyledStack direction="row" p={4}>
				{Stats_collection ? (
					<>
						<StyledStack direction="column" css={styles.leftStack}>
							<Avatar
								sx={{ width: 80, height: 80 }}
								alt="col-img"
								src={Stats_collection?.image_url}
							></Avatar>
						</StyledStack>
						<Divider orientation="vertical" flexItem={true} />
					</>
				) : (
					<></>
				)}
				<StyledStack direction="row" css={styles.leftStack}>
					<StyledStack direction="column" spacing={4}>
						{" "}
						<div css={styles.labels}>Floor</div>
						<div css={styles.labels}>___</div>
					</StyledStack>
				</StyledStack>
				<Divider orientation="vertical" flexItem={true} />
				<StyledStack direction="row" css={styles.leftStack}>
					<StyledStack direction="column" spacing={4}>
						{" "}
						<div css={styles.labels}>Volume</div>
						<div css={styles.labels}>___</div>
					</StyledStack>{" "}
				</StyledStack>
				<Divider orientation="vertical" flexItem={true} />

				<StyledStack direction="row" css={styles.leftStack}>
					<StyledStack direction="column" spacing={4}>
						{" "}
						<div css={styles.labels}>Owners</div>
						<div css={styles.labels}>___</div>
					</StyledStack>
				</StyledStack>
				<Divider orientation="vertical" flexItem={true} />

				<StyledStack direction="row" css={styles.leftStack}>
					<StyledStack direction="column" spacing={4}>
						{" "}
						<div css={styles.labels}>Items</div>
						<div css={styles.labels}>___</div>
					</StyledStack>
				</StyledStack>
				<Divider orientation="vertical" flexItem={true} />
			</StyledStack>
		</section>
	);
};

export default Stats;
