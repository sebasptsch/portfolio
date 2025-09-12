import {
	MutationCache,
	matchQuery,
	QueryClient,
	type QueryKey,
} from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { routeTree } from "./routeTree.gen";

export function createRouter() {
	const queryClient = new QueryClient({
		mutationCache: new MutationCache({
			onSuccess: (_data, _vars, _context, mutation) => {
				queryClient.invalidateQueries({
					predicate: (query) =>
						mutation.meta?.invalidates?.some((queryKey) =>
							matchQuery({ queryKey }, query),
						) ?? false,
				});
			},
		}),
	});

	const router = createTanStackRouter({
		routeTree,
		context: { queryClient },
		defaultPreload: "intent",
		defaultErrorComponent: (err) => <p>{err.error.stack}</p>,
		defaultNotFoundComponent: () => <p>not found</p>,
		scrollRestoration: true,
	});

	setupRouterSsrQueryIntegration({
		router,
		queryClient,
	});

	return router;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof createRouter>;
	}
}

declare module "@tanstack/react-query" {
	interface Register {
		mutationMeta: {
			invalidates?: Array<QueryKey>;
		};
	}
}
