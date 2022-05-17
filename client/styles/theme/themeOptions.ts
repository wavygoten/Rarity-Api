import { ThemeOptions } from "@mui/material/styles";
import { grey } from "@mui/material/colors";
export const darkThemeOptions: ThemeOptions = {
	palette: {
		mode: "dark",
		primary: {
			main: "#356957",
			dark: "#1f2024",
			light: "#fff",
		},
		action: {
			hover: "#42836d",
			disabled: grey[500],
		},
		background: {
			default: "#191a1d",
		},
	},
	typography: {
		fontFamily: ["Rubik", "sans-serif"].join(","),
		button: {
			textTransform: "none",
		},
		allVariants: {
			whiteSpace: "nowrap",
		},
	},
	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 900,
			lg: 1200,
			xl: 1536,
		},
	},
	components: {
		MuiButton: {
			defaultProps: {
				disableElevation: true,
				disableFocusRipple: true,
				disableRipple: true,
			},
			variants: [
				{
					props: { variant: "outlined" },
					style: {
						backgroundColor: "#1f2024",
						color: "#fff",
					},
				},
				{
					props: { variant: "contained" },
					style: {
						backgroundColor: "#356957",
						color: "#fff",
					},
				},
			],
		},
		MuiOutlinedInput: {
			styleOverrides: {
				input: {
					"&:-webkit-autofill": {
						"-webkit-box-shadow": "0 0 0 100px #1f2024 inset",
						"-webkit-text-fill-color": "#fff",
					},
				},
			},
		},
		MuiDivider: {
			styleOverrides: {
				root: {
					color: grey[700],
					borderWidth: "1px",
				},
			},
		},
	},
};

export const lightThemeOptions: ThemeOptions = {
	palette: {
		mode: "light",
		primary: {
			main: "#fff",
			dark: "#fff",
		},
		secondary: {
			main: "#f4f4f4",
		},
		action: {
			hover: "#42836d",
		},
	},
	// components: {
	//   MuiButton: {
	//     variants: [
	//       {
	//         props: { variant: "contained" },
	//         style: {
	//           color: "356957",
	//         },
	//       },
	//     ],
	//     defaultProps: {
	//       style: {
	//         textAlign: "center",
	//       },
	//     },
	//   },
	// },
};
