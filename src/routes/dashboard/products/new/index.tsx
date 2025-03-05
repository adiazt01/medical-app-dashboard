import { CreateProductForm } from '@/modules/products/components/form/create-product-form'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/products/new/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <CreateProductForm />
}
