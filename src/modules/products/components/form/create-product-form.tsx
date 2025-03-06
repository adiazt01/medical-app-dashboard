import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getPresentations } from "../../services/presentation-api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getMainComponents } from "../../services/main-component-api";
import { getTherapeuticActions } from "../../services/therapeutic-action-api";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Camera, Cross, Info, Plus, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { createProductSchema } from "../../schemas/product-schema";
import { FieldInfo } from "@/modules/core/components/input/form-info";
import { getLaboratories } from "../../services/laboratory-api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { uploadFile } from "@/modules/core/services/file-api";
import { z } from "zod";
import { createProduct } from "../../services/medicine-api";
import { useToast } from "@/modules/core/hooks/use-toast";

export function CreateProductForm() {
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast()
  
  const createProductmutation = useMutation({
    mutationFn: async (newProduct: z.infer<typeof createProductSchema>) => {
      const fileData = await uploadFile(newProduct.image, 'stories')
      return await createProduct({
        name: newProduct.name,
        price: newProduct.price,
        description: newProduct.description,
        laboratoryId: newProduct.laboratoryId,
        mainComponentId: newProduct.mainComponentId,
        fileId: fileData.id,
        presentationId: newProduct.presentationId,
        therapeuticActionId: newProduct.therapeuticActionId,
      })
    }
  })
  
  const query = useQuery({
    queryKey: ["products create fetch initial values"],
    queryFn: async () => {
      const [presentations, mainComponents, therapeuticActions, laboratories] =
        await Promise.all([
          getPresentations(),
          getMainComponents(),
          getTherapeuticActions(),
          getLaboratories(),
        ]);
      return {
        presentations,
        mainComponents,
        therapeuticActions,
        laboratories,
      };
    },
  });

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      mainComponentId: 0,
      laboratoryId: 0,
      therapeuticActionId: 0,
      presentationId: 0,
      image: null as File,
    },
    validators: {
      onBlur: createProductSchema
    },
    onSubmit: async ({ value }) => {
      if (!value.image) {
        return;
      }
      
      await createProductmutation.mutateAsync(value)
      toast({
        "title": "Producto creado",
        "description": "El producto ha sido creado exitosamente",
      })
    },
    onSubmitInvalid: ({ value, formApi }) => {
      console.log(value);
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFile(acceptedFiles[0]);
      form.setFieldValue("image", acceptedFiles[0]);
    },
    [form],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "image/*": [".jpeg", ".png"],
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex-1"
    >
      <div className="flex flex-col gap-6">
        <section className="flex w-full gap-8 md:grid-cols-2">
          <div className="flex w-full flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Registra tu producto!</CardTitle>
                <CardDescription>
                  Ingresa y registra la informacion de tu producto
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <form.Field
                  name="name"
                  children={(field) => (
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="name">Nombre</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Acetaminofen"
                      />
                      <FieldInfo field={field} />
                    </div>
                  )}
                />
                <form.Field
                  name="price"
                  children={(field) => (
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="name">Precio</Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        type="number"
                        min={0}
                        onChange={(e) =>
                          field.handleChange(Number(e.target.value))
                        }
                        placeholder="Nombre del producto"
                      />
                      <FieldInfo field={field} />
                    </div>
                  )}
                />
                <form.Field
                  name="description"
                  children={(field) => (
                    <div className="grid w-full items-center gap-1.5">
                      <Label
                        htmlFor="name"
                        className="flex flex-row gap-1 items-center jus"
                      >
                        Descripción{" "}
                        <Tooltip>
                          <TooltipTrigger>
                            <Info size={12} className="mb-0.5" />
                          </TooltipTrigger>
                          <TooltipContent>
                            Este campo es opcional
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Este producto es top 1 en ventas..."
                      />
                      <FieldInfo field={field} />
                    </div>
                  )}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Información adicional</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <form.Field
                  name="laboratoryId"
                  children={(field) => (
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="name">Laboratorio</Label>
                      <div className="flex gap-4 flex-row w-full">
                        <Select
                          onValueChange={(e) => field.handleChange(Number(e))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione una presentación" />
                          </SelectTrigger>
                          <SelectContent>
                            {query?.data?.laboratories.map((laboratory) => (
                              <SelectItem
                                key={laboratory.id}
                                value={laboratory.id.toString()}
                              >
                                {laboratory.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <FieldInfo field={field} />
                    </div>
                  )}
                />
                <form.Field
                  name="presentationId"
                  children={(field) => (
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="name">Presentación</Label>
                      <div className="flex gap-4 flex-row w-full">
                        <Select
                          onValueChange={(e) => field.handleChange(Number(e))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione una presentación" />
                          </SelectTrigger>
                          <SelectContent>
                            {query?.data?.presentations.map((presentation) => (
                              <SelectItem
                                key={presentation.id}
                                value={presentation.id.toString()}
                              >
                                {presentation.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <FieldInfo field={field} />
                    </div>
                  )}
                />
              </CardContent>
            </Card>
          </div>
          <div className="flex flex-col gap-6 max-w-sm w-full">
            <Card>
              <CardHeader>
                <CardTitle>Detalles farmacológicos</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <form.Field
                  name="mainComponentId"
                  children={(field) => (
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="name">Componente principal</Label>
                      <div className="flex gap-4 flex-row w-full">
                        <Select
                          onValueChange={(e) => field.handleChange(Number(e))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Seleccione un componente" />
                          </SelectTrigger>
                          <SelectContent>
                            {query?.data?.mainComponents.map(
                              (mainComponent) => (
                                <SelectItem
                                  key={mainComponent.id}
                                  value={mainComponent.id.toString()}
                                >
                                  {mainComponent.name}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      <FieldInfo field={field} />
                    </div>
                  )}
                />
                <form.Field
                  name="therapeuticActionId"
                  children={(field) => (
                    <div className="grid w-full items-center gap-1.5">
                      <Label htmlFor="name">Acción terapéutica</Label>
                      <Select
                        onValueChange={(e) => field.handleChange(Number(e))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Seleccione una acción terapéutica" />
                        </SelectTrigger>
                        <SelectContent>
                          {query?.data?.therapeuticActions.map(
                            (therapeuticAction) => (
                              <SelectItem
                                key={therapeuticAction.id}
                                value={therapeuticAction.id.toString()}
                              >
                                {therapeuticAction.name}
                              </SelectItem>
                            ),
                          )}
                        </SelectContent>
                      </Select>
                      <FieldInfo field={field} />
                    </div>
                  )}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Imagen</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <div className="grid w-full items-center gap-1.5">
                  <form.Field
                    name="image"
                    children={(field) => (
                      <>
                        {!file && (
                          <div
                            {...getRootProps()}
                            className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg"
                          >
                            <input {...getInputProps()} />
                            {isDragActive ? (
                              <p>Suelta el archivo aquí ...</p>
                            ) : (
                              <Camera className="stroke-zinc-300" size={24} />
                            )}
      
                            {/* Show the iomage */}
                          </div>
                        )}
                        {file && (
                          <div className="flex items-center justify-center w-full relative">
                            <Button className="absolute z-20 -top-5 -right-4" onClick={() => setFile(null)} size="icon" variant={"destructive"}>
                              <X size={24} />
                            </Button>
                            <AspectRatio className="border z-10 rounded" ratio={4 / 3}>
                              <img
                                src={URL.createObjectURL(file)}
                                alt="preview"
                                className="object-cover w-full h-full rounded-lg"
                              />
                            </AspectRatio>
                          </div>
                        )}
                        <FieldInfo field={field} />
                      </>
                    )}
                    /> 
                </div>   
              </CardContent>
            </Card>
            <Button type="submit" className="w-full">
              Agregar producto
            </Button>
          </div>
        </section>
      </div>
    </form>
  );
}
