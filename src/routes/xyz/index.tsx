import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/xyz/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/xyz/"!</div>
}
