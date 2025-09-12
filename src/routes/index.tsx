import { Typography } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Typography variant='h1' component={"h1"}>Hello "/"!</Typography>
}
