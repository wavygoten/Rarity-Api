import React, { ReactNode } from "react";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { Stack, StackProps } from "@mui/material";

export const StyledStack = ({ children, ...args }: StackProps) => {
	const styles = {
		root: css`
			display: flex;
			align-items: center;
		`,
	};
	return (
		<Stack css={styles.root} {...args}>
			{children}
		</Stack>
	);
};
