export default defineNitroConfig({
	routeRules: {
		"/assets/**": {
			static: true,
			headers: {
				"cache-control": `public, max-age=${365 * 24 * 60 * 60}, immutable`, // 1 year
			},
		},
	},
	rollupConfig: {
		onwarn(warning, warn) {
			if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
				return;
			}
			warn(warning);
		},
		onLog(level, log, handler) {
			if (log.code === "MODULE_LEVEL_DIRECTIVE") {
				return;
			}
			handler(level, log);
		},
	},
});
