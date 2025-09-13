import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { compile, run } from "@mdx-js/mdx";
import rehypeShikijs from "@shikijs/rehype";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import type { MDXModule } from "mdx/types";
import { Fragment, useEffect, useState } from "react";
import * as runtime from "react/jsx-runtime";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import { z } from "zod";

const postsPath = "../../../content/blog/";

const serverFn = createServerFn({
	method: "GET",
	type: import.meta.env.PROD ? "static" : "dynamic",
})
	.validator(z.string())
	.handler(async ({ data }) => {
		const path = fileURLToPath(import.meta.resolve(`${postsPath}${data}.mdx`));
		const fileContent = await readFile(path, "utf-8");
		const mdxFnBody = await compile(fileContent, {
			outputFormat: "function-body",
			rehypePlugins: [
				[
					rehypeShikijs,
					{
						themes: {
							light: "vitesse-light",
							dark: "vitesse-dark",
						},
					},
				],
			],
			remarkPlugins: [remarkGfm, remarkFrontmatter],
		});
		return mdxFnBody.toString();
	});

export const Route = createFileRoute("/blog/$slug")({
	component: RouteComponent,
	loader: ({ params }) => serverFn({ data: params.slug }),
});

function RouteComponent() {
	const code = Route.useLoaderData();

	const [mdxModule, setMdxModule] = useState<MDXModule>();
	const Content = mdxModule ? mdxModule.default : Fragment;

	useEffect(() => {
		(async () => {
			setMdxModule(await run(code, { ...runtime, baseUrl: import.meta.url }));
		})();
	}, [code]);

	return <Content />;
}
