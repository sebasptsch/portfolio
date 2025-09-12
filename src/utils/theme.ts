import { createTheme } from "@mui/material";

export const attribute: "media" | "class" | "data" = "class";

export const theme = createTheme({
	typography: {
		fontFamily: "'Roboto Variable', sans-serif",
	},
	colorSchemes: {
		dark: true,
		light: true,
	},
	cssVariables: {
		colorSchemeSelector: attribute,
	},
});
