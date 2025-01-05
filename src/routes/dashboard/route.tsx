import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/toaster'
import { SidebarDashboard } from '@/modules/core/components/sidebar/sidebar-dashboard'
import { Separator } from '@radix-ui/react-separator'
import { Outlet, createFileRoute } from '@tanstack/react-router'
import React from 'react'

export const Route = createFileRoute('/dashboard')({
  component: LayoutComponent,
})

function LayoutComponent() {
  // Get the actual url and split with js
  const url = window.location.pathname
  const params = url.split('/').filter((param) => param !== '')

  return (
    <SidebarProvider>
      <Toaster />
      <SidebarDashboard />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                {params && params.length > 1 && (
                  <>
                    {params.map((param, index) => (
                      <React.Fragment key={index}>
                        <BreadcrumbItem>
                          <BreadcrumbPage>{param.charAt(0).toUpperCase() + param.slice(1)}</BreadcrumbPage>
                        </BreadcrumbItem>
                        {index < params.length - 1 && (
                          <BreadcrumbSeparator className="hidden md:block" />
                        )}
                      </React.Fragment>
                    ))}
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <body className="flex-1 p-4">
          <Outlet />
        </body>
      </SidebarInset>
    </SidebarProvider>
  )
}
