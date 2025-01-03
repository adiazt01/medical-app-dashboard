import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/doc')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/doc"!</div>
}
