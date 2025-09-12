import { Container, Stack, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<Container>
			<Stack spacing={2} alignItems="center" justifyContent="center" mt={4}>
				<Typography variant="h1" component={"h1"}>
					Welcome to Sebastian Pietschner's soon-to-be portfolio!
				</Typography>
				<Typography variant="h2" component={"h2"}>
					Under construction 🚧
				</Typography>
			</Stack>
		</Container>
	);
}
