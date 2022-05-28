import React, { useContext } from "react";
/** @jsxImportSource @emotion/react */
import { jsx, css } from "@emotion/react";
import { RarityContext } from "../../contexts/Rarity.context";
import { useCx } from "../../hooks";
import {
	styled,
	Theme,
	CSSObject,
	useTheme,
	useMediaQuery,
	TextField,
	Divider,
	IconButton,
	Drawer,
} from "@mui/material";
import { Search, ChevronLeft, ChevronRight } from "@mui/icons-material";

const openedMixin = (theme: Theme): CSSObject => ({
	width: 300,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});
const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

const StyledDrawer = styled(Drawer, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	width: 300,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	position: "relative",
	zIndex: 1,
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

const Content = () => {
	const [open, toggleOpen] = React.useReducer((state: boolean) => {
		return !state;
	}, false);
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
		flexRow: css`
			display: flex;
			flex-flow: row wrap;
		`,
		flexCol: css`
			display: flex;
			flex-flow: column nowrap;
			width: fit-content;
			&:first-of-type {
				width: 300px;
				background-color: ${theme.palette.primary.dark};
				border-radius: 12px;
				margin-right: 2rem;
				padding: 1.5rem;
			}
		`,
		flexGrow: css`
			flex: 1 1 auto;
		`,
		firstFlexContainers: css`
			margin-bottom: 2rem;
		`,
		traitsCollectionHeader: css`
			padding-bottom: 0.5rem;
			font-size: 16px;
			border-bottom: 1px solid ${theme.palette.grey[500]};
		`,
		input: css`
			background-color: ${theme.palette.primary.dark};
		`,
	};
	const classes = {
		root: cx(styles.root, "content-root"),
		flexRow: cx(styles.flexRow, "content-flex_Row"),
		flexCol: cx(styles.flexCol, "content-flex_Col"),
		input: cx(styles.input, "content-StyledInput"),
	};
	return (
		<section className="content">
			<div className={classes.root}>
				<div className={classes.flexRow}>
					<div className={classes.flexCol}>
						<div css={styles.firstFlexContainers}>
							<div css={styles.traitsCollectionHeader}>Collection Index</div>
							<div
								css={css`
									margin-top: 1rem;
								`}
							>
								<TextField
									className={classes.input}
									variant="outlined"
									label="Search Token"
									onChange={Content_onChange}
									name="searchToken"
									size="small"
									InputProps={{ endAdornment: <Search></Search> }}
								></TextField>
							</div>
						</div>
						<div css={styles.firstFlexContainers}>
							<div css={styles.traitsCollectionHeader}>Traits Index</div>
							<div className="trait-containers">
								<div
									className="trait-item-btn"
									css={css`
										background-color: ${theme.palette.secondary.dark};
										padding: 0.5rem;
										border-radius: 8px;
										margin: 1rem 0;
									`}
								>
									<div
										className="trait"
										css={css`
											display: flex;
											justify-content: space-between;
											align-items: center;
										`}
									>
										<div>Trait</div>
										<div>
											<ChevronLeft />
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* <div
							id="drawer-container"
							css={css`
								position: relative;
							`}
						>
							<StyledDrawer
								variant="permanent"
								open={!open}
								PaperProps={{
									style: {
										position: "absolute",
									},
								}}
								BackdropProps={{
									style: { position: "absolute", display: "none" },
								}}
								ModalProps={{
									container: document.getElementById("drawer-container"),
									style: { position: "absolute" },
								}}
							>
								<DrawerHeader>
									<IconButton onClick={toggleOpen}>
										{open ? <ChevronRight /> : <ChevronLeft />}
									</IconButton>
								</DrawerHeader>
							</StyledDrawer>
						</div> */}
					</div>

					<div className={classes.flexCol}>
						<div css={styles.flexGrow}>Cards</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Content;
