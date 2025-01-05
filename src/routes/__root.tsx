import * as React from 'react'
import { Link, Outlet, createRootRoute, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { useAuth } from '@/modules/auth/hooks/useAuth'

interface IRouterContext {
  auth: ReturnType<typeof useAuth>
}

export const Route = createRootRouteWithContext<IRouterContext>()({
  component: RootComponent,

})

function RootComponent() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
}
