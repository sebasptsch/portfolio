import { Container, Stack, Typography } from "@mui/material";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<Container>
			<Stack spacing={2} alignItems="center" justifyContent="center" mt={4}>
				<Typography variant="h3" component={"h3"} textAlign={"center"}>
					Welcome to Sebastian Pietschner's soon-to-be portfolio!
				</Typography>
				<Typography variant="h4" component={"h4"} textAlign={"center"}>
					Under construction 🚧
				</Typography>
			</Stack>
		</Container>
	);
}
