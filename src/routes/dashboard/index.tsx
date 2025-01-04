import { createFileRoute } from '@tanstack/react-router'
import { useContext } from 'react'
import { AuthContext } from '../../modules/auth/context/auth-context'
import { Button } from '@/components/ui/button'

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { state, login } = useContext(AuthContext)

  return (
    <div>
      {' '}
      <Button className="text-red-500 font-medium">Click me</Button>
      Hello "/dashboard/"! {state.user}
    </div>
  )
}
