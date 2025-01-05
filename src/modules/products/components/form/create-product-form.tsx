import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@tanstack/react-form";
import { useQuery } from "@tanstack/react-query";
import { getPresentations } from "../../services/presentation-api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getMainComponents } from "../../services/main-component-api";


export function CreateProductForm() {
  const query = useQuery({
    queryKey: ['presentations'],
    queryFn: async () => {
      const [presentations, mainComponents] = await Promise.all([
        getPresentations(),
        getMainComponents()
      ])
      return {
        presentations,
        mainComponents
      }
    }
  })

  console.log(query)

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      presentationId: 0,
      mainComponentId: 0,
      laboratoryId: 0,
      therapeuticActionId: 0,
    },
    onSubmit: async ({ value }) => {
      
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <form.Field
            name="presentationId"
            children={(field) => (
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="name">
                  Presentación
                </Label>
                <Select
                  onValueChange={(e) => 
                    field.handleChange(Number(e))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione una presentación" />
                  </SelectTrigger>
                  <SelectContent>
                    {query?.data?.presentations.map((presentation) => (
                      <SelectItem key={presentation.id} value={presentation.name}>
                        {presentation.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          />
        </div>
        <div className="grid gap-2">
          <form.Field
            name="mainComponentId"
            children={(field) => (
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Label htmlFor="name">
                  Componente principal
                </Label>
                <Select
                  onValueChange={(e) => 
                    field.handleChange(Number(e))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un componente" />
                  </SelectTrigger>
                  <SelectContent>
                    {query?.data?.mainComponents.map((mainComponent) => (
                      <SelectItem key={mainComponent.id} value={mainComponent.name}>
                        {mainComponent.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="#" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  )
}