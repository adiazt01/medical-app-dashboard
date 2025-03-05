import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { CreateProductForm } from "../form/create-product-form";

export function CreateProductDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          <Plus />
          Agregar producto</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Agregar producto
          </DialogTitle>
          <DialogDescription>
            Ingresa los datos del producto
          </DialogDescription>
        </DialogHeader>
        <CreateProductForm />
      </DialogContent>
    </Dialog>
  )
}
