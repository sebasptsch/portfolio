// src/routes/__root.tsx
/// <reference types="vite/client" />

import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import fontsourceVariableRobotoCss from "@fontsource-variable/roboto?url";
import {
	CssBaseline,
	InitColorSchemeScript,
	ThemeProvider,
} from "@mui/material";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
	createRootRoute,
	HeadContent,
	Outlet,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import type { ReactNode } from "react";
import { attribute, theme } from "../utils/theme";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "TanStack Start Starter",
			},
		],
		links: [{ rel: "stylesheet", href: fontsourceVariableRobotoCss }],
	}),
	component: RootComponent,
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function Providers({ children }: { children: React.ReactNode }) {
	const emotionCache = createCache({ key: "css" });

	return (
		<CacheProvider value={emotionCache}>
			<InitColorSchemeScript attribute={attribute} />
			<ThemeProvider theme={theme}>
				{children}
				<CssBaseline enableColorScheme />
			</ThemeProvider>
		</CacheProvider>
	);
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body>
				<Providers>{children}</Providers>
				<TanStackRouterDevtools position="bottom-right" />
				<ReactQueryDevtools buttonPosition="bottom-left" />
				<Scripts />
			</body>
		</html>
	);
}
