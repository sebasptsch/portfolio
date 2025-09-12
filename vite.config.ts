import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

const ReactCompilerConfig = {
	target: "19",
};

export default defineConfig({
	server: {
		port: 3000,
	},
	plugins: [
		tsConfigPaths(),
		tanstackStart({ customViteReactPlugin: true, target: "cloudflare-module" }),
		viteReact({
			babel: {
				plugins: [
					["babel-plugin-react-compiler", ReactCompilerConfig],
					[
						"@emotion/babel-plugin",
						{
							importMap: {
								"@mui/system": {
									styled: {
										canonicalImport: ["@emotion/styled", "default"],
										styledBaseImport: ["@mui/system", "styled"],
									},
								},
								"@mui/material": {
									styled: {
										canonicalImport: ["@emotion/styled", "default"],
										styledBaseImport: ["@mui/material", "styled"],
									},
								},
								"@mui/material/styles": {
									styled: {
										canonicalImport: ["@emotion/styled", "default"],
										styledBaseImport: ["@mui/material/styles", "styled"],
									},
								},
							},
						},
					],
				],
			},
		}),
	],
});
